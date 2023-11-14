import "./globals.css";
import type { Metadata } from "next";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';
import { Inter } from "next/font/google";
import { ReduxProvider } from "@/app/redux/provider";
import ThemeRegistry from "@/theme/ThemeRegistry";
import '@/app/globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Snippet DB",
  description: "Where Code Snippets Find a Home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body className={inter.className}>
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </ThemeRegistry>
    </html>
  );
}
