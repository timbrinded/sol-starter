import { type createSolanaClient, generateKeyPairSigner, getExplorerLink, lamports, type LocalnetUrl } from "gill"
import { logger } from "./logging"

export type LocalnetRPC = ReturnType<typeof createSolanaClient<LocalnetUrl>>['rpc'];

export const createFundedWallet = async (rpc: LocalnetRPC, solAmount = 1) => {
    const wallet = await generateKeyPairSigner()
    const amount = lamports(BigInt(solAmount) * 1_000_000_000n)
    const sig = await rpc.requestAirdrop(
        wallet.address,
        amount,
        { commitment: 'confirmed' }
    ).send()

    const link = getExplorerLink({
        transaction: sig
    })
    logger.trace(`Airdrop for ${wallet.address}: ${link}`)

    for (let i = 0; i < 10; i++) {
        const { value } = await rpc.getBalance(wallet.address).send()
        if (value > 0n) {
            logger.debug(`Balance for ${wallet.address}: ${value} lamports`)
            return wallet
        }
        await Bun.sleep(100)
    }
    logger.error(`Failed to fund wallet ${wallet.address} after 10 attempts`)
    throw new Error(`Failed to fund wallet ${wallet.address} after 10 attempts`)
}
