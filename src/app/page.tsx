"use client";
import { useState, useRef } from "react";
import { Header } from "../components/layout/Header";
import { Hero } from "../components/sections/Hero";
import { TheVibe } from "../components/sections/TheVibe";
import { RebelScrollCan } from "../components/layout/RebelScrollCan";
import { MarqueeDivider } from "../components/ui/MarqueeDivider";
import dynamic from "next/dynamic";

const TheLineup = dynamic(() => import("../components/sections/TheLineup").then((mod) => mod.TheLineup));
const Formula = dynamic(() => import("../components/sections/Formula").then((mod) => mod.Formula));
const TheManifesto = dynamic(() => import("../components/sections/TheManifesto").then((mod) => mod.TheManifesto));
const Drops = dynamic(() => import("../components/sections/Drops").then((mod) => mod.Drops));
const Stockists = dynamic(() => import("../components/sections/Stockists").then((mod) => mod.Stockists));
const Footer = dynamic(() => import("../components/layout/Footer").then((mod) => mod.Footer));

import { motion } from "framer-motion";
// Novos componentes
import { AudioVisualizer } from "../components/ui/AudioVisualizer";
import { useCart } from "../context/CartContext";
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
