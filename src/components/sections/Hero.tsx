"use client";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowDownRight, FiPlay, FiPause } from "react-icons/fi";
import { useState, useEffect, useContext, useRef } from "react";
import { HeroPhaseContext, MouseContext, MediaContext, ActiveProductContext, HERO_PRODUCTS } from "../layout/RebelScrollCan";
import { AudioVisualizer } from "../ui/AudioVisualizer";

const HERO_CONTENT = [
  { left1: "CRACK", left2: "THE", right: "BOLD", dot: "text-pink-500", btn: "Switch Energy", topBg: "bg-purple-800" },
  { left1: "RESET", left2: "YOURSELF", right: "FAST", dot: "text-green-400", btn: "Switch Energy", topBg: "bg-green-900" },
  { left1: "ENTER", left2: "QUANTUM", right: "REALM", dot: "text-cyan-400", btn: "Switch Energy", topBg: "bg-blue-900" },
  { left1: "FEEL THE", left2: "INFERNO", right: "BURN", dot: "text-red-500", btn: "Switch Energy", topBg: "bg-red-900" },
];

const STATS = [
  { value: "500MG",   label: "Extreme Taurine", code: "TR-01" },
  { value: "ZERO Ø",  label: "Zero Sugar · No Crash", code: "ZR-00" },
  { value: "B12+B6",  label: "Neural Focus", code: "FN-99" },
];

