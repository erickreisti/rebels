import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import { CartSidebar } from "../components/layout/CartSidebar";

const fontTitle = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-title",
  display: "swap",
});

const fontBody = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-body",
  display: "swap",
});

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
    <html lang="pt-br" className={`relative scroll-smooth ${fontTitle.variable} ${fontBody.variable}`}>
      <body className="relative font-body text-surface-50 bg-surface-900">
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
