import type { Metadata } from "next";
import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import { CartSidebar } from "../components/layout/CartSidebar";

export const metadata: Metadata = {
  title: "Rebels Energy | Ultra Cyber",
  description: "Crack the bold. The ultimate cyberpunk energy drink.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Raleway:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
