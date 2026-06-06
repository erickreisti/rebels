# Wine for Life 🍷

Uma landing page premium para a marca **Wine for Life**, construída com as tecnologias mais modernas do ecossistema React/Next.js.

## 🚀 Tech Stack

- **[Next.js](https://nextjs.org/)** – Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** – Tipagem estática
- **[Tailwind CSS v4](https://tailwindcss.com/)** – Estilização utility-first
- **[Framer Motion](https://www.framer.com/motion/)** – Animações fluidas
- **[React Icons](https://react-icons.github.io/react-icons/)** – Biblioteca de ícones

## 📁 Estrutura do Projeto

```
src/
├── app/                  # App Router (Next.js)
│   ├── layout.tsx        # Layout raiz (HTML, metadados)
│   └── page.tsx          # Página principal
├── assets/
│   └── images/           # Imagens estáticas importadas
├── components/
│   ├── layout/           # Componentes de estrutura (Header, Footer)
│   ├── sections/         # Seções da landing page (Hero, About, etc.)
│   └── ui/               # Componentes de UI reutilizáveis
├── hooks/
│   └── useTheme.tsx      # Hook para gerenciar tema claro/escuro
├── lib/                  # Utilitários e helpers
├── styles/
│   └── globals.css       # CSS global e configuração do Tailwind v4
└── types/
    ├── index.ts          # Interfaces e tipos globais
    └── images.d.ts       # Declarações de tipo para assets de imagem
```

## 🛠️ Como rodar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Iniciar produção
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 🎨 Paleta de Cores

As cores do projeto são definidas via variáveis CSS no `src/styles/globals.css` seguindo o padrão do Tailwind v4:

- **Primary**: Tons de vinho e rosa (`#fef2f4` → `#1a0f14`)
- **Accent**: Dourado (`#f5a818`)
