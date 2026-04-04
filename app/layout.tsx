import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Singga kopi | Scrollytelling Experience",
  description: "Experience the premium world of Singga kopi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className={`${outfit.variable} h-full antialiased dark`}>
      <body suppressHydrationWarning={true} className="font-sans bg-black text-white min-h-full flex flex-col overscroll-none">
        {children}
      </body>
    </html>
  );
}
