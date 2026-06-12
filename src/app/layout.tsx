import type { Metadata } from "next";
import { Cormorant_Garamond, Raleway } from "next/font/google";
import "../styles/globals.css";
import { CartProvider } from "../context/CartContext";
import { CartSidebar } from "../components/layout/CartSidebar";

// Raleway: fonte principal (body + headings brutalistas)
// Pesos completos para suportar font-black (900) real
const fontBody = Raleway({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800", "900"],
  variable: "--font-body",
  display: "swap",
});

// Cormorant Garamond: fonte display/accent editorial
const fontTitle = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-title",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Rebels Energy | Ultra Cyber",
  description:
    "Crack the bold. The ultimate cyberpunk energy drink. Zero sugar, extreme taurine, neural focus.",
  openGraph: {
    title: "Rebels Energy | Ultra Cyber",
    description:
      "Crack the bold. The ultimate cyberpunk energy drink. Zero sugar, extreme taurine, neural focus.",
    type: "website",
    locale: "en_US",
    siteName: "Rebels Energy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rebels Energy | Ultra Cyber",
    description:
      "Crack the bold. The ultimate cyberpunk energy drink. Zero sugar, extreme taurine, neural focus.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`relative scroll-smooth ${fontBody.variable} ${fontTitle.variable}`}
    >
      <body className="relative font-body text-surface-50 bg-surface-900">
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
