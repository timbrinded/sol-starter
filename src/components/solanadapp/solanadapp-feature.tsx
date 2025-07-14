import { WalletButton } from '../solana/solana-provider'
import { SolanadappButtonInitialize, SolanadappList, SolanadappProgramExplorerLink, SolanadappProgramGuard } from './solanadapp-ui'
import { AppHero } from '../app-hero'
import { useWalletUi } from '@wallet-ui/react'

export default function SolanadappFeature() {
  const { account } = useWalletUi()

  return (
    <SolanadappProgramGuard>
      <AppHero
        title="Solanadapp"
        subtitle={
          account
            ? "Initialize a new solanadapp onchain by clicking the button. Use the program's methods (increment, decrement, set, and close) to change the state of the account."
            : 'Select a wallet to run the program.'
        }
      >
        <p className="mb-6">
          <SolanadappProgramExplorerLink />
        </p>
        {account ? (
          <SolanadappButtonInitialize />
        ) : (
          <div style={{ display: 'inline-block' }}>
            <WalletButton />
          </div>
        )}
      </AppHero>
      {account ? <SolanadappList /> : null}
    </SolanadappProgramGuard>
  )
}
