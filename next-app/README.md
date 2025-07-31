# Aptos Message Signing Demo - Next.js App

A Next.js application demonstrating message signing and verification across all Aptos signature types.

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- An Aptos wallet (Petra, Nightly) or Google account for Aptos Connect

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   ```

3. Open your browser to [http://localhost:3000](http://localhost:3000)

4. Connect a wallet and start signing messages!

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## How to Use

1. **Connect Wallet**: Click "Connect a Wallet" in the header
2. **Choose Wallet Type**:
   - **Petra/Nightly**: Traditional Ed25519 wallets
   - **Continue with Google**: Aptos Connect (Keyless)
3. **Enter Message**: Type any message you want to sign
4. **Sign Message**: Click "Sign Message" button
5. **View Results**: See signature verification in real-time

## Key Components

### `MessageSigner.tsx`

Main component handling user input, wallet integration, and signature verification.

### `actions.ts` (Server Actions)

Server-side verification logic that handles all signature types using appropriate sync/async verification methods.

### Wallet Integration

- **WalletProvider**: Configures Aptos Wallet Adapter
- **WalletSelector**: Handles wallet connection UI
- **Supported Wallets**: Petra, Nightly, Aptos Connect

## Technical Details

### Signature Type Handling

The app automatically detects and handles different signature types:

- **`ed25519`**: Traditional single-key wallets → Sync verification
- **`multi_ed25519`**: Multi-signature wallets → Sync verification
- **`single_key`**: Keyless/Aptos Connect → Async verification
- **`multi_key`**: Advanced multi-key schemes → Sync verification

### Verification Process

1. Frontend detects signature type using SDK
2. Server creates appropriate public key and signature objects
3. Uses sync or async verification based on type
4. Returns verification result with detailed information

## Project Structure

```
src/
├── app/
│   ├── actions.ts          # Server-side verification
│   ├── page.tsx           # Main demo page
│   ├── layout.tsx         # App layout with providers
│   └── globals.css        # Global styles
├── components/
│   ├── MessageSigner.tsx  # Main signing component
│   ├── providers/         # React context providers
│   ├── wallet/           # Wallet connection components
│   └── ui/               # Reusable UI components
└── lib/
    └── utils.ts          # Utility functions
```

## Troubleshooting

### Common Issues

1. **Wallet not connecting**: Make sure you have Petra or Nightly installed
2. **Signature verification fails**: Check that you're on the correct network
3. **Build errors**: Ensure all dependencies are properly installed with `npm install`

### Signature Type Issues

If you see unexpected signature types:

- **Petra/Nightly**: Should show `ed25519`
- **Aptos Connect**: Shows `single_key` (actually Keyless)
- **Multi-sig wallets**: Should show `multi_ed25519` or `multi_key`

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Aptos TypeScript SDK](https://github.com/aptos-labs/aptos-ts-sdk)
- [Aptos Wallet Adapter](https://github.com/aptos-labs/aptos-wallet-adapter)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs)

## Deployment

The app can be deployed to any platform supporting Next.js:

- **Vercel** (recommended): Connect GitHub repo and deploy automatically
- **Netlify**
- **Railway**
- **Digital Ocean**
- **AWS Amplify**
