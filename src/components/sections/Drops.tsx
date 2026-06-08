"use client";
import { motion } from "framer-motion";

const blogPosts = [
  {
    id: "1",
    title: "How to introduce wine to parties",
    author: {
      name: "Helen Page",
      role: "Event Promoter",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=1000&auto=format&fit=crop",
    excerpt:
      "Learn the best techniques to make wine the star of your next party...",
  },
  {
    id: "2",
    title: "Can chocolate? he can!",
    author: {
      name: "Zlatan Hammet",
      role: "Product Designer",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    excerpt:
      "Discover the perfect wine and chocolate pairings that will elevate your experience...",
  },
];

export function Drops() {
  return (
    <section id="blog" className="section bg-cyan-400 relative overflow-hidden min-h-screen flex flex-col justify-center w-full py-24 border-y-4 border-black">
      {/* Background glitch effect */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
      
      <div className="container mx-auto px-4 w-full relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-6xl md:text-8xl font-sans font-black text-black uppercase tracking-tighter drop-shadow-[4px_4px_0px_#fff]">Drops</h2>
          <h3 className="text-2xl md:text-4xl font-sans font-bold text-black border-2 border-black bg-accent-500 inline-block px-4 py-2 shadow-[4px_4px_0px_#000] transform -rotate-2 mt-4">news and curiosities</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-white rounded-none overflow-hidden border-4 border-black shadow-[12px_12px_0px_#000] hover:shadow-[16px_16px_0px_#000] transition-all cursor-pointer group"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, x: -4 }}
            >
              <div className="pt-8"></div>

              {/* Author */}
              <div className="flex items-center space-x-4 px-8 py-4">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-black shadow-[4px_4px_0px_#000]"
                />
                <div>
                  <h4 className="font-sans font-black tracking-tight text-black text-xl">
                    {post.author.name}
                  </h4>
                  <p className="text-pink-500 font-sans font-bold text-sm uppercase tracking-wider">{post.author.role}</p>
                </div>
              </div>

              {/* Image - IMAGEM CENTRAL */}
              <div className="px-4 pb-4">
                <div className="border-4 border-black overflow-hidden relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                </div>
              </div>

              {/* Content */}
              <div className="px-8 pb-8 pt-4">
                <h3 className="text-3xl font-sans font-black text-black mb-3 tracking-tighter uppercase leading-none">
                  {post.title}
                </h3>
                <p className="text-black font-medium font-sans leading-relaxed text-lg border-t-4 border-black pt-4">{post.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
