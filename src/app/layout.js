import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/navbar";
import { AuthProvider } from "@/contexts/AuthContext";

const wantedSans = localFont({
  src: [
    {
      path: "../../public/fonts/WantedSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/WantedSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/fonts/WantedSans-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../public/fonts/WantedSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/WantedSans-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../public/fonts/WantedSans-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../public/fonts/WantedSans-ExtraBlack.woff2",
      weight: "950",
      style: "normal",
    },
  ],
  variable: "--font-wanted-sans",
});

export const metadata = {
  title: "셸메이트",
  description: "셸메이트 - 느린학습자 동행메이트",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${wantedSans.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <Navbar />
          <main className="max-w-7xl mx-auto px-6">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
