"use client";
import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, OrbitControls, ContactShadows, Float, Text, Edges, RoundedBox, Billboard } from "@react-three/drei";
import * as THREE from "three";
import imgUltraCyber from "../../assets/images/can-ultra-cyber.png";
import imgNeonCitrus from "../../assets/images/can-neon-citrus.png";
import imgQuantumBlue from "../../assets/images/can-quantum-blue.png";
import imgInfernoRed from "../../assets/images/can-inferno-red.png";

// Sabores e Cores
const FLAVORS = [
  { name: "ULTRA CYBER", color: "#EC4899", image: imgUltraCyber },
  { name: "NEON CITRUS", color: "#EAB308", image: imgNeonCitrus },
  { name: "QUANTUM BLUE", color: "#06B6D4", image: imgQuantumBlue },
  { name: "INFERNO RED", color: "#EF4444", image: imgInfernoRed },
];

// Componente que carrega a imagem 2D da lata 
function CanImage({ flavor }: { flavor: any }) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    // Carrega diretamente o arquivo de imagem do sabor
    if (flavor && flavor.image) {
      new THREE.TextureLoader().load(flavor.image.src, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        setTexture(tex);
      });
    }
  }, [flavor]);

  if (!texture) return null;

  return (
    <mesh>
      <planeGeometry args={[1.2, 1.2]} />
      <meshBasicMaterial map={texture} transparent={true} alphaTest={0.05} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Can({ initialPosition, flavor, isFalling, onFallen }: any) {
  const ref = useRef<THREE.Group>(null);
  const [hasFallen, setHasFallen] = useState(false);

  // Reseta a posição quando isFalling volta para false (Máquina reabastecida)
  useEffect(() => {
    if (!isFalling && ref.current) {
      ref.current.position.set(initialPosition[0], initialPosition[1], initialPosition[2]);
      setHasFallen(false);
    }
  }, [isFalling, initialPosition]);
  
  useFrame((state: any, delta: number) => {
    if (isFalling && !hasFallen && ref.current) {
      // 1. A mola empurra a lata pra frente (Z)
      if (ref.current.position.z < 0.6) {
        ref.current.position.z += delta * 3;
      } 
      // 2. A lata cai em queda livre (Y)
      else if (ref.current.position.y > -2.5) {
        ref.current.position.y -= delta * 8; 
      } 
      // 3. A lata aterrissa na gaveta e fica lá
      else {
        ref.current.position.y = -2.5;
        setHasFallen(true);
        if (onFallen) onFallen();
      }
    }
  });

  return (
    <group ref={ref} position={initialPosition}>
      <CanImage flavor={flavor} />
    </group>
  );
}

function InteractiveButton({ isSelected, color, buttonY, onClick }: any) {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state: any, delta: number) => {
    if (ref.current) {
      const targetZ = isSelected ? -0.04 : 0;
      // Interpolação simples para animação suave (lerp)
      ref.current.position.z += (targetZ - ref.current.position.z) * delta * 15;
    }
  });

  return (
    <group position={[1.4, buttonY, 1.25]}>
      {/* Base do Botão arredondada */}
      <RoundedBox args={[0.6, 0.4, 0.1]} radius={0.05} smoothness={2} position={[0, 0, -0.05]}>
        <meshStandardMaterial color="#222" />
      </RoundedBox>
      {/* Botão em si (Interativo) arredondado */}
      <RoundedBox
        args={[0.5, 0.3, 0.1]}
        radius={0.05}
        smoothness={2}
        ref={ref}
        onClick={(e: any) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={isSelected ? 2 : 0.2} 
          toneMapped={false}
        />
      </RoundedBox>
    </group>
  );
}

