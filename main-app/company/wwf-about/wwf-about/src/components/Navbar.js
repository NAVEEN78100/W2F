// /import { Link } from "react-router-dom";
// import { useState } from "react";

// export default function Navbar() {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <nav className="bg-wwf-gradient px-6 py-4 font-poppins sticky top-0 z-50">
//       <div className="flex justify-between items-center">
//         {/* Logo */}
//         <Link
//           to="/"
//           className="text-white font-bold text-xl hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition duration-300"
//         >
//           WWF
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center space-x-6">
//           <Link
//             to="/"
//             className="text-white font-semibold hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition duration-300"
//           >
//             Home
//           </Link>
//           <Link
//             to="/explore"
//             className="text-white font-semibold hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition duration-300"
//           >
//             Explore
//           </Link>

//           {/* Company Dropdown */}
//           <div
//             className="relative"
//             onMouseEnter={() => setDropdownOpen(true)}
//             onMouseLeave={() => setDropdownOpen(false)}
//           >
//             <button className="text-white font-semibold flex items-center gap-1 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] transition duration-300">
//               Company
//               <span
//                 className={`transform transition-transform duration-300 ${
//                   dropdownOpen ? "rotate-180" : ""
//                 }`}
//               >
//                 ▼
//               </span>
//             </button>

//             {/* Dropdown Menu */}
//             <div
//               className={`absolute bg-white shadow-lg rounded-lg mt-2 w-48 font-poppins overflow-hidden transition-all duration-300 ease-in-out ${
//                 dropdownOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
//               }`}
//             >
//               {[
//                 { name: "About Us", link: "/about-us" },
//                 { name: "Blogs", link: "/blogs" },
//                 { name: "Partner with Us", link: "#" },
//                 { name: "Enquire", link: "#" },
//               ].map((item, index) => (
//                 <Link
//                   key={index}
//                   to={item.link}
//                   className="block px-4 py-2 hover:bg-wwfYellow1 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,216,0,0.9)] transition duration-300"
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Mobile Hamburger */}
//         <button
//           className="md:hidden text-white text-2xl focus:outline-none"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         >
//           {mobileMenuOpen ? "✖" : "☰"}
//         </button>
//       </div>

//       {/* Mobile Menu Items */}
//       {mobileMenuOpen && (
//         <div className="md:hidden mt-4 space-y-4 bg-white p-4 rounded-lg shadow-lg">
//           <Link
//             to="/"
//             className="block text-gray-800 font-semibold hover:bg-wwfYellow1 hover:text-white rounded-lg px-4 py-2"
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Home
//           </Link>
//           <Link
//             to="/explore"
//             className="block text-gray-800 font-semibold hover:bg-wwfYellow1 hover:text-white rounded-lg px-4 py-2"
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Explore
//           </Link>

//           {/* Mobile Company Dropdown */}
//           <details>
//             <summary className="cursor-pointer text-gray-800 font-semibold px-4 py-2 rounded-lg hover:bg-wwfYellow1 hover:text-white">
//               Company
//             </summary>
//             <div className="pl-6 space-y-2 mt-2">
//               {[
//                 { name: "About Us", link: "/about-us" },
//                 { name: "Blogs", link: "/blogs" },
//                 { name: "Partner with Us", link: "#" },
//                 { name: "Enquire", link: "#" },
//               ].map((item, index) => (
//                 <Link
//                   key={index}
//                   to={item.link}
//                   className="block text-gray-800 hover:underline"
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
//           </details>
//         </div>
//       )}
//     </nav>
//   );
// }
