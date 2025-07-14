# Solana Dapp Development Guidelines

## Current Tech Stack

- **Framework**: React + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Solana Development**: 
  - Anchor framework
  - gill (Solana client library)
  - @wallet-ui/react for wallet integration
- **State Management**: Jotai
- **Routing**: React Router v7
- **UI Components**: Radix UI with custom components
- **Testing**: Bun native test runner
- **Code Quality**:
  - **Formatter**: Biome
  - **Linter**: Biome
  - **Type Checking**: TypeScript

## Essential Commands for Static Checking

Before committing or submitting code, ALWAYS run these commands in order:

1. **Type Check**: `bun run typecheck`
   - Ensures all TypeScript types are correct
   - Uses `tsc -b --noEmit` to check all project references

2. **Lint**: `bun run lint`
   - Checks for code quality issues and potential bugs
   - Configured via `biome.json`

3. **Format Check**: `bun run format:check`
   - Verifies code formatting consistency
   - To auto-fix: `bun run format`

4. **Run Tests**: `bun test`
   - Executes all test files using Bun's native test runner
   - Test files should use `.test.ts` or `.test.tsx` extensions

## Quick All-Checks Command

Run all checks at once:
```bash
bun run typecheck && bun run lint && bun run format:check && bun test
```

## Configuration Files

- `biome.json` - Formatting and linting rules
- `tsconfig.json` - TypeScript configuration (project references)
- `tsconfig.app.json` - Application TypeScript config
- `tsconfig.node.json` - Node/build tools TypeScript config

## Development Workflow

1. Make changes to code
2. Run `bun run typecheck` to catch type errors
3. Run `bun run lint` to check for code issues
4. Run `bun run format` to auto-format code
5. Run `bun test` to ensure tests pass
6. Commit changes only after all checks pass