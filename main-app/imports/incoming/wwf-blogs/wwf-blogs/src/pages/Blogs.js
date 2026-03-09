import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
// import BottomNav from "../components/BottomNav";
import TestimonialsSection from "../components/TestimonialsSection";
import CallToActionFooter from "../components/CallToActionFooter";
import WWFSection from "../components/WWFSection";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    AOS.init({ duration: 600, once: true });
    window.scrollTo(0, 0);

    fetch("http://localhost:5000/api/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredBlogs =
    filter === "All" ? blogs : blogs.filter((b) => b.category === filter);

  return (
    <div className="bg-[#FF3B2E] min-h-screen flex flex-col">
      {/* Header */}
      <section className="h-[40vh] flex flex-col justify-end px-6 md:px-12 lg:px-16 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-white w-full gap-4">
          {/* Left: BLOGS heading */}
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight">
            BLOGS
          </h1>

          {/* Right: Description text (3 lines) */}
          <p className="max-w-md text-base md:text-xl leading-relaxed">
            Stay updated with Wander With Food News! <br />
            You can now dive beyond the aprons and know the culinary kings of your town <br />
            or explore the trending dishes every week. Don't miss out!
          </p>
        </div>
      </section>

      {/* Gap between header and white container */}
      <div className="h-8"></div>

      {/* White Container */}
      <div className="bg-white rounded-t-2xl shadow-lg mx-3 md:mx-6 lg:mx-12 mt-55 p-8 md:p-12 flex-1">
        
        {/* Top Left Heading */}
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-black">
            Dive Into The Scenes Beyond Aprons
          </h2>
        </div>

        {/* Dropdown */}
        <div className="flex justify-end mb-10">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-[#FF3B2E]"
          >
            <option value="All">All</option>
            <option value="Latest">Latest</option>
            <option value="Star Dines">Star Dines</option>
            <option value="Home Bakers">Home Bakers</option>
          </select>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredBlogs.map((blog, i) => (
            <Link
              to={`/blogs/${blog._id}`}
              key={blog._id}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-5">
                <span className="text-sm font-semibold text-[#FF3B2E]">
                  {blog.category}
                </span>
                <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex-shrink-0 h-12"></div>
      {/* <TestimonialsSection /> */}
            <CallToActionFooter />
            <WWFSection />
      {/* <BottomNav /> */}
    </div>
  );
}
