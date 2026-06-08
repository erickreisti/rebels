"use client";
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
        {/* Nova Seção: The Manifesto */}
        <TheManifesto />

        <Drops />
        <Stockists />
      </main>
      <Footer />

    </div>
  );
}
