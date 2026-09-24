import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/loginView.vue'),
      meta: { requiresGuest: true },
    },
    {
      path: '/',
      component: () => import('../views/layout/mainLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/dashboard',
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/dashboard/dashboardView.vue'),
        },
        {
          path: 'create-order',
          name: 'create-order',
          component: () => import('../views/travel/createOrderView.vue'),
        },
        {
          path: 'history',
          name: 'history',
          component: () => import('../views/history/historyView.vue'),
        },

        // 🟢 FIX 1 & 2: Ubah parameter ke :toCode dan arahkan import ke views/history/
        {
          path: 'history/order-detail/:toCode',
          name: 'order-detail',
          component: () => import('../views/history/[toCode].vue'), // atau orderDetailView.vue jika file sudah di-rename
        },
        // {
        //   path: 'history/edit-order/:toCode',
        //   name: 'edit-order',
        //   component: () => import('../views/history/orderEditView.vue'),
        // },
        {
          path: 'history/print-pdf/:toCode',
          name: 'print-pdf',
          component: () => import('../views/history/pdfPreviewView.vue'),
        },

        {
          path: 'approvals',
          name: 'approvals',
          component: () => import('../views/history/approvalView.vue'),
        },
        {
          path: 'reports',
          name: 'reports-hub',
          component: () => import('../views/history/reportsHubView.vue'),
        },
        {
          path: 'reports/hotel',
          name: 'reports-hotel',
          component: () => import('@/components/report/hotel/hotelReportView.vue'),
        },
        {
          path: 'reports/transport',
          name: 'reports-transport',
          component: () => import('@/components/report/transport/transportReportView.vue'),
        },
        {
          path: 'master/vendors',
          name: 'master-vendors',
          component: () => import('../views/master/masterVendorView.vue'),
        },
        {
          path: 'master/vendors/create',
          name: 'master-vendors-create',
          component: () => import('../views/master/addVendorView.vue'),
        },
        {
          path: 'master/budget',
          name: 'master-budget',
          component: () => import('../views/master/budgetCoaView.vue'),
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/admin/userManagementView.vue'),
        },
      ],
    },
  ],
})

// Navigation Guard
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  if (!authStore.isAuthenticated) {
    await authStore.fetchUser()
  }

  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' })
  }

  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: 'dashboard' })
  }

  next()
})

export default router
