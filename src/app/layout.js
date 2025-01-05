import { Outfit } from "next/font/google";
import "./globals.css";

const OutfitFont = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "FetchUp.me",
  description: "Playground for API requests",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${OutfitFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
