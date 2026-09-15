<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import type { RoleDetail } from '@/models/authModel'

const authStore = useAuthStore()
const emit = defineEmits(['close', 'roleConfirmed'])

const isLoading = ref(false)

onMounted(() => {
  document.body.style.overflow = 'hidden'
})

onUnmounted(() => {
  document.body.style.overflow = ''
})

const ROLE_VISUAL_CONFIG: Record<string, { icon: string; title: string }> = {
  SUPER_ADMIN: {
    icon: 'admin_panel_settings',
    title: 'Super Admin System',
  },
  OFFICIAL_BOOKER: {
    icon: 'business_center',
    title: 'Official Booker (Pembuat Order)',
  },
  APPROVER_KAKANWIL: {
    icon: 'approval_delegation',
    title: 'Pejabat Penyetuju (Kepala Unit Kerja)',
  },
  ADMIN_TRAVEL_KP: {
    icon: 'manage_accounts',
    title: 'Admin Travel Pusat',
  },
  ASDEP_KEUANGAN: {
    icon: 'account_balance_wallet',
    title: 'Admin Anggaran & OTI',
  },
}

function getRoleTitle(role: RoleDetail) {
  return ROLE_VISUAL_CONFIG[role.name]?.title || role.name
}

function getRoleIcon(role: RoleDetail) {
  return ROLE_VISUAL_CONFIG[role.name]?.icon || 'person'
}

async function handleSelectRole(targetRoleId: string) {
  if (authStore.activeRole === targetRoleId) return
  await authStore.selectRole(targetRoleId)
}

function handleClose() {
  authStore.setRoleConfirmed(true)
  emit('close')
}

async function handleConfirmRole() {
  isLoading.value = true
  try {
    authStore.setRoleConfirmed(true)
    emit('roleConfirmed')
    handleClose()
  } finally {
    isLoading.value = false
  }
}

async function handleLogout() {
  if (confirm('Apakah Anda yakin ingin mengakhiri sesi dan keluar dari portal e-TO BPJS Ketenagakerjaan?')) {
    await authStore.logout()
  }
}
</script>

