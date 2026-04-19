import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "@src/app/(app)/globals.css";
import { cn } from "@src/lib/utils";
import Header from "@src/components/custom-components/Header";
import Footer from "@src/components/custom-components/Footer";
import { navlinks } from "@src/data/navlinks";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Real Estate",
  description: "Find your dream home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <Header navigationData={navlinks} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
