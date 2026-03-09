import { Link } from "react-router-dom";
import { LucideIcon, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

interface TopicLink {
  title: string;
  slug: string;
}

interface BrowseTopicCardProps {
  title: string;
  icon: LucideIcon;
  links: TopicLink[];
  viewMoreSlug: string;
}

const BrowseTopicCard = ({
  title,
  icon: Icon,
  links,
  viewMoreSlug,
}: BrowseTopicCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="w-[400px] min-h-[380px] bg-white border border-[#D0D7DE] rounded-[16px] p-6 flex flex-col box-border hover:bg-white cursor-pointer">
      {/* Icon - top left, outlined style */}
      <div className="w-10 h-10 flex items-center justify-center mb-3">
        <Icon className="w-10 h-10 text-[#1877F2]" strokeWidth={1.8} />
      </div>

      {/* Title */}
      <h3 className="text-[20px] font-semibold text-[#050505] leading-[1.3] mt-3 mb-4">
        {title}
      </h3>

      {/* Links list */}
      <ul className="space-y-3 flex-1">
        {links.slice(0, isExpanded ? links.length : 3).map((link, index) => (
          <li key={index}>
            <Link
              to={`/article/${link.slug}`}
              className="text-[14px] text-gray-600 font-normal leading-[1.6] hover:underline block flex items-center justify-between"
            >
              {link.title}
              <svg
                className="w-4 h-4 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </li>
        ))}
      </ul>

      {/* View more button */}
      <div className="mt-5">
        <Link
          to={`/topic/${viewMoreSlug}?viewMore=true`}
          className="inline-flex items-center text-[14px] font-medium text-[#1B74E4] hover:underline"
        >
          View more
          <div className="w-5 h-5 ml-2 border-2 border-[#1B74E4] rounded-full flex items-center justify-center">
            <ChevronRight className="w-3 h-3 text-[#1B74E4]" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default BrowseTopicCard;
