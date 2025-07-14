// Here we export some useful types and functions for interacting with the Anchor program.
import { type Account, address, getBase58Decoder, type SolanaClient } from 'gill'
import type { SolanaClusterId } from '@wallet-ui/react'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import {
  type Solanadapp,
  SOLANADAPP_DISCRIMINATOR,
  SOLANADAPP_PROGRAM_ADDRESS,
  getSolanadappDecoder,
} from './client/js'
import SolanadappIDL from '../target/idl/solanadapp.json'

export type SolanadappAccount = Account<Solanadapp, string>

// Re-export the generated IDL and type
export { SolanadappIDL }

// This is a helper function to get the program ID for the Solanadapp program depending on the cluster.
export function getSolanadappProgramId(cluster: SolanaClusterId) {
  switch (cluster) {
    case 'solana:devnet':
    case 'solana:testnet':
      // This is the program ID for the Solanadapp program on devnet and testnet.
      return address('4BTeVU7EXaDVCvYbZiWLgYinhiR4iJL7hhyRzwdP2au5')
    default:
      return SOLANADAPP_PROGRAM_ADDRESS
  }
}

export * from './client/js'

export function getSolanadappProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getSolanadappDecoder(),
    filter: getBase58Decoder().decode(SOLANADAPP_DISCRIMINATOR),
    programAddress: SOLANADAPP_PROGRAM_ADDRESS,
  })
}
