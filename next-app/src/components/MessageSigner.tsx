"use client";

import { useState } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { getSignInPublicKeyScheme } from "@aptos-labs/siwa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { verifySignedMessage } from "@/app/actions";

export function MessageSigner() {
  const { connected, account, signMessage } = useWallet();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<{
    verified: boolean;
    message: string;
    publicKey: string;
    signature: Uint8Array;
    signatureType: string;
  } | null>(null);

  const { toast } = useToast();

  const handleSignMessage = async () => {
    if (!connected || !account || !signMessage) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please connect your wallet first.",
      });
      return;
    }

    if (!message.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a message to sign.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await signMessage({
        message,
        nonce: Math.random().toString(),
      });

      // Detect the signature type based on the public key
      const signatureType = getSignInPublicKeyScheme(account.publicKey);

      // Call server action to verify the signature
      const verificationResult = await verifySignedMessage({
        message: response.fullMessage,
        signature: response.signature.toUint8Array(),
        publicKey: account.publicKey.toString(),
        signatureType,
      });

      setVerificationResult({
        verified: verificationResult.verified,
        message: response.fullMessage,
        publicKey: account.publicKey.toString(),
        signature: response.signature.toUint8Array(),
        signatureType,
      });

      toast({
        title: verificationResult.verified ? "Success" : "Verification Failed",
        description: verificationResult.verified
          ? "Message signed and verified successfully!"
          : "Signature verification failed.",
        variant: verificationResult.verified ? "default" : "destructive",
      });
    } catch (error) {
      console.error("Error signing message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Message Signing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">
              Connect your wallet to start signing messages
            </p>
            <p className="text-sm text-muted-foreground">
              Use the &quot;Connect a Wallet&quot; button in the header
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Sign Message</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message to Sign
            </label>
            <Input
              id="message"
              placeholder="Enter your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={loading}
            />
          </div>

          <Button
            onClick={handleSignMessage}
            disabled={loading || !message.trim()}
            className="w-full"
          >
            {loading ? "Signing..." : "Sign Message"}
          </Button>
        </CardContent>
      </Card>

      {verificationResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              Verification Result
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  verificationResult.verified
                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400"
                }`}
              >
                {verificationResult.verified ? "VERIFIED" : "FAILED"}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Signed Message</h4>
              <div className="bg-muted p-3 rounded-md text-sm font-mono break-all">
                {verificationResult.message}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Signature Type</h4>
              <div className="bg-muted p-3 rounded-md text-sm font-mono">
                {verificationResult.signatureType}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Public Key</h4>
              <div className="bg-muted p-3 rounded-md text-sm font-mono break-all">
                {verificationResult.publicKey}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Signature</h4>
              <div className="bg-muted p-3 rounded-md text-sm font-mono break-all">
                {verificationResult.signature}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
