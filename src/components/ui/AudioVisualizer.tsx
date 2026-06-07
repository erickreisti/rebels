"use client";
import React, { useEffect, useRef } from "react";

interface AudioVisualizerProps {
  audioRef?: React.RefObject<HTMLAudioElement | null>;
  isPlaying: boolean;
  onClick: () => void;
}

export function AudioVisualizer({ audioRef, isPlaying, onClick }: AudioVisualizerProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const rafIdRef = useRef<number | null>(null);

  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  
  const lastValuesRef = useRef<number[]>([]);

  useEffect(() => {
    let analyser: AnalyserNode | null = null;
    
    // Iniciar contexto de áudio se for dar play
    if (isPlaying && audioRef?.current && !audioContextRef.current) {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;
        
        analyser = ctx.createAnalyser();
        analyser.fftSize = 256; 
        analyserRef.current = analyser;

        const source = ctx.createMediaElementSource(audioRef.current);
        source.connect(analyser);
        analyser.connect(ctx.destination);
        sourceRef.current = source;
        
        lastValuesRef.current = new Array(analyser.frequencyBinCount).fill(0);
      } catch (e) {
        console.warn("Audio node already connected");
      }
    }

    if (audioContextRef.current && audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    analyser = analyserRef.current;
    
    let phaseOffset = 0;
    const dataArray = analyser ? new Uint8Array(analyser.frequencyBinCount) : null;

    const smoothValue = (current: number, target: number, smoothing = 0.2) => {
      return current + (target - current) * smoothing;
    };

    const loop = () => {
      rafIdRef.current = requestAnimationFrame(loop);
      
      // Apenas movimenta a onda se estiver tocando
      if (isPlaying) {
        phaseOffset = (phaseOffset + 0.05) % (Math.PI * 2);
      }

      const width = 200;
      const height = 50;
      const segments = 100;
      const segmentWidth = width / segments;
      
      let points = [];
      
      if (analyser && dataArray && isPlaying) {
        analyser.getByteFrequencyData(dataArray);
      }

      for (let i = 0; i <= segments; i++) {
        const x = i * segmentWidth;
        const amplitude = (height * 0.4); 
        
        // Suaviza as bordas para a linha não cortar nas extremidades
        const normalizedX = i / segments;
        const envelope = Math.sin(normalizedX * Math.PI); 

        let yOffset = 0;

        if (analyser && dataArray && isPlaying) {
          // Padrão "Wave" interativo de áudio
          const frequencyIndex = Math.floor((i + phaseOffset * 20) % dataArray.length);
          const frequency = dataArray[frequencyIndex] || 0;
          
          lastValuesRef.current[frequencyIndex] = smoothValue(
            lastValuesRef.current[frequencyIndex] || 0,
            frequency,
            0.3 
          );
          
          const smoothedFreq = lastValuesRef.current[frequencyIndex];
          const normalizedFreq = (smoothedFreq / 255) - 0.2; 
          
          const sineOffset = Math.sin(phaseOffset + i * 0.05) * 0.2;
          yOffset = (normalizedFreq + sineOffset) * amplitude * envelope * 2.5;
        } else {
          // Quando pausado: uma onda bonita, mas congelada (conforme requisitado)
          // Usamos um padrão fixo para a onda ficar bem evidente
          yOffset = Math.sin(i * 0.15) * amplitude * 0.8 * envelope;
        }
        
        points.push({ x, y: height / 2 + yOffset });
      }

      // Constrói o Path SVG usando Curvas Bezier Cúbicas para ficar perfeitamente liso
      let pathData = `M ${points[0].x},${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const current = points[i];
        const previous = points[i - 1];
        const cp1x = previous.x + (current.x - previous.x) * 0.5;
        const cp1y = previous.y;
        const cp2x = current.x - (current.x - previous.x) * 0.5;
        const cp2y = current.y;
        pathData += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${current.x},${current.y}`;
      }

      if (pathRef.current) {
        pathRef.current.setAttribute("d", pathData);
      }
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [isPlaying, audioRef]);

  return (
    <button 
      onClick={onClick}
      title={isPlaying ? "Pausar Áudio" : "Tocar Áudio"}
      className={`relative group flex items-center justify-center h-10 md:h-12 w-28 md:w-36 cursor-pointer outline-hidden focus:outline-none focus:ring-0 border-none bg-transparent transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-80 hover:opacity-100"}`}
    >
      {/* Aviso visual pulsante para o usuário clicar na onda */}
      {!isPlaying && (
        <span className="absolute -top-6 text-[10px] md:text-xs font-bold tracking-widest text-accent-500 opacity-60 animate-pulse whitespace-nowrap pointer-events-none drop-shadow-[0_0_5px_rgba(245,168,24,0.8)]">
          CLICK TO PLAY
        </span>
      )}

      <svg viewBox="0 0 200 50" className="w-full h-full overflow-visible">
        <defs>
          <filter id="squiggle-glow" x="-50%" y="-50%" width="200%" height="200%" filterUnits="userSpaceOnUse">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#f5a818" />
          </linearGradient>
        </defs>
        <path
          ref={pathRef}
          fill="none"
          stroke="url(#neonGradient)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#squiggle-glow)"
          className="transition-all duration-300"
        />
      </svg>
    </button>
  );
}
