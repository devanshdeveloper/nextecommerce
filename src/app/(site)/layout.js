import Navbar from "@/components/Navbar";
import "../globals.css";
import { Poppins } from "next/font/google";
import ContextProviders from "../../contextProviders";
const poppins = Poppins({ subsets: ["latin"], weight: ["400"] });

export const metadata = {
  title: "Ecommerce Site",
  description: "Ecommerce Site using Next.js + Sanity.io",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-indigo-50`}>
        <ContextProviders>
          <Navbar />
          <main className="relative top-16">{children}</main>
        </ContextProviders>
      </body>
    </html>
  );
}