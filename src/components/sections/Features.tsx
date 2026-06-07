"use client";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import backgroundMarbled from "../../assets/images/background-marbled.webp";
import premium from "../../assets/images/premium.png";
import rosewinePreview from "../../assets/images/rosewine-preview.png";

export function Features() {
  return (
    <section id="features" className="section bg-surface-950 relative min-h-screen flex flex-col justify-center w-full py-16">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${backgroundMarbled.src})` }}
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Info */}
          <motion.div
            className="bg-surface-800/60 backdrop-blur-xl rounded-2xl p-8 shadow-[0_0_30px_rgba(236,72,153,0.15)] border border-pink-500/20"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-sans font-black text-white mb-6 border-b-4 border-accent-500 pb-4 inline-block tracking-tight">
              New Classic Wine Available!
            </h3>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed font-sans">
              Try this classic from our best vintage!
              <br />
              <br />
              This is a tasty petit château made with a blend of 60% Cabernet
              Sauvignon and 40% Merlot, making it even better when accompanied
              by red meat, pasta and cheese.
            </p>

            <motion.a
              href="#"
              className="btn-accent inline-flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get It Now!</span>
              <FiChevronDown />
            </motion.a>
          </motion.div>

          {/* Product */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Rating */}
            <div className="flex flex-col items-center mb-8">
              <span className="text-xl font-sans font-black text-pink-400 mb-2 uppercase tracking-wider">
                Rating:
              </span>
              <div className="flex items-center space-x-2">
                {[...Array(4)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-8 h-8 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <svg
                  className="w-8 h-8 text-surface-700"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-lg font-black text-white font-sans">
                  <span className="text-3xl text-accent-500">4</span>/5
                </span>
              </div>
            </div>

            {/* Wine Image - COM NOVAS IMAGENS */}
            <div className="relative inline-block">
              <motion.div
                className="relative"
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={rosewinePreview.src} // ALTERADO: rosewine-preview.png
                  alt="Premium Rose Wine"
                  className="w-full h-96 object-contain mx-auto"
                />
              </motion.div>
              <div className="absolute -top-4 -left-4">
                <img
                  src={premium.src} // ALTERADO: premium.png
                  alt="Premium Seal"
                  className="w-20 h-20 object-contain"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
