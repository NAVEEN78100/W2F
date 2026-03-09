import { useEffect, useState } from "react";
import BrowseTopicCard from "./BrowseTopicCard";
import {
  Rocket,
  Ticket,
  Star,
  User,
  MapPin,
  Store,
  Shield,
  HelpCircle,
} from "lucide-react";
import { api, Topic } from "@/lib/api";

const iconMap = {
  Rocket,
  Ticket,
  Star,
  User,
  MapPin,
  Store,
  Shield,
  HelpCircle,
};

const BrowseTopicsSection = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      console.log("BrowseTopicsSection: Starting fetch");
      try {
        const data = await api.getPublishedTopics();
        console.log("BrowseTopicsSection: Got data", data);
        setTopics(data);
      } catch (err) {
        console.log("BrowseTopicsSection: Setting error state");
        setError("Failed to load topics");
        console.error("Error fetching topics:", err);
      } finally {
        console.log("BrowseTopicsSection: Setting loading to false");
        setLoading(false);
      }
    };

    fetchTopics().catch((err) => {
      console.error("BrowseTopicsSection: Unhandled promise rejection:", err);
      setError("Failed to load topics");
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Browse topics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-200 h-64 rounded-lg"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-semibold text-foreground mb-6">
          Browse topics
        </h2>
        <p className="text-gray-500">
          Topics will appear here when the backend is available
        </p>
      </section>
    );
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold text-foreground mb-6">
        Browse topics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
        {topics.map((topic, index) => {
          const IconComponent =
            iconMap[topic.icon as keyof typeof iconMap] || HelpCircle;
          return (
            <BrowseTopicCard
              key={topic._id}
              title={topic.title}
              icon={IconComponent}
              links={topic.quickQuestions.map(q => ({
                title: q.question,
                slug: q.slug || q.question.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')
              }))}
              viewMoreSlug={topic.slug}
            />
          );
        })}
      </div>
    </section>
  );
};

export default BrowseTopicsSection;
