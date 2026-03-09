import { useState } from "react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", { email, country });
  };

  return (
    <section className="bg-[#1E2E3A] py-16 md:py-20">
      <div className="max-w-[1320px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left side - Text */}
          <div>
            <h2 className="text-[24px] md:text-[28px] font-normal text-[#FFFFFF] mb-3 leading-tight">
              Get the latest updates from Wander With Food.
            </h2>
            <p className="text-[15px] text-[#FFFFFF] leading-relaxed">
              Provide your email address to receive the latest updates from
              Wander With Food, including news, offers, and product updates.
            </p>
          </div>

          {/* Right side - Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="flex-1 h-12 px-4 bg-[#FFFFFF] border border-[#CCD0D5] rounded-lg text-[#1C1E21] placeholder:text-[#8A8D91] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all text-[15px]"
                  required
                />
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Enter a country name..."
                  className="flex-1 h-12 px-4 bg-[#FFFFFF] border border-[#CCD0D5] rounded-lg text-[#1C1E21] placeholder:text-[#8A8D91] focus:outline-none focus:ring-2 focus:ring-[#1877F2] focus:border-transparent transition-all text-[15px]"
                />
              </div>

              <p className="text-[12px] text-[#FFFFFF] leading-relaxed">
                By submitting this form, you agree to receive marketing related
                electronic communications from Wander With Food, including news,
                events, updates and promotional emails. You may withdraw your
                consent and unsubscribe from these at any time, for example, by
                clicking the unsubscribe link included in our emails. For more
                information about how WWF handles your data, please read our{" "}
                <a
                  href="#"
                  className="text-[#FFFFFF] hover:text-[#FFFFFF] hover:underline"
                >
                  Data Policy
                </a>
                .
              </p>

              <button
                type="submit"
                className="px-7 py-3 bg-[#1877F2] text-[#FFFFFF] text-[15px] font-medium rounded-full hover:bg-[#166FE5] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr className="mt-8 border-[#9AA7B2] opacity-30" />
    </section>
  );
};

export default NewsletterSection;
