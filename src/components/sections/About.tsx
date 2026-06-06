"use client";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import aboutPreview from "../../assets/images/about-preview.png";

export function About() {
  return (
    <section id="about" className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 bg-primary-200 rounded-3xl transform -rotate-3 scale-105"></div>
            <img
              src={aboutPreview.src}
              alt="Our Wine Making Process"
              className="rounded-2xl shadow-2xl w-full" // REMOVIDO: object-cover h-96
            />
            <div className="absolute -bottom-6 -right-6 bg-primary-500 w-24 h-24 rounded-full opacity-20"></div>
          </motion.div>

          {/* Content - LADO DIREITO */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="text-center lg:text-left">
              <h2 className="section-title">About Us</h2>
              <h3 className="section-subtitle">the beginning of our passion</h3>

              <p className="text-lg text-primary-600 mb-8 leading-relaxed">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries. But also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing.
              </p>

              <motion.a
                href="#contact"
                className="btn-secondary inline-flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Contact Us</span>
                <FiChevronDown />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
