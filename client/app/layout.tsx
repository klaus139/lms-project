"use client"
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/theme-provider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Loader from "./components/Loader/Loader";
import Custom from "./Custom";

const poppins = Poppins({
  subsets:["latin"],
  weight:['400','500','600','700'],
  variable:"--font-Poppins"
});

const josefin = Josefin_Sans({
  subsets:["latin"],
  weight:['400','500','600','700'],
  variable:"--font-josefin"
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-[#05113c] duration-300`}>
       <Providers>
        <SessionProvider>
       <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Custom>{children}</Custom>
          <Toaster position='top-center' reverseOrder={false}/>
        </ThemeProvider>
        </SessionProvider>
       </Providers>
      </body>
    </html>
  );
}


