import { Link } from "react-router-dom";

interface ArticleCardProps {
  title: string;
  slug: string;
}

const ArticleCard = ({ title, slug }: ArticleCardProps) => {
  return (
    <Link 
      to={`/article/${slug}`}
      className="group block bg-card rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
    >
      {/* Yellow accent bar at top */}
      <div className="h-1 bg-primary" />
      
      {/* Content */}
      <div className="p-5 min-h-[140px] flex flex-col">
        <h3 className="text-[15px] font-medium text-card-foreground leading-[1.4] mb-4 flex-1">
          {title}
        </h3>
        
        <span className="inline-flex items-center text-[13px] font-medium text-primary group-hover:underline">
          Learn more
        </span>
      </div>
    </Link>
  );
};

export default ArticleCard;
