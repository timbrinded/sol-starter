import { ellipsify } from '@wallet-ui/react'
import {
  useSolanadappAccountsQuery,
  useSolanadappCloseMutation,
  useSolanadappDecrementMutation,
  useSolanadappIncrementMutation,
  useSolanadappInitializeMutation,
  useSolanadappProgram,
  useSolanadappProgramId,
  useSolanadappSetMutation,
} from './solanadapp-data-access'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ExplorerLink } from '../cluster/cluster-ui'
import { SolanadappAccount } from '@project/anchor'
import { ReactNode } from 'react'

export function SolanadappProgramExplorerLink() {
  const programId = useSolanadappProgramId()

  return <ExplorerLink address={programId.toString()} label={ellipsify(programId.toString())} />
}

export function SolanadappList() {
  const solanadappAccountsQuery = useSolanadappAccountsQuery()

  if (solanadappAccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!solanadappAccountsQuery.data?.length) {
    return (
      <div className="text-center">
        <h2 className={'text-2xl'}>No accounts</h2>
        No accounts found. Initialize one to get started.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {solanadappAccountsQuery.data?.map((solanadapp) => (
        <SolanadappCard key={solanadapp.address} solanadapp={solanadapp} />
      ))}
    </div>
  )
}

export function SolanadappProgramGuard({ children }: { children: ReactNode }) {
  const programAccountQuery = useSolanadappProgram()

  if (programAccountQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!programAccountQuery.data?.value) {
    return (
      <div className="alert alert-info flex justify-center">
        <span>Program account not found. Make sure you have deployed the program and are on the correct cluster.</span>
      </div>
    )
  }

  return children
}

function SolanadappCard({ solanadapp }: { solanadapp: SolanadappAccount }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Solanadapp: {solanadapp.data.count}</CardTitle>
        <CardDescription>
          Account: <ExplorerLink address={solanadapp.address} label={ellipsify(solanadapp.address)} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-evenly">
          <SolanadappButtonIncrement solanadapp={solanadapp} />
          <SolanadappButtonSet solanadapp={solanadapp} />
          <SolanadappButtonDecrement solanadapp={solanadapp} />
          <SolanadappButtonClose solanadapp={solanadapp} />
        </div>
      </CardContent>
    </Card>
  )
}

export function SolanadappButtonInitialize() {
  const mutationInitialize = useSolanadappInitializeMutation()

  return (
    <Button onClick={() => mutationInitialize.mutateAsync()} disabled={mutationInitialize.isPending}>
      Initialize Solanadapp {mutationInitialize.isPending && '...'}
    </Button>
  )
}

export function SolanadappButtonIncrement({ solanadapp }: { solanadapp: SolanadappAccount }) {
  const incrementMutation = useSolanadappIncrementMutation({ solanadapp })

  return (
    <Button variant="outline" onClick={() => incrementMutation.mutateAsync()} disabled={incrementMutation.isPending}>
      Increment
    </Button>
  )
}

export function SolanadappButtonSet({ solanadapp }: { solanadapp: SolanadappAccount }) {
  const setMutation = useSolanadappSetMutation({ solanadapp })

  return (
    <Button
      variant="outline"
      onClick={() => {
        const value = window.prompt('Set value to:', solanadapp.data.count.toString() ?? '0')
        if (!value || parseInt(value) === solanadapp.data.count || isNaN(parseInt(value))) {
          return
        }
        return setMutation.mutateAsync(parseInt(value))
      }}
      disabled={setMutation.isPending}
    >
      Set
    </Button>
  )
}

export function SolanadappButtonDecrement({ solanadapp }: { solanadapp: SolanadappAccount }) {
  const decrementMutation = useSolanadappDecrementMutation({ solanadapp })

  return (
    <Button variant="outline" onClick={() => decrementMutation.mutateAsync()} disabled={decrementMutation.isPending}>
      Decrement
    </Button>
  )
}

export function SolanadappButtonClose({ solanadapp }: { solanadapp: SolanadappAccount }) {
  const closeMutation = useSolanadappCloseMutation({ solanadapp })

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (!window.confirm('Are you sure you want to close this account?')) {
          return
        }
        return closeMutation.mutateAsync()
      }}
      disabled={closeMutation.isPending}
    >
      Close
    </Button>
  )
}
