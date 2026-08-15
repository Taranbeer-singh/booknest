import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import bannerImg from "../../assets/banner.png";

const Banner = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    setSubscribed(true);

    setTimeout(() => {
      setSubscribed(false);
    }, 2000);
  };

  return (
    <section className="relative overflow-hidden max-w-7xl mx-auto mt-8 mb-12 rounded-2xl bg-gradient-to-br from-[#020817] via-[#071a3d] to-[#0b2557] shadow-2xl">
      
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        <div className="absolute top-10 right-10 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]" />
        <div className="absolute bottom-20 left-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_15px_5px_rgba(59,130,246,0.5)]" />

        <div className="absolute right-[35%] top-1/2 w-[450px] h-[450px] border border-blue-500/20 rounded-full" />
        <div className="absolute right-[32%] top-[15%] w-[350px] h-[350px] border border-blue-400/10 rounded-full" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center min-h-[480px] px-8 md:px-12 lg:px-16 py-12">

        {/* LEFT SIDE */}
        <motion.div
          className="w-full md:w-1/2 text-white"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >

          {/* Small Badge */}
          <motion.div
            className="inline-flex items-center gap-2 border border-blue-500/50 bg-blue-500/10 text-blue-400 px-4 py-2 rounded-full text-sm font-medium mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            ✨ Fresh arrivals every week
          </motion.div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white transition-all duration-300 hover:text-blue-100 hover:drop-shadow-[0_0_12px_rgba(147,197,253,0.25)]">
  New Releases
  <br />
  <span className="text-blue-500 transition-all duration-300 hover:text-blue-400 hover:drop-shadow-[0_0_12px_rgba(59,130,246,0.5)]">
    This Week
  </span>
</h1>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mb-8">
            Discover the latest books, unforgettable stories, and exciting
            new releases. Find your next favourite book and make your reading
            list even better.
          </p>

          {/* Button + Status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">

            <motion.button
              onClick={handleSubscribe}
              className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg shadow-lg shadow-blue-600/30 transition-all duration-300 cursor-pointer"
              whileHover={{
                scale: 1.05,
                boxShadow: "0px 10px 30px rgba(37,99,235,0.4)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe for Updates →
            </motion.button>

            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full shadow-[0_0_10px_3px_rgba(74,222,128,0.4)]" />
              New books added regularly
            </div>

          </div>
        </motion.div>

        {/* RIGHT SIDE - BOOK IMAGE */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center md:justify-end items-center mt-10 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >

          <motion.img
            src={bannerImg}
            alt="Featured books"
            className="w-full max-w-[520px] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]"
            whileHover={{
              scale: 1.03,
              y: -5,
            }}
            transition={{
              type: "spring",
              stiffness: 150,
            }}
          />

        </motion.div>

      </div>

      {/* Subscribe Success Message */}
      <AnimatePresence>
        {subscribed && (
          <motion.div
            className="absolute top-5 right-5 z-50 bg-white text-gray-800 px-5 py-3 rounded-lg shadow-xl flex items-center gap-2 font-medium"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <span className="text-green-500">✓</span>
            Successfully Subscribed!
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Banner;