import type { Metadata } from "next";
import { Lato, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SOMMIA — Sommelier IA",
  description: "Découvrez les accords mets-vins les plus raffinés grâce à notre intelligence artificielle. Votre sommelier personnel, disponible à chaque instant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${lato.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-noir text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
