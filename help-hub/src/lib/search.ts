// Search utility for WWF Help Center
// Follows strict rules: case-insensitive, partial matching, keyword-based, deterministic

export interface HelpItem {
  id: string;
  question: string;
  section: string;
  content: string;
  keywords: string[];
  slug: string;
  type: "article" | "topic" | "helpItem";
}

// Global keyword aliases (core index)
const KEYWORD_ALIASES: Record<string, string[]> = {
  otp: [
    "otp",
    "one time password",
    "verification code",
    "sms code",
    "login code",
  ],
  login: ["login", "sign in", "authentication", "access account"],
  account: ["account", "profile", "user account"],
  location: [
    "location",
    "gps",
    "nearby",
    "distance",
    "radius",
    "location access",
  ],
  restaurant: ["restaurant", "listing", "place", "dining place"],
  dish: ["dish", "food item", "menu item"],
  rating: ["rating", "star rating", "review", "feedback"],
  qr: ["qr", "qr code", "scan", "scanner", "qr menu"],
  points: ["points", "score", "levels", "engagement"],
  passport: ["passport", "wwf passport"],
  offer: ["offer", "deal", "promotion", "event"],
  privacy: ["privacy", "data", "personal data", "security"],
  delete: ["delete", "remove", "close account"],
  bug: ["bug", "issue", "error", "crash", "not working"],
  grievance: ["grievance", "complaint", "escalation"],
};

// Section-wise keywords (full coverage)
const SECTION_KEYWORDS: Record<string, string[]> = {
  "getting-started": [
    "getting started",
    "what is wander with food",
    "how it works",
    "basics",
    "curated restaurants",
    "nearby restaurants",
    "location based discovery",
    "not delivery app",
    "food discovery",
  ],
  "account-login": [
    "account",
    "login",
    "sign in",
    "otp",
    "one time password",
    "verification",
    "otp not received",
    "otp expired",
    "otp failed",
    "change phone number",
    "multiple devices",
    "uninstall app",
  ],
  "restaurant-discovery": [
    "restaurant discovery",
    "curated restaurants",
    "listings",
    "restaurant not showing",
    "missing restaurant",
    "location radius",
    "restaurant disappeared",
    "categories",
  ],
  "dish-discovery": [
    "dish discovery",
    "dish search",
    "food search",
    "cuisine search",
    "dish availability",
    "dish price",
    "dish distance",
    "dish rating",
  ],
  "qr-menu": [
    "qr",
    "qr code",
    "scan menu",
    "qr scanner",
    "dish rating",
    "star rating",
    "no comments",
    "no photos",
  ],
  "star-ratings": [
    "star rating",
    "hashtags",
    "dish hashtags",
    "fake ratings",
    "suspicious ratings",
    "rating system",
  ],
  "points-levels": [
    "points",
    "levels",
    "engagement",
    "score",
    "30 levels",
    "rewards",
    "recognition",
    "wwf passport",
  ],
  "ranking-system": [
    "ranking system",
    "first class",
    "second class",
    "third class",
    "restaurant classification",
    "evaluation",
  ],
  "offers-events": [
    "offers",
    "events",
    "promotions",
    "deals",
    "location based offers",
    "expired offers",
  ],
  "privacy-security": [
    "privacy",
    "data",
    "personal data",
    "security",
    "location data",
    "data retention",
    "data deletion",
    "dpdp",
  ],
  "technical-issues": [
    "app crash",
    "app slow",
    "not loading",
    "qr not working",
    "ratings not saving",
    "incorrect location",
    "technical bug",
  ],
  "feedback-access": [
    "feedback",
    "suggestions",
    "feature request",
    "early access",
    "beta program",
  ],
  "restaurants-partners": [
    "restaurant partner",
    "vendor onboarding",
    "listing criteria",
    "restaurant dispute",
    "data correction",
  ],
  "grievance-redressal": [
    "grievance",
    "complaint",
    "escalation",
    "grievance officer",
    "grievance timeline",
    "legal",
  ],
  "general-platform": [
    "free app",
    "pricing",
    "cost",
    "tourists",
    "outside india",
    "updates",
    "announcements",
  ],
};

