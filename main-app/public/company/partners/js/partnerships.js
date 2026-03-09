(function () {
    const qs = (s, el = document) => el.querySelector(s);
    const qsa = (s, el = document) => [...el.querySelectorAll(s)];

    const drawer = qs('#drawer');
    const backdrop = qs('#backdrop');
    const drawerTitle = qs('#drawerTitle');
    const drawerSub = qs('.drawer-sub');
    const drawerTerms = qs('#drawerTerms');
    const drawerImg = qs('#drawerImg');
    const leadForm = qs('#leadForm');
    const leadCategory = qs('#leadCategory');
    const leadMsg = qs('#leadMsg');
    const confirmationModal = qs('#confirmationModal');
    const modalClose = qs('#modalClose');
    const modalOk = qs('#modalOk');
    let lastFocused = null;

    // OTP variables
    let otpTimer = null;
    let otpExpiryTime = null;
    let emailVerified = false;
    const sendOtpBtn = qs("#sendOtpBtn");
    const verifyOtpBtn = qs("#verifyOtpBtn");
    const otpSection = qs("#otpSection");
    const extraFields = qs("#extraFields");
    const leadEmail = qs("#leadEmail");
    const otpInput = qs("#otpInput");
    const otpTimerDisplay = qs("#otpTimerDisplay");

    // Terms drawer variables
    const termsDrawer = document.getElementById('termsDrawer');
    const termsDrawerBackdrop = document.getElementById('termsDrawerBackdrop');
    const showTermsLink = document.getElementById('showTermsLink');
    const closeTermsDrawer = document.getElementById('closeTermsDrawer');
    const acceptTermsBtnDrawer = document.getElementById('acceptTermsBtnDrawer');
    const acceptTerms = document.getElementById('acceptTerms');

    // Open partnership drawer
    function openDrawer({ title, subtitle, termsHtml, categoryValue, imgUrl }) {
        lastFocused = document.activeElement;
        drawerTitle.textContent = title;
        drawerSub.textContent = subtitle || "Eligibility & Requirements";
        drawerTerms.innerHTML = termsHtml || "";
        leadCategory.value = categoryValue;
        if (drawerImg) {
            drawerImg.src = imgUrl || "";
            drawerImg.alt = title;
        }
        drawer.classList.add('open');
        backdrop.classList.add('show');
        drawer.setAttribute('aria-hidden', 'false');
        backdrop.setAttribute('aria-hidden', 'false');
        document.addEventListener('keydown', trapEscape);
    }

    // Close partnership drawer
    function closeDrawer() {
        drawer.classList.remove('open');
        backdrop.classList.remove('show');
        drawer.setAttribute('aria-hidden', 'true');
        backdrop.setAttribute('aria-hidden', 'true');
        document.removeEventListener('keydown', trapEscape);

        if (leadForm) {
            leadForm.reset();
            leadMsg.textContent = "";
            leadMsg.className = "lead-msg";
            otpSection.style.display = "none";
            extraFields.style.display = "block";
            sendOtpBtn.disabled = false;
            sendOtpBtn.style.display = "inline-block";
            sendOtpBtn.textContent = "Send OTP";
            if (otpTimer) clearInterval(otpTimer);
            otpTimerDisplay.textContent = "";
            if (!emailVerified) leadEmail.readOnly = false;
            otpInput.disabled = false;
            verifyOtpBtn.disabled = false;
            emailVerified = false;
        }
        if (lastFocused) lastFocused.focus();
    }

    // Show confirmation modal
    function showConfirmationModal() {
        if (!confirmationModal) {
            alert('Partnership request submitted successfully! We will contact you soon.');
            return;
        }
        confirmationModal.classList.add('show');
        confirmationModal.setAttribute('aria-hidden', 'false');
        setTimeout(() => modalOk?.focus(), 100);
    }
    // Hide confirmation modal
    function hideConfirmationModal() {
        if (!confirmationModal) return;
        confirmationModal.classList.remove('show');
        confirmationModal.setAttribute('aria-hidden', 'true');
    }

    // Handle Escape key for modals and drawers
    function trapEscape(e) {
        if (e.key === 'Escape') {
            if (confirmationModal?.classList.contains('show')) hideConfirmationModal();
            else if (termsDrawer.classList.contains('open')) closeTermsDrawerFunc();
            else closeDrawer();
        }
    }

    // Send OTP button clicked
    sendOtpBtn?.addEventListener("click", async () => {
        const requiredFields = [
            { el: qs("#leadName"), label: "Full Name" },
            { el: qs("#leadPhone"), label: "Contact Number" },
            { el: qs("#leadLocation"), label: "Business Location / Address" }
        ];
        for (const field of requiredFields) {
            if (!field.el || !String(field.el.value || "").trim()) {
                leadMsg.textContent = `Please fill ${field.label} before requesting OTP.`;
                leadMsg.className = "lead-msg error";
                field.el?.focus();
                return;
            }
        }
        const email = leadEmail.value.trim();
        if (!email) {
            leadMsg.textContent = "Please enter your email.";
            leadMsg.className = "lead-msg error";
            return;
        }
        if (!validateEmail(email)) {
            leadMsg.textContent = "Please enter a valid email (example: name@gmail.com).";
            leadMsg.className = "lead-msg error";
            leadEmail.focus();
            return;
        }

        const categoryValue = String(leadCategory?.value || '').trim();
        const nameValue = String(qs("#leadName")?.value || '').trim();
        const phoneValue = String(qs("#leadPhone")?.value || '').trim();
        const locationValue = String(qs("#leadLocation")?.value || '').trim();
        const remarksValue = String(qs("#leadRemarks")?.value || '').trim();

        // Disable button and show loading state
        sendOtpBtn.disabled = true;
        const originalText = sendOtpBtn.textContent;
        sendOtpBtn.innerHTML = '<span class="spinner"></span> Sending...';

        try {
            const response = await fetch('/api/partners/otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    action: 'send',
                    email,
                    category: categoryValue,
                    name: nameValue,
                    phone: phoneValue,
                    location: locationValue,
                    remarks: remarksValue,
                }),
            });

            let data = {};
            try { data = await response.json(); } catch { data = {}; }

            if (!response.ok || !data.ok) {
                throw new Error(data.error || 'Failed to send OTP.');
            }

            leadMsg.textContent = data.message || "OTP sent to your email.";
            leadMsg.className = "lead-msg success";
            otpSection.style.display = "block";
            sendOtpBtn.style.display = "none";
            otpInput.value = '';

            otpExpiryTime = Date.now() + 5 * 60 * 1000; // 5 minutes
            if (otpTimer) clearInterval(otpTimer);

            otpTimer = setInterval(() => {
                const remaining = otpExpiryTime - Date.now();
                if (remaining <= 0) {
                    clearInterval(otpTimer);
                    otpTimerDisplay.textContent = "⏳ OTP expired. Please resend.";
                    sendOtpBtn.style.display = "inline-block";
                    sendOtpBtn.disabled = false;
                    sendOtpBtn.textContent = originalText;
                    otpInput.disabled = true;
                    verifyOtpBtn.disabled = true;
                } else {
                    const minutes = Math.floor(remaining / 60000);
                    const seconds = Math.floor((remaining % 60000) / 1000);
                    otpTimerDisplay.textContent = `⏱ Time left: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
                }
            }, 1000);

            otpInput.disabled = false;
            verifyOtpBtn.disabled = false;
            sendOtpBtn.disabled = false;
            sendOtpBtn.textContent = originalText;
        } catch (err) {
            const errorText = err?.message || "Failed to send OTP.";
            console.error("Partner OTP send error:", err);
            leadMsg.textContent = errorText;
            leadMsg.className = "lead-msg error";
            sendOtpBtn.disabled = false;
            sendOtpBtn.textContent = originalText;
        }
    });


    // Verify OTP button clicked
    verifyOtpBtn?.addEventListener("click", async () => {
        if (Date.now() > otpExpiryTime) {
            leadMsg.textContent = "OTP expired. Please resend.";
            leadMsg.className = "lead-msg error";
            return;
        }

        const otp = otpInput.value.trim();
        if (!otp) {
            leadMsg.textContent = "Please enter OTP.";
            leadMsg.className = "lead-msg error";
            return;
        }

        verifyOtpBtn.disabled = true;
        const verifyText = verifyOtpBtn.textContent;
        verifyOtpBtn.textContent = 'Verifying...';

        try {
            const response = await fetch('/api/partners/otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({
                    action: 'verify',
                    email: leadEmail.value.trim(),
                    otp,
                }),
            });

            let data = {};
            try { data = await response.json(); } catch { data = {}; }

            if (!response.ok || !data.ok) {
                throw new Error(data.error || 'Invalid OTP.');
            }

            leadMsg.textContent = data.message || "OTP verified!";
            leadMsg.className = "lead-msg success";
            otpSection.style.display = "none";

            clearInterval(otpTimer);
            otpTimerDisplay.textContent = "";

            leadEmail.readOnly = true;
            emailVerified = true;

            const submitBtn = qs("#submitBtn");
            if (submitBtn) submitBtn.disabled = false;
            qs("#leadName")?.focus();
        } catch (err) {
            leadMsg.textContent = err?.message || "Invalid OTP.";
            leadMsg.className = "lead-msg error";
        } finally {
            verifyOtpBtn.disabled = false;
            verifyOtpBtn.textContent = verifyText;
        }
    });

    // Partner card click to open drawer
    qsa('.partner-card').forEach(card => {
        card.addEventListener('click', () => {
            const title = card.dataset.title;
            const template = card.querySelector('.terms-template');
            const terms = template ? template.innerHTML.trim() : '';
            const category = card.dataset.category;
            const imgUrl = card.querySelector('img')?.src;
            openDrawer({ title, subtitle: "Partnership Requirements", termsHtml: terms, categoryValue: category, imgUrl });
        });
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Close drawer handlers
    qsa('[data-close]').forEach(btn => btn.addEventListener('click', closeDrawer));
    backdrop.addEventListener('click', e => { if (e.target === backdrop) closeDrawer(); });
    modalClose?.addEventListener('click', hideConfirmationModal);
    modalOk?.addEventListener('click', () => { hideConfirmationModal(); closeDrawer(); });

    // Form submit validation & submit
    leadForm?.addEventListener('submit', async e => {
        e.preventDefault();
        if (!emailVerified || extraFields.style.display === "none") {
            leadMsg.textContent = "Please verify OTP before submitting.";
            leadMsg.className = "lead-msg error";
            return;
        }
        if (!validateEmail(String(leadEmail?.value || '').trim())) {
            leadMsg.textContent = "Please enter a valid email before submitting.";
            leadMsg.className = "lead-msg error";
            leadEmail?.focus();
            return;
        }
        const acceptTermsChk = qs('#acceptTerms');
        if (!acceptTermsChk?.checked) {
            leadMsg.textContent = "Please accept the terms and conditions.";
            leadMsg.className = "lead-msg error";
            acceptTermsChk.focus();
            return;
        }
        leadMsg.textContent = "";
        leadMsg.className = "lead-msg";
        const btn = leadForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = "Submitting...";
        try {
            const formData = new FormData(leadForm);
            formData.set('AcceptTerms', acceptTermsChk.checked);

            const res = await fetch(leadForm.action, {
                method: 'POST',
                headers: { 'Accept': 'application/json' },
                body: formData
            });

            let data = {};
            try { data = await res.json(); } catch { data = { message: "Server error. Please try again." }; }

            if (res.ok && data.success) {
                showConfirmationModal();
                leadForm.reset();
                extraFields.style.display = "none";
                otpSection.style.display = "none";
                emailVerified = false;
                leadEmail.readOnly = false;
            } else {
                leadMsg.textContent = data.message || "Please check your details.";
                leadMsg.className = "lead-msg error";
            }
        } catch (err) {
            console.error('Submission error:', err);
            leadMsg.textContent = "Network error.";
            leadMsg.className = "lead-msg error";
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    });

    // Validate input on blur
    const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePhone = phone => /^[\d\s\+\-\(\)]{10,15}$/.test(phone.replace(/\s/g, ''));

    qs('#leadEmail')?.addEventListener('blur', e => {
        e.target.style.borderColor = (e.target.value && !validateEmail(e.target.value)) ? 'var(--error)' : '';
    });
    qs('#leadPhone')?.addEventListener('blur', e => {
        e.target.style.borderColor = (e.target.value && !validatePhone(e.target.value)) ? 'var(--error)' : '';
    });

    // Terms drawer open/close handlers
    function openTermsDrawer() {
        termsDrawer.classList.add('open');
        termsDrawer.setAttribute('aria-hidden', 'false');
        termsDrawerBackdrop.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    function closeTermsDrawerFunc() {
        termsDrawer.classList.remove('open');
        termsDrawer.setAttribute('aria-hidden', 'true');
        termsDrawerBackdrop.style.display = 'none';
        document.body.style.overflow = '';
        showTermsLink.focus();
    }
    showTermsLink?.addEventListener('click', openTermsDrawer);
    showTermsLink?.addEventListener('keydown', (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openTermsDrawer();
        }
    });
    closeTermsDrawer?.addEventListener('click', closeTermsDrawerFunc);
    termsDrawerBackdrop?.addEventListener('click', closeTermsDrawerFunc);
    acceptTermsBtnDrawer?.addEventListener('click', () => {
        acceptTerms.checked = true;
        acceptTerms.disabled = false;
        closeTermsDrawerFunc();
    });

    // Escape key support globally for terms drawer
    document.addEventListener('keydown', function (e) {
        if (termsDrawer.classList.contains('open') && e.key === 'Escape') {
            closeTermsDrawerFunc();
        }
    });

})();
