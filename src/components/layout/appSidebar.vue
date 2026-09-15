<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'
import { useOrderStore, type TransportType } from '@/stores/orderStore'

defineProps<{
  isOpen?: boolean
}>()

const emit = defineEmits(['close-sidebar', 'open-role-modal'])

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()
const orderStore = useOrderStore()

const isNavUtamaOpen = ref(true)
const isPengajuanOpen = ref(true)
const isMonitoringOpen = ref(true)
const isMasterOpen = ref(true)

function navigateToOrder(type: TransportType) {
  orderStore.setTransport(type)
  router.push('/create-order')
  emit('close-sidebar')
}

function isSubmenuActive(type: string) {
  return route.path === '/create-order' && orderStore.activeTransport === type
}

function isRouteActive(path: string) {
  if (path === '/history') {
    return route.path === '/history' || route.path.startsWith('/history/order-detail')
  }
  return route.path === path
}

const displayRoleName = computed(() => {
  if (!authStore.activeRole) return authStore.user?.jabatan || 'Pegawai'
  
  const roleMap: Record<string, string> = {
    SUPER_ADMIN: 'Super Admin',
    OFFICIAL_BOOKER: 'Official Booker',
    APPROVER_KAKANWIL: 'Pejabat Penyetuju',
    ADMIN_TRAVEL_KP: 'Admin Travel KP',
    ASDEP_KEUANGAN: 'Asdep Keuangan',
  }

  return roleMap[authStore.activeRole] || authStore.activeRole
})

const userInitials = computed(() => {
  if (authStore.user?.avatarInitials) return authStore.user.avatarInitials
  if (authStore.user?.namaLengkap) {
    return authStore.user.namaLengkap
      .split(' ')
      .map((n) => n[0])
      .join('')
      .substring(0, 2)
      .toUpperCase()
  }
  return 'U'
})

// Handler klik untuk seluruh area div profil
function handleProfileClick() {
  emit('open-role-modal')
  emit('close-sidebar')
}
</script>

