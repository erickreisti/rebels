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
    <section id="locale" className="section bg-primary-50">
      <div className="container mx-auto px-4">
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
              <div className="bg-primary-200 rounded-2xl p-8 w-64 h-64 flex items-center justify-center">
                <FaMapMarkerAlt className="w-24 h-24 text-primary-500" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-accent-500 w-16 h-16 rounded-full flex items-center justify-center">
                <div className="w-8 h-8 bg-white rounded-full"></div>
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
              <address className="not-italic space-y-3">
                <p className="text-2xl font-title text-primary-700">
                  93, place to Tanguy
                </p>
                <p className="text-2xl font-title text-primary-700">
                  Langlois, France
                </p>
                <p className="text-2xl font-title text-primary-700">
                  320-574-1496
                </p>{" "}
                {/* Telefone está aqui como texto */}
              </address>

              <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-8">
                <motion.a
                  href="#"
                  className="flex items-center justify-center w-14 h-14 bg-primary-200 rounded-full text-primary-600 hover:bg-primary-300 transition-colors"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </motion.a>

                <motion.a
                  href="#"
                  className="flex items-center justify-center w-14 h-14 bg-primary-200 rounded-full text-primary-600 hover:bg-primary-300 transition-colors"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Twitter"
                >
                  <FaTwitter className="w-6 h-6" />
                </motion.a>

                <motion.a
                  href="#"
                  className="flex items-center justify-center w-14 h-14 bg-primary-200 rounded-full text-primary-600 hover:bg-primary-300 transition-colors"
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
