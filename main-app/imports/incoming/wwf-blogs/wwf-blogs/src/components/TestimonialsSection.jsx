import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Food Blogger",
      avatar: "/woman-food-blogger.jpg",
      rating: 5,
      text: "WWF has completely transformed how I discover new restaurants. The recommendations are spot-on and I've found so many hidden gems!",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Restaurant Owner",
      avatar: "/asian-man-chef.jpg",
      rating: 5,
      text: "As a restaurant owner, WWF has helped us reach so many new customers. The platform is intuitive and the support is excellent.",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Food Enthusiast",
      avatar: "/latina-woman-smiling.jpg",
      rating: 5,
      text: "I love how easy it is to find exactly what I'm craving. The delivery is always fast and the food arrives hot and fresh!",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-red-50 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(/thanx-full_service_restaurant_guide_to_customer_engagement-hero.avif)",
        }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 min-h-screen flex flex-col justify-center">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Hear it from our clients
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join thousands of satisfied food lovers who have discovered their
            new favorite restaurants through WWF.
          </p>
        </motion.div>

        {/* Testimonials - Vertical Stack */}
        <div className="max-w-4xl mx-auto space-y-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/10"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100,
                damping: 15,
              }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-start space-x-6">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
                  />
                </div>

                {/* Content */}
                <div className="flex-1">
                  {/* Quote Icon */}
                  <Quote className="w-8 h-8 text-orange-400 mb-4" />

                  {/* Testimonial Text */}
                  <p className="text-white text-lg leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>

                  {/* User Info and Rating */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-white text-lg">
                        {testimonial.name}
                      </h4>
                      <p className="text-white/80">{testimonial.role}</p>
                    </div>

                    {/* Star Rating */}
                    <div className="flex items-center space-x-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">1M+</div>
            <div className="text-white/80">Happy Users</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">50K+</div>
            <div className="text-white/80">Restaurants</div>
          </div>
          <div className="text-center text-white">
            <div className="text-4xl font-bold mb-2">4.9★</div>
            <div className="text-white/80">Average Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
