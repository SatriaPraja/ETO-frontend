<script setup lang="ts">
import type { UserItem } from '@/models/userModel'

defineProps<{
  users: UserItem[]
  loading: boolean
}>()

const emit = defineEmits<{
  (e: 'edit', user: UserItem): void
  (e: 'toggle-status', user: UserItem): void
}>()

function getRoleBadgeClass(role: string) {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'bg-purple-100 text-purple-700 border-purple-200'
    case 'OFFICIAL_BOOKER':
      return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    case 'APPROVER_KAKANWIL':
      return 'bg-blue-100 text-blue-700 border-blue-200'
    case 'ADMIN_TRAVEL_KP':
      return 'bg-amber-100 text-amber-700 border-amber-200'
    case 'ASDEP_KEUANGAN':
      return 'bg-orange-100 text-orange-700 border-orange-200'
    default:
      return 'bg-gray-100 text-gray-700 border-gray-200'
  }
}
</script>

<template>
  <div class="bg-surfaceCard rounded-2xl border border-gray-100 shadow-2xs overflow-hidden">
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="bg-surfaceCanvas border-b border-gray-100 text-[11px] font-bold text-textMuted uppercase tracking-wider">
            <th class="py-3.5 px-4">Pegawai (NPK & Email)</th>
            <th class="py-3.5 px-4">Jabatan & Unit Kerja</th>
            <th class="py-3.5 px-4">Role Utama</th>
            <th class="py-3.5 px-4">Status Hak Akses</th>
            <th class="py-3.5 px-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 text-xs font-body">
          <tr v-if="loading">
            <td colspan="5" class="py-12 text-center text-textMuted">
              <div class="flex flex-col items-center justify-center gap-2">
                <span class="material-symbols-outlined animate-spin text-primary text-[24px]">progress_activity</span>
                <span>Memuat data pengguna BPJS Ketenagakerjaan...</span>
              </div>
            </td>
          </tr>

          <tr v-else-if="users.length === 0">
            <td colspan="5" class="py-12 text-center text-textMuted">
              <div class="flex flex-col items-center justify-center gap-1">
                <span class="material-symbols-outlined text-[32px]">folder_off</span>
                <span class="font-bold text-textPrimary">Tidak Ada Data Pengguna</span>
                <span class="text-[11px]">Coba ubah kata kunci pencarian atau filter role.</span>
              </div>
            </td>
          </tr>

          <tr v-for="u in users" :key="u.id" class="hover:bg-surfaceCanvas/50 transition-colors">
            <td class="py-3.5 px-4">
              <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0 uppercase shadow-2xs">
                  {{ u.avatarInitials || u.namaLengkap.substring(0, 2) }}
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="font-bold text-textPrimary leading-tight truncate font-headline">{{ u.namaLengkap }}</span>
                  <span class="text-[11px] text-textMuted mt-0.5 truncate">
                    NPK: <strong class="font-semibold text-textPrimary">{{ u.npk }}</strong> • {{ u.email }}
                  </span>
                </div>
              </div>
            </td>

            <td class="py-3.5 px-4">
              <div class="flex flex-col">
                <span class="font-bold text-textPrimary leading-tight">{{ u.jabatan }}</span>
                <span class="text-[11px] text-textMuted mt-0.5">{{ u.unitKerjaNama }}</span>
              </div>
            </td>

            <td class="py-3.5 px-4">
              <span
                :class="[
                  'inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold border shadow-2xs',
                  getRoleBadgeClass(u.role)
                ]"
              >
                {{ u.role }}
              </span>
            </td>

            <td class="py-3.5 px-4">
              <span
                :class="[
                  'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold',
                  u.status === 'active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
                ]"
              >
                <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                {{ u.status === 'active' ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>

            <td class="py-3.5 px-4 text-right">
              <div class="flex items-center justify-end gap-1.5">
                <button
                  type="button"
                  @click="emit('edit', u)"
                  class="p-1.5 text-textMuted hover:text-primary hover:bg-surfaceCanvas rounded-lg transition-colors"
                  title="Edit Profil & Role"
                >
                  <span class="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  type="button"
                  @click="emit('toggle-status', u)"
                  :class="[
                    'p-1.5 rounded-lg transition-colors',
                    u.status === 'active' ? 'text-textMuted hover:text-error hover:bg-errorContainer/30' : 'text-textMuted hover:text-emerald-700 hover:bg-emerald-50'
                  ]"
                  :title="u.status === 'active' ? 'Nonaktifkan Akses User' : 'Aktifkan Akses User'"
                >
                  <span class="material-symbols-outlined text-[18px]">
                    {{ u.status === 'active' ? 'block' : 'check_circle' }}
                  </span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>