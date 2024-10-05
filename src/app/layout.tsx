import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./Providers";

const nunito = Nunito({
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sublime nov",
  description:
    "Sublime Nov is a famous website for auditory novels and podcasts with high quality established by Muhammad Qurany Ibrahim",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <div className="modal"></div>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
