import { Inter } from "next/font/google";
import clsx from 'clsx';
import "./globals.css";
import Navigation from "@/ui/Navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={clsx(
          inter.className,
          "flex min-h-screen flex-col"
        )}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
