import {
  SolanadappAccount,
  getCloseInstruction,
  getSolanadappProgramAccounts,
  getSolanadappProgramId,
  getDecrementInstruction,
  getIncrementInstruction,
  getInitializeInstruction,
  getSetInstruction,
} from '@project/anchor'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'
import { toast } from 'sonner'
import { generateKeyPairSigner } from 'gill'
import { useWalletUi } from '@wallet-ui/react'
import { useWalletTransactionSignAndSend } from '../solana/use-wallet-transaction-sign-and-send'
import { useClusterVersion } from '@/components/cluster/use-cluster-version'
import { toastTx } from '@/components/toast-tx'
import { useWalletUiSigner } from '@/components/solana/use-wallet-ui-signer'
import { install as installEd25519 } from '@solana/webcrypto-ed25519-polyfill'

// polyfill ed25519 for browsers (to allow `generateKeyPairSigner` to work)
installEd25519()

export function useSolanadappProgramId() {
  const { cluster } = useWalletUi()
  return useMemo(() => getSolanadappProgramId(cluster.id), [cluster])
}

export function useSolanadappProgram() {
  const { client, cluster } = useWalletUi()
  const programId = useSolanadappProgramId()
  const query = useClusterVersion()

  return useQuery({
    retry: false,
    queryKey: ['get-program-account', { cluster, clusterVersion: query.data }],
    queryFn: () => client.rpc.getAccountInfo(programId).send(),
  })
}

export function useSolanadappInitializeMutation() {
  const { cluster } = useWalletUi()
  const queryClient = useQueryClient()
  const signer = useWalletUiSigner()
  const signAndSend = useWalletTransactionSignAndSend()

  return useMutation({
    mutationFn: async () => {
      const solanadapp = await generateKeyPairSigner()
      return await signAndSend(getInitializeInstruction({ payer: signer, solanadapp }), signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await queryClient.invalidateQueries({ queryKey: ['solanadapp', 'accounts', { cluster }] })
    },
    onError: () => toast.error('Failed to run program'),
  })
}

export function useSolanadappDecrementMutation({ solanadapp }: { solanadapp: SolanadappAccount }) {
  const invalidateAccounts = useSolanadappAccountsInvalidate()
  const signer = useWalletUiSigner()
  const signAndSend = useWalletTransactionSignAndSend()

  return useMutation({
    mutationFn: async () => await signAndSend(getDecrementInstruction({ solanadapp: solanadapp.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}

export function useSolanadappIncrementMutation({ solanadapp }: { solanadapp: SolanadappAccount }) {
  const invalidateAccounts = useSolanadappAccountsInvalidate()
  const signAndSend = useWalletTransactionSignAndSend()
  const signer = useWalletUiSigner()

  return useMutation({
    mutationFn: async () => await signAndSend(getIncrementInstruction({ solanadapp: solanadapp.address }), signer),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}

export function useSolanadappSetMutation({ solanadapp }: { solanadapp: SolanadappAccount }) {
  const invalidateAccounts = useSolanadappAccountsInvalidate()
  const signAndSend = useWalletTransactionSignAndSend()
  const signer = useWalletUiSigner()

  return useMutation({
    mutationFn: async (value: number) =>
      await signAndSend(
        getSetInstruction({
          solanadapp: solanadapp.address,
          value,
        }),
        signer,
      ),
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}

export function useSolanadappCloseMutation({ solanadapp }: { solanadapp: SolanadappAccount }) {
  const invalidateAccounts = useSolanadappAccountsInvalidate()
  const signAndSend = useWalletTransactionSignAndSend()
  const signer = useWalletUiSigner()

  return useMutation({
    mutationFn: async () => {
      return await signAndSend(getCloseInstruction({ payer: signer, solanadapp: solanadapp.address }), signer)
    },
    onSuccess: async (tx) => {
      toastTx(tx)
      await invalidateAccounts()
    },
  })
}

export function useSolanadappAccountsQuery() {
  const { client } = useWalletUi()

  return useQuery({
    queryKey: useSolanadappAccountsQueryKey(),
    queryFn: async () => await getSolanadappProgramAccounts(client.rpc),
  })
}

function useSolanadappAccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useSolanadappAccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}

function useSolanadappAccountsQueryKey() {
  const { cluster } = useWalletUi()

  return ['solanadapp', 'accounts', { cluster }]
}