function VendingMachine({ activeIndex, onSelectFlavor, triggerCount, onCanDispensed }: { activeIndex: number, onSelectFlavor: (i: number) => void, triggerCount: number, onCanDispensed?: () => void }) {
  const machineColor = "#0f0f13"; // Metal escuro meio azulado (Cyberpunk)
  const edgeColor = "#3b82f6"; // Azul neon para os contornos da máquina
  
  const [fallenCans, setFallenCans] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (triggerCount === 0) return; // Não derruba nada no carregamento inicial da página

    setFallenCans(prev => {
      const newState = { ...prev, [activeIndex]: true };
      if (Object.keys(newState).length === 4) {
        setTimeout(() => setFallenCans({}), 2000);
      }
      return newState;
    });
  }, [activeIndex, triggerCount]);

  const canPositions = [
    [-0.7, 1.0, 0],
    [0.7, 1.0, 0],
    [-0.7, -0.4, 0],
    [0.7, -0.4, 0],
  ];

  const MachineMaterial = () => (
    <meshStandardMaterial color={machineColor} metalness={0.8} roughness={0.3} />
  );

  return (
    <group>
      {/* Corpo da Máquina - Substituindo Box por RoundedBox para design premium */}
      
      {/* Parede Esquerda */}
      <RoundedBox args={[0.2, 7, 2.2]} radius={0.08} smoothness={4} position={[-1.9, 0, 0.1]} castShadow receiveShadow>
        <MachineMaterial />
        <Edges color={edgeColor} threshold={15} />
      </RoundedBox>
      
      {/* Painel Direito (Controles) */}
      <RoundedBox args={[1.2, 7, 2.2]} radius={0.08} smoothness={4} position={[1.4, 0, 0.1]} castShadow receiveShadow>
        <MachineMaterial />
        <Edges color={edgeColor} threshold={15} />
      </RoundedBox>

      {/* Teto */}
      <RoundedBox args={[3.0, 0.2, 2.2]} radius={0.05} smoothness={4} position={[-0.3, 3.4, 0.1]} castShadow receiveShadow>
        <MachineMaterial />
        <Edges color={edgeColor} />
      </RoundedBox>

      {/* Fundo (Costas) */}
      <RoundedBox args={[3.0, 6.6, 0.2]} radius={0.05} smoothness={4} position={[-0.3, 0, -0.9]} receiveShadow>
        <meshStandardMaterial color="#050505" metalness={0.9} roughness={0.5} />
      </RoundedBox>

      {/* Base Maior (Pedestal) */}
      <RoundedBox args={[3.2, 0.4, 2.4]} radius={0.05} smoothness={4} position={[-0.3, -3.5, 0.1]} castShadow receiveShadow>
        <meshStandardMaterial color="#08080a" metalness={0.8} roughness={0.4} />
        <Edges color={edgeColor} />
      </RoundedBox>

      {/* Painel Frontal Inferior (Abaixo do vidro) */}
      <RoundedBox args={[3.0, 1.6, 0.2]} radius={0.05} smoothness={4} position={[-0.3, -2.5, 1.1]} castShadow receiveShadow>
        <meshStandardMaterial color="#14141c" metalness={0.9} roughness={0.2} />
        <Edges color={edgeColor} />
      </RoundedBox>

      {/* Gaveta de Dispense (Buraco Preto recuado) */}
      <mesh position={[-0.3, -2.5, 1.2]}>
        <boxGeometry args={[1.6, 0.8, 0.05]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      {/* Painel Frontal Superior Angulado (Estilo Arcade) */}
      <RoundedBox 
        args={[3.0, 1.2, 0.2]} 
        radius={0.05} 
        smoothness={4} 
        position={[-0.3, 2.8, 1.1]} 
        rotation={[-Math.PI / 12, 0, 0]} // Inclinado para trás
        castShadow 
        receiveShadow
      >
        <meshStandardMaterial color="#0a0a0f" metalness={0.9} roughness={0.1} />
        <Edges color="#EC4899" />
      </RoundedBox>
      
      {/* Letreiro Neon no Topo (Acompanha a inclinação) */}
      <group position={[-0.3, 2.75, 1.25]} rotation={[-Math.PI / 12, 0, 0]}>
        <Text
          fontSize={0.25}
          color="#ffffff"
          characters="REBELS ENERGY"
          anchorX="center"
          anchorY="middle"
        >
          REBELS ENERGY
          <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={3} toneMapped={false} />
        </Text>
        {/* Luz do Neon piscando ou forte */}
        <pointLight position={[0, 0, 0.2]} intensity={2} color="#EC4899" distance={3} />
      </group>

      {/* Prateleiras Internas */}
      {[-1.0, 0.6, 2.0].map((y, i) => (
        <RoundedBox key={i} args={[3.0, 0.08, 1.5]} radius={0.02} smoothness={2} position={[-0.3, y, 0]} receiveShadow>
          <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
          <Edges color="#333" />
        </RoundedBox>
      ))}

      {/* Latas Individuais nas Prateleiras */}
      {FLAVORS.map((flavor, i) => (
        <Can 
          key={i} 
          initialPosition={canPositions[i]} 
          flavor={flavor} 
          isFalling={fallenCans[i] || false} 
          onFallen={() => {
            // Avisa o componente pai que a lata física aterrissou na gaveta
            if (fallenCans[i] && onCanDispensed) onCanDispensed();
          }}
        />
      ))}
      
      {/* Luz interna da máquina (Neon Tube) */}
      <pointLight position={[-0.3, 2, 0.5]} intensity={2} color="#ffffff" distance={5} />
      <pointLight position={[-0.3, -1, 0.5]} intensity={1} color={FLAVORS[activeIndex].color} distance={4} />

      {/* Vidro Frontal (Semi-transparente estilo Geladeira) */}
      <RoundedBox args={[3.0, 3.4, 0.05]} radius={0.02} smoothness={2} position={[-0.3, 0.15, 1.1]} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#88ccff" 
          opacity={0.15} 
          metalness={0.8} 
          roughness={0.1} 
          transparent={true}
          depthWrite={false}
        />
      </RoundedBox>

      {/* Botões Interativos (Painel Direito) */}
      {FLAVORS.map((flavor, i) => {
        const isSelected = activeIndex === i;
        const buttonY = 1.5 - i * 0.8;
        return (
          <InteractiveButton 
            key={i} 
            isSelected={isSelected} 
            color={flavor.color} 
            buttonY={buttonY} 
            onClick={() => onSelectFlavor(i)} 
          />
        );
      })}
    </group>
  );
}

