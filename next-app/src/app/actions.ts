"use server";

import {
  Ed25519PublicKey,
  Ed25519Signature,
  AnyPublicKey,
  AnySignature,
  PublicKey,
  Signature,
  Deserializer,
  AptosConfig,
} from "@aptos-labs/ts-sdk";

type VerifySignedMessageProps = {
  message: string;
  signature: Uint8Array;
  publicKey: string;
  signatureType: string;
};

export const verifySignedMessage = async ({
  message,
  signature,
  publicKey,
  signatureType,
}: VerifySignedMessageProps): Promise<{
  verified: boolean;
  error?: string;
}> => {
  try {
    // Convert message to Uint8Array
    const messageBytes = new TextEncoder().encode(message);

    // Convert Uint8Array signature to hex string
    const signatureHex = Array.from(signature)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    let pubKey: PublicKey;
    let sig: Signature;

    // Create the appropriate public key and signature objects based on type
    switch (signatureType) {
      case "ed25519":
        pubKey = new Ed25519PublicKey(publicKey);
        sig = new Ed25519Signature(`0x${signatureHex}`);
        break;

      case "multi_ed25519":
      case "single_key":
      case "multi_key":
        // For complex signature types, deserialize using AnyPublicKey and AnySignature
        // Convert hex strings to Uint8Array for deserialization
        const pubKeyBytes = new Uint8Array(
          publicKey.startsWith("0x")
            ? publicKey
                .slice(2)
                .match(/.{2}/g)
                ?.map((byte) => parseInt(byte, 16)) || []
            : publicKey.match(/.{2}/g)?.map((byte) => parseInt(byte, 16)) || []
        );
        const sigBytes = new Uint8Array(signature);

        pubKey = AnyPublicKey.deserialize(new Deserializer(pubKeyBytes));
        sig = AnySignature.deserialize(new Deserializer(sigBytes));
        break;

      default:
        return {
          verified: false,
          error: `Unsupported signature type: ${signatureType}`,
        };
    }

    // Verify the signature against the actual message
    // Use async verification for keyless signatures, sync for others
    let isValid: boolean;

    if (signatureType === "single_key") {
      // NOTE: "single_key" here actually refers to Keyless signatures (Aptos Connect)
      // The SDK reports Keyless signatures as "single_key" type, though they're different concepts:
      // - Keyless: Uses JWT tokens + ZK proofs (no traditional private keys)
      // - Single Key: Uses one Ed25519/Secp256k1 key pair
      // Keyless signatures require async verification due to potential network calls
      isValid = await pubKey.verifySignatureAsync({
        message: messageBytes,
        signature: sig,
        aptosConfig: new AptosConfig({}),
      });
    } else {
      // Traditional cryptographic signatures use sync verification
      isValid = pubKey.verifySignature({
        message: messageBytes,
        signature: sig,
      });
    }

    return {
      verified: isValid,
    };
  } catch (error) {
    console.error("Error verifying signature:", error);
    return {
      verified: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
