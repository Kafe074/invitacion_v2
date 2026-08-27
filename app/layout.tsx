import type { Metadata } from "next";
import { Cormorant_Garamond, Great_Vibes, Montserrat } from "next/font/google";
import "./globals.css";
import { weddingData } from "@/data/weddingData";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const script = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const sans = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const { brideFirstName, groomFirstName } = weddingData.couple;

export const metadata: Metadata = {
  title: `${brideFirstName} & ${groomFirstName} | ¡Nos Casamos!`,
  description: "Invitación digital de boda",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${serif.variable} ${script.variable} ${sans.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-sky">{children}</body>
    </html>
  );
}
