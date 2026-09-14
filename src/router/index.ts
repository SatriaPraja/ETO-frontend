import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 1. RUTE LOGIN (Berdiri Sendiri / Tanpa MainLayout)
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/loginView.vue'),
    },
    {
      path: '/',
      component: () => import('../views/layout/mainLayout.vue'),
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
      ],
    },
  ],
})

export default router