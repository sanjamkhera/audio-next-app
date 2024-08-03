import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prototype Fast",
  description: "Generate prototypes quickly",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" as="image" href="/backGroundLg.svg" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
