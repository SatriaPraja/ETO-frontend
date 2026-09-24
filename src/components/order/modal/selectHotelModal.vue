<script setup lang="ts">
import { ref, watch } from 'vue'

export interface HotelItem {
  id: number
  name: string
  cityId?: number | null
  cityName?: string
  starRating: number
  address?: string
  priceRange?: string
}

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', item: HotelItem): void
}>()

const searchQuery = ref('')
const isLoading = ref(false)
const errorMessage = ref('')
const hotels = ref<HotelItem[]>([])

// Fetch daftar Master Hotel dari API
async function fetchHotels() {
  isLoading.value = true
  errorMessage.value = ''
  try {
    const params = new URLSearchParams()
    if (searchQuery.value) params.append('search', searchQuery.value)

    const response = await fetch(`/api/travel-orders/hotels?${params.toString()}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
      },
    })
    const resData = await response.json()
    if (!response.ok || !resData.success) {
      throw new Error(resData.message || 'Gagal memuat daftar Master Hotel.')
    }
    hotels.value = resData.data || []
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
      fetchHotels()
    }
  }
)

function handleSelect(item: HotelItem) {
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
      <div class="bg-surfaceCard w-full max-w-2xl rounded-2xl shadow-xl border border-gray-100 flex flex-col max-h-[85vh] overflow-hidden">
        <!-- Modal Header -->
        <div class="p-5 border-b border-gray-100 flex items-center justify-between shrink-0">
          <div class="flex items-center gap-3">
            <div class="p-2 rounded-xl bg-pink-50 text-[#930049] shrink-0">
              <span class="material-symbols-outlined text-[22px]">domain</span>
            </div>
            <div>
              <h3 class="text-base font-bold text-textPrimary font-headline">
                Cari & Pilih Hotel Rekanan
              </h3>
              <p class="text-xs text-textMuted mt-0.5">
                Direktori Akomodasi & Hotel Rekanan Resmi BPJS Ketenagakerjaan
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
              @input="fetchHotels"
              type="text"
              placeholder="Cari Nama Hotel, Bintang, atau Kota..."
              class="w-full h-10 pl-9 pr-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
            />
          </div>
        </div>

        <!-- Content Body -->
        <div class="p-4 overflow-y-auto flex-1 space-y-2.5">
          <div v-if="isLoading" class="py-12 text-center text-textMuted text-xs flex flex-col items-center gap-2">
            <span class="material-symbols-outlined animate-spin text-[24px] text-primary">progress_activity</span>
            <span>Memuat direktori hotel...</span>
          </div>

          <div v-else-if="errorMessage" class="py-10 text-center text-rose-600 text-xs flex flex-col items-center gap-2">
            <span class="material-symbols-outlined text-[28px]">error</span>
            <span>{{ errorMessage }}</span>
            <button @click="fetchHotels" class="mt-2 text-primary font-bold underline cursor-pointer">Coba lagi</button>
          </div>

          <div v-else-if="hotels.length === 0" class="py-12 text-center text-textMuted text-xs flex flex-col items-center gap-2">
            <span class="material-symbols-outlined text-[28px]">domain_disabled</span>
            <span>Hotel yang dicari tidak ditemukan.</span>
          </div>

          <div
            v-else
            v-for="item in hotels"
            :key="item.id"
            @click="handleSelect(item)"
            class="p-4 rounded-xl border border-gray-100 hover:border-primary/40 hover:bg-pink-50/20 transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div class="flex flex-col space-y-1">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-textPrimary group-hover:text-primary transition-colors font-headline">
                  {{ item.name }}
                </span>
                <span class="text-amber-400 text-xs tracking-tight">
                  {{ '★'.repeat(item.starRating || 3) }}
                </span>
              </div>
              <p class="text-[11px] text-textMuted flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">location_on</span>
                <span>{{ item.cityName }}</span>
                <span v-if="item.address">— {{ item.address }}</span>
              </p>
            </div>

            <button
              type="button"
              class="px-3.5 py-1.5 rounded-lg bg-surfaceCanvas group-hover:bg-primary group-hover:text-onPrimary text-textPrimary text-xs font-bold transition-colors shrink-0 self-start sm:self-center"
            >
              Pilih Hotel
            </button>
          </div>
        </div>

        <!-- Footer Bar -->
        <div class="p-3 px-5 border-t border-gray-100 bg-surfaceCanvas text-right shrink-0">
          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-2 rounded-xl bg-surfaceCard hover:bg-gray-200 border border-gray-200 text-textPrimary text-xs font-bold transition-colors cursor-pointer"
          >
            Batal / Tutup
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>