<template>
  <aside
    :class="[
      'fixed left-0 top-0 h-screen w-[16.25rem] bg-surfaceCard z-50 flex flex-col justify-between shadow-md lg:shadow-none border-r border-gray-100 transition-transform duration-300 ease-in-out font-body',
      isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
    ]"
  >
    <div class="flex flex-col h-full overflow-y-auto">
      <!-- Header Logo & Close Mobile -->
      <div class="h-16 px-4 py-3 flex items-center justify-between border-b border-gray-100 shrink-0">
        <div class="flex items-center gap-2.5 min-w-0">
          <div class="w-8 h-8 rounded-lg bg-surfaceCanvas border border-gray-200 flex items-center justify-center p-1 shrink-0">
            <img
              alt="Logo e-TO"
              class="w-full h-full object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1VoSKNN2BMt2t4l58UXPFOVjvvpPFdHgqSdtZ-d0S586lRdh0aUsBiebOzNT-C2WXlkwiar3JfOAwchfxZ7GfWUuvx6wZ5J6Vv0hxNvclEdyGue6cUAvC5LkKpSiGjCtt2uSmfStCMnMeQZzKGz03xB8dCm-xq8QoY3XfNnwET_6oHkxSDHYAeNykH5mZ6BehiKFgglz2qEYcuoNvXhU5tyOqrXz-EqtikZbobhk8gyvVB-kiMuVoCZiTw"
            />
          </div>
          <div class="flex flex-col leading-tight min-w-0 overflow-hidden">
            <span class="text-sm font-bold text-textPrimary font-headline tracking-tight truncate">e-TO Travel</span>
            <span class="text-[10px] text-textMuted truncate">BPJS Ketenagakerjaan</span>
          </div>
        </div>

        <button
          type="button"
          @click="$emit('close-sidebar')"
          class="lg:hidden text-textMuted hover:text-textPrimary p-1 rounded-lg hover:bg-surfaceCanvas shrink-0"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Navigasi Utama -->
      <nav class="flex-1 px-3 py-3 space-y-3 text-xs font-semibold">
        <!-- GROUP 1: NAVIGASI UTAMA -->
        <div class="space-y-1">
          <button
            type="button"
            @click="isNavUtamaOpen = !isNavUtamaOpen"
            class="w-full px-3 py-1 flex items-center justify-between text-[10px] font-bold text-textMuted uppercase tracking-wider hover:text-textPrimary transition-colors"
          >
            <span>NAVIGASI UTAMA</span>
            <span
              class="material-symbols-outlined text-[16px] transition-transform duration-200"
              :class="{ 'rotate-180': !isNavUtamaOpen }"
            >
              keyboard_arrow_down
            </span>
          </button>

          <div v-show="isNavUtamaOpen" class="space-y-1 pt-0.5">
            <router-link
              to="/dashboard"
              @click="$emit('close-sidebar')"
              :class="[
                'flex items-center gap-3 px-3 py-2 rounded-xl transition-all',
                isRouteActive('/dashboard')
                  ? 'bg-emerald-50 text-primary font-bold border-l-4 border-primary'
                  : 'text-textPrimary hover:bg-surfaceCanvas',
              ]"
            >
              <span
                :class="[
                  'material-symbols-outlined text-[18px]',
                  isRouteActive('/dashboard') ? 'text-primary' : 'text-textMuted',
                ]"
              >grid_view</span>
              <span>Beranda</span>
            </router-link>
          </div>
        </div>

        <!-- GROUP 2: PENGAJUAN SURAT TUGAS -->
        <div class="space-y-1">
          <button
            type="button"
            @click="isPengajuanOpen = !isPengajuanOpen"
            class="w-full px-3 py-1 flex items-center justify-between text-[10px] font-bold text-textMuted uppercase tracking-wider hover:text-textPrimary transition-colors"
          >
            <span>PENGAJUAN SURAT TUGAS</span>
            <span
              class="material-symbols-outlined text-[16px] transition-transform duration-200"
              :class="{ 'rotate-180': !isPengajuanOpen }"
            >
              keyboard_arrow_down
            </span>
          </button>

          <div v-show="isPengajuanOpen" class="space-y-0.5 pt-0.5">
            <button
              v-for="item in [
                { type: 'flight', label: 'Pesawat Udara', icon: 'flight' },
                { type: 'train', label: 'Kereta Api', icon: 'train' },
                { type: 'sea', label: 'Kapal Laut', icon: 'directions_boat' },
                { type: 'bus', label: 'Bus / Travel', icon: 'directions_bus' },
                { type: 'car', label: 'Mobil Dinas', icon: 'directions_car' },
                { type: 'hotel', label: 'Akomodasi Hotel', icon: 'hotel' },
              ]"
              :key="item.type"
              type="button"
              @click="navigateToOrder(item.type as TransportType)"
              :class="[
                'w-full flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all text-left',
                isSubmenuActive(item.type)
                  ? 'bg-emerald-50 text-primary font-bold border-l-4 border-primary'
                  : 'text-textPrimary hover:bg-surfaceCanvas',
              ]"
            >
              <span class="material-symbols-outlined text-textMuted text-[18px]">{{ item.icon }}</span>
              <span>{{ item.label }}</span>
            </button>
          </div>
        </div>

        <!-- GROUP 3: MONITORING & AUDIT -->
        <div class="space-y-1">
          <button
            type="button"
            @click="isMonitoringOpen = !isMonitoringOpen"
            class="w-full px-3 py-1 flex items-center justify-between text-[10px] font-bold text-textMuted uppercase tracking-wider hover:text-textPrimary transition-colors"
          >
            <span>MONITORING & AUDIT</span>
            <span
              class="material-symbols-outlined text-[16px] transition-transform duration-200"
              :class="{ 'rotate-180': !isMonitoringOpen }"
            >
              keyboard_arrow_down
            </span>
          </button>

          <div v-show="isMonitoringOpen" class="space-y-1 pt-0.5">
            <router-link
              to="/history"
              @click="$emit('close-sidebar')"
              :class="[
                'flex items-center justify-between px-3 py-2 rounded-xl transition-colors',
                isRouteActive('/history')
                  ? 'bg-emerald-50 text-primary font-bold border-l-4 border-primary'
                  : 'text-textPrimary hover:bg-surfaceCanvas',
              ]"
            >
              <div class="flex items-center gap-3">
                <span
                  :class="[
                    'material-symbols-outlined text-[18px]',
                    isRouteActive('/history') ? 'text-primary' : 'text-textMuted',
                  ]"
                >receipt_long</span>
                <span>Riwayat Pengajuan</span>
              </div>
              <span class="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center">2</span>
            </router-link>

            <router-link
              to="/approvals"
              @click="$emit('close-sidebar')"
              :class="[
                'flex items-center justify-between px-3 py-2 rounded-xl transition-colors',
                isRouteActive('/approvals')
                  ? 'bg-emerald-50 text-primary font-bold border-l-4 border-primary'
                  : 'text-textPrimary hover:bg-surfaceCanvas',
              ]"
            >
              <div class="flex items-center gap-3">
                <span
                  :class="[
                    'material-symbols-outlined text-[18px]',
                    isRouteActive('/approvals') ? 'text-primary' : 'text-textMuted',
                  ]"
                >fact_check</span>
                <span>Inbox Persetujuan</span>
              </div>
              <span class="w-4 h-4 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center">5</span>
            </router-link>

            <router-link
              to="/reports"
              @click="$emit('close-sidebar')"
              :class="[
                'flex items-center gap-3 px-3 py-2 rounded-xl transition-colors',
                route.path.startsWith('/reports')
                  ? 'bg-emerald-50 text-primary font-bold border-l-4 border-primary'
                  : 'text-textPrimary hover:bg-surfaceCanvas',
              ]"
            >
              <span
                :class="[
                  'material-symbols-outlined text-[18px]',
                  route.path.startsWith('/reports') ? 'text-primary' : 'text-textMuted',
                ]"
              >bar_chart</span>
              <span>Laporan Eksekutif</span>
            </router-link>
          </div>
        </div>

        <!-- GROUP 4: ADMINISTRASI MASTER -->
        <div class="space-y-1">
          <button
            type="button"
            @click="isMasterOpen = !isMasterOpen"
            class="w-full px-3 py-1 flex items-center justify-between text-[10px] font-bold text-textMuted uppercase tracking-wider hover:text-textPrimary transition-colors"
          >
            <span>ADMINISTRASI MASTER</span>
            <span
              class="material-symbols-outlined text-[16px] transition-transform duration-200"
              :class="{ 'rotate-180': !isMasterOpen }"
            >
              keyboard_arrow_down
            </span>
          </button>

          <div v-show="isMasterOpen" class="space-y-1 pt-0.5">
            <router-link
              to="/master/vendors"
              @click="$emit('close-sidebar')"
              :class="[
                'flex items-center gap-3 px-3 py-2 rounded-xl transition-colors',
                route.path.startsWith('/master/vendors')
                  ? 'bg-emerald-800 text-white font-bold shadow-2xs'
                  : 'text-textPrimary hover:bg-surfaceCanvas',
              ]"
            >
              <span
                :class="[
                  'material-symbols-outlined text-[18px]',
                  route.path.startsWith('/master/vendors') ? 'text-white' : 'text-textMuted',
                ]"
              >storefront</span>
              <span>Maskapai & Vendor</span>
            </router-link>

            <a
              href="#"
              class="flex items-center gap-3 px-3 py-2 rounded-xl text-textPrimary hover:bg-surfaceCanvas transition-colors"
            >
              <span class="material-symbols-outlined text-textMuted text-[18px]">location_city</span>
              <span>Kota & Bandara</span>
            </a>

            <router-link
              to="/master/budget"
              @click="$emit('close-sidebar')"
              :class="[
                'flex items-center gap-3 px-3 py-2 rounded-xl transition-colors',
                route.path.startsWith('/master/budget')
                  ? 'bg-emerald-800 text-white font-bold shadow-2xs'
                  : 'text-textPrimary hover:bg-surfaceCanvas',
              ]"
            >
              <span
                :class="[
                  'material-symbols-outlined text-[18px]',
                  route.path.startsWith('/master/budget') ? 'text-white' : 'text-textMuted',
                ]"
              >account_balance_wallet</span>
              <span>Mata Anggaran (MAK)</span>
            </router-link>
          </div>
        </div>
      </nav>

      <!-- 🟢 Profil Pengguna Bottom: Seluruh Div Bisa Diklik -->
      <div 
        @click="handleProfileClick"
        class="p-3 m-3 bg-surfaceCanvas border border-gray-100 hover:border-primary/40 rounded-xl shrink-0 cursor-pointer transition-all hover:shadow-sm group"
        title="Klik untuk ganti peran (Switch Role)"
      >
        <div class="flex items-center gap-2.5">
          <!-- Avatar Initials -->
          <div
            class="w-8 h-8 rounded-full bg-primary text-onPrimary font-bold flex items-center justify-center text-xs shrink-0 shadow-2xs uppercase"
          >
            {{ userInitials }}
          </div>

          <!-- User Name & Role -->
          <div class="flex flex-col flex-1 min-w-0">
            <span class="text-xs font-bold text-textPrimary truncate leading-tight group-hover:text-primary transition-colors">
              {{ authStore.user?.namaLengkap || 'User E-TO' }}
            </span>
            <div class="flex items-center justify-between mt-0.5">
              <span class="text-[10px] text-textMuted truncate">
                {{ displayRoleName }}
              </span>

              <span class="text-[10px] text-primary font-bold shrink-0 ml-1 flex items-center gap-0.5">
                <span class="material-symbols-outlined text-[14px]">published_with_changes</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>