import SupportHeader from "@/components/support/SupportHeader";
import SupportBreadcrumb from "@/components/support/SupportBreadcrumb";
import SupportSearch from "@/components/support/SupportSearch";
import PopularArticlesSection from "@/components/support/PopularArticlesSection";
import BrowseTopicsSection from "@/components/support/BrowseTopicsSection";
import SupportFooter from "@/components/support/SupportFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SupportHeader />
      <SupportBreadcrumb />

      <main className="max-w-[1240px] mx-auto px-8">
        <SupportSearch />

        <div className="pb-14">
          <PopularArticlesSection />
          <BrowseTopicsSection />
        </div>
      </main>

      {/* Newsletter Section */}
     
      {/* Footer */}
      <SupportFooter />
    </div>
  );
};

export default Index;
