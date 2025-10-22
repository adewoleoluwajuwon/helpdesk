// app/layout.jsx
import { ThemeModeScript } from "flowbite-react";
import "./globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Helpdesk",
  description: "Modern Flowbite + Next.js example",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeModeScript />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        <Navbar />
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