<template>
  <div class="fixed inset-0 bg-neutralText/40 backdrop-blur-[4px] z-50 flex items-center justify-center p-4 overflow-y-auto">
    <!-- Modal Container -->
    <div class="relative w-full max-w-[620px] bg-surfaceCard rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 my-auto">
      
      <!-- Top Decorative Accent Stripe -->
      <div class="h-1.5 w-full bg-gradient-to-r from-primary via-secondary to-tertiaryFixed"></div>

      <!-- Tombol Close (X) di Pojok Kanan Atas -->
      <button 
        type="button" 
        @click="handleClose"
        class="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-surfaceContainerLow hover:bg-surfaceContainer text-textMuted hover:text-textPrimary flex items-center justify-center transition-colors"
      >
        <span class="material-symbols-outlined text-[20px]">close</span>
      </button>

      <!-- 🟢 Modal Header: Diberikan pr-14 agar tidak menabrak tombol X -->
      <div class="p-5 sm:p-6 pb-2 pr-14">
        <div class="flex items-center justify-between gap-2 mb-2">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surfaceContainerLow text-primary font-body text-xs font-semibold">
            <span class="material-symbols-outlined text-[15px]">verified_user</span>
            <span>Sesi Baru Terdeteksi</span>
          </div>
          <span class="text-xs text-textMuted font-body tracking-tight">
            SSO BPJS-TK ID: <strong class="font-bold text-textPrimary">{{ authStore.user?.npk || '-' }}</strong>
          </span>
        </div>
        
        <h2 class="text-xl sm:text-2xl text-textPrimary font-bold font-headline tracking-tight">
          Pilih Peran Aktif Anda
        </h2>
        <p class="text-xs sm:text-sm text-textMuted mt-1 leading-snug font-body">
          Akun <strong class="text-textPrimary font-bold">{{ authStore.user?.namaLengkap || 'Pegawai' }}</strong> terdaftar pada {{ authStore.availableRoles.length }} fungsi kewenangan. Pilih peran kerja untuk menetapkan otoritas modul transaksi.
        </p>
      </div>

      <!-- Role Selection Cards -->
      <div class="px-5 sm:px-6 py-3 space-y-2.5 flex flex-col max-h-[360px] overflow-y-auto">
        <div
          v-for="role in authStore.availableRoles"
          :key="role.id"
          @click="handleSelectRole(role.id)"
          :class="[
            'group relative flex items-start gap-3.5 p-3.5 rounded-xl cursor-pointer transition-all duration-200 border',
            authStore.activeRole === role.name || authStore.activeRole === role.id
              ? 'bg-surfaceContainerLow/60 border-2 border-primary shadow-sm'
              : 'bg-surfaceCard hover:bg-surfaceCanvas border-gray-200'
          ]"
        >
          <!-- Icon Badge -->
          <div
            :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105',
              authStore.activeRole === role.name || authStore.activeRole === role.id
                ? 'bg-primary text-onPrimary shadow-primary/20'
                : 'bg-surfaceContainer text-textPrimary'
            ]"
          >
            <span class="material-symbols-outlined text-[22px]">{{ getRoleIcon(role) }}</span>
          </div>

          <!-- Content Details -->
          <div class="flex-1 min-w-0 pr-6">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="text-sm font-bold text-textPrimary font-headline">{{ getRoleTitle(role) }}</span>
              <span class="px-1.5 py-0.5 rounded bg-surfaceContainerHigh text-textMuted text-[10px] font-semibold">
                Kode: {{ role.id }}
              </span>
            </div>
            <p class="text-xs text-textMuted mt-0.5 leading-relaxed font-body">
              {{ role.desc }}
            </p>
          </div>

          <!-- Radio Check Indicator -->
          <div
            :class="[
              'absolute top-3.5 right-3.5 w-5 h-5 rounded-full flex items-center justify-center transition-all',
              authStore.activeRole === role.name || authStore.activeRole === role.id
                ? 'bg-primary text-onPrimary shadow-sm'
                : 'border border-gray-300 opacity-40 group-hover:opacity-80'
            ]"
          >
            <span class="material-symbols-outlined text-[14px] font-bold">check</span>
          </div>
        </div>
      </div>

      <!-- Helper Ribbon -->
      <div class="mx-5 sm:mx-6 mt-1 px-3 py-2 rounded-lg bg-surfaceCanvas flex items-center gap-2 text-textMuted">
        <span class="material-symbols-outlined text-[16px] text-primary shrink-0">info</span>
        <span class="text-[11px] text-textMuted font-body leading-tight">
          Anda dapat berpindah peran kapan saja melalui menu identitas profil di sudut kiri bawah layar.
        </span>
      </div>

      <!-- Footer Actions -->
      <div class="p-5 sm:p-6 pt-4 mt-2 flex items-center justify-between gap-3 bg-surfaceCard border-t border-gray-100">
        <button
          type="button"
          @click="handleLogout"
          class="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-error hover:bg-errorContainer/30 transition-colors text-xs font-semibold"
        >
          <span class="material-symbols-outlined text-[18px]">logout</span>
          <span>Keluar (Logout)</span>
        </button>

        <button
          type="button"
          @click="handleConfirmRole"
          :disabled="isLoading || authStore.loading"
          class="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primaryHover text-onPrimary shadow-sm hover:shadow transition-all text-xs font-semibold active:scale-[0.99]"
        >
          <span v-if="isLoading || authStore.loading" class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
          <span>{{ isLoading || authStore.loading ? 'Menyiapkan Sesi...' : 'Lanjutkan dengan Peran Ini' }}</span>
          <span v-if="!isLoading && !authStore.loading" class="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

    </div>
  </div>
</template>