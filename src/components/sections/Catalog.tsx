"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import redWine from "../../assets/images/redwine-preview.png";

const wineTypes = [
  { id: "rose", name: "Rosé Wine" },
  { id: "white", name: "White Wine" },
  { id: "red", name: "Red Wine" },
  { id: "sparkling", name: "Sparkling Wine" },
];

const wines = [
  {
    id: "1",
    name: "Wine Bottle Mockup",
    type: "rose",
    description:
      "Rosé is best enjoyed a year or two after bottling so the essence of fresh, fruity flavors remains just that—fresh!",
    region: "France, Provance",
    alcohol: "18%",
    pairing: "Cheese and light appetizers",
    image: redWine,
  },
];

export function Catalog() {
  const [activeTab, setActiveTab] = useState("rose");

  return (
    <section id="catalog" className="section bg-primary-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title">Catalog</h2>
          <h3 className="section-subtitle">explore our wine collection</h3>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {wineTypes.map((type) => (
            <motion.button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === type.id
                  ? "bg-primary-600 text-white shadow-lg"
                  : "bg-white text-primary-600 hover:bg-primary-100"
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {type.name}
            </motion.button>
          ))}
        </div>

        {/* Wine Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {wines
            .filter((wine) => wine.type === activeTab)
            .map((wine) => (
              <motion.div
                key={wine.id}
                className="bg-white rounded-2xl p-8 shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Imagem 100% do tamanho do card e centralizada */}
                  <div className="flex items-center justify-center">
                    <div className="relative w-full">
                      {" "}
                      {/* 100% width */}
                      <img
                        src={wine.image.src}
                        alt={wine.name}
                        className="w-full h-80 object-contain rounded-lg" // Aumentado: h-80
                      />
                      <div className="absolute -top-4 -right-4 bg-accent-500 text-white px-4 py-2 rounded-full font-bold">
                        NEW
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-title font-bold text-primary-700 mb-2">
                        {wine.name}
                      </h3>
                      <div className="w-16 h-1 bg-primary-500 rounded-full"></div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-primary-600">
                        <span className="font-semibold text-primary-700">
                          Description:
                        </span>{" "}
                        {wine.description}
                      </p>
                      <p className="text-primary-600">
                        <span className="font-semibold text-primary-700">
                          Region:
                        </span>{" "}
                        {wine.region}
                      </p>
                      <p className="text-primary-600">
                        <span className="font-semibold text-primary-700">
                          Alcohol content:
                        </span>{" "}
                        {wine.alcohol}
                      </p>
                      <p className="text-primary-600">
                        <span className="font-semibold text-primary-700">
                          Taste with:
                        </span>{" "}
                        {wine.pairing}
                      </p>
                    </div>

                    <motion.button
                      className="btn-primary w-full"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
}
