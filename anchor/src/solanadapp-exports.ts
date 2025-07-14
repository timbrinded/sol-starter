// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, address, getBase58Decoder, SolanaClient } from 'gill'
import { SolanaClusterId } from '@wallet-ui/react'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { Solanadapp, SOLANADAPP_DISCRIMINATOR, SOLANADAPP_PROGRAM_ADDRESS, getSolanadappDecoder } from './client/js'
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
      return address('6z68wfurCMYkZG51s1Et9BJEd9nJGUusjHXNt4dGbNNF')
    case 'solana:mainnet':
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
