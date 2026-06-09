import type { Metadata } from "next";

import { weddingData } from "@/constants/wedding-data";

import "./globals.css";

export const dynamic = "error";

const coupleNames = `${weddingData.bride.fullName} & ${weddingData.groom.fullName}`;
const siteTitle = `${coupleNames} | Thiep cuoi online`;
const siteDescription = `Landing page thiep cuoi cua ${coupleNames}, ngay ${weddingData.weddingDate.display}. Theo doi cau chuyen tinh yeu, lich su kien, ban do va gui loi chuc ngay tren mot trang tinh sang trong.`;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  applicationName: "Wedding Landing Page",
  keywords: [
    "romantic luxury wedding",
    "thiep cuoi online",
    "wedding landing page",
    "static wedding website",
    "wedding invitation"
  ],
  authors: [{ name: coupleNames }],
  creator: coupleNames,
  publisher: coupleNames,
  formatDetection: {
    address: false,
    email: false,
    telephone: false
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    locale: "vi_VN",
    siteName: `${coupleNames} Wedding`,
    type: "website"
  },
  robots: {
    follow: true,
    index: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
