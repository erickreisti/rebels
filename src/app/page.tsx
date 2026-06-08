"use client";
import { useState, useRef } from "react";
import { Header } from "../components/layout/Header";
import { Hero } from "../components/sections/Hero";
import { TheVibe } from "../components/sections/TheVibe";
import { RebelScrollCan } from "../components/layout/RebelScrollCan";
import { TheLineup } from "../components/sections/TheLineup";
import { MarqueeDivider } from "../components/ui/MarqueeDivider";
import { Formula } from "../components/sections/Formula";
import { Drops } from "../components/sections/Drops";
import { Stockists } from "../components/sections/Stockists";
import { Footer } from "../components/layout/Footer";

import { motion } from "framer-motion";
// Novos componentes
import { AudioVisualizer } from "../components/ui/AudioVisualizer";
import { useCart } from "../context/CartContext";
import { TheManifesto } from "../components/sections/TheManifesto";
export default function Home() {
  const { toggleCart } = useCart();

  // Estado para Áudio
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);



  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-primary-100 relative">
      {/* Elemento de Áudio Oculto */}
      <audio ref={audioRef} loop src="https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3" />

      <Header />
      <main>
        <RebelScrollCan>
          <Hero />
          <MarqueeDivider />
          <TheVibe />
        </RebelScrollCan>
        <TheLineup />
        <Formula />
        {/* Nova Seção: The Manifesto */}
        <TheManifesto />

        <Drops />
        <Stockists />
      </main>
      <Footer />

    </div>
  );
}
