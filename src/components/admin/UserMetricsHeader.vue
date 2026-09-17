<script setup lang="ts">
defineProps<{
  totalCount: number
  activeCount: number
  superAdminCount: number
  inactiveCount: number
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
    <div class="bg-surfaceCard p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-3.5">
      <div class="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[24px]">group</span>
      </div>
      <div class="flex flex-col min-w-0">
        <span class="text-[11px] font-bold text-textMuted uppercase tracking-wider">TOTAL USER TERDAFTAR</span>
        <span class="text-xl font-bold text-textPrimary font-headline mt-0.5">{{ totalCount }} Pengguna</span>
        <span class="text-[10px] text-emerald-700 font-semibold mt-0.5">~ 100% Terverifikasi SSO</span>
      </div>
    </div>

    <div class="bg-surfaceCard p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-3.5">
      <div class="w-11 h-11 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[24px]">verified_user</span>
      </div>
      <div class="flex flex-col min-w-0">
        <span class="text-[11px] font-bold text-textMuted uppercase tracking-wider">AKUN AKTIF</span>
        <span class="text-xl font-bold text-textPrimary font-headline mt-0.5">{{ activeCount }} Akun</span>
        <span class="text-[10px] text-blue-700 font-semibold mt-0.5">Sesi Login Valid</span>
      </div>
    </div>

    <div class="bg-surfaceCard p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-3.5">
      <div class="w-11 h-11 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[24px]">admin_panel_settings</span>
      </div>
      <div class="flex flex-col min-w-0">
        <span class="text-[11px] font-bold text-textMuted uppercase tracking-wider">SUPER ADMIN SYSTEM</span>
        <span class="text-xl font-bold text-textPrimary font-headline mt-0.5">{{ superAdminCount }} User</span>
        <span class="text-[10px] text-purple-700 font-semibold mt-0.5">Hak Akses Penuh</span>
      </div>
    </div>

    <div class="bg-surfaceCard p-4 rounded-2xl border border-gray-100 shadow-2xs flex items-center gap-3.5">
      <div class="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-[24px]">person_off</span>
      </div>
      <div class="flex flex-col min-w-0">
        <span class="text-[11px] font-bold text-textMuted uppercase tracking-wider">AKUN NONAKTIF</span>
        <span class="text-xl font-bold text-textPrimary font-headline mt-0.5">{{ inactiveCount }} User</span>
        <span class="text-[10px] text-amber-700 font-semibold mt-0.5">Akses Dibatasi</span>
      </div>
    </div>
  </div>
</template>