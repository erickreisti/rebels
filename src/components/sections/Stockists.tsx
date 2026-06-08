"use client";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa"; // REMOVIDO FaPhone

export function Stockists() {
  return (
    <section id="locale" className="section bg-primary-100 relative min-h-screen flex flex-col justify-center w-full py-24 border-y-4 border-black">
      <div className="container mx-auto px-4 w-full z-10 relative">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-sans font-black text-black uppercase tracking-tighter drop-shadow-[4px_4px_0px_#db2777]">Stockists</h2>
          <h3 className="text-2xl md:text-4xl font-sans font-bold text-white border-2 border-black bg-black inline-block px-4 py-2 shadow-[4px_4px_0px_#db2777] transform rotate-1 mt-4">find our wines near you</h3>
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
              <div className="bg-white border-4 border-black p-8 w-64 h-64 flex items-center justify-center shadow-[16px_16px_0px_#000] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <FaMapMarkerAlt className="w-24 h-24 text-pink-500 drop-shadow-[4px_4px_0px_#000]" />
              </div>
              <div className="absolute -bottom-8 -right-8 bg-accent-500 w-24 h-24 border-4 border-black rounded-full flex items-center justify-center shadow-[8px_8px_0px_#000] z-20">
                <div className="w-8 h-8 bg-black rounded-full animate-pulse"></div>
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
            <div className="space-y-8 bg-white border-4 border-black p-8 shadow-[12px_12px_0px_#000]">
              <address className="not-italic space-y-3 font-sans font-black uppercase tracking-tighter">
                <p className="text-3xl text-black">
                  93, place to Tanguy
                </p>
                <p className="text-3xl text-black">
                  Langlois, France
                </p>
                <p className="text-3xl text-pink-500 bg-black inline-block px-2">
                  320-574-1496
                </p>
              </address>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-8 border-t-4 border-black mt-8">
                <motion.a
                  href="#"
                  className="flex items-center justify-center w-16 h-16 bg-accent-500 border-4 border-black text-black hover:bg-white shadow-[6px_6px_0px_#000] hover:shadow-[0px_0px_0px_#000] hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-8 h-8" />
                </motion.a>

                <motion.a
                  href="#"
                  className="flex items-center justify-center w-16 h-16 bg-pink-500 border-4 border-black text-black hover:bg-white shadow-[6px_6px_0px_#000] hover:shadow-[0px_0px_0px_#000] hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-8 h-8" />
                </motion.a>

                <motion.a
                  href="#"
                  className="flex items-center justify-center w-16 h-16 bg-cyan-400 border-4 border-black text-black hover:bg-white shadow-[6px_6px_0px_#000] hover:shadow-[0px_0px_0px_#000] hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-8 h-8" />
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