// Static help content data
const HELP_CONTENT: HelpItem[] = [
  {
    id: "what-is-wander-with-food",
    question: "What is Wander With Food and how does it work?",
    section: "getting-started",
    content:
      "Wander With Food is a food discovery and restaurant offers platform. You can explore nearby restaurants, redeem coupons and earn rewards. Browse through various cuisines and find exclusive deals.",
    keywords: SECTION_KEYWORDS["getting-started"],
    slug: "what-is-wander-with-food",
    type: "article",
  },
  {
    id: "how-to-sign-up",
    question: "How to sign up and create your account",
    section: "account-login",
    content:
      "Signing up is quick and easy. Download the app and create your account. Provide your email and set a secure password. Verify your account to start exploring restaurants and offers.",
    keywords: SECTION_KEYWORDS["account-login"],
    slug: "how-to-sign-up",
    type: "article",
  },
  {
    id: "exploring-restaurants-offers",
    question: "Exploring nearby restaurants and offers",
    section: "restaurant-discovery",
    content:
      "Use the app to discover restaurants near you. Browse through exclusive offers and coupons. Filter by cuisine, location, and ratings.",
    keywords: SECTION_KEYWORDS["restaurant-discovery"],
    slug: "exploring-restaurants-offers",
    type: "article",
  },
  {
    id: "how-coupons-work",
    question: "How coupon codes work on Wander With Food",
    section: "offers-events",
    content:
      "Coupon codes provide discounts at participating restaurants. Each code has specific terms and expiration dates. Redeem codes directly in the app or at the restaurant.",
    keywords: SECTION_KEYWORDS["offers-events"],
    slug: "how-coupons-work",
    type: "article",
  },
  {
    id: "redeeming-offers-guide",
    question: "Step-by-step guide to redeeming offers",
    section: "offers-events",
    content:
      "Select an offer in the app and generate the coupon code. Show the code to the restaurant staff when ordering. The discount will be applied to your bill.",
    keywords: SECTION_KEYWORDS["offers-events"],
    slug: "redeeming-offers-guide",
    type: "article",
  },
  {
    id: "coupon-not-working",
    question: "Why a coupon may not work",
    section: "offers-events",
    content:
      "Check if the coupon has expired or reached usage limits. Ensure you're at a participating restaurant. Contact support if the issue persists.",
    keywords: SECTION_KEYWORDS["offers-events"],
    slug: "coupon-not-working",
    type: "article",
  },
  {
    id: "posting-reviews",
    question: "How to post reviews and earn points",
    section: "star-ratings",
    content:
      "Write reviews after dining at restaurants. Include photos and detailed feedback for more points. Earn rewards that can be redeemed for discounts.",
    keywords: SECTION_KEYWORDS["star-ratings"],
    slug: "posting-reviews",
    type: "article",
  },
  {
    id: "missing-rewards",
    question: "Missing rewards troubleshooting",
    section: "points-levels",
    content:
      "Check your rewards balance in the app dashboard. Ensure reviews meet the minimum requirements. Contact support if rewards don't appear after 24 hours.",
    keywords: SECTION_KEYWORDS["points-levels"],
    slug: "missing-rewards",
    type: "article",
  },
  {
    id: "updating-profile",
    question: "Updating your profile details",
    section: "account-login",
    content:
      "Go to your profile settings to update information. Change your name, email, and preferences. Add a profile picture for a personalized experience.",
    keywords: SECTION_KEYWORDS["account-login"],
    slug: "updating-profile",
    type: "article",
  },
  {
    id: "account-deactivation",
    question: "Account deactivation requests",
    section: "account-login",
    content:
      "Contact support to request account deactivation. Your data will be permanently deleted after confirmation. Active rewards may be forfeited upon deactivation.",
    keywords: SECTION_KEYWORDS["account-login"],
    slug: "account-deactivation",
    type: "article",
  },
  {
    id: "location-nearby-restaurants",
    question: "How location shows nearby restaurants",
    section: "restaurant-discovery",
    content:
      "Enable location services for accurate restaurant discovery. The app uses GPS to find restaurants in your area. Adjust search radius in settings for more options.",
    keywords: SECTION_KEYWORDS["restaurant-discovery"],
    slug: "location-nearby-restaurants",
    type: "article",
  },
  {
    id: "incorrect-location",
    question: "Troubleshooting incorrect location",
    section: "technical-issues",
    content:
      "Check if location permissions are enabled. Refresh the app or restart your device. Update your device's location settings.",
    keywords: SECTION_KEYWORDS["technical-issues"],
    slug: "incorrect-location",
    type: "article",
  },
  {
    id: "location-settings",
    question: "Adjusting search radius settings",
    section: "restaurant-discovery",
    content:
      "Go to settings to change search radius. Increase radius to find more restaurants. Decrease radius for more local options.",
    keywords: SECTION_KEYWORDS["restaurant-discovery"],
    slug: "location-settings",
    type: "article",
  },
  {
    id: "restaurant-listing",
    question: "How restaurants can list offers",
    section: "restaurants-partners",
    content:
      "Restaurants can partner with us to list exclusive offers. Contact our partnership team for more information. Offers help attract more customers and increase sales.",
    keywords: SECTION_KEYWORDS["restaurants-partners"],
    slug: "restaurant-listing",
    type: "article",
  },
  {
    id: "managing-coupons",
    question: "Managing coupons and campaigns",
    section: "restaurants-partners",
    content:
      "Restaurants can create and manage coupon campaigns. Set expiration dates and usage limits. Track coupon performance through the dashboard.",
    keywords: SECTION_KEYWORDS["restaurants-partners"],
    slug: "managing-coupons",
    type: "article",
  },
  {
    id: "visibility-approval",
    question: "Visibility and approval timelines",
    section: "restaurants-partners",
    content:
      "Offers are reviewed before going live. Approval typically takes 24-48 hours. Ensure all information is accurate for faster approval.",
    keywords: SECTION_KEYWORDS["restaurants-partners"],
    slug: "visibility-approval",
    type: "article",
  },
  {
    id: "data-usage",
    question: "How we use and protect your data",
    section: "privacy-security",
    content:
      "We collect data to improve your experience. Your information is encrypted and securely stored. We never share personal data without consent.",
    keywords: SECTION_KEYWORDS["privacy-security"],
    slug: "data-usage",
    type: "article",
  },
  {
    id: "privacy-policy",
    question: "Our privacy policy explained",
    section: "privacy-security",
    content:
      "Read our full privacy policy for detailed information. We comply with data protection regulations. Contact us with any privacy concerns.",
    keywords: SECTION_KEYWORDS["privacy-security"],
    slug: "privacy-policy",
    type: "article",
  },
  {
    id: "reporting-abuse",
    question: "Reporting abuse or incorrect listings",
    section: "grievance-redressal",
    content:
      "Report inappropriate content through the app. Flag incorrect restaurant information. Our team reviews reports and takes appropriate action.",
    keywords: SECTION_KEYWORDS["grievance-redressal"],
    slug: "reporting-abuse",
    type: "article",
  },
];

