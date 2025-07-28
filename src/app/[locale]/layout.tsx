import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header/Header";
import { ReduxProvider } from "@/redux/provider";
import { LanguageProvider } from "@/context/LanguageContext";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Gate Company",
};

const inter = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-montserrat",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className={` ${inter.className}`}>
        {" "}
        <ReduxProvider>
          <NextIntlClientProvider>
            {" "}
            <LanguageProvider>
              <Toaster /> <Header /> {children}
            </LanguageProvider>
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
