import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aero Kraken — إيرو كراكن | Tournament-Grade 3D Gaming Headset",
  description:
    "Hear Beyond Limits. Custom-tuned 50mm neodymium acoustic drivers, cooling-gel memory foam, and bauxite aluminum chassis. اسمع ما وراء الحدود.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full antialiased scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@400;500;600;700;800;900&family=Manrope:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-[#141414] overflow-x-hidden selection:bg-[#E52432] selection:text-white font-sans">
        {children}
      </body>
    </html>
  );
}
