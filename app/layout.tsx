import type { Metadata } from "next";
import { AnalyticsTracker } from "@/components/analytics-tracker";
import seo from "@/content/seo.json";
import "./globals.css";

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  applicationName: "Татьяна Бабанова — менеджер проектов",
  authors: [{ name: "Татьяна Бабанова" }],
  creator: "Татьяна Бабанова",
  keywords: [
    "Project Manager",
    "менеджер проектов",
    "внутренние проекты",
    "IT-проекты",
    "автоматизация",
    "управление проектами",
    "Татьяна Бабанова",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    title: seo.title,
    description: seo.description,
    siteName: "Татьяна Бабанова — менеджер проектов",
  },
  twitter: {
    card: "summary",
    title: seo.title,
    description: seo.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        {children}
        <AnalyticsTracker />
      </body>
    </html>
  );
}
