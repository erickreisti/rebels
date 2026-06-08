"use client";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaDiscord, FaTwitch, FaTwitter, FaTicketAlt } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

export function Stockists() {
  const { addToCart, toggleCart } = useCart();

  const events = [
    {
      id: "ev-1",
      eventName: "Neon Vault",
      date: "OCT 31 - 23:00",
      location: "Sector 7, Neo-Tokyo",
      price: 45.00,
      color: "#ec4899" // Pink
    },
    {
      id: "ev-2",
      eventName: "Cyber District",
      date: "NOV 15 - 22:00",
      location: "The Grid, Level 42",
      price: 60.00,
      color: "#22d3ee" // Cyan
    }
  ];

  return (
    <section id="locale" className="section bg-black relative w-full py-24 border-y-4 border-white">
      <div className="container mx-auto px-4 w-full">
        {/* Title */}
        <div className="mb-16 border-b-4 border-white/20 pb-8">
          <h2 className="text-5xl md:text-7xl font-sans font-black text-white uppercase tracking-tighter drop-shadow-[4px_4px_0px_#f5a818]">
            Upcoming Events
          </h2>
          <h3 className="text-xl md:text-2xl font-sans font-black text-black bg-white inline-block px-4 py-2 shadow-[4px_4px_0px_#fff] transform rotate-1 mt-6 uppercase tracking-widest">
            Secure your access pass
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Events Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="not-italic space-y-8 font-sans font-black uppercase text-white">
              {events.map((ev) => (
                <div key={ev.id} className="bg-neutral-900 border-4 border-white p-6 md:p-8 transition-all transform hover:-translate-y-1" style={{ boxShadow: `8px 8px 0px ${ev.color}` }}>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                      <span className="text-lg tracking-widest block mb-2" style={{ color: ev.color }}>{ev.date}</span>
                      <p className="text-4xl md:text-5xl leading-none">{ev.eventName}</p>
                    </div>
                    <span className="text-4xl font-black md:text-right" style={{ color: ev.color }}>${ev.price.toFixed(2)}</span>
                  </div>
                  
                  <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-t-2 border-white/10 pt-6">
                    <div className="flex items-center space-x-2 text-white/60 text-sm">
                      <FaMapMarkerAlt /> <span>{ev.location}</span>
                    </div>
                    
                    <button 
                      onClick={() => {
                        addToCart({
                          id: ev.id,
                          eventName: ev.eventName,
                          date: ev.date,
                          location: ev.location,
                          price: ev.price,
                          quantity: 1
                        });
                        toggleCart(true);
                      }}
                      className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 border-2 border-black shadow-[4px_4px_0px_#000] hover:shadow-[0px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 transition-all w-full md:w-auto"
                    >
                      <FaTicketAlt /> Get Ticket
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
