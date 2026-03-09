import { Search, ChevronDown, Menu, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SupportHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side */}
          <div className="flex items-center gap-4">
            <a
              href="http://127.0.0.1:8080/admin"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-green-600"
            >
              <Shield className="w-4 h-4" />
              Admin
            </a>
            <div className="text-[16px] font-medium text-gray-900">
              Business Help Centre
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center">
            <button
              onClick={() => navigate("/feedback")}
              className="px-4 py-2 border border-gray-300 rounded-full text-gray-900 hover:bg-gray-50 transition-colors"
            >
              Get support →
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default SupportHeader;
