import { useUserStore } from '@/stores/userStore'
import { createRouter, createWebHistory } from 'vue-router'

const DashboardLayout = () => import('@/layouts/DashboardLayout.vue')
const FullLayout = () => import('@/layouts/FullLayout.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/auth',
      component: FullLayout,
      redirect: '/login',
      meta: {
        authRequired: false
      },
      children: [
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/views/auth/LoginView.vue')
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/views/auth/SignupView.vue')
        },
        {
          path: 'forgot-password',
          name: 'ForgotPassword',
          component: () => import('@/views/auth/ForgotPasswordView.vue')
        },
        {
          path: 'reset-password',
          name: 'ResetPassword',
          component: () => import('@/views/auth/ResetPasswordView.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: DashboardLayout,

      meta: {
        authRequired: true
      },
      children: [
        {
          path: '',
          name: 'Empty',
          component: () => import('@/views/dashboard/EmptyDashboard.vue')
        }
      ]
    },
    {
      path: '/teams',
      name: 'Teams',
      component: DashboardLayout,
      meta: {
        authRequired: true
      },
      children: [
        // {
        //   path: '',
        //   name: 'Teams',
        //   component: () => import('@/views/teams/TeamsView.vue')
        // }
        {
          path: ':id',
          name: 'Team',
          meta: {
            subNav: 'navbarTeam'
          },
          component: () => import('@/views/team/TeamDashboard.vue')
        }
      ]
    },
    {
      path: '/account',
      name: 'Account',
      component: DashboardLayout,
      redirect: '/account/overview',
      meta: {
        authRequired: true
      },
      children: [
        {
          path: 'overview',
          name: 'AccountOverview',
          meta: {
            subNav: 'navbarAccount'
          },
          // component: () => import('@/components/ProfileSettingPage.vue')
          component: () => import('@/views/account/accountSettings/AccountSettingsView.vue')
        },
        {
          path: 'activity',
          name: 'AccountActivity',
          meta: {
            subNav: 'navbarAccount'
          },
          // component: () => import('@/components/ProfileSettingPage.vue')
          component: () => import('@/views/account/accountActivity/AccountActivityView.vue')
        },
        {
          path: 'settings',
          name: 'AccountSettings',
          meta: {
            subNav: 'navbarAccount'
          },
          // component: () => import('@/components/ProfileSettingPage.vue')
          component: () => import('@/views/account/accountSettings/AccountSettingsView.vue')
        }
      ]
    }
  ]
})

export function toLogin(path?: string): void {
  const userStore = useUserStore()
  userStore.logout()
  const currentPath = router.currentRoute.value.path
  currentPath !== '/auth/login' &&
    router.push({
      path: '/auth/login'
      // query: { to: path ? path : (currentPath ?? undefined) }
    })
}

export default router
