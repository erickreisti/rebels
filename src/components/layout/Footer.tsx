"use client";
import { motion } from "framer-motion";
import { FiDroplet } from "react-icons/fi"; // FiDroplet no lugar de FiWine

export function Footer() {
  return (
    <footer className="bg-primary-700 text-primary-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <motion.a
            href="#"
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <FiDroplet className="h-10 w-10" /> {/* CORRIGIDO */}
            <span className="text-2xl font-title font-bold">Wine for Life</span>
          </motion.a>

          <motion.p
            className="text-center text-primary-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            © Copyright {new Date().getFullYear()} by Érick Reis
          </motion.p>
        </div>
      </div>
    </footer>
  );
}
