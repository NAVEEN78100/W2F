import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
// import BottomNav from "../components/BottomNav";


export default function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.scrollTo(0, 0);

    fetch(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => res.json())
      .then((data) => setBlog(data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white min-h-screen"
    >
      <header className="h-[20vh] flex flex-col justify-center items-center bg-white text-center px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-2" data-aos="fade-up">
          {blog.title}
        </h1>
        <p className="text-red-500 font-medium" data-aos="fade-up" data-aos-delay="150">
          {blog.category}
        </p>
      </header>

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-10 space-y-8">
        {/* ✅ Square image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-64 h-64 object-cover rounded-xl shadow-lg mx-auto"
          data-aos="zoom-in"
        />

        {/* Full content */}
        <p className="leading-8 text-gray-800 text-lg" data-aos="fade-up">
          {blog.content}
        </p>

        <Link
          to="/blogs"
          className="inline-block mt-4 bg-[#FF3B2E] hover:bg-red-600 text-white px-5 py-3 rounded-xl transition duration-300"
          data-aos="fade-up"
        >
          ← Back to Blogs
        </Link>
        
      </div>
      {/* <BottomNav /> */}
    </motion.article>
    
  );
}
