import type { Metadata } from "next";
import { Playfair_Display, Great_Vibes, Be_Vietnam_Pro } from "next/font/google";

import { weddingData } from "@/constants/wedding-data";

import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-be-vietnam-pro",
  display: "swap",
});

export const dynamic = "error";

const coupleNames = `${weddingData.bride.fullName} & ${weddingData.groom.fullName}`;
const siteTitle = `${coupleNames} | Thiệp cưới online`;
const siteDescription = `Landing page thiệp cưới của ${coupleNames}, ngày ${weddingData.weddingDate.display}. Theo dõi câu chuyện tình yêu, lịch sự kiện, bản đồ và gửi lời chúc ngay trên một trang tĩnh sang trọng.`;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
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
    type: "website",
    images: [
      {
        url: weddingData.coverImage.src,
        width: 1200,
        height: 630,
        alt: weddingData.coverImage.alt
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [weddingData.coverImage.src]
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
    <html
      lang="vi"
      className={`${playfair.variable} ${greatVibes.variable} ${beVietnamPro.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

