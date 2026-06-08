<div align="center">
  <img src="https://raw.githubusercontent.com/erickreisti/rebels/main/src/assets/images/winged-skull-glitch-logo.png" alt="Rebels Energy Skull Glitch Logo" width="120" />
  <h1 align="center">REBELS ENERGY /// WEB EXPERIENCE</h1>

  <p align="center">
    <strong>Uma experiência imersiva e neo-brutalista de e-commerce construída com física avançada e animações de layout espacial.</strong>
    <br />
    <br />
    <a href="#-visão-geral">Visão Geral</a>
    ·
    <a href="#-stack-tecnológica">Tech Stack</a>
    ·
    <a href="#-arquitetura-e-física">Física do Layout</a>
    ·
    <a href="#-como-rodar-localmente">Deploy Local</a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16_Turbopack-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/Framer_Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white" alt="Framer Motion" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </p>
</div>

<hr />

## ⚡ Visão Geral

Este não é um site institucional comum. O projeto **Rebels Energy** é um laboratório de design **Neo-Brutalista** focado na geração de impacto visual absoluto através de interações espaciais. Inspirado por interfaces cibernéticas, jogos de fliperama e a rebeldia da cultura rave, a aplicação rompe as barreiras do "Glassmorphism" tradicional em favor de bordas rígidas, sombras compensadas sólidas (`10px 10px 0px #000`) e animações de morphing (transição de estado) perfeitamente suaves.

O usuário não apenas navega, ele "desliza" entre as seções guiado por componentes flutuantes controlados por física de rolagem (`useScroll`).

---

## 🚀 Funcionalidades Principais

*   **Parallax Ancorado (`RebelScrollCan.tsx`)**: O elemento central (a lata de energia) sofre interseções de scroll, sofrendo transformações agressivas no Eixo Y, estacionando matematicamente no centro da viewport quando as âncoras se cruzam.
*   **Seamless Background Video**: Integração de vídeo no plano de fundo de forma pegajosa (`sticky`) com "Crossfade" em tempo real usando refs e duplo-loop para evitar solavancos de decodificação no recarregamento do vídeo.
*   **"Character Selection" Modal (`layoutId`)**: Um catálogo que se comporta como uma tela de seleção de lutador. Ao clicar na grade, componentes se desmembram e voam fisicamente da grade para o modelo absoluto modal.
*   **Estética Neo-Brutalista**: Textos impenetráveis sem serifas (`font-black tracking-tighter`), contornos em traços vetoriais brutos, cores supersaturadas (Fuchsia, Cyan, Lime) que atritam diretamente contra um fundo `#121212` texturizado com CSS Noise.

---

## 🛠 Stack Tecnológica (Edição 2026)

O ambiente foi construído no limite da performance do ecossistema React atual:

- **[Next.js 16](https://nextjs.org/)**: Roteamento via App Router, SSR nativo e o motor ultrarrápido **Turbopack** para compilação local instantânea.
- **[React 19](https://react.dev/)**: Componentes baseados 100% em hooks funcionais e Server Components otimizados para menor carga no FCP.
- **[Framer Motion](https://www.framer.com/motion/)**: Orquestração do motor de animação, desde micro-interações (`whileHover`, `whileTap`) até transformações pesadas baseadas em rolagem e morphing de chaves `layoutId`.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: O motor de estilização por utilitários focado em Just-In-Time compiling com tipografia modular e cores dinâmicas customizadas em valores hexadecimais no frontend.

---

## ⚙ Arquitetura e Física (Deep Dive)

### O Paradoxo do Scroll (`useScroll` vs Anchors)
Na seção "The Vibe", o layout utiliza container sticky. Para prevenir que links diretos em cabeçalhos (âncoras `#about`) destruíssem o alinhamento das linhas geométricas (`-rotate-0 bg-black h-[6px]`), a lata mestra tem sua função polinomial calibrada para terminar a fase final em exato `0px` vertical no eixo global, assegurando a colisão visual com os boxes absolutos na tela.

### O Letreiro Marquee Animado
O componente `<MarqueeDivider />` encapsula um bloco de renderização infinita horizontal (`whitespace-nowrap`). Emulando fitas de isolamento ("Caution Tape"), foi renderizado com bordas pesadas e um laço `Infinity` linear para intersecção de tela ininterrupta.

---

## 💻 Como Rodar Localmente

**Pré-requisitos:** Node.js v20+ / npm ou pnpm.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/erickreisti/rebels.git
   cd rebels
   ```

2. **Instale as dependências voadoras:**
   ```bash
   npm install
   # ou
   pnpm install
   ```

3. **Inicie a Turbina (Dev Server via Turbopack):**
   ```bash
   npm run dev
   # O site subirá instantaneamente na porta 3000
   ```

4. Acesse `http://localhost:3000` e seja bem-vindo à rebelião.

---

<p align="center">
  <i>"Não seja um NPC. Choose Your Vibe."</i>
</p>
<p align="center">
  Projetado com agressividade para <b>Erick Reisti</b>.
</p>