// Expand keywords with aliases
function expandKeywords(keywords: string[]): string[] {
  const expanded = new Set<string>();

  keywords.forEach((keyword) => {
    expanded.add(keyword.toLowerCase());

    // Check if keyword has aliases
    for (const [aliasKey, aliasList] of Object.entries(KEYWORD_ALIASES)) {
      if (aliasList.includes(keyword.toLowerCase())) {
        aliasList.forEach((alias) => expanded.add(alias.toLowerCase()));
        expanded.add(aliasKey.toLowerCase());
      }
    }
  });

  return Array.from(expanded);
}

// Search function
export function searchHelp(query: string): HelpItem[] {
  if (!query.trim()) return [];

  const searchTerm = query.toLowerCase().trim();
  const results: HelpItem[] = [];

  HELP_CONTENT.forEach((item) => {
    const expandedKeywords = expandKeywords(item.keywords);
    const question = item.question.toLowerCase();
    const content = item.content.toLowerCase();

    // Check if search term matches any keyword (exact or partial)
    const keywordMatch = expandedKeywords.some(
      (keyword) => keyword.includes(searchTerm) || searchTerm.includes(keyword),
    );

    // Check if search term matches question or content (partial)
    const textMatch =
      question.includes(searchTerm) || content.includes(searchTerm);

    if (keywordMatch || textMatch) {
      results.push(item);
    }
  });

  // Remove duplicates and return
  return Array.from(new Set(results.map((item) => item.id))).map(
    (id) => results.find((item) => item.id === id)!,
  );
}

// Get all help content
export function getAllHelpContent(): HelpItem[] {
  return HELP_CONTENT;
}

// Get help content by section
export function getHelpBySection(section: string): HelpItem[] {
  return HELP_CONTENT.filter((item) => item.section === section);
}
