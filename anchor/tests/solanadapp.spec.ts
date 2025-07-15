import { describe, expect, it, beforeAll, beforeEach } from 'bun:test'
import { createFundedWallet, logger } from 'utils'
import { createSolanaClient, type LocalnetUrl, type SolanaClient, type KeyPairSigner, createTransaction, getBase58Decoder, sendAndConfirmTransactionWithSignersFactory, generateKeyPairSigner } from "gill"
import { getInitializeInstruction, SOLANADAPP_PROGRAM_ADDRESS } from "client-js"
import { getSolanadappProgramAccounts } from '@project/anchor'
describe('Sample Solana Dapp Program Test', () => {
  let api: SolanaClient<LocalnetUrl>
  let alice: KeyPairSigner
  let bob: KeyPairSigner


  beforeAll(async () => {
    api = createSolanaClient({
      urlOrMoniker: "localnet",
    })

    const { "solana-core": version } = await api.rpc.getVersion().send()
    logger.info(`Connected to Solana ${version}`)
    api.rpc
  })

  beforeEach(async () => {
    alice = await createFundedWallet(api.rpc)
    bob = await createFundedWallet(api.rpc)
  })

  it('is connected to local chain', async () => {
    const resp = api.rpc.getClusterNodes().send()
    logger.info(`Health: ${await resp}`)
    expect(true).toBe(true)
  })

  it('signers have balance', async () => {
    const { value: aliceBalance } = await api.rpc.getBalance(alice.address).send()
    const { value: bobBalance } = await api.rpc.getBalance(bob.address).send()
    expect(aliceBalance).toBeGreaterThan(0n)
    expect(bobBalance).toBeGreaterThan(0n)
  })


  it('is deployed to chain', async () => {
    const { value } = await api.rpc.getAccountInfo(SOLANADAPP_PROGRAM_ADDRESS).send()
    logger.trace(value)
    expect(value?.executable).toBe(true)

  })

  it('can initialise', async () => {
    const accounts = (await getSolanadappProgramAccounts(api.rpc))
    logger.info(accounts)
    expect(accounts.length).toBe(0)

    const { value: latestBlockhash } = await api.rpc.getLatestBlockhash().send()
    
    // Generate a new keypair for the solanadapp account
    const solanadappAccount = await generateKeyPairSigner()
    
    const transaction = createTransaction({
      feePayer: alice,
      version: 0,
      latestBlockhash,
      instructions: [getInitializeInstruction({
        payer: alice,
        solanadapp: solanadappAccount,
      })],
    })

    // Create the sendAndConfirm function for our localnet
    const sendAndConfirmTransaction = sendAndConfirmTransactionWithSignersFactory({
      rpc: api.rpc,
      rpcSubscriptions: api.rpcSubscriptions
    })

    const signature = await sendAndConfirmTransaction(transaction, {
      commitment: 'confirmed'
    })
    
    logger.info(`Transaction signature: ${signature}`)
    const accounts2 = (await getSolanadappProgramAccounts(api.rpc))
    logger.info(accounts2)
    expect(accounts2.length).toBe(1)
  })

  it.skip('Decrement Solanadapp', async () => {
    expect(true).toBe(true)
  })

  it.skip('Set solanadapp value', async () => {
    expect(true).toBe(true)
  })

  it.skip('Set close the solanadapp account', async () => {
    expect(true).toBe(true)
  })
})
