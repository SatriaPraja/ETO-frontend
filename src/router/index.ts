import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 1. RUTE LOGIN
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
          component: () => import('../views/monitor/historyView.vue'),
        },
        {
          path: 'history/order-detail/:id?',
          name: 'order-detail',
          component: () => import('../views/travel/orderDetailView.vue'),
        },
        {
          path: 'history/edit-order/:id?',
          name: 'edit-order',
          component: () => import('../views/travel/orderEditView.vue'),
        },
        {
          path: 'history/print-pdf/:id?',
          name: 'print-pdf',
          component: () => import('../views/monitor/pdfPreviewView.vue'),
        },
        {
          path: 'approvals',
          name: 'approvals',
          component: () => import('../views/monitor/approvalView.vue'),
        },
        {
          path: 'reports',
          name: 'reports-hub',
          component: () => import('../views/monitor/reportsHubView.vue'),
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

// Navigation Guard Proteksi Sesi
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  // Verifikasi sesi cookie saat perama kali aplikasi dimuat
  if (!authStore.isAuthenticated) {
    await authStore.fetchUser()
  }

  // Jika rute butuh auth dan user belum login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' })
  }

  // Jika user sudah terotentikasi tetapi membuka /login
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: 'dashboard' })
  }

  next()
})

export default router
