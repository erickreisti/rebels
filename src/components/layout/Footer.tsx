"use client";
import { motion } from "framer-motion";
import { FiDroplet } from "react-icons/fi"; // FiDroplet no lugar de FiWine

export function Footer() {
  return (
    <footer className="bg-[#050304] text-gray-400 py-16 border-t border-white/5 relative overflow-hidden">
      {/* Footer subtle glow */}
      <div className="absolute bottom-0 left-1/2 w-[800px] h-[400px] bg-pink-500 rounded-full blur-[200px] opacity-[0.03] mix-blend-screen -translate-x-1/2 pointer-events-none" />
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6">
          <motion.a
            href="#"
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-baseline font-sans font-black tracking-tighter text-3xl">
              <span className="text-accent-500">R</span>
              <span className="text-white -ml-1 opacity-90">E</span>
              <span className="text-purple-500 text-4xl -ml-1 leading-none">.</span>
            </div>
          </motion.a>

          <motion.p
            className="text-center text-gray-600 font-sans text-sm"
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
