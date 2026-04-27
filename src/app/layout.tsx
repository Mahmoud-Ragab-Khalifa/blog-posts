import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "./layout/Header";
import { SearchProvider } from "@/contexts/SearchContext";
import ReactToastProvider from "@/providers/ReactToastProvider";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Awesome Posts Here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable}  h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ReactToastProvider>
          <SearchProvider>
            <Header />
            {children}
          </SearchProvider>
        </ReactToastProvider>
      </body>
    </html>
  );
}
