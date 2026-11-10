import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import Marque from "@/components/Marque";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri",
});


export const metadata: Metadata = {
  title: "Bazar Dor",
  description: "A simple e-commerce website built with Next.js 13, Tailwind CSS, and TypeScript.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <nav>
          <Navbar />  
        </nav>
          <Marque />

        <main>

        {children}
        </main>
        <Toaster />
      </body>
     
    </html>
  );
}
