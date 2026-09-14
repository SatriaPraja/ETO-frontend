import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export interface UserRole {
  id: string
  code: string
  title: string
  description: string
  icon: string
  iconBgColor: string
}

export const useAuthStore = defineStore('auth', () => {
  const username = ref('21094833')
  const password = ref('P@ssw0rdKedinasan2025')
  const rememberMe = ref(true)
  const isPasswordVisible = ref(false)
  const activeTab = ref<'normal' | 'error' | 'locked'>('normal')
  const lockCountdown = ref(28)
  let countdownTimer: number | null = null

  // Role Selection State
  const isAuthenticated = ref(true)
  const activeRole = ref<string>('official-booker')

  const availableRoles: UserRole[] = [
    {
      id: 'official-booker',
      code: '02',
      title: 'Official Booker (Pembuat Order)',
      description:
        'Membuat, mengajukan, dan mengelola travel order transportasi & hotel untuk seluruh personil operasional unit kerja.',
      icon: 'business_center',
      iconBgColor: 'bg-primary',
    },
    {
      id: 'approver',
      code: '03',
      title: 'Pejabat Penyetuju (Kepala Unit Kerja)',
      description:
        'Menyetujui, mengembalikan untuk koreksi nota dinas, atau menolak usulan perjalanan dinas di bawah wewenang operasional.',
      icon: 'approval_delegation',
      iconBgColor: 'bg-[#94f5aa]',
    },
    {
      id: 'admin-pusat',
      code: '05',
      title: 'Admin Travel Pusat',
      description:
        'Verifikasi akhir e-TO korporat, rekonsiliasi rekanan maskapai & hotel, dan pemeliharaan konfigurasi master data sistem.',
      icon: 'admin_panel_settings',
      iconBgColor: 'bg-[#ffddb4]',
    },
    {
      id: 'admin-anggaran',
      code: '21',
      title: 'Admin Anggaran & OTI',
      description:
        'Monitoring alokasi pagu kegiatan, penyesuaian mata anggaran (COA), dan sinkronisasi laporan realisasi belanja dinas.',
      icon: 'account_balance_wallet',
      iconBgColor: 'bg-[#ffb955]',
    },
  ]

  function togglePasswordVisibility() {
    isPasswordVisible.value = !isPasswordVisible.value
  }

  function setTab(tab: 'normal' | 'error' | 'locked') {
    activeTab.value = tab
    if (countdownTimer) clearInterval(countdownTimer)

    if (tab === 'locked') {
      lockCountdown.value = 28
      countdownTimer = setInterval(() => {
        if (lockCountdown.value > 0) {
          lockCountdown.value--
        } else {
          if (countdownTimer) clearInterval(countdownTimer)
        }
      }, 1000)
    }
  }

  function selectRole(roleId: string) {
    activeRole.value = roleId
  }
  const router = useRouter()
  function handleLogin() {
    if (activeTab.value === 'locked') return

    // Bypass langsung set authenticated & redirect
    isAuthenticated.value = true
    router.push('/dashboard')
  }

  //   // TAMBAHKAN FUNGSI INI
  //   function handleLogin() {
  //     if (activeTab.value === 'locked') return
  //     console.log('Logging in with:', {
  //       username: username.value,
  //       password: password.value,
  //       rememberMe: rememberMe.value
  //     })
  //   }

  // PASTIKAN handleLogin DIMASUKKAN KE DALAM RETURN HERE:
  return {
    username,
    password,
    rememberMe,
    isPasswordVisible,
    activeTab,
    lockCountdown,
    isAuthenticated,
    activeRole,
    availableRoles,
    togglePasswordVisibility,
    setTab,
    selectRole,
    handleLogin, // <-- Tambahkan di sini
  }
})
