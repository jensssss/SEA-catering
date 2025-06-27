import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/context/AuthContext"; // Import the AuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SEA Catering",
  description: "Healthy Meals, Anytime, Anywhere",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-50 text-slate-800`}>
        {/* Wrap the entire application with AuthProvider */}
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}