import { useNavigate, useRoutes } from 'react-router'
import { lazy } from 'react'

const AccountDetailFeature = lazy(() => import('@/components/account/account-feature-detail.tsx'))
const AccountIndexFeature = lazy(() => import('@/components/account/account-feature-index.tsx'))
const SolanadappFeature = lazy(() => import('@/components/solanadapp/solanadapp-feature'))
const DashboardFeature = lazy(() => import('@/components/dashboard/dashboard-feature'))

export function AppRoutes() {
  const navigate = useNavigate()
  return useRoutes([
    { index: true, element: <DashboardFeature /> },
    {
      path: 'account',
      children: [
        {
          index: true,
          element: (
            <AccountIndexFeature
              redirect={(path: string) => {
                navigate(path)
                return null
              }}
            />
          ),
        },
        { path: ':address', element: <AccountDetailFeature /> },
      ],
    },
    {
      path: 'solanadapp',
      element: <SolanadappFeature />,
    },
  ])
}
