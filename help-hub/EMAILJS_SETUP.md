# EmailJS Setup Guide for Support Form

## Quick Setup Steps

### 1. Create EmailJS Account
- Go to: https://www.emailjs.com/
- Click "Sign Up Free"
- Sign up with your email

### 2. Get Your Public Key
- Go to: https://dashboard.emailjs.com/admin/account
- Copy your **Public Key** katJyt0NEEicyS-mq

### 3. Create Email Service
- Go to: https://dashboard.emailjs.com/admin/services
- Click "Create New Service"
- Select "Gmail" as service
- Click "Connect"
- Follow the steps to authenticate your Gmail account
- Copy your **Service ID** (format: service_xxxxx)service_qcsu31s
wanderwithfood.official@gmail.com
### 4. Create Email Template
- Go to: https://dashboard.emailjs.com/admin/templates
- Click "Create New Template"
- Name it: `support_confirmation`
- Set **To Email**: {{to_email}}
- Set **Subject**: Support Ticket Confirmation - {{ticket_id}}
- Copy the template below into the **Content** field:

```html
Dear {{to_name}},

Thank you for submitting your support request. We have received your inquiry and will get back to you shortly.

**Ticket Details:**
- Ticket ID: {{ticket_id}}
- Issue Category: {{issue_category}}
- Platform: {{platform}}
- Submitted On: {{submitted_date}}

Please keep your Ticket ID for reference when contacting us.

Best regards,
Wander with Food Support Team
```

- Copy your **Template ID** (format: template_xxxxx)

### 5. Update FeedbackForm.tsx
Open: `src/pages/FeedbackForm.tsx`

Replace these values:
```typescript
emailjs.init("YOUR_EMAILJS_PUBLIC_KEY"); // Line 28
// Replace with your public key from Step 2

await emailjs.send(
  "YOUR_SERVICE_ID",      // Line 152 - Replace with Service ID from Step 3
  "support_confirmation", // Line 153 - Keep as "support_confirmation" (from Step 4)
  { ... }
);
```

### Example Values:
```typescript
emailjs.init("abc123xyz_PUBLIC_KEY");

await emailjs.send(
  "service_abc123xyz",
  "support_confirmation",
  { ... }
);
```

## Testing

1. Go to: http://localhost:5173
2. Fill in the support form
3. Click Submit
4. You should receive a confirmation email in your inbox!

## Troubleshooting

- **Email not sending?** Check if you authenticated Gmail in EmailJS
- **"Public Key not found"?** Make sure you added the correct key to Line 28
- **Template not found?** Make sure template is named exactly: `support_confirmation`