const GlitchStats = ({ active }: { active: boolean }) => {
  const [index, setIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => {
        setIndex(i => (i + 1) % STATS.length);
        setGlitching(false);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [active]);

  const stat = STATS[index];

  return (
    <div className="flex flex-col gap-1.5 select-none w-[200px] md:w-[240px]">
      {/* Valor e Label Principais */}
      <div
        className={`flex flex-col transition-all duration-75 ${
          glitching ? "translate-x-[3px] opacity-60 blur-[1px]" : "translate-x-0 opacity-100"
        }`}
        style={glitching ? { textShadow: "2px 0 #a855f7, -2px 0 #be185d" } : {}}
      >
        <div className="font-sans font-black text-accent-500 text-3xl md:text-4xl leading-none tracking-tighter drop-shadow-[0_0_8px_rgba(245,168,24,0.3)]">
          {stat.value}
        </div>
        <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-surface-200 mt-1">
          {stat.label}
        </div>
      </div>
    </div>
  );
};


// Função pseudo-aleatória determinística para evitar Hydration Mismatch no Next.js
const prng = (seed: number) => {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
};

// Glitch Text Component — camadas fantasma em ciano e vermelho
const GlitchText = ({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => {
  return (
    <>
      <style>{`
        @keyframes glitch-skew {
          0%, 85%, 100% { transform: skew(0deg); }
          86% { transform: skew(-2deg); }
          88% { transform: skew(2deg); }
          90% { transform: skew(0deg); }
        }
        @keyframes glitch-clip-1 {
          0%, 80%, 100% { clip-path: inset(100% 0 0 0); transform: translateX(0); opacity: 0; }
          81% { clip-path: inset(20% 0 60% 0); transform: translateX(-4px); opacity: 0.8; }
          83% { clip-path: inset(50% 0 30% 0); transform: translateX(4px); opacity: 0.8; }
          85% { clip-path: inset(10% 0 80% 0); transform: translateX(-2px); opacity: 0.5; }
          87% { clip-path: inset(100% 0 0 0); opacity: 0; }
        }
        @keyframes glitch-clip-2 {
          0%, 82%, 100% { clip-path: inset(100% 0 0 0); transform: translateX(0); opacity: 0; }
          83% { clip-path: inset(60% 0 20% 0); transform: translateX(4px); opacity: 0.7; }
          85% { clip-path: inset(30% 0 50% 0); transform: translateX(-4px); opacity: 0.7; }
          88% { clip-path: inset(80% 0 5% 0); transform: translateX(2px); opacity: 0.4; }
          90% { clip-path: inset(100% 0 0 0); opacity: 0; }
        }
        .glitch-wrap { position: relative; display: inline-block; animation: glitch-skew 8s infinite; }
        .glitch-wrap::before {
          content: attr(data-text);
          position: absolute; inset: 0;
          color: #00ffff;
          animation: glitch-clip-1 8s infinite;
        }
        .glitch-wrap::after {
          content: attr(data-text);
          position: absolute; inset: 0;
          color: #ff003c;
          animation: glitch-clip-2 8s infinite;
        }
      `}</style>
      <span className={`glitch-wrap ${className ?? ""}`} data-text={typeof children === "string" ? children : undefined} style={style}>
        {children}
      </span>
    </>
  );
};

const GlitchEffect = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  // Apenas tons sofisticados de roxo e rosa escuro para um cyberpunk sutil
  const colors = ['bg-purple-500', 'bg-purple-400', 'bg-pink-700', 'bg-purple-600'];

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          // Linhas muito mais finas (1px a 2px)
          className={`absolute h-px md:h-[2px] w-[15vw] md:w-[35vw] ${colors[i % 4]} mix-blend-screen opacity-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]`}
          initial={{ top: `${prng(i + 1) * 100}%`, left: `${prng(i + 2) * 100}%` }}
          animate={{
            opacity: [0, 0.9, 0, 0.5, 0, 0],
            x: [0, prng(i + 3) * 100 - 50, 0, prng(i + 4) * 50 - 25, 0],
            scaleX: [1, 2.5, 0.5, 1.5, 1],
          }}
          transition={{
            duration: 0.1 + prng(i + 5) * 0.3,
            repeat: Infinity,
            repeatDelay: 0.5 + prng(i + 6) * 1.5, // Mais tempo entre os glitches para ficar sutil
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

export function Hero() {
  const phase = useContext(HeroPhaseContext);
  const mousePos = useContext(MouseContext);
  const { isVideoPaused, toggleVideo } = useContext(MediaContext);
  const { activeIndex, setActiveIndex } = useContext(ActiveProductContext);
  const content = HERO_CONTENT[activeIndex];
  
  const [muted, setMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {
        setMuted(true);
      });
    }
  }, []);

  const toggleMute = () => {
    if (audioRef.current) {
      if (audioRef.current.paused || muted) {
        // Se estava pausado ou mutado, tenta dar o play de fato e liga o som
        audioRef.current.play().catch(() => {});
        audioRef.current.muted = false;
        setMuted(false);
      } else {
        // Se estava tocando, pausa a música
        audioRef.current.pause();
        setMuted(true);
      }
    }
  };

  return (
    <section className="relative min-h-screen h-screen flex items-center justify-center overflow-hidden bg-transparent">
      <audio 
        ref={audioRef} 
        src="https://cdn.pixabay.com/download/audio/2023/03/01/audio_74accea696.mp3?filename=trap-beat-dark-autumn-night-141114.mp3" 
        loop 
        preload="auto" 
        crossOrigin="anonymous" 
      />
      {/* ── Background Gradients Dinâmicos ── */}
      <div className={`absolute top-0 right-0 w-[800px] h-[800px] ${content.topBg} rounded-full blur-[150px] opacity-40 mix-blend-screen translate-x-1/3 -translate-y-1/4 transition-colors duration-1000`} />
      <div className={`absolute bottom-0 left-0 w-[600px] h-[600px] ${HERO_PRODUCTS[activeIndex].halo} rounded-full blur-[150px] opacity-15 mix-blend-screen -translate-x-1/4 translate-y-1/4 transition-colors duration-1000`} />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none" />

      {/* Glitches Iniciais */}
      {phase === "glitch" && <GlitchEffect />}

      {/* Slogans Absolutos (Esquerda e Direita) */}
      <div className="absolute inset-0 max-w-[1600px] mx-auto pointer-events-none z-0">
        
        {/* Slogan Esquerda (CRACK THE) */}
        <div className="absolute left-0 w-full md:w-auto md:left-[10%] top-[18%] md:top-1/2 -translate-y-1/2 z-20 px-6 md:px-0 flex justify-center md:block pointer-events-none">
          <motion.div
            animate={{ x: mousePos.mouseX * 30, y: mousePos.mouseY * 30 }}
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
          >
            <motion.div
              animate={phase === "impact" ? { y: [-15, 15, -15] } : {}}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            >
              <motion.h1 
                key={`left-${activeIndex}`}
                initial={{ x: "-100%", opacity: 0 }}
                animate={phase === "impact" ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
                className={`font-sans font-black text-transparent bg-clip-text bg-linear-to-br from-white ${content.dot.replace('text', 'to')} leading-[0.85] tracking-tighter glitch-text-left text-center md:text-left`} 
                style={{ fontSize: "clamp(3.5rem, 8vw, 10rem)" }}
                data-glitch={`${content.left1} ${content.left2}`}
              >
                {content.left1}<br/>{content.left2}
              </motion.h1>
            </motion.div>
          </motion.div>
        </div>

        {/* Slogan Direita (BOLD.) */}
        <div className="absolute right-0 w-full md:w-auto md:right-[10%] top-[82%] md:top-1/2 -translate-y-1/2 flex flex-col items-center md:items-end z-20 px-6 md:px-0 pointer-events-none">
          <motion.div
            animate={{ x: mousePos.mouseX * -30, y: mousePos.mouseY * -30 }} // Parallax inverso
            transition={{ type: "spring", stiffness: 50, damping: 20 }}
            className="flex flex-col items-center md:items-end"
          >
            <motion.div
              animate={phase === "impact" ? { y: [15, -15, 15] } : {}}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="text-center md:text-right"
            >
              <motion.h1 
                key={`right-${activeIndex}`}
                initial={{ x: "100%", opacity: 0 }}
                animate={phase === "impact" ? { x: 0, opacity: 1 } : { x: "100%", opacity: 0 }}
                transition={{ type: "spring", bounce: 0.5, duration: 0.8, delay: 0.1 }}
                className="font-sans font-black text-primary-50 leading-[0.85] tracking-tighter glitch-text-right" 
                style={{ fontSize: "clamp(4rem, 8vw, 10rem)" }}
                data-glitch={`${content.right}.`}
              >
                {content.right}<span className={content.dot}>.</span>
              </motion.h1>
            </motion.div>
            
            {/* Botão Gigante e Chamativo — abaixo do BOLD */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={phase === "impact" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0.5, delay: 0.6 }}
              className="mt-6 md:mt-8 pointer-events-auto"
            >
              <motion.a
                key={`btn-${activeIndex}`}
                href="#catalog"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={phase === "impact" ? { 
                  boxShadow: ["0px 0px 20px rgba(245,168,24,0.4)", "0px 0px 60px rgba(236,72,153,0.8)", "0px 0px 20px rgba(245,168,24,0.4)"] 
                } : {}}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className={`group relative inline-flex items-center gap-4 bg-linear-to-r from-surface-800 ${HERO_PRODUCTS[activeIndex].halo} text-white px-8 py-4 md:px-12 md:py-6 rounded-full font-sans font-black uppercase tracking-widest text-sm md:text-xl overflow-hidden`}
              >
                {/* Feixe de Luz (Shimmer) no Hover */}
                <div className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                
                <span className="relative z-10 drop-shadow-md">{content.btn}</span>
                
                <div className={`relative z-10 bg-white ${content.dot} p-2 md:p-2.5 rounded-full group-hover:bg-primary-900 group-hover:text-accent-500 transition-colors shrink-0 shadow-lg`}>
                  <FiArrowDownRight className="w-5 h-5 md:w-7 md:h-7 group-hover:-rotate-45 transition-transform duration-300" />
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
        {/* GlitchStats — canto inferior esquerdo na altura do scroll pill */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={phase === "impact" ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-6 md:bottom-10 left-6 md:left-[10%] z-30 pointer-events-none"
        >
          <GlitchStats active={phase === "impact"} />
        </motion.div>

        {/* Controles de Mídia (Flutuantes) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
          className="absolute bottom-6 md:bottom-10 right-6 md:right-[10%] z-50 pointer-events-auto flex items-center gap-2"
        >
          {/* Definições SVG globais para reutilizar o neon e glow nos botões */}
          <svg width="0" height="0" className="absolute">
            <defs>
              <filter id="global-glow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="global-neon" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#f5a818" />
              </linearGradient>
            </defs>
          </svg>

          {/* Toggle Video */}
          <button 
            onClick={toggleVideo}
            className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 outline-hidden focus:outline-none border-none bg-transparent cursor-pointer transition-opacity duration-300 group"
            title={isVideoPaused ? "Play Video" : "Pause Video"}
          >
            {isVideoPaused ? (
              <FiPlay 
                className="w-5 h-5 md:w-6 md:h-6 ml-1 opacity-80 group-hover:opacity-100" 
                style={{ stroke: 'url(#global-neon)', strokeWidth: '2.5' }} 
              />
            ) : (
              <FiPause 
                className="w-5 h-5 md:w-6 md:h-6" 
                style={{ stroke: 'url(#global-neon)', strokeWidth: '2.5', filter: 'url(#global-glow)' }} 
              />
            )}
          </button>

          {/* Audio Visualizer (Interativo) */}
          <AudioVisualizer 
            audioRef={audioRef}
            isPlaying={!muted} 
            onClick={toggleMute} 
          />
        </motion.div>
      </div>

    </section>
  );
}
