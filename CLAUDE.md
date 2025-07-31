# Aptos Message Signing & Verification Demo - AI Assistant Context

## Project Overview

This is a focused demonstration of message signing and verification across all Aptos signature types. It was bootstrapped from the Aptos Full Stack Template and simplified to showcase cryptographic message signing with traditional wallets and Keyless authentication (Aptos Connect).

## Repository Structure

### Next.js Frontend (`/next-app/`)

- **Framework**: Next.js 14.2.3 with TypeScript
- **UI Library**: Radix UI components with Tailwind CSS
- **Key dependencies**: @aptos-labs/ts-sdk, @aptos-labs/wallet-adapter-react, @aptos-labs/siwa
- **Database**: None (server actions only)
- **Commands**:
  - Dev: `npm run dev`
  - Build: `npm run build`
  - Lint: `npm run lint`
- **Key components**: MessageSigner, wallet connection, signature verification

## Key Features

### Multi-Signature Support

- **Ed25519**: Traditional single-key wallets (Petra, Nightly)
- **Multi-Ed25519**: Multi-signature wallets
- **Keyless**: Aptos Connect with Google/Apple login (reported as "single_key")
- **Multi Key**: Advanced multi-key authentication schemes

### Smart Verification

- **Automatic type detection**: Uses `getSignInPublicKeyScheme(account.publicKey)`
- **Sync verification**: For Ed25519, Multi-Ed25519, Multi-Key signatures
- **Async verification**: For Keyless signatures (requires network calls)
- **Server-side validation**: Ensures cryptographic integrity

## Development Workflow

### Frontend Development

1. Navigate to `next-app/`
2. Start dev server: `npm run dev`
3. Build for production: `npm run build`
4. Lint code: `npm run lint`

### Testing Signature Types

1. **Ed25519**: Connect with Petra or Nightly wallet
2. **Keyless**: Connect with "Continue with Google" (Aptos Connect)
3. **Multi-signature**: Connect with compatible multi-sig wallets

## Important Files

### Core Components

- **MessageSigner**: `next-app/src/components/MessageSigner.tsx`
  - Main signing interface
  - Handles wallet integration
  - Displays verification results

### Server Logic

- **Server Actions**: `next-app/src/app/actions.ts`
  - `verifySignedMessage()`: Main verification function
  - Handles all signature types with appropriate verification methods
  - Returns detailed verification results

### Wallet Integration

- **WalletProvider**: `next-app/src/components/providers/WalletProvider.tsx`
- **WalletSelector**: `next-app/src/components/wallet/WalletSelector.tsx`
- **Supported Wallets**: Petra, Nightly, Aptos Connect

### Configuration

- **Aptos Client**: `next-app/src/lib/aptos.ts`
- **Utils**: `next-app/src/lib/utils.ts`

## Technical Implementation

### Signature Type Detection

```typescript
const signatureType = getSignInPublicKeyScheme(account.publicKey);
```

### Verification Logic

```typescript
if (signatureType === "single_key") {
  // Keyless signatures require async verification
  isValid = await pubKey.verifySignatureAsync({
    message: messageBytes,
    signature: sig,
  });
} else {
  // Traditional signatures use sync verification
  isValid = pubKey.verifySignature({
    message: messageBytes,
    signature: sig,
  });
}
```

### Important Notes

#### Keyless vs Single Key Terminology

- **SDK Confusion**: Keyless signatures are reported as "single_key" type
- **Actual Keyless**: Uses JWT tokens + ZK proofs, no traditional private keys
- **Actual Single Key**: Uses one Ed25519/Secp256k1 key pair stored locally
- **Our Implementation**: Correctly handles this by using async verification for "single_key"

#### Signature Object Creation

- **Ed25519**: Direct constructor with hex strings
- **Complex Types**: Use `AnyPublicKey.deserialize()` and `AnySignature.deserialize()`
- **Deserialization**: Convert hex strings to bytes using `Deserializer`

## Testing

### Manual Testing Flow

1. **Connect Wallet**: Test different wallet types
2. **Enter Message**: Type any arbitrary message
3. **Sign Message**: Trigger wallet signing
4. **Verify Results**: Check signature verification and display

### Signature Type Testing

- **Petra/Nightly**: Should show `ed25519` type
- **Aptos Connect**: Shows `single_key` (actually Keyless)
- **Multi-sig wallets**: Should show `multi_ed25519` or `multi_key`

## Key Dependencies

- **Aptos SDK**: @aptos-labs/ts-sdk (signature verification)
- **Wallet Adapter**: @aptos-labs/wallet-adapter-react (wallet integration)
- **SIWA**: @aptos-labs/siwa (signature type detection)
- **UI Framework**: Radix UI + Tailwind CSS
- **No Database**: Pure client-server verification demo

## Configuration

### Environment Variables (Optional)

- **NEXT_PUBLIC_NETWORK**: Network to connect to (defaults to devnet)
- **NEXT_PUBLIC_APTOS_API_KEY**: API key for enhanced performance

### Wallet Configuration

- **optInWallets**: `["Continue with Google", "Petra", "Nightly"]`
- **Network**: Configurable via environment or defaults to devnet

## Recommended Development Flow

1. **Start Frontend**: `cd next-app && npm run dev`
2. **Connect Wallet**: Test with different wallet types
3. **Sign Messages**: Try various message content
4. **Verify Results**: Check signature type detection and verification
5. **Debug**: Use browser dev tools for detailed error analysis

## Common Issues & Solutions

### TypeScript Errors

- **Constructor Issues**: Use `AnyPublicKey.deserialize()` for complex types
- **Import Issues**: Ensure all SDK classes are properly imported

### Signature Verification

- **Keyless Async**: Must use `verifySignatureAsync()` for Keyless signatures
- **Type Detection**: Verify `getSignInPublicKeyScheme()` returns expected types
- **Network Issues**: Keyless verification may require network connectivity

### Wallet Connection

- **Extension Install**: Ensure Petra/Nightly are installed
- **Network Mismatch**: Check wallet and app are on same network
- **Aptos Connect**: Requires internet connection for OAuth flow
