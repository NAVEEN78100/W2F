// Grievance form data structure
export const grievancePolicies = `
By submitting this grievance form, you agree to the following policies:

1. **Information Accuracy**: All information provided must be accurate and truthful.
2. **Confidentiality**: Your personal information will be kept confidential and used only for grievance resolution.
3. **Non-Retaliation**: WWF is committed to protecting you from retaliation for submitting a grievance.
4. **Investigation**: Your grievance will be investigated fairly and impartially within 30 days.
5. **Appeal Process**: You have the right to appeal any decision made during the grievance resolution process.
6. **Record Keeping**: Records of your grievance will be maintained securely for a minimum of 3 years.
7. **Cooperation**: You agree to cooperate with WWF during the investigation process.
8. **Legal Compliance**: All grievances will be handled in accordance with applicable laws and regulations.

For any urgent matters, please contact us at grievance@wwf.com
`;

export const heroData = {
  title: "Submit Your Grievance",
  tagline: "We value your feedback and are committed to resolving any issues you may have. Please fill out the form below with detailed information about your concern."
};

export const grievanceTypes = [
  { value: 'Environmental', label: 'Environmental Concern' },
  { value: 'Wildlife', label: 'Wildlife Protection' },
  { value: 'Conservation', label: 'Conservation Program' },
  { value: 'Administrative', label: 'Administrative Issue' },
  { value: 'Other', label: 'Other' }
];

export const statesList = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const confirmationEmailTemplate = (fullName, email, grievanceType, phone, location, description) => `
<p>Dear ${fullName},</p>

<p>Thank you for submitting your grievance to WWF. We have received your submission and appreciate you bringing this matter to our attention.</p>

<p><strong>Your grievance details:</strong></p>
<ul>
  <li><strong>Email:</strong> ${email}</li>
  <li><strong>Phone:</strong> ${phone}</li>
  <li><strong>Type:</strong> ${grievanceType}</li>
  <li><strong>Location:</strong> ${location}</li>
  <li><strong>Description:</strong> ${description}</li>
</ul>

<p>If you have any urgent matters, please contact us at grievance@wwf.com</p>

<p>Best regards,</p>
<p><strong>WWF Grievance Resolution Team</strong></p>
`;
