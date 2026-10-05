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
          meta: {
            roles: [
              'SUPER_ADMIN',
              'OFFICIAL_BOOKER',
              'APPROVER_KAKANWIL',
              'ADMIN_TRAVEL_KP',
              'ASDEP_KEUANGAN',
            ],
          },
        },

        // Pemesanan / Order (Hanya Super Admin & Official Booker)
        {
          path: 'create-travel-order',
          name: 'create-travel-order',
          component: () => import('../views/order/createTravelOrderView.vue'),
          meta: { roles: ['SUPER_ADMIN', 'OFFICIAL_BOOKER'] },
        },
        {
          path: 'create-transport-order',
          name: 'create-transport-order',
          component: () => import('../views/order/createTransportOrderView.vue'),
          meta: { roles: ['SUPER_ADMIN', 'OFFICIAL_BOOKER'] },
        },
        {
          path: 'create-hotel-order',
          name: 'create-hotel-order',
          component: () => import('../views/order/createHotelOrderView.vue'),
          meta: { roles: ['SUPER_ADMIN', 'OFFICIAL_BOOKER'] },
        },

        // Monitoring & Audit
        {
          path: 'history',
          name: 'history',
          component: () => import('../views/history/historyView.vue'),
          meta: {
            roles: [
              'SUPER_ADMIN',
              'OFFICIAL_BOOKER',
              'APPROVER_KAKANWIL',
              'ADMIN_TRAVEL_KP',
              'ASDEP_KEUANGAN',
            ],
          },
        },
        {
          path: 'history/order-detail/:toCode',
          name: 'order-detail',
          component: () => import('../views/history/[toCode].vue'),
          meta: {
            roles: [
              'SUPER_ADMIN',
              'OFFICIAL_BOOKER',
              'APPROVER_KAKANWIL',
              'ADMIN_TRAVEL_KP',
              'ASDEP_KEUANGAN',
            ],
          },
        },
        {
          path: 'history/edit-order/:toCode',
          name: 'edit-order',
          component: () => import('../views/history/orderEditView.vue'),
          meta: { roles: ['SUPER_ADMIN', 'OFFICIAL_BOOKER'] },
        },
        {
          path: 'history/print-pdf/:toCode',
          name: 'print-pdf',
          component: () => import('../views/history/pdfPreviewView.vue'),
          meta: {
            roles: [
              'SUPER_ADMIN',
              'OFFICIAL_BOOKER',
              'APPROVER_KAKANWIL',
              'ADMIN_TRAVEL_KP',
              'ASDEP_KEUANGAN',
            ],
          },
        },
        {
          path: 'approvals',
          name: 'approvals',
          component: () => import('../views/history/approvalView.vue'),
          meta: { roles: ['SUPER_ADMIN', 'APPROVER_KAKANWIL', 'ADMIN_TRAVEL_KP'] },
        },
        {
          path: 'reports',
          name: 'reports-hub',
          component: () => import('../views/history/reportsHubView.vue'),
          meta: {
            roles: ['SUPER_ADMIN', 'APPROVER_KAKANWIL', 'ADMIN_TRAVEL_KP', 'ASDEP_KEUANGAN'],
          },
        },
        {
          path: 'reports/hotel',
          name: 'reports-hotel',
          component: () => import('@/components/report/hotel/hotelReportView.vue'),
          meta: {
            roles: ['SUPER_ADMIN', 'APPROVER_KAKANWIL', 'ADMIN_TRAVEL_KP', 'ASDEP_KEUANGAN'],
          },
        },
        {
          path: 'reports/transport',
          name: 'reports-transport',
          component: () => import('@/components/report/transport/transportReportView.vue'),
          meta: {
            roles: ['SUPER_ADMIN', 'APPROVER_KAKANWIL', 'ADMIN_TRAVEL_KP', 'ASDEP_KEUANGAN'],
          },
        },

        // Master Data
        {
          path: 'master/vendors',
          name: 'master-vendors',
          component: () => import('../views/master/masterVendorView.vue'),
          meta: { roles: ['SUPER_ADMIN', 'ADMIN_TRAVEL_KP'] },
        },
        {
          path: 'master/vendors/create',
          name: 'master-vendors-create',
          component: () => import('../views/master/addVendorView.vue'),
          meta: { roles: ['SUPER_ADMIN', 'ADMIN_TRAVEL_KP'] },
        },
        {
          path: 'master/budget',
          name: 'master-budget',
          component: () => import('../views/master/budgetCoaView.vue'),
          meta: { roles: ['SUPER_ADMIN', 'ASDEP_KEUANGAN'] },
        },
        {
          path: 'master/cities-airports',
          name: 'master-cities-airports',
          component: () => import('../views/master/cityAirportView.vue'),
          meta: { roles: ['SUPER_ADMIN', 'ADMIN_TRAVEL_KP'] },
        },

        // User Management (Hanya Super Admin)
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/admin/userManagementView.vue'),
          meta: { roles: ['SUPER_ADMIN'] },
        },
      ],
    },
  ],
})

// 🟢 NAVIGATION GUARD UNTUK AUTH & ROLE ACCESS CONTROL
router.beforeEach(async (to, _from, next) => {
  const authStore = useAuthStore()

  // 1. Fetch data profil pengguna jika belum terautentikasi
  if (!authStore.isAuthenticated) {
    await authStore.fetchUser()
  }

  // 2. Proteksi Halaman yang Membutuhkan Login
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    return next({ name: 'login' })
  }

  // 3. Proteksi Halaman Guest (Misal /login saat sudah terautentikasi)
  if (to.meta.requiresGuest && authStore.isAuthenticated) {
    return next({ name: 'dashboard' })
  }

  // 4. 🟢 PROTEKSI ACCESS CONTROL BERDASARKAN ROLE PENGGUNA
  const allowedRoles = to.meta.roles as string[] | undefined
  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = authStore.activeRole

    // Jika pengguna tidak punya role aktif atau role-nya tidak diizinkan di rute ini
    if (!userRole || !allowedRoles.includes(userRole)) {
      // Redirect kembali ke dashboard jika mencoba menembus URL yang tidak berhak
      return next({ name: 'dashboard' })
    }
  }

  next()
})

export default router
