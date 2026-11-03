import type { Metadata } from "next";
import "./globals.css";
import { LanguageApplier } from "@/components/sites/karchx/language";

export const metadata: Metadata = {
  title: "KARCHX – websites, content and automation for businesses in Bulgaria",
  description: "KARCHX combines websites, content, marketing and automation, so inquiries stop getting lost. Two weeks of work, one-time, in advance.",
  icons: {
    icon: [
      { url: "/sites/karchx/favicon.ico", sizes: "any" },
      { url: "/sites/karchx/logo-32.png", type: "image/png", sizes: "32x32" },
      { url: "/sites/karchx/logo-192.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: [{ url: "/sites/karchx/favicon.ico" }],
    apple: [{ url: "/sites/karchx/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/sites/karchx/favicon.ico" sizes="any" />
        <style
          dangerouslySetInnerHTML={{
            __html: `.bg-only,.bg-only-flex{display:none}html.lang-bg .bg-only{display:block}html.lang-bg .bg-only-flex{display:flex}html.lang-bg .en-only{display:none !important}`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("karchx-theme")==="dark")document.documentElement.classList.add("dark");if(localStorage.getItem("karchx-lang")==="bg"){document.documentElement.classList.add("lang-bg");document.documentElement.lang="bg"}}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f9f8f5] text-[#070503] antialiased selection:bg-[#ff740a]/20">
        {children}
        <LanguageApplier />
      </body>
    </html>
  );
}
