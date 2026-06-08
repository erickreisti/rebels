"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const reviews = [
  {
    id: "1",
    name: "Alex 'Nightrider'",
    role: "Pro Gamer",
    avatar: "https://i.pravatar.cc/150?img=11",
    rating: 5,
    text: "This is the only thing that keeps me awake during 12-hour streams. The Zero Sugar actually works and I don't feel like garbage the next day. Pure fuel.",
  },
  {
    id: "2",
    name: "Sarah J.",
    role: "Software Engineer",
    avatar: "https://i.pravatar.cc/150?img=47",
    rating: 5,
    text: "Neural Focus is no joke. I drank one before a massive deployment and I felt like I could see the matrix. The taste is incredibly sharp too.",
  },
  {
    id: "3",
    name: "Marcus T.",
    role: "DJ / Producer",
    avatar: "https://i.pravatar.cc/150?img=33",
    rating: 5,
    text: "Replaced my usual pre-set drink. Extreme Taurine gives me a ridiculous kick that lasts the whole set. Plus, the can looks sick on the decks.",
  },
  {
    id: "4",
    name: "Zoe Blade",
    role: "Cyber Athlete",
    avatar: "https://i.pravatar.cc/150?img=12",
    rating: 5,
    text: "Tastes like battery acid in the best way possible. 10/10 would drink before a street race again.",
  }
];

export function Drops() {
  return (
    <section id="blog" className="section bg-neutral-900 relative w-full py-24 border-y-4 border-black">
      <div className="container mx-auto px-4 w-full">
        {/* Title */}
        <div className="mb-16 border-b-4 border-white/20 pb-8">
          <h2 className="text-5xl md:text-7xl font-sans font-black text-white uppercase tracking-tighter drop-shadow-[4px_4px_0px_#ec4899]">
            The Cult
          </h2>
          <h3 className="text-xl md:text-2xl font-sans font-black text-black bg-white inline-block px-4 py-2 shadow-[4px_4px_0px_#fff] transform -rotate-1 mt-6 uppercase tracking-widest">
            What the elite says
          </h3>
        </div>

        {/* Clean Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-black text-white p-8 border-4 border-white shadow-[8px_8px_0px_#222] hover:shadow-[8px_8px_0px_#ec4899] transition-shadow flex flex-col"
            >
              <div className="flex gap-1 mb-6 text-cyan-400">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="font-sans font-bold text-xl leading-relaxed mb-8 flex-1">
                "{review.text}"
              </p>

              <div className="flex items-center space-x-4 border-t-4 border-white/20 pt-6">
                <Image
                  src={review.avatar}
                  alt={review.name}
                  width={56}
                  height={56}
                  unoptimized
                  className="w-14 h-14 rounded-full border-2 border-white grayscale"
                />
                <div>
                  <h4 className="font-sans font-black text-xl uppercase">
                    {review.name}
                  </h4>
                  <p className="text-white/60 font-sans font-bold text-sm uppercase tracking-widest">{review.role}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
