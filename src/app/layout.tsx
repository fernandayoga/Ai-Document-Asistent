import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/components/auth/auth-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Document Assistant",
  description: "Understand your documents faster with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-neutral-50 text-neutral-900 min-h-screen flex flex-col`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}