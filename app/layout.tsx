import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";

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
  title: "Naim's Portfolio | Full Stack Engineer & Web Developer",
  description: "Showcase of professional expertise in full stack development, cloud architecture, and innovative problem-solving. Explore projects, technical skills, and real-world solutions.",
  keywords: ["full stack developer", "web developer", "software engineer", "typescript", "react", "next.js"],
  authors: [{ name: "Developer" }],
  openGraph: {
    title: "Modern Developer Portfolio | Full Stack Engineer",
    description: "Professional portfolio showcasing full stack development expertise and innovative projects.",
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
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