export function VendingMachine3D({ 
  activeIndex, 
  onSelectFlavor, 
  triggerCount,
  onCanDispensed
}: { 
  activeIndex: number, 
  onSelectFlavor: (i: number) => void,
  triggerCount: number,
  onCanDispensed?: () => void
}) {
  return (
    <div className="relative w-full h-full min-h-[60vh] md:min-h-[80vh] cursor-grab active:cursor-grabbing">
      <Canvas shadows camera={{ position: [0, 2, 9], fov: 45 }}>
        
        {/* Iluminação Ambiente Cyberpunk */}
        <ambientLight intensity={0.4} />
        <directionalLight 
          castShadow 
          position={[5, 10, 5]} 
          intensity={1} 
          shadow-mapSize={[1024, 1024]} 
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#EC4899" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#06B6D4" />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
          <group rotation={[0, -Math.PI / 6, 0]}>
            <VendingMachine activeIndex={activeIndex} onSelectFlavor={onSelectFlavor} triggerCount={triggerCount} onCanDispensed={onCanDispensed} />
          </group>
        </Float>

        {/* Reflexos do ambiente (Estúdio) */}
        <Environment preset="city" />
        
        {/* Sombra de Contato no chão */}
        <ContactShadows position={[0, -3.5, 0]} opacity={0.7} scale={10} blur={2} far={4} color="#000000" />
        
        {/* Permite que o usuário gire a cena um pouco, mas com limites */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minAzimuthAngle={-Math.PI / 4}
          maxAzimuthAngle={Math.PI / 4}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
