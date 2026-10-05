<script setup lang="ts">
defineEmits(['refresh', 'open-create'])
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-body">
    <div>
      <h1 class="text-xl sm:text-2xl font-bold text-textPrimary font-headline tracking-tight">
        Manajemen Pengguna & Otorisasi SSO
      </h1>
      <p class="text-xs sm:text-sm text-textMuted mt-0.5">
        Kelola registrasi akun pegawai, penetapan wewenang fungsi role, dan hak akses modul e-TO.
      </p>
    </div>

    <div class="flex items-center gap-2.5 shrink-0">
      <button
        type="button"
        @click="$emit('refresh')"
        class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-gray-200 bg-surfaceCard hover:bg-surfaceCanvas text-textPrimary text-xs font-bold shadow-2xs transition-colors cursor-pointer active:scale-[0.98]"
      >
        <span class="material-symbols-outlined text-[18px]">refresh</span>
        <span>Refresh Data</span>
      </button>

      <button
        type="button"
        @click="$emit('open-create')"
        class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold shadow-sm transition-all active:scale-[0.98] cursor-pointer"
      >
        <span class="material-symbols-outlined text-[18px]">person_add</span>
        <span>Tambah Pengguna Baru</span>
      </button>
    </div>
  </div>
</template>