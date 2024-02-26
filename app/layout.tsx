'use client'

import { ThemeProvider } from "@/components/theme-provider"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/nav";
import TanstackProvider from "@/providers/TanstackProvider";


const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div>
          
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Nav/>
            <TanstackProvider>
           <div>{children}</div>   
            </TanstackProvider>
            
          </ThemeProvider>
        </div>
       
        </body>
    </html>
  );
}
