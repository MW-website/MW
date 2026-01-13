// /* eslint-disable */
// import React from "react";
// import "./Flipcard.css";
// import FlipCard from "./FlipCard";
// import { motion } from "framer-motion";
// import temii from "./temii.jpeg";

// export default function AboutPage() {
//   return (
//     <section
//       id="About"
//       className="w-full py-20 px-6 bg-[#f9f4ee]"
//     >
//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.7 }}
//         className="max-w-6xl mx-auto bg-[#fffaf5] rounded-3xl shadow-xl p-10 md:p-16 backdrop-blur-sm border border-[#f3e9df]"
//       >

//         {/* TOP SECTION */}
//         <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
//           <div className="md:col-span-7 space-y-6">
//             <p className="text-sm text-[#c8a889] font-semibold tracking-widest">
//               Meet Temi
//             </p>

//             <h2 className="text-4xl md:text-5xl font-extrabold text-[#3b2f2a]">
//               Meet Temi <span className="text-[#3b2f2a]">{" "}</span>
//             </h2>

//             <span className="text-xl bg-clip-text bg-gradient-to-r from-[#d3b08a] via-[#eac9ac] to-[#f5e7d7]">
//               {/* Sub text here */}
//             </span>
//           </div>

//           <div className="md:col-span-5">
//             <img src={temii} alt="Temi" className="rounded-xl shadow-lg" />
//           </div>
//         </div>

//         {/* FLIP CARDS */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <FlipCard title="Card 1" description="Description 1" />
//           <FlipCard title="Card 2" description="Description 2" />
//           <FlipCard title="Card 3" description="Description 3" />
//           <FlipCard title="Card 4" description="Description 4" />
//         </div>

//       </motion.div>
//     </section>
//   );
// }
