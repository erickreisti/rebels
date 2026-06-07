"use client";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa"; // REMOVIDO FaPhone

export function Location() {
  return (
    <section id="locale" className="section bg-[#0A0608] relative min-h-screen flex flex-col justify-center w-full py-16">
      <div className="container mx-auto px-4 w-full z-10 relative">
        <div className="text-center mb-16">
          <h2 className="section-title">Where to buy</h2>
          <h3 className="section-subtitle">find our wines near you</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Map */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="bg-surface-800/80 backdrop-blur-md border border-white/5 rounded-3xl p-8 w-64 h-64 flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                <FaMapMarkerAlt className="w-24 h-24 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-accent-500 w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(245,168,24,0.4)]">
                <div className="w-8 h-8 bg-surface-900 rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="space-y-8">
              <address className="not-italic space-y-3 font-sans font-bold">
                <p className="text-2xl text-white tracking-tight">
                  93, place to Tanguy
                </p>
                <p className="text-2xl text-white tracking-tight">
                  Langlois, France
                </p>
                <p className="text-2xl text-accent-500 tracking-tight">
                  320-574-1496
                </p>{" "}
                {/* Telefone está aqui como texto */}
              </address>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-8">
                <motion.a
                  href="#"
                  className="flex items-center justify-center w-14 h-14 bg-surface-800 border border-white/10 rounded-full text-pink-400 hover:bg-pink-500/20 hover:text-pink-300 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </motion.a>

                <motion.a
                  href="#"
                  className="flex items-center justify-center w-14 h-14 bg-surface-800 border border-white/10 rounded-full text-pink-400 hover:bg-pink-500/20 hover:text-pink-300 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-6 h-6" />
                </motion.a>

                <motion.a
                  href="#"
                  className="flex items-center justify-center w-14 h-14 bg-surface-800 border border-white/10 rounded-full text-pink-400 hover:bg-pink-500/20 hover:text-pink-300 hover:border-pink-500/50 hover:shadow-[0_0_15px_rgba(236,72,153,0.3)] transition-all"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-6 h-6" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
