import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const title = "Habits Together - Social Habit Tracking App";
const description =
  "Habits Together is the perfect app to help you and your friends stay accountable and motivated to reach your goals. Sign up and we'll let you know when the app is ready!";

export const metadata: Metadata = {
  title: title,
  description: description,

  openGraph: {
    title: title,
    description: description,
    url: "https://habits-together.vercel.app/",
    images: {
      url: "/opengraph-image.png",
      alt: "Habits are hard. Habits Together is the perfect app to help you and your friends stay accountable and motivated to reach your goals.",
    },
    locale: "en_US",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  metadataBase: new URL("https://habits-together.vercel.app/"),
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
