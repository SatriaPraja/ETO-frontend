<script setup lang="ts">
import { ref, watch } from 'vue'

export interface OfficialBookerItem {
  id: string
  npk: string
  namaLengkap: string
  jabatan: string
  noHp?: string // 🟢 Disesuaikan
  unitKerjaKode: string
  unitKerjaNama: string
  avatarInitials: string
}

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', item: OfficialBookerItem): void
}>()

const searchQuery = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const bookers = ref<OfficialBookerItem[]>([])

async function fetchOfficialBookers() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const params = new URLSearchParams()
    if (searchQuery.value) params.append('search', searchQuery.value)

    const response = await fetch(`/api/travel-orders/users/official-bookers?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    })
    const resData = await response.json()
    if (!response.ok || !resData.success) {
      throw new Error(resData.message || 'Gagal memuat daftar Pegawai.')
    }
    bookers.value = resData.data || []
  } catch (err: any) {
    errorMessage.value = err.message || 'Terjadi kesalahan koneksi.'
  } finally {
    isLoading.value = false
  }
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      searchQuery.value = ''
      fetchOfficialBookers()
    }
  }
)

function handleSelect(item: OfficialBookerItem) {
  emit('select', item)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-body animate-fade-in"
    >
      <div class="bg-surfaceCard w-full max-w-xl rounded-2xl shadow-xl border border-gray-100 flex flex-col max-h-[85vh] overflow-hidden">
        <!-- Header -->
        <div class="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
              <span class="material-symbols-outlined text-[22px]">badge</span>
            </div>
            <div>
              <h3 class="text-base font-bold text-textPrimary font-headline">
                Pilih Pegawai / Penginap
              </h3>
              <p class="text-xs text-textMuted mt-0.5">
                Direktori Pegawai Resmi BPJS Ketenagakerjaan
              </p>
            </div>
          </div>
          <button
            type="button"
            @click="emit('close')"
            class="p-1 rounded-lg text-textMuted hover:text-textPrimary hover:bg-surfaceCanvas transition-colors cursor-pointer"
          >
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <!-- Search Bar -->
        <div class="p-4 border-b border-gray-100 bg-surfaceCanvas/50 shrink-0">
          <div class="relative flex items-center">
            <span class="material-symbols-outlined absolute left-3 text-textMuted text-[18px]">search</span>
            <input
              v-model="searchQuery"
              @input="fetchOfficialBookers"
              type="text"
              placeholder="Cari Nama Pegawai, NPK, atau Jabatan..."
              class="w-full h-10 pl-9 pr-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
            />
          </div>
        </div>

        <!-- List Body -->
        <div class="p-4 overflow-y-auto flex-1 space-y-2">
          <div v-if="isLoading" class="py-10 text-center text-textMuted text-xs flex flex-col items-center gap-2">
            <span class="material-symbols-outlined animate-spin text-[24px] text-primary">progress_activity</span>
            <span>Memuat data pegawai...</span>
          </div>

          <div v-else-if="errorMessage" class="py-8 text-center text-rose-600 text-xs">
            {{ errorMessage }}
          </div>

          <div v-else-if="bookers.length === 0" class="py-10 text-center text-textMuted text-xs">
            Data pegawai tidak ditemukan.
          </div>

          <div
            v-else
            v-for="item in bookers"
            :key="item.id"
            @click="handleSelect(item)"
            class="p-3 rounded-xl border border-gray-100 hover:border-primary/40 hover:bg-emerald-50/20 transition-all cursor-pointer flex items-center justify-between gap-3 group"
          >
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0">
                {{ item.avatarInitials || 'P' }}
              </div>
              <div class="flex flex-col">
                <span class="text-xs font-bold text-textPrimary group-hover:text-primary transition-colors">
                  {{ item.namaLengkap }}
                </span>
                <span class="text-[11px] text-textMuted font-mono">NPK: {{ item.npk }}</span>
                <span class="text-[10px] text-textMuted">{{ item.jabatan }} — {{ item.unitKerjaNama }}</span>
              </div>
            </div>

            <button
              type="button"
              class="px-3 py-1 rounded-lg bg-surfaceCanvas group-hover:bg-primary group-hover:text-onPrimary text-textPrimary text-xs font-bold transition-colors"
            >
              Pilih
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>