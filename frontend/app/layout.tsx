import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "تكنو شام | استوديو تصميم وبرمجة المواقع",
  description:
    "تكنو شام — استوديو متخصّص في تصميم وبرمجة المواقع. نحوّل فكرتك إلى تجربة رقمية تُبهر عملاءك.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
