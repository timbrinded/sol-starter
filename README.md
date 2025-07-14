# 🚀 Modern Solana dApp Starter Template

A production-ready starter template for building Solana dApps with the latest web technologies. Fork this to jumpstart your next Solana project with a modern, type-safe, and blazing-fast development experience.

## ⚡ Tech Stack

| Technology | Purpose | Why We Chose It |
|------------|---------|-----------------|
| [Bun](https://bun.sh/) | Runtime & Package Manager | Faster than Node.js/npm with built-in TypeScript support and native test runner |
| [React 19](https://react.dev/) | UI Framework | Latest React features with improved performance and server components support |
| [TypeScript](https://www.typescriptlang.org/) | Type Safety | Essential for complex dApp development with compile-time error catching |
| [Vite](https://vite.dev/) | Build Tool | Lightning-fast HMR and optimized production builds |
| [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4-beta) | Styling | Next-gen CSS framework with Vite integration for instant style updates |
| [Biome](https://biomejs.dev/) | Linter & Formatter | All-in-one replacement for ESLint/Prettier, 20x faster with great defaults |
| [gill](https://gill.site/) | Solana Client | Type-safe Solana interactions with modern API design |
| [@wallet-ui/react](https://www.npmjs.com/package/@wallet-ui/react) | Wallet UI | Beautiful, accessible wallet components with multi-wallet support |
| [Anchor](https://www.anchor-lang.com/) | Smart Contracts | Industry-standard framework for Solana program development |
| [Codama](https://github.com/codama-idl/codama) | Client Generation | Automatic TypeScript client generation from Anchor IDL |
| [TanStack Query](https://tanstack.com/query) | Data Fetching | Powerful async state management with caching and synchronization |
| [Jotai](https://jotai.org/) | State Management | Primitive and flexible state management for React |
| [React Router v7](https://reactrouter.com/) | Routing | Type-safe routing with the latest React Router features |

## 🛠️ Prerequisites

- [Bun](https://bun.sh/) v1.2+ (install with `curl -fsSL https://bun.sh/install | bash`)
- [Rust](https://www.rust-lang.org/tools/install) (for Anchor development)
- [Anchor CLI](https://www.anchor-lang.com/docs/installation) v0.30+
- [Solana CLI](https://solana.com/docs/intro/installation) v2.0+

## 🚀 Getting Started

### 1. Fork or Clone This Template

```bash
# Clone the repository
git clone https://github.com/timbrinded/sol-starter.git
cd sol-starter

# Install dependencies
bun install
```

### 2. Set Up Your Solana Program

```bash
# Generate a new program keypair and sync it
bun run setup

# This command:
# - Creates a new keypair in anchor/target/deploy
# - Updates the program ID in lib.rs
# - Generates TypeScript client code
```

### 3. Start Development

```bash
# Terminal 1: Start local Solana validator with your program
bun run anchor-localnet

# Terminal 2: Start the web app with hot reload
bun run dev
```

Your app will be available at http://localhost:5173

## 📁 Repository Structure

```
solana-dapp-starter/
│
├── anchor/                    # Solana program (smart contract)
│   ├── programs/             # Rust program source code
│   │   └── solanadapp/      # Your Anchor program
│   │       └── src/
│   │           └── lib.rs   # Program entrypoint
│   ├── src/                 # Generated TypeScript client
│   │   ├── client/          # Auto-generated from IDL
│   │   ├── helpers/         # Utility functions
│   │   └── solanadapp-exports.ts # Re-exports for easy imports
│   ├── target/              # Build artifacts (git-ignored)
│   └── tests/               # Program tests
│
├── src/                      # React frontend
│   ├── components/          # React components
│   │   ├── account/        # Wallet account components
│   │   ├── cluster/        # Solana cluster selection
│   │   ├── dashboard/      # Main app dashboard
│   │   ├── solana/         # Solana-specific providers
│   │   ├── solanadapp/     # Program-specific UI
│   │   └── ui/             # Reusable UI components
│   ├── lib/                # Utility functions
│   ├── app-routes.tsx      # Route definitions
│   └── main.tsx           # App entrypoint
│
├── public/                  # Static assets
├── biome.json              # Linter/formatter config
├── tsconfig.json           # TypeScript config
└── vite.config.ts          # Vite bundler config
```

## 🔧 Available Commands

### Development
```bash
bun run dev          # Start dev server
bun run build        # Build for production
bun run preview      # Preview production build
```

### Code Quality
```bash
bun run typecheck    # Type check all TypeScript files
bun run lint         # Lint code with Biome
bun run fmt          # Format code with Biome
bun run fmt:check    # Check formatting without changes
bun test             # Run tests with Bun test runner
```

### Solana Program
```bash
bun run anchor-build     # Build the Anchor program
bun run anchor-test      # Run program tests
bun run anchor-localnet  # Start local validator
bun run anchor deploy --provider.cluster devnet  # Deploy to devnet
```

## 🏗️ Building Your dApp

### 1. Modify the Solana Program

Edit `anchor/programs/solanadapp/src/lib.rs` to add your program logic:

```rust
// Your program logic here
```

After changes, rebuild and regenerate the client:
```bash
bun run anchor-build
bun run codama:js
```

### 2. Create React Components

Add your UI components in `src/components/`. The template includes examples for:
- Wallet connection (`solana/solana-provider.tsx`)
- Account balance display (`account/`)
- Program interaction (`solanadapp/`)

### 3. Add Routes

Define new pages in `src/app-routes.tsx`:

```typescript
const routes = [
  { path: '/your-page', element: <YourComponent /> }
]
```

## 🚢 Deployment

### Deploy Solana Program

1. Configure your wallet:
```bash
solana config set --keypair ~/.config/solana/id.json
```

2. Deploy to devnet:
```bash
bun run anchor deploy --provider.cluster devnet
```

3. Update `anchor/src/solanadapp-exports.ts` with your deployed program ID

### Deploy Frontend

Build and deploy to your preferred hosting:

```bash
bun run build
# Deploy dist/ folder to Vercel, Netlify, etc.
```

## 📚 Key Features

- **Type-Safe Everything**: Full TypeScript coverage from smart contracts to UI
- **Lightning Fast**: Bun + Vite + Biome for the fastest possible DX
- **Modern React**: Latest React 19 features with Suspense and Server Components ready
- **Beautiful UI**: Pre-configured with Tailwind CSS v4 and Radix UI components
- **Wallet Ready**: Multi-wallet support with beautiful connection UI
- **Production Ready**: Proper error boundaries, loading states, and toast notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this template for any project!
