import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import { LanguageProvider } from "../context/language-context";
import { FloatingSideToolbar } from "../components/floating-side-toolbar";

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
  metadataBase: new URL("https://naimdev-hazel.vercel.app/"),

  title: {
    default: "Naim Hossen | Frontend Developer",
    template: "%s | Naim Hossen",
  },

  description:
    "Naim Hossen is a frontend developer specializing in Next.js, React, TypeScript, and modern web applications.",

  keywords: [
    "Naim Hossen",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "TypeScript Developer",
  ],

  authors: [
    {
      name: "Naim Hossen",
    },
  ],

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Naim Hossen | Frontend Developer",
    description:
      "Frontend developer specializing in Next.js, React and TypeScript.",
    url: "https://naimdev-hazel.vercel.app/",
    siteName: "Naim Hossen",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <FloatingSideToolbar />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
