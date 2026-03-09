import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const footerSections = [
  {
    title: "For Users",
    links: [
      { label: "Browse Restaurants", href: "#" },
      { label: "Find Offers", href: "#" },
      { label: "Redeem Coupons", href: "#" },
      { label: "Write Reviews", href: "#" },
      { label: "Earn Rewards", href: "#" },
      { label: "Saved Offers", href: "#" },
    ],
  },
  {
    title: "Goals",
    links: [
      { label: "Discover new restaurants", href: "#" },
      { label: "Save money dining out", href: "#" },
      { label: "Share food experiences", href: "#" },
      { label: "Find exclusive deals", href: "#" },
      { label: "Explore cuisines", href: "#" },
      { label: "View all goals", href: "#" },
    ],
  },
  {
    title: "Cuisines",
    links: [
      { label: "Italian", href: "#" },
      { label: "Indian", href: "#" },
      { label: "Chinese", href: "#" },
      { label: "Mexican", href: "#" },
      { label: "Japanese", href: "#" },
      { label: "Thai", href: "#" },
      { label: "Mediterranean", href: "#" },
      { label: "American", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Food Blog", href: "#" },
      { label: "Restaurant Guides", href: "#" },
      { label: "Dining Tips", href: "#" },
      { label: "How-to Guides", href: "#" },
      { label: "Sitemap", href: "#" },
    ],
  },
  {
    title: "For Restaurants",
    links: [
      { label: "Partner with us", href: "#" },
      { label: "List your offers", href: "#" },
      { label: "Manage promotions", href: "#" },
      { label: "Analytics dashboard", href: "#" },
      { label: "Partner support", href: "#" },
    ],
  },
  {
    title: "Help Centre",
    links: [
      { label: "Getting Started", href: "/" },
      { label: "Coupons & Offers", href: "/" },
      { label: "Account & Profile", href: "/" },
      { label: "Contact Support", href: "/" },
    ],
  },
];

const SupportFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#1E2E3A] py-10 md:py-14">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[13px] text-[#FFFFFF] font-semibold mb-3 uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-[13px] text-[#FFFFFF] hover:text-[#FFFFFF] hover:underline transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Grievance Redressal Section */}
        <div className="mt-10 pt-6 border-t border-[#9AA7B2]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <p className="text-[13px] text-[#C7D1DB]">
                Have a grievance or complaint? Submit your grievance redressal
                form here.
              </p>
              <Button
                onClick={() => navigate("/grievance")}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded shadow-lg transition-colors w-fit"
              >
                Grievance Redressal
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <Link
                to="#"
                className="text-[13px] text-[#C7D1DB] hover:text-[#FFFFFF] hover:underline transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-[13px] text-[#C7D1DB] hover:text-[#FFFFFF] hover:underline transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-[13px] text-[#C7D1DB] hover:text-[#FFFFFF] hover:underline transition-colors"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SupportFooter;
