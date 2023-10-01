import "./globals.scss";
import type { Metadata } from "next";
import { Tajawal, Noto_Sans_Arabic } from "next/font/google";
import Providers from "../components/provider";

export const tajawal = Tajawal({
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  subsets: ["arabic"],
});

const noto = Noto_Sans_Arabic({
  weight: ["300", "400", "700", "800"],
  subsets: ["arabic"],
});

const metadata: Metadata = {
  title: "Noonstream",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" className="dark">
      <body
        className={`${tajawal.className} bg-day dark:bg-night text-gray-900 dark:text-gray-100`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
