import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface PopularArticleCardProps {
  title: string;
  slug: string;
  description?: string;
  isViewAll?: boolean;
}

const PopularArticleCard = ({
  title,
  slug,
  description,
  isViewAll,
}: PopularArticleCardProps) => {
  if (isViewAll) {
    return (
      <Link
        to={`/all-articles`}
        className="bg-[#F5F6F7] rounded-lg p-6 flex flex-col justify-center items-center h-[280px] hover:shadow-md transition"
      >
        <div className="flex items-center gap-2">
          <h3 className="text-[20px] font-normal text-[#1877F2] leading-[28px]">
            {title}
          </h3>
          <div className="flex items-center justify-center w-8 h-8 border-2 border-[#1877F2] rounded-full">
            <ChevronRight className="w-4 h-4 text-[#1877F2]" />
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={`/article/${slug}`}
      className="bg-[#F5F6F7] rounded-lg p-6 flex flex-col justify-between h-[280px] hover:shadow-md transition"
    >
      <div>
        <h3 className="text-[20px] font-normal text-[#1C1E21] leading-[28px]">
          {title}
        </h3>
      </div>

      <span className="inline-flex w-fit px-4 py-2 text-[15px] border border-[#1877F2] text-[#1877F2] rounded-md hover:bg-[#1877F2] hover:text-white transition">
        Learn more
      </span>
    </Link>
  );
};

export default PopularArticleCard;