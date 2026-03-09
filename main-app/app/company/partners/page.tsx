"use client"
import React from 'react'

export default function PartnersPage() {
  return (
    <div className="min-h-screen">
      <head>
        <link rel="stylesheet" href="/company/partners/css/partnerships.css" />
        <link rel="stylesheet" href="/company/partners/css/sections.css" />
      </head>

      <section className="hero">
        <div className="hero-inner container">
          <div className="hero-text">
            <h1>Be a Partner</h1>
            <p>Grow your business by joining our partner network.</p>
          </div>
        </div>
      </section>

      <section className="partners container">
        <header className="partners-head">
          <h2>Be a partner</h2>
          <p>Get listed in our application under any of these categories.</p>
        </header>

        <div className="card-grid">
          <article className="partner-card" data-category="1" data-title="Home Bakers" tabIndex={0}>
            <div className="img-wrap">
              <img src="/company/partners/images/partnerships/HomeBakers.jpg" alt="Home Bakers" className="img-fluid" />
            </div>
            <div className="card-body">
              <h3>Home Bakers</h3>
              <p>Small-batch bakers and home confectionery businesses.</p>
            </div>
            <template className="terms-template">
              <p>Home bakers must comply with food safety regulations and provide valid licenses where applicable.</p>
            </template>
          </article>

          <article className="partner-card" data-category="2" data-title="Restaurants & Bars" tabIndex={0}>
            <div className="img-wrap">
              <img src="/company/partners/images/partnerships/RestoBars.jpg" alt="Restaurants & Bars" className="img-fluid" />
            </div>
            <div className="card-body">
              <h3>Restaurants & Bars</h3>
              <p>Full service restaurants, quick service, and bar establishments.</p>
            </div>
            <template className="terms-template">
              <p>Restaurants must have valid FSSAI / health licenses and follow listing policies.</p>
            </template>
          </article>

          <article className="partner-card" data-category="3" data-title="Hangout Spots" tabIndex={0}>
            <div className="img-wrap">
              <img src="/company/partners/images/partnerships/HangoutSpots.jpg" alt="Hangout Spots" className="img-fluid" />
            </div>
            <div className="card-body">
              <h3>Hangout Spots</h3>
              <p>Cafes, lounges and family entertainment venues.</p>
            </div>
            <template className="terms-template">
              <p>Hangout spots must maintain safety standards and provide timely service.</p>
            </template>
          </article>
        </div>
      </section>

      {/* Drawer / side panel (markup preserved so partnerships.js works) */}
      <div className="drawer" id="drawer" aria-hidden="true" role="dialog" aria-labelledby="drawerTitle">
        <button className="drawer-close" data-close aria-label="Close">&times;</button>
        <div className="drawer-header">
          <div className="drawer-img-wrap">
            <img id="drawerImg" src="" alt="Partner Image" />
          </div>
          <h3 id="drawerTitle">Partnership Details</h3>
          <p className="drawer-sub">Eligibility & Requirements</p>
        </div>
        <div className="drawer-body">
          <div id="drawerTerms" className="terms"></div>

          <form id="leadForm" method="post" action="/api/partners/lead" noValidate>
            <input type="hidden" name="Category" id="leadCategory" />

            <div className="form-grid">
              <div className="full" style={{ marginBottom: 0 }}>
                <label htmlFor="leadEmail">Email Address *</label>
                <input name="Email" id="leadEmail" type="email" required maxLength={100} placeholder="Enter your email address" autoComplete="email" />
                <button type="button" id="sendOtpBtn" className="btn-primary">Send OTP</button>
              </div>

              <div className="full" id="otpSection" style={{ display: 'none' }}>
                <label htmlFor="otpInput">Enter OTP *</label>
                <input type="text" id="otpInput" maxLength={6} placeholder="Enter the OTP sent to your email" inputMode="numeric" />
                <button type="button" id="verifyOtpBtn" className="btn-primary">Verify OTP</button>
                <div id="otpTimerDisplay" className="otp-timer" />
              </div>
            </div>

            <div id="extraFields" style={{ display: 'none' }}>
              <div className="form-grid">
                <div>
                  <label htmlFor="leadName">Full Name *</label>
                  <input name="Name" id="leadName" required maxLength={80} placeholder="Enter your full name" />
                </div>
                <div>
                  <label htmlFor="leadPhone">Contact Number *</label>
                  <input name="Phone" id="leadPhone" required maxLength={30} placeholder="Enter phone number" />
                </div>
                <div>
                  <label htmlFor="leadState">State *</label>
                  <select name="State" id="leadState" required>
                    <option value="">Select State</option>
                    <option>Delhi</option>
                    <option>Maharashtra</option>
                    <option>Karnataka</option>
                  </select>
                </div>
                <div className="full">
                  <label htmlFor="leadLocation">Business Location / Address *</label>
                  <input name="Location" id="leadLocation" required maxLength={150} placeholder="Enter business address (Street, City, Pin)" />
                </div>
              </div>

              <div className="checkbox-group" style={{ margin: '18px 0' }}>
                <label className="checkbox-label">
                  <input type="checkbox" name="AcceptTerms" id="acceptTerms" value="true" disabled />
                  I have read and accept the <span id="showTermsLink" className="terms-link">terms and conditions</span> *
                </label>
              </div>
              <button type="submit" className="btn-primary" id="submitBtn" disabled>Submit Partnership Request</button>
            </div>

            <p id="leadMsg" className="lead-msg" role="status" aria-live="polite" style={{ marginTop: 14, minHeight: 16 }}></p>
          </form>
        </div>
      </div>

      <div className="backdrop" id="backdrop" aria-hidden="true"></div>

      {/* Terms drawer backdrop + drawer (required by partnerships.js) */}
      <div id="termsDrawerBackdrop" className="terms-backdrop" style={{ display: 'none' }}></div>
      <div className="drawer terms-drawer" id="termsDrawer" role="dialog" tabIndex={-1} aria-modal="true" style={{ display: 'none' }}>
        <div className="terms-modal-shell">
          <div className="terms-modal-content">
            <button id="closeTermsDrawer" className="modal-close" aria-label="Close terms">&times;</button>
            <h2>Terms &amp; Conditions</h2>
            <div className="terms-scrollable-content">
              <p>Please read these terms and conditions before accepting.</p>
              <ul>
                <li>All partners must comply with local laws and food safety regulations.</li>
                <li>Uploads must be in allowed formats and not exceed size limits.</li>
                <li>We may contact you using the details provided to verify the listing.</li>
              </ul>
            </div>
            <div className="terms-actions">
              <button id="acceptTermsBtnDrawer" className="btn-primary">Accept &amp; Continue</button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation modal (fallback alert used if missing) */}
      <div id="confirmationModal" className="modal" style={{ display: 'none' }} aria-hidden="true">
        <button id="modalClose" className="modal-close" aria-label="Close">&times;</button>
        <div className="modal-header">
          <h3>Thank you</h3>
        </div>
        <div className="modal-body">
          <p>Your partnership request has been received. We will contact you soon.</p>
        </div>
        <div className="modal-actions">
          <button id="modalOk" className="btn-primary">OK</button>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js"></script>
      <script dangerouslySetInnerHTML={{ __html: `emailjs.init("NKqMo7yjfTsoYYysu");` }} />
      <script src="/company/partners/js/partnerships.js"></script>
    </div>
  )
}
