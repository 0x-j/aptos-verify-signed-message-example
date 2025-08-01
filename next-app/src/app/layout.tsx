import "./globals.css";

import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { WalletProvider } from "@/components/providers/WalletProvider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { PropsWithChildren } from "react";
import { RootHeader } from "@/components/RootHeader";
import { RootFooter } from "@/components/RootFooter";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Aptos Message Signer",
  description: "Sign messages with your Aptos wallet and verify signatures",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen gradient-bg font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WalletProvider>
              <div className="flex flex-col min-h-screen">
                <RootHeader />
                <main className="flex-1">
                  <div className="container mx-auto px-6 py-8 max-w-6xl">
                    {children}
                  </div>
                </main>
                <RootFooter />
                <Toaster />
              </div>
            </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
