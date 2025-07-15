import { describe, expect, it, beforeAll, beforeEach } from 'bun:test'
import { logger } from 'utils'
import { createSolanaClient, type LocalnetUrl, type SolanaClient, generateKeyPairSigner, type KeyPairSigner, airdropFactory, lamports, type SolanaClusterMoniker } from "gill"

describe('Sample Solana Dapp Program Test', () => {
  let api: SolanaClient<LocalnetUrl>
  let alice: KeyPairSigner
  let bob: KeyPairSigner


  beforeAll(async () => {
    const cluster: SolanaClusterMoniker = "localnet";

    api = createSolanaClient({
      urlOrMoniker: cluster,
    })

    const { "solana-core": version } = await api.rpc.getVersion().send()
    logger.info(`Connected to Solana ${version}`)
  })

  beforeEach(async () => {
    alice = await generateKeyPairSigner()

    await airdropFactory({ rpc: api.rpc, rpcSubscriptions: api.rpcSubscriptions })({
      commitment: 'confirmed',
      recipientAddress: alice.address,
      lamports: lamports(1_000_000_000n),
    })
    bob = await generateKeyPairSigner()

    await airdropFactory({ rpc: api.rpc, rpcSubscriptions: api.rpcSubscriptions })({
      commitment: 'confirmed',
      recipientAddress: bob.address,
      lamports: lamports(1_000_000_000n),
    })
  })

  it('is connected to local chain', async () => {
    expect(true).toBe(true)
  })

  it('signers have balance', async () => {
    const aliceBalance = await api.rpc.getBalance(alice.address).send()
    const bobBalance = await api.rpc.getBalance(bob.address).send()
    expect(aliceBalance).toBeGreaterThan(0n)
        expect(bobBalance).toBeGreaterThan(0n)
  })


  it.skip('is deployed to chain', async () => {
    expect(true).toBe(true)
  })

  it.skip('Increment Solanadapp Again', async () => {
    expect(true).toBe(true)
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
