import { ThemeToggle } from "@/components/ThemeToggle";
import { WalletSelector } from "@/components/wallet/WalletSelector";

export const RootHeader = () => {
  return (
    <header className="sticky top-0 z-50 glass-effect border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-8">
            <a href="/" className="group flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shadow-lg">
                <svg 
                  className="w-6 h-6 text-white" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient group-hover:scale-105 transition-transform">
                  Aptos Message Signer
                </h1>
                <p className="text-xs text-muted-foreground">Sign & Verify</p>
              </div>
            </a>
          </div>
          
          <div className="flex items-center gap-3">
            <WalletSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};
