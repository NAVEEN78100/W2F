// Card data
export const feedbackCards = [
  {
    title: "Feature Requests & Menu Feedback",
    subtitle: "Share improvements for discovery, menus, and partner tools.",
    imageUrl: "/images/feedback/feedback.jpg",
    category: "Feedback",
    contentHtml: `
      <p>We are always refining the food discovery experience. Tell us what would make the app better for diners and partners.</p>
      
      <p><strong>Popular ideas:</strong></p>
      <ul>
        <li>Smarter cuisine filters and price-range controls</li>
        <li>Clearer menu photos and highlighted signature dishes</li>
        <li>Faster search with location-aware suggestions</li>
      </ul>
      
      <p>Your feedback helps us prioritize improvements for restaurants, cafes, and home bakers.</p>
    `,
    publishDate: new Date()
  },
  {
    title: "Partner Onboarding & Growth",
    subtitle: "Learn about listing, promotions, and featured placements.",
    imageUrl: "/images/feedback/premium.jpg",
    category: "PartnerSupport",
    contentHtml: `
      <p>Want to grow your visibility on Wander With Food? We help partners get discovered by the right audience.</p>
      
      <p><strong>What we can support:</strong></p>
      <ul>
        <li>Listing setup and category placement</li>
        <li>Menu cleanup and photo guidelines</li>
        <li>Feature slots for signature dishes</li>
        <li>Seasonal promotions and collection highlights</li>
      </ul>
      
      <p>Reach out and we will guide you through onboarding and growth options.</p>
    `,
    publishDate: new Date()
  },
  {
    title: "REPORT A PROBLEM",
    subtitle: "Report app issues, listing errors, or customer order problems.",
    imageUrl: "/images/feedback/bugg.jpg",
    category: "ReportProblem",
    contentHtml: `
      <p>Use the Report a Problem form to share issues like broken listings, missing menu items, payment errors, or delivery confusion.</p>
      <p>Include screenshots or steps so we can fix the issue quickly.</p>
    `,
    publishDate: new Date()
  }
];

// Category display mapping
export const getCategoryDisplay = (category) => {
  switch (category) {
    case 'Feedback':
      return 'Improvements';
    case 'PartnerSupport':
      return 'Partner Growth';
    case 'ReportProblem':
      return 'Report Issue';
    default:
      return 'Improvements';
  }
};

// Category class mapping
export const getCategoryClass = (category) => {
  switch (category) {
    case 'Feedback':
      return 'improvements';
    case 'PartnerSupport':
      return 'partner';
    case 'ReportProblem':
      return 'report';
    default:
      return 'improvements';
  }
};
