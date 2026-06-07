"use client";
import React, { createContext, useState, useEffect, useRef, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import imgUltraCyber from "../../assets/images/can-ultra-cyber.png";
import imgNeonCitrus from "../../assets/images/can-neon-citrus.png";
import imgQuantumBlue from "../../assets/images/can-quantum-blue.png";
import imgInfernoRed from "../../assets/images/can-inferno-red.png";
import imgWingedSkullOrange from "../../assets/images/winged-skull-orange.png";

export const HeroPhaseContext = createContext<string>("glitch");
export const MouseContext = createContext({ mouseX: 0, mouseY: 0 });
export const MediaContext = createContext({ isVideoPaused: false, toggleVideo: () => {} });
export const ActiveProductContext = createContext<{
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}>({ activeIndex: 0, setActiveIndex: () => {} });

export const HERO_PRODUCTS = [
  { id: "ultra", image: imgUltraCyber, halo: "bg-pink-500", glow: "drop-shadow-[0_0_50px_rgba(236,72,153,0.6)]" },
  { id: "citrus", image: imgNeonCitrus, halo: "bg-green-400", glow: "drop-shadow-[0_0_50px_rgba(74,222,128,0.6)]" },
  { id: "quantum", image: imgQuantumBlue, halo: "bg-cyan-400", glow: "drop-shadow-[0_0_50px_rgba(34,211,238,0.6)]" },
  { id: "inferno", image: imgInfernoRed, halo: "bg-red-500", glow: "drop-shadow-[0_0_50px_rgba(239,68,68,0.6)]" },
];

// ── Vídeo com crossfade seamless (sem solavanco no loop) ──
const VIDEO_SRC = "/nightclub-bg.mp4";
const VIDEO_STYLE: React.CSSProperties = {
  filter: "brightness(0.40) saturate(1.8) hue-rotate(-10deg)",
  transition: "opacity 1.5s ease-in-out",
};
const CROSSFADE_BEFORE = 2; // segundos antes do fim para iniciar o fade

function SeamlessVideo({ isPaused }: { isPaused: boolean }) {
  const videoA = useRef<HTMLVideoElement>(null);
  const videoB = useRef<HTMLVideoElement>(null);
  const [activeSlot, setActiveSlot] = useState<"a" | "b">("a");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleCrossfade = useCallback((fromSlot: "a" | "b", remainingTime: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const toSlot: "a" | "b" = fromSlot === "a" ? "b" : "a";
    const delay = Math.max((remainingTime - CROSSFADE_BEFORE) * 1000, 0);

    timerRef.current = setTimeout(() => {
      const toVideo = toSlot === "a" ? videoA.current : videoB.current;
      if (toVideo) {
        toVideo.currentTime = 0;
        toVideo.play().catch(() => {});
      }
      setActiveSlot(toSlot);

      setTimeout(() => {
        const fromVideo = fromSlot === "a" ? videoA.current : videoB.current;
        if (fromVideo) {
          fromVideo.pause();
          fromVideo.currentTime = 0;
        }
        const nextDuration = toVideo?.duration || 10;
        scheduleCrossfade(toSlot, nextDuration);
      }, 1600);
    }, delay);
  }, []);

  useEffect(() => {
    const activeVid = activeSlot === "a" ? videoA.current : videoB.current;
    if (!activeVid) return;

    if (isPaused) {
      activeVid.pause();
      if (timerRef.current) clearTimeout(timerRef.current);
    } else {
      // Retomar a reprodução
      activeVid.play().catch(() => {});
      const remaining = activeVid.duration ? activeVid.duration - activeVid.currentTime : 10;
      scheduleCrossfade(activeSlot, remaining);
    }
  }, [isPaused, activeSlot, scheduleCrossfade]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const sharedClass =
    "absolute inset-0 w-full h-full object-cover pointer-events-none";

  return (
    <>
      <video
        ref={videoA}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className={sharedClass}
        style={{ ...VIDEO_STYLE, opacity: activeSlot === "a" ? 1 : 0 }}
      />
      <video
        ref={videoB}
        src={VIDEO_SRC}
        muted
        playsInline
        preload="auto"
        className={sharedClass}
        style={{ ...VIDEO_STYLE, opacity: activeSlot === "b" ? 1 : 0 }}
      />
    </>
  );
}

// Efeito de Transição: Glitch Horizontal Roxo (Substituindo o Warp Tunnel antigo)
const GlitchTransition = ({ scrollYProgress }: { scrollYProgress: any }) => {
  // O glitch aparece com força durante o scroll da transição e some ao estacionar
  const opacity = useTransform(scrollYProgress, [0.1, 0.3, 0.6, 0.85], [0, 1, 1, 0]);
  const colors = ['bg-purple-500/40', 'bg-fuchsia-600/30', 'bg-purple-900/50'];

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <motion.div style={{ opacity }} className="absolute inset-0 pointer-events-none overflow-hidden z-30 mix-blend-screen">
      {[...Array(50)].map((_, i) => {
        // Pseudo-random para evitar hydration mismatch
        const prng = (seed: number) => { const x = Math.sin(seed * 9999) * 10000; return x - Math.floor(x); };
        const top = `${prng(i) * 100}%`;
        const height = prng(i + 1) > 0.5 ? '1px' : '2px';
        const duration = 0.05 + prng(i + 2) * 0.15; // Piscar extremamente rápido
        const delay = prng(i + 3) * 2;
        const color = colors[i % 3];

        return (
          <motion.div
            key={i}
            className={`absolute left-0 w-full ${color}`}
            style={{ top, height }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              repeat: Infinity,
              duration,
              delay,
              ease: "linear"
            }}
          />
        );
      })}
    </motion.div>
  );
};

