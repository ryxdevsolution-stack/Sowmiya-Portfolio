import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: '--font-plus-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Sowmiya Ravichandran | UI/UX Designer & Developer",
  description: "Portfolio of Sowmiya Ravichandran - Creative Designer specializing in UI/UX Design, Graphic Design, and Frontend Development",
  keywords: ["UI/UX Designer", "Graphic Designer", "Frontend Developer", "Portfolio", "Sowmiya Ravichandran"],
  authors: [{ name: "Sowmiya Ravichandran" }],
  openGraph: {
    title: "Sowmiya Ravichandran | UI/UX Designer & Developer",
    description: "Portfolio of Sowmiya Ravichandran - Creative Designer specializing in UI/UX Design, Graphic Design, and Frontend Development",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${plusJakarta.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
