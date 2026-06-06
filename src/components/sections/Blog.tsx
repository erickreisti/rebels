"use client";
import { motion } from "framer-motion";
import avatar1 from "../../assets/images/avatar-1.jpg";
import avatar2 from "../../assets/images/avatar-2.jpg";
import blog1 from "../../assets/images/blog-1.jpg";
import blog2 from "../../assets/images/blog-2.jpg";
import aspas from "../../assets/images/aspas.svg"; // IMPORTAÇÃO DAS ASPAS

const blogPosts = [
  {
    id: "1",
    title: "How to introduce wine to parties",
    author: {
      name: "Helen Page",
      role: "Event Promoter",
      avatar: avatar1,
    },
    image: blog1,
    excerpt:
      "Learn the best techniques to make wine the star of your next party...",
  },
  {
    id: "2",
    title: "Can chocolate? he can!",
    author: {
      name: "Zlatan Hammet",
      role: "Product Designer",
      avatar: avatar2,
    },
    image: blog2,
    excerpt:
      "Discover the perfect wine and chocolate pairings that will elevate your experience...",
  },
];

export function Blog() {
  return (
    <section id="blog" className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Blog</h2>
          <h3 className="section-subtitle">news and curiosities</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              className="bg-primary-50 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Quote Marks - ASPAS.SVG */}
              <div className="flex justify-between px-8 pt-8">
                <img
                  src={aspas.src} // ASPAS.SVG NO LADO ESQUERDO
                  alt=""
                  className="w-8 h-8"
                />
                <img
                  src={aspas.src} // ASPAS.SVG NO LADO DIREITO (ROTACIONADA)
                  alt=""
                  className="w-8 h-8 transform rotate-180"
                />
              </div>

              {/* Author */}
              <div className="flex items-center space-x-4 px-8 py-4">
                <img
                  src={post.author.avatar.src}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-white shadow"
                />
                <div>
                  <h4 className="font-title font-bold text-primary-700">
                    {post.author.name}
                  </h4>
                  <p className="text-primary-500">{post.author.role}</p>
                </div>
              </div>

              {/* Image - IMAGEM CENTRAL */}
              <div className="px-4 pb-4">
                <img
                  src={post.image.src}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="px-8 pb-8">
                <h3 className="text-xl font-title font-bold text-primary-700 mb-3">
                  {post.title}
                </h3>
                <p className="text-primary-600">{post.excerpt}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
