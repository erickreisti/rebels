"use client";
import { Header } from "../components/layout/Header";
import { Hero } from "../components/sections/Hero";
import { TheVibe } from "../components/sections/TheVibe";
import { RebelScrollCan } from "../components/layout/RebelScrollCan";
import { MarqueeDivider } from "../components/ui/MarqueeDivider";
import dynamic from "next/dynamic";

/* ── Skeleton brutalista reutilizável ── */
function SectionSkeleton({ height = "min-h-screen" }: { height?: string }) {
  return (
    <div
      className={`${height} w-full bg-surface-900 border-y-4 border-black flex items-center justify-center relative overflow-hidden`}
    >
      {/* Linhas de glitch animadas */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 w-full h-px bg-white/5 animate-pulse"
            style={{ top: `${(i + 1) * 14}%`, animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
      <div className="flex flex-col items-center gap-6 z-10">
        <div className="w-48 h-3 bg-white/5 animate-pulse" />
        <div className="w-80 h-16 bg-white/4 animate-pulse" style={{ animationDelay: "0.1s" }} />
        <div className="w-64 h-3 bg-white/5 animate-pulse" style={{ animationDelay: "0.2s" }} />
      </div>
    </div>
  );
}

const TheLineup = dynamic(
  () => import("../components/sections/TheLineup").then((m) => m.TheLineup),
  { loading: () => <SectionSkeleton /> }
);

const Formula = dynamic(
  () => import("../components/sections/Formula").then((m) => m.Formula),
  { loading: () => <SectionSkeleton /> }
);

const TheManifesto = dynamic(
  () => import("../components/sections/TheManifesto").then((m) => m.TheManifesto),
  { loading: () => <SectionSkeleton /> }
);

const Drops = dynamic(
  () => import("../components/sections/Drops").then((m) => m.Drops),
  { loading: () => <SectionSkeleton height="min-h-[60vh]" /> }
);

const Stockists = dynamic(
  () => import("../components/sections/Stockists").then((m) => m.Stockists),
  { loading: () => <SectionSkeleton height="min-h-[60vh]" /> }
);

const Footer = dynamic(
  () => import("../components/layout/Footer").then((m) => m.Footer),
  { loading: () => <div className="w-full h-40 bg-black border-t-4 border-white/10 animate-pulse" /> }
);

export default function Home() {
  return (
    <div className="min-h-screen bg-primary-100 relative">
      <Header />
      <main>
        <RebelScrollCan>
          <Hero />
          <MarqueeDivider />
          <TheVibe />
        </RebelScrollCan>
        <TheLineup />
        <Formula />
        <TheManifesto />
        <Drops />
        <Stockists />
      </main>
      <Footer />
    </div>
  );
}
