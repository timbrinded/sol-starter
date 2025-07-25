/**
 * This code was AUTOGENERATED using the codama library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun codama to update it.
 *
 * @see https://github.com/codama-idl/codama
 */

import {
  assertAccountExists,
  assertAccountsExist,
  combineCodec,
  decodeAccount,
  fetchEncodedAccount,
  fetchEncodedAccounts,
  fixDecoderSize,
  fixEncoderSize,
  getBytesDecoder,
  getBytesEncoder,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  transformEncoder,
  type Account,
  type Address,
  type Codec,
  type Decoder,
  type EncodedAccount,
  type Encoder,
  type FetchAccountConfig,
  type FetchAccountsConfig,
  type MaybeAccount,
  type MaybeEncodedAccount,
  type ReadonlyUint8Array,
} from 'gill'

export const SOLANADAPP_DISCRIMINATOR = new Uint8Array([183, 218, 240, 102, 143, 38, 143, 116])

export function getSolanadappDiscriminatorBytes() {
  return fixEncoderSize(getBytesEncoder(), 8).encode(SOLANADAPP_DISCRIMINATOR)
}

export type Solanadapp = { discriminator: ReadonlyUint8Array; count: number }

export type SolanadappArgs = { count: number }

export function getSolanadappEncoder(): Encoder<SolanadappArgs> {
  return transformEncoder(
    getStructEncoder([
      ['discriminator', fixEncoderSize(getBytesEncoder(), 8)],
      ['count', getU8Encoder()],
    ]),
    (value) => ({ ...value, discriminator: SOLANADAPP_DISCRIMINATOR }),
  )
}

export function getSolanadappDecoder(): Decoder<Solanadapp> {
  return getStructDecoder([
    ['discriminator', fixDecoderSize(getBytesDecoder(), 8)],
    ['count', getU8Decoder()],
  ])
}

export function getSolanadappCodec(): Codec<SolanadappArgs, Solanadapp> {
  return combineCodec(getSolanadappEncoder(), getSolanadappDecoder())
}

export function decodeSolanadapp<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress>,
): Account<Solanadapp, TAddress>
export function decodeSolanadapp<TAddress extends string = string>(
  encodedAccount: MaybeEncodedAccount<TAddress>,
): MaybeAccount<Solanadapp, TAddress>
export function decodeSolanadapp<TAddress extends string = string>(
  encodedAccount: EncodedAccount<TAddress> | MaybeEncodedAccount<TAddress>,
): Account<Solanadapp, TAddress> | MaybeAccount<Solanadapp, TAddress> {
  return decodeAccount(encodedAccount as MaybeEncodedAccount<TAddress>, getSolanadappDecoder())
}

export async function fetchSolanadapp<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig,
): Promise<Account<Solanadapp, TAddress>> {
  const maybeAccount = await fetchMaybeSolanadapp(rpc, address, config)
  assertAccountExists(maybeAccount)
  return maybeAccount
}

export async function fetchMaybeSolanadapp<TAddress extends string = string>(
  rpc: Parameters<typeof fetchEncodedAccount>[0],
  address: Address<TAddress>,
  config?: FetchAccountConfig,
): Promise<MaybeAccount<Solanadapp, TAddress>> {
  const maybeAccount = await fetchEncodedAccount(rpc, address, config)
  return decodeSolanadapp(maybeAccount)
}

export async function fetchAllSolanadapp(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig,
): Promise<Account<Solanadapp>[]> {
  const maybeAccounts = await fetchAllMaybeSolanadapp(rpc, addresses, config)
  assertAccountsExist(maybeAccounts)
  return maybeAccounts
}

export async function fetchAllMaybeSolanadapp(
  rpc: Parameters<typeof fetchEncodedAccounts>[0],
  addresses: Array<Address>,
  config?: FetchAccountsConfig,
): Promise<MaybeAccount<Solanadapp>[]> {
  const maybeAccounts = await fetchEncodedAccounts(rpc, addresses, config)
  return maybeAccounts.map((maybeAccount) => decodeSolanadapp(maybeAccount))
}

export function getSolanadappSize(): number {
  return 9
}
