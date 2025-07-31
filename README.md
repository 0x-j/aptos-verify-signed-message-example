# Aptos Message Signing & Verification Demo

A comprehensive demonstration of message signing and verification across all Aptos signature types, including traditional wallets and Keyless authentication (Aptos Connect).

## 🎯 What This Demo Shows

This project demonstrates how to:

- **Sign arbitrary messages** with any Aptos wallet
- **Verify signatures server-side** with proper cryptographic validation
- **Handle all signature types**: Ed25519, Multi-Ed25519, Single Key, Multi Key, and Keyless
- **Support both traditional wallets** (Petra, Nightly) and **Aptos Connect** (Google login)
- **Implement proper async verification** for Keyless signatures

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │  Server Action  │    │ Signature Types │
│   (Next.js)     │    │  (Verification) │    │                 │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • Message Input │───▶│ • Type Detection│───▶│ • Ed25519       │
│ • Wallet Connect│    │ • Async/Sync    │    │ • Multi-Ed25519 │
│ • Sign Message  │    │   Verification  │    │ • Keyless       │
│ • Display Result│◀───│ • Cryptographic │    │ • Multi Key     │
└─────────────────┘    │   Validation    │    └─────────────────┘
                       └─────────────────┘
```

## 🚀 Key Features

### Multi-Signature Support

- **Ed25519**: Traditional single-key wallets (Petra, Nightly)
- **Multi-Ed25519**: Multi-signature wallets requiring multiple approvals
- **Keyless**: Aptos Connect with Google/Apple login (no private keys)
- **Multi Key**: Advanced multi-key authentication schemes

### Smart Verification

- **Automatic type detection** using `getSignInPublicKeyScheme()`
- **Synchronous verification** for traditional signatures
- **Asynchronous verification** for Keyless signatures (requires network calls)
- **Server-side validation** ensuring cryptographic integrity

### Developer Experience

- **Type-safe implementation** with full TypeScript support
- **Comprehensive error handling** with detailed error messages
- **Clean UI** showing signature details and verification results
- **Real-time verification** with immediate feedback

## 🛠️ Technical Implementation

### Frontend (`next-app/`)

- **Next.js 14** with App Router
- **Aptos Wallet Adapter** for wallet integration
- **Radix UI + Tailwind CSS** for modern UI components
- **Real-time signature type detection** and verification

### Backend Verification

- **Server Actions** for secure server-side verification
- **Aptos TypeScript SDK** for cryptographic operations
- **Multi-signature support** with proper type handling
- **Async/sync verification** based on signature type

### Key Code Components

```typescript
// Automatic signature type detection
const signatureType = getSignInPublicKeyScheme(account.publicKey);

// Smart verification based on type
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

## 🔍 Understanding Keyless vs Single Key

**Important Note**: The Aptos SDK reports Keyless signatures as `"single_key"` type, which can be confusing:

- **Keyless Authentication** (Aptos Connect): Uses JWT tokens + Zero-Knowledge proofs, no traditional private keys
- **Single Key Authentication**: Uses one Ed25519/Secp256k1 key pair stored locally

Our implementation handles this correctly by using async verification for Keyless signatures.

## 📁 Project Structure

```
aptos-verify-signed-message-example/
├── README.md                    # This file
├── next-app/                    # Next.js application
│   ├── src/
│   │   ├── app/
│   │   │   ├── actions.ts       # Server-side verification logic
│   │   │   ├── page.tsx         # Main demo page
│   │   │   └── layout.tsx       # App layout with providers
│   │   ├── components/
│   │   │   ├── MessageSigner.tsx # Main signing component
│   │   │   ├── wallet/          # Wallet connection components
│   │   │   └── ui/              # Reusable UI components
│   │   └── lib/
│   │       └── aptos.ts         # Aptos client configuration
│   ├── package.json
│   └── README.md                # Setup instructions
└── CLAUDE.md                    # Development context (can be removed)
```

## 🎨 Demo Features

### User Interface

- **Clean, modern design** with gradient backgrounds and glass effects
- **Responsive layout** that works on desktop and mobile
- **Real-time feedback** with toast notifications
- **Detailed verification results** showing all signature components

### Wallet Integration

- **Universal wallet support** via Aptos Wallet Adapter
- **Automatic wallet detection** and connection
- **Support for all major wallets**: Petra, Nightly, Aptos Connect
- **Graceful error handling** with user-friendly messages

### Verification Display

- **Signature type detection** and display
- **Full message content** verification (not just signature format)
- **Public key and signature details** in hex format
- **Success/failure indicators** with clear visual feedback

## 🏁 Getting Started

1. **Navigate to the Next.js app**:

   ```bash
   cd next-app
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm run dev
   ```

4. **Open your browser** to `http://localhost:3000`

5. **Connect a wallet** (Petra, Nightly, or Aptos Connect)

6. **Type a message** and click "Sign Message"

7. **See real-time verification** with full signature details

## 🔧 Configuration

The app works out of the box, but you can customize:

- **Network**: Set `NEXT_PUBLIC_NETWORK` environment variable
- **API Key**: Set `NEXT_PUBLIC_APTOS_API_KEY` for enhanced performance
- **Wallets**: Modify `optInWallets` in `WalletProvider.tsx`

## 📚 Learning Resources

- [Aptos Documentation](https://aptos.dev/)
- [Aptos TypeScript SDK](https://github.com/aptos-labs/aptos-ts-sdk)
- [Aptos Wallet Adapter](https://github.com/aptos-labs/aptos-wallet-adapter)
- [Keyless Authentication Guide](https://aptos.dev/network/blockchain/accounts#keyless-authentication)

## 🔗 Bootstrap Information

This project was bootstrapped from the [Aptos Full Stack Template](https://github.com/0xaptosj/aptos-full-stack-template) and simplified to focus specifically on message signing and verification across all Aptos signature types.

## 🤝 Contributing

Feel free to open issues or submit pull requests to improve this demonstration. This is particularly useful for:

- Testing with different wallet types
- Adding support for new signature schemes
- Improving the user interface
- Adding more comprehensive error handling

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

**Built with ❤️ for the Aptos ecosystem**
