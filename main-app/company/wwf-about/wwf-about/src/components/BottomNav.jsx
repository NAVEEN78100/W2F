import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export default function BottomNav() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed bottom-4 w-full flex justify-center z-50">
      {/* Red pill-shaped nav */}
      <div
        ref={dropdownRef}
        className="relative bg-red-500 text-white rounded-full px-6 py-2 flex items-center gap-8 shadow-lg"
      >
        {/* Home */}
        <Link
          to="/"
          className="flex flex-col items-center hover:opacity-80 transition"
        >
          <FaHome size={18} />
        </Link>

        {/* Personal */}
        <span className="cursor-pointer hover:opacity-80 transition text-xs">
          Personal
        </span>

        {/* Business */}
        <span className="cursor-pointer hover:opacity-80 transition text-xs">
          Business
        </span>

        {/* Company with dropdown */}
        <div
          className="relative flex flex-col items-center"
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          {/* Company button */}
          <span className="cursor-pointer hover:opacity-80 transition text-xs flex items-center gap-1">
            Company
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-3 w-3 transform transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>

          {/* Full navbar-wide dropdown */}
          <div
            className={`absolute bottom-full left-0 w-[calc(100%+3rem)] -ml-6 rounded-2xl bg-[#FF6F61] text-white shadow-xl border border-gray-200 transition-all duration-500 transform origin-bottom overflow-hidden ${
              isDropdownOpen
                ? "opacity-100 scale-y-100"
                : "opacity-0 scale-y-0 pointer-events-none"
            }`}
          >
            <div className="p-6 flex flex-col gap-3">
              {[
                { name: "About Us", link: "/about-us" },
                { name: "Blogs", link: "/blogs" },
                { name: "Partner With Us", link: "/partner" },
                { name: "Enquire", link: "/enquire" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.link}
                  className="text-sm relative overflow-hidden hover:pl-3 transition-all duration-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
