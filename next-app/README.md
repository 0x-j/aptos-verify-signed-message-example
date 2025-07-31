# Aptos Message Signing Demo - Next.js App

A Next.js application demonstrating message signing and verification across all Aptos signature types.

## 📋 Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn** package manager
- An **Aptos wallet** (Petra, Nightly) or **Google account** for Aptos Connect

## 🚀 Quick Start

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** to [http://localhost:3000](http://localhost:3000)

4. **Connect a wallet** and start signing messages!

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎯 How to Use

1. **Connect Wallet**: Click "Connect a Wallet" in the header
2. **Choose Wallet Type**:
   - **Petra/Nightly**: Traditional Ed25519 wallets
   - **Continue with Google**: Aptos Connect (Keyless)
3. **Enter Message**: Type any message you want to sign
4. **Sign Message**: Click "Sign Message" button
5. **View Results**: See signature verification in real-time

## 🛠️ Key Components

### `MessageSigner.tsx`

Main component handling:

- User input for messages
- Wallet integration via `useWallet()` hook
- Signature type detection with `getSignInPublicKeyScheme()`
- Server-side verification via server actions

### `actions.ts` (Server Actions)

Server-side verification logic:

- Handles all signature types (Ed25519, Multi-Ed25519, Keyless, Multi-Key)
- Uses appropriate sync/async verification methods
- Returns detailed verification results

### Wallet Integration

- **WalletProvider**: Configures Aptos Wallet Adapter
- **WalletSelector**: Handles wallet connection UI
- **Supported Wallets**: Petra, Nightly, Aptos Connect

## 🔍 Technical Details

### Signature Type Handling

The app automatically detects and handles different signature types:

- **`ed25519`**: Traditional single-key wallets → Sync verification
- **`multi_ed25519`**: Multi-signature wallets → Sync verification
- **`single_key`**: Keyless/Aptos Connect → Async verification
- **`multi_key`**: Advanced multi-key schemes → Sync verification

### Verification Process

1. **Frontend**: Detects signature type using SDK
2. **Server**: Creates appropriate public key and signature objects
3. **Verification**: Uses sync or async verification based on type
4. **Response**: Returns verification result with detailed information

## 🎨 Styling

- **Framework**: Tailwind CSS with custom design system
- **Components**: Radix UI primitives
- **Theme**: Dark/light mode support via `next-themes`
- **Design**: Modern glass morphism effects and gradients

## 📁 Project Structure

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
    ├── aptos.ts          # Aptos client configuration
    └── utils.ts          # Utility functions
```

## 🌐 Environment Variables (Optional)

Create a `.env.local` file for optional configuration:

```bash
# Network configuration (defaults to devnet)
NEXT_PUBLIC_NETWORK=devnet

# API key for enhanced performance (optional)
NEXT_PUBLIC_APTOS_API_KEY=your_api_key_here
```

## 🐛 Troubleshooting

### Common Issues

1. **Wallet not connecting**: Make sure you have Petra or Nightly installed
2. **Signature verification fails**: Check that you're on the correct network
3. **Build errors**: Ensure all dependencies are properly installed with `npm install`

### Signature Type Issues

If you see unexpected signature types:

- **Petra/Nightly**: Should show `ed25519`
- **Aptos Connect**: Shows `single_key` (actually Keyless)
- **Multi-sig wallets**: Should show `multi_ed25519` or `multi_key`

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Aptos TypeScript SDK](https://github.com/aptos-labs/aptos-ts-sdk)
- [Aptos Wallet Adapter](https://github.com/aptos-labs/aptos-wallet-adapter)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/docs)

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- Railway
- Digital Ocean
- AWS Amplify

## 🤝 Contributing

Issues and pull requests are welcome! This demo is particularly useful for:

- Testing different wallet integrations
- Improving error handling
- Adding new signature type support
- Enhancing the user interface

---

**Happy signing! 🔐**