export function RebelScrollCan({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState("glitch");
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ mouseX: 0, mouseY: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Controle de Mídia
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const toggleVideo = () => setIsVideoPaused(!isVideoPaused);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === "undefined") return;
    const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    const mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    setMousePos({ mouseX, mouseY });
  };

  // Lógica de Entrada (Queda da Lata)
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("canDrop");
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleImpact = () => {
    if (phase === "impact") return;
    setPhase("impact");
    const colors = ['#EC4899', '#A855F7', '#06B6D4', '#ffffff'];
    
    // Explosões de energia
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.65, x: 0.45 }, angle: 135, colors, startVelocity: 55, zIndex: 50, gravity: 0.9, scalar: 1.2 });
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.65, x: 0.55 }, angle: 45, colors, startVelocity: 55, zIndex: 50, gravity: 0.9, scalar: 1.2 });
  };

  // Lógica de Scroll Rebelde (Sticky Parallax)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transformações do Hiperespaço: Lata sobe agressivamente e depois estaciona no centro no final
  const canScale = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [1, 1.1, 1.3, 1, 1]);
  const canYScroll = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, -50, -200, 50, 0]);
  
  // Transformações do Indicador de Scroll
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const scrollIndicatorY = useTransform(scrollYProgress, [0, 0.05], [0, 50]);

  return (
    <HeroPhaseContext.Provider value={phase}>
      <MouseContext.Provider value={mousePos}>
        <MediaContext.Provider value={{ isVideoPaused, toggleVideo }}>
          <ActiveProductContext.Provider value={{ activeIndex, setActiveIndex }}>
            <div ref={containerRef} className="relative w-full" onMouseMove={handleMouseMove}>
          
          {/* ── Camada de Vídeo de Fundo Balada (sticky, atrás de tudo) ── */}
          <div className="absolute inset-0 pointer-events-none z-5">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
              <SeamlessVideo isPaused={isVideoPaused} />
            {/* Overlay gradiente neon sobre o vídeo */}
            <div className="absolute inset-0 pointer-events-none" style={{
              background: "linear-gradient(to bottom, rgba(10,6,8,0.60) 0%, rgba(100,20,80,0.15) 45%, rgba(10,6,8,0.75) 100%)"
            }} />
          </div>
        </div>

        {/* Camada de Conteúdo (Hero e About ficam aqui) */}
        <div className="relative z-10">
          {children}
        </div>

        {/* Camada da Lata Flutuante e Efeitos */}
        <div className="absolute inset-0 pointer-events-none z-40">
          <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
            
            {/* Glitch de Transição Substituto do antigo Tubo de Luzes */}
            <GlitchTransition scrollYProgress={scrollYProgress} />

            {/* Lata Mestre */}
            {(phase === "canDrop" || phase === "impact") && (
              <motion.div style={{ y: canYScroll, scale: canScale }} className="relative z-40 flex items-center justify-center mt-12 md:mt-24">
                
                {/* Camada Parallax + Respiro (Floating) */}
                <motion.div
                  animate={{ 
                    y: [0, -15, 0], 
                    x: mousePos.mouseX * -20, // Parallax inverso no eixo X
                    rotate: mousePos.mouseX * -2,
                  }}
                  transition={{ 
                    y: { repeat: Infinity, duration: 4, ease: "easeInOut", delay: 2.2 }, // Respiro contínuo
                    x: { type: "spring", stiffness: 50, damping: 20 }, // Suavidade no mouse tracking
                    rotate: { type: "spring", stiffness: 50, damping: 20 }
                  }}
                  className="relative flex items-center justify-center"
                >
                  {/* Aura/Halo Luminoso atrás da Lata (faz o produto estourar na tela) */}
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vh] h-[30vh] md:w-[45vh] md:h-[45vh] ${HERO_PRODUCTS[activeIndex].halo} rounded-full blur-[80px] md:blur-[120px] -z-10 transition-colors duration-700`}
                  />

                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeIndex}
                      initial={phase === "canDrop" ? { opacity: 0, y: 300, scale: 0.5 } : { opacity: 0, scale: 0.8, rotate: -15 }}
                      animate={phase === "canDrop" ? { 
                        opacity: 1, y: [300, -60, 20, -10, 0], scale: 1, rotate: [0, 0, -5, 5, 0]
                      } : {
                        opacity: 1, scale: 1, rotate: 0
                      }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setActiveIndex((prev) => (prev + 1) % HERO_PRODUCTS.length)}
                      onAnimationComplete={() => phase === "canDrop" && handleImpact()}
                      src={HERO_PRODUCTS[activeIndex].image.src}
                      alt="Rebels Can"
                      className={`relative h-[55vh] md:h-[75vh] w-auto object-contain origin-center ${HERO_PRODUCTS[activeIndex].glow} z-10 transition-all duration-300 cursor-pointer`}
                    />
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Scroll Pill Premium */}
        <motion.div 
          style={{ opacity: scrollIndicatorOpacity, y: scrollIndicatorY }}
          className="absolute top-0 left-0 w-full h-screen pointer-events-none z-50 flex flex-col items-center justify-end pb-10"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={phase === "impact" ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="flex flex-col items-center gap-3"
          >
            {/* Botão de Troca de Lata (Caveira Pulsante) */}
            <motion.div
              role="button"
              onClick={() => setActiveIndex((prev) => (prev + 1) % HERO_PRODUCTS.length)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
              className="text-white hover:text-accent-500 transition-colors cursor-pointer pointer-events-auto z-50 flex flex-col items-center justify-center select-none"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <img src={imgWingedSkullOrange.src} alt="Winged Skull Logo" className="w-12 h-12 md:w-16 md:h-16 object-cover mix-blend-screen scale-125 select-none pointer-events-none" style={{ clipPath: 'circle(35%)' }} draggable="false" />
            </motion.div>
            <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent-500/80 pointer-events-none drop-shadow-sm mt-2">
              Switch
            </span>
          </motion.div>
        </motion.div>

      </div>
            </ActiveProductContext.Provider>
          </MediaContext.Provider>
        </MouseContext.Provider>
      </HeroPhaseContext.Provider>
    );
  }
