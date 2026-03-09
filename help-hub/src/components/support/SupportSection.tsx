import ArticleCard from "./ArticleCard";

interface Article {
  title: string;
  slug: string;
}

interface SupportSectionProps {
  title: string;
  articles: Article[];
}

const SupportSection = ({ title, articles }: SupportSectionProps) => {
  return (
    <section className="mb-10">
      <h2 className="text-[20px] font-semibold text-foreground mb-4">
        {title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            slug={article.slug}
          />
        ))}
      </div>
    </section>
  );
};

export default SupportSection;
