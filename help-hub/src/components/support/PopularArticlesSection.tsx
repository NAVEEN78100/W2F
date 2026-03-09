import { useEffect, useState } from "react";
import PopularArticleCard from "./PopularArticleCard";
import { api, Article } from "@/lib/api";
import { Link } from "react-router-dom";

const PopularArticlesSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      console.log("PopularArticlesSection: Starting fetch");
      try {
        const data = await api.getPublishedArticles();
        console.log("PopularArticlesSection: Got data", data);
        setArticles(data);
      } catch (err) {
        console.log("PopularArticlesSection: Setting error state");
        setError("Failed to load articles");
        console.error("Error fetching articles:", err);
      } finally {
        console.log("PopularArticlesSection: Setting loading to false");
        setLoading(false);
      }
    };

    fetchArticles().catch(err => {
      console.error("PopularArticlesSection: Unhandled promise rejection:", err);
      setError("Failed to load articles");
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <h2 className="text-[28px] font-normal text-gray-900 mb-8">
          Popular articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-32 rounded-lg"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <h2 className="text-[28px] font-normal text-gray-900 mb-8">
          Popular articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          <PopularArticleCard title="View all" slug="view-all" isViewAll={true} />
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <h2 className="text-[28px] font-normal text-gray-900 mb-8">
        Popular articles
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
        {articles.map((article) => (
          <PopularArticleCard
            key={article._id}
            title={article.title}
            description={article.content}
            slug={article.slug}
            isViewAll={false}
          />
        ))}
        <PopularArticleCard title="View all" slug="view-all" isViewAll={true} />
      </div>
    </section>
  );
};

export default PopularArticlesSection;
