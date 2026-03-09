import { Search } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-[#1f2f38] py-20">
      <div className="max-w-[1240px] mx-auto px-8 text-center">
        {/* Small label */}
        <div className="text-[14px] text-[#e5e7eb] tracking-wide mb-6">
          Meta Business Help Centre
        </div>

        {/* Main heading */}
        <h1 className="text-[42px] font-medium text-white mb-12 leading-tight">
          Hi Skill, how can we help?
        </h1>

        {/* Search bar */}
        <div className="relative max-w-[720px] mx-auto">
          <input
            type="text"
            placeholder="Search for goals, topics and resources"
            className="w-full h-14 px-4 pr-12 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-400"
          />
          <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-900" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
