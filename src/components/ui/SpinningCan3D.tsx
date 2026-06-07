"use client";
import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import * as THREE from "three";

function CanModel({ imageUrl }: { imageUrl: string }) {
  const ref = useRef<THREE.Group>(null);
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (imageUrl) {
      new THREE.TextureLoader().load(imageUrl, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        // Ajuste para a textura cobrir o cilindro
        tex.wrapS = THREE.RepeatWrapping;
        tex.repeat.set(1, 1);
        setTexture(tex);
      });
    }
  }, [imageUrl]);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.y -= delta * 1.5; // Gira continuamente em 3D
    }
  });

  if (!texture) return null;

  return (
    <group ref={ref}>
      {/* Topo Metálico */}
      <mesh position={[0, 1.45, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.1, 32]} />
        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.2} />
      </mesh>
      
      {/* Corpo principal (Rótulo) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 2.8, 32]} />
        <meshStandardMaterial map={texture} transparent={true} alphaTest={0.05} roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Base Metálica */}
      <mesh position={[0, -1.45, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 0.1, 32]} />
        <meshStandardMaterial color="#cccccc" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

export function SpinningCan3D({ imageUrl }: { imageUrl: string }) {
  return (
    <div className="w-full h-[300px] lg:h-[450px] relative z-40 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }} gl={{ alpha: true }}>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <Environment preset="night" />
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          <CanModel imageUrl={imageUrl} />
        </Float>
      </Canvas>
    </div>
  );
}
