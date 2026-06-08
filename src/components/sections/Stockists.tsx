"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaDiscord, FaTwitch, FaTwitter } from "react-icons/fa";

export function Stockists() {
  return (
    <section id="locale" className="section bg-black relative w-full py-24 border-y-4 border-white">
      <div className="container mx-auto px-4 w-full">
        {/* Title */}
        <div className="mb-16 border-b-4 border-white/20 pb-8">
          <h2 className="text-5xl md:text-7xl font-sans font-black text-white uppercase tracking-tighter drop-shadow-[4px_4px_0px_#f5a818]">
            Supply Drops
          </h2>
          <h3 className="text-xl md:text-2xl font-sans font-black text-black bg-white inline-block px-4 py-2 shadow-[4px_4px_0px_#fff] transform rotate-1 mt-6 uppercase tracking-widest">
            Find your nearest dealer
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Location Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <address className="not-italic space-y-8 font-sans font-black uppercase text-white">
              <div className="bg-neutral-900 border-4 border-white p-8 shadow-[8px_8px_0px_#ec4899] hover:shadow-[12px_12px_0px_#ec4899] transition-all transform hover:-translate-y-1">
                <span className="text-pink-500 text-lg tracking-widest block mb-2">HQ / Main Drop</span>
                <p className="text-4xl md:text-5xl leading-none">Sector 7, Neo-Tokyo</p>
                <div className="mt-6 flex items-center space-x-2 text-white/60 text-sm">
                  <FaMapMarkerAlt /> <span>Offline / Invite Only</span>
                </div>
              </div>
              
              <div className="bg-neutral-900 border-4 border-white p-8 shadow-[8px_8px_0px_#22d3ee] hover:shadow-[12px_12px_0px_#22d3ee] transition-all transform hover:-translate-y-1">
                <span className="text-cyan-400 text-lg tracking-widest block mb-2">Underground Vault</span>
                <p className="text-4xl md:text-5xl leading-none">The Grid, Level 42</p>
                <div className="mt-6 flex items-center space-x-2 text-white/60 text-sm">
                  <FaMapMarkerAlt /> <span>Requires Access Code</span>
                </div>
              </div>
            </address>
          </motion.div>

          {/* Comms & Socials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:pl-12 border-l-0 lg:border-l-4 border-white/20 pt-12 lg:pt-0"
          >
            <div className="mb-12">
              <h4 className="font-sans font-black uppercase text-2xl tracking-widest mb-6 text-pink-500">Comms Channel</h4>
              <p className="font-sans text-2xl text-black bg-accent-500 inline-block px-6 py-4 border-4 border-white shadow-[6px_6px_0px_#fff] font-black transform -rotate-1 hover:rotate-0 transition-transform">
                +99 (0) 800-CYBER
              </p>
            </div>

            <div>
              <h4 className="font-sans font-black uppercase text-2xl tracking-widest mb-6 text-cyan-400">Network</h4>
              <div className="flex flex-wrap gap-4">
                <a href="#" className="flex items-center justify-center w-16 h-16 bg-black border-4 border-white text-white hover:bg-pink-500 hover:text-black hover:border-pink-500 shadow-[4px_4px_0px_#fff] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <FaTwitch className="w-8 h-8" />
                </a>
                <a href="#" className="flex items-center justify-center w-16 h-16 bg-black border-4 border-white text-white hover:bg-cyan-400 hover:text-black hover:border-cyan-400 shadow-[4px_4px_0px_#fff] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <FaTwitter className="w-8 h-8" />
                </a>
                <a href="#" className="flex items-center justify-center w-16 h-16 bg-black border-4 border-white text-white hover:bg-accent-500 hover:text-black hover:border-accent-500 shadow-[4px_4px_0px_#fff] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  <FaDiscord className="w-8 h-8" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
