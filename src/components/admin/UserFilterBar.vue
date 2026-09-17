<script setup lang="ts">
const searchQuery = defineModel<string>('searchQuery', { default: '' })
const selectedRole = defineModel<string>('selectedRole', { default: 'ALL' })

const emit = defineEmits(['filter-change'])

function handleInput() {
  emit('filter-change')
}
</script>

<template>
  <div class="bg-surfaceCard p-4 rounded-2xl border border-gray-100 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
    <div class="relative w-full md:w-96">
      <span class="material-symbols-outlined absolute left-3 top-2.5 text-textMuted text-[18px]">search</span>
      <input
        v-model="searchQuery"
        @input="handleInput"
        type="text"
        placeholder="Cari NPK, nama pegawai, email, atau unit kerja..."
        class="w-full h-9 pl-9 pr-4 bg-surfaceCanvas border border-gray-200 rounded-xl text-xs text-textPrimary placeholder:text-textMuted focus:outline-none focus:bg-surfaceCard transition-all"
      />
    </div>

    <div class="flex items-center gap-3 w-full md:w-auto justify-end">
      <div class="flex items-center gap-2">
        <span class="text-xs text-textMuted font-semibold shrink-0">Role:</span>
        <select
          v-model="selectedRole"
          @change="handleInput"
          class="h-9 px-3 bg-surfaceCanvas border border-gray-200 rounded-xl text-xs text-textPrimary font-medium focus:outline-none focus:bg-surfaceCard transition-all"
        >
          <option value="ALL">Semua Peran (All Roles)</option>
          <option value="SUPER_ADMIN">Super Admin</option>
          <option value="OFFICIAL_BOOKER">Official Booker</option>
          <option value="APPROVER_KAKANWIL">Pejabat Penyetuju</option>
          <option value="ADMIN_TRAVEL_KP">Admin Travel KP</option>
          <option value="ASDEP_KEUANGAN">Asdep Keuangan</option>
        </select>
      </div>
    </div>
  </div>
</template>