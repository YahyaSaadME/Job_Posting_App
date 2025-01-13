// app/layout.tsx (RootLayout)
import { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SessionProviderWrapper from "@/app/SessionProviderWrapper"; // Import the client-only wrapper

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Shiv InfoSec",
  description: " At Shiv InfoSec, we specialize in connecting cybersecurity professionals with the best opportunities while providing resources to grow their careers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Wrap with SessionProviderWrapper */}

        <SessionProviderWrapper>
          
         {children}
          </SessionProviderWrapper>
 
      </body>
    </html>
  );
}
