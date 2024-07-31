import { useUserStore } from '@/stores/userStore'
import { createRouter, createWebHistory } from 'vue-router'

const Layout = () => import('@/layouts/MainLayout.vue')
const HomeLayout = () => import('@/layouts/HomeLayout.vue')
const FullLayout = () => import('@/layouts/FullLayout.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeLayout,
      redirect: '/auth/login',
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/HomeView.vue')
        }
      ]
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
          component: () => import('@/views/Auth/LoginView.vue')
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/views/Auth/SignupView.vue')
        },
        {
          path: 'forgot-password',
          name: 'ForgotPassword',
          component: () => import('@/views/Auth/ForgotPasswordView.vue')
        },
        {
          path: 'reset-password',
          name: 'ResetPassword',
          component: () => import('@/views/Auth/ResetPasswordView.vue')
        }
      ]
    },
    {
      path: '/dashboard',
      component: Layout,
      redirect: '/dashboard/overview',
      meta: {
        authRequired: true
      },
      children: [
        {
          path: 'overview',
          name: 'Overview',
          component: () => import('@/views/OverviewView.vue')
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
