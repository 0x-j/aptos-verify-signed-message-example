import { MessageSigner } from "@/components/MessageSigner";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12 mb-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-gradient">
            Aptos Message Signing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Sign messages with your Aptos wallet and verify signatures on the server. Supports all signature types including Ed25519, Multi-Ed25519, Single Key, and Multi Key.
          </p>
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
              Ed25519 Support
            </span>
            <span className="px-3 py-1 bg-chart-2/10 text-chart-2 text-sm font-medium rounded-full">
              Aptos Connect
            </span>
            <span className="px-3 py-1 bg-chart-3/10 text-chart-3 text-sm font-medium rounded-full">
              Multi-Signature
            </span>
          </div>
        </div>
      </section>
      
      <div className="flex justify-center">
        <div className="w-full max-w-lg">
          <MessageSigner />
        </div>
      </div>
    </div>
  );
}
