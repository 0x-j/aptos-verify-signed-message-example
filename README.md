# Aptos Message Signing & Verification Demo

A demonstration of message signing and verification across all Aptos signature types, including traditional wallets and Keyless authentication (Aptos Connect).

## Features

- **Sign arbitrary messages** with any Aptos wallet
- **Verify signatures server-side** with proper cryptographic validation
- **Handle all signature types**: Ed25519, Multi-Ed25519, Keyless, and Multi-Key
- **Support both traditional wallets** (Petra, Nightly) and **Aptos Connect** (Google login)

## Architecture

- **Frontend**: Next.js with wallet integration and message input
- **Backend**: Server actions for signature verification
- **Verification**: Automatic type detection with sync/async verification

## Supported Signature Types

- **Ed25519**: Traditional single-key wallets (Petra, Nightly)
- **Multi-Ed25519**: Multi-signature wallets requiring multiple approvals
- **Keyless**: Aptos Connect with Google/Apple login (no private keys)
- **Multi Key**: Advanced multi-key authentication schemes

## Quick Start

1. Navigate to the Next.js app:

   ```bash
   cd next-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser

5. Connect a wallet and start signing messages!

## Project Structure

```
aptos-verify-signed-message-example/
├── README.md                    # This file
└── next-app/                    # Next.js application
    ├── src/
    │   ├── app/
    │   │   ├── actions.ts       # Server-side verification logic
    │   │   ├── page.tsx         # Main demo page
    │   │   └── layout.tsx       # App layout with providers
    │   ├── components/
    │   │   ├── MessageSigner.tsx # Main signing component
    │   │   ├── wallet/          # Wallet connection components
    │   │   └── ui/              # Reusable UI components
    └── package.json
```

## Technical Details

The app automatically detects signature types and uses appropriate verification methods:

- **Keyless signatures** (reported as "single_key") use async verification
- **Traditional signatures** use sync verification
- **Server-side validation** ensures cryptographic integrity

## Resources

- [Aptos Documentation](https://aptos.dev/)
- [Aptos TypeScript SDK](https://github.com/aptos-labs/aptos-ts-sdk)
- [Aptos Wallet Adapter](https://github.com/aptos-labs/aptos-wallet-adapter)
