import { HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SupportBreadcrumb = () => {
  return (
    <div className="bg-header border-b border-border/30">
      <div className="max-w-[1120px] mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <nav className="text-[13px]">
            <Link 
              to="/" 
              className="text-foreground font-medium hover:underline"
            >
              W2F Help Centre
            </Link>
          </nav>
          
          <a 
            href="#" 
            className="flex items-center gap-2 text-[13px] text-foreground/70 hover:text-foreground transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Get support</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SupportBreadcrumb;