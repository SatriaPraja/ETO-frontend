<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()
const isRoundTrip = ref(true)

const transportIcon = computed(() => {
  switch (orderStore.activeTransport) {
    case 'flight': return 'flight_takeoff'
    case 'train': return 'train'
    case 'sea': return 'directions_boat'
    case 'bus': return 'directions_bus'
    case 'car': return 'directions_car'
    default: return 'flight_takeoff'
  }
})

// Fungsi Tambahkan ke Daftar
function handleAddTransport() {
  orderStore.markTransportAdded() // Buka akses menu hotel
  orderStore.setTransport('hotel') // Otomatis berpindah ke tab Hotel
}
</script>

<template>
  <div class="space-y-6 font-body">
    <!-- Switch Indicator per Moda -->
    <div class="flex items-center justify-between pb-2 border-b border-gray-100">
      <span class="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5 font-headline">
        <span class="material-symbols-outlined text-[18px]">{{ transportIcon }}</span>
        Detail Itinerary Moda: {{ orderStore.activeTransport.toUpperCase() }}
      </span>
      <span class="text-xs text-textMuted">Rute perjalanan & klasifikasi tiket tersinkronisasi otomatis</span>
    </div>

    <!-- 1. FORM PENAMBAHAN PERSONEL -->
    <div class="space-y-3">
      <div class="flex items-center gap-2 text-xs font-bold text-textPrimary uppercase tracking-wider font-headline">
        <span class="material-symbols-outlined text-primary text-[18px]">person_add</span>
        <span>Form Penambahan Personel</span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-3 bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs">
        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">Nama Traveller *</label>
          <div class="relative">
            <input
              type="text"
              value="Rian Hidayat"
              class="w-full h-9 pl-3 pr-8 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
            />
            <span class="material-symbols-outlined absolute right-2.5 top-2 text-textMuted text-[18px]">search</span>
          </div>
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">NPK</label>
          <input
            type="text"
            value="198804122011"
            readonly
            class="h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-xs text-textMuted"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">Jabatan</label>
          <input
            type="text"
            value="Penata Madya Pengendalian Mutu"
            readonly
            class="h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-xs text-textMuted truncate"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">No. Handphone *</label>
          <input
            type="text"
            value="081234567890"
            class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
          />
        </div>
      </div>
    </div>

    <!-- 2. FORM PENERBANGAN PERGI (DEPARTURE LEG) -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-xs font-bold text-textPrimary uppercase tracking-wider font-headline">
          <span class="material-symbols-outlined text-primary text-[18px]">{{ transportIcon }}</span>
          <span>Penerbangan Pergi (Departure Leg)</span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs">
        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">Kota Berangkat *</label>
          <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
            <option>Jakarta (CGK / HLP)</option>
            <option>Surabaya (SUB)</option>
            <option>Medan (KNO)</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">Kota Tujuan *</label>
          <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
            <option>Surabaya (SUB)</option>
            <option>Jakarta (CGK / HLP)</option>
            <option>Denpasar (DPS)</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">Tanggal Berangkat *</label>
          <input
            type="text"
            value="20 Mei 2026"
            class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">Jam Berangkat *</label>
          <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
            <option>08:30 WIB</option>
            <option>11:15 WIB</option>
            <option>16:45 WIB</option>
          </select>
        </div>

        <div class="flex flex-col sm:col-span-2">
          <label class="text-xs font-semibold text-textPrimary mb-1">Nama Maskapai *</label>
          <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
            <option>Garuda Indonesia</option>
            <option>Batik Air</option>
            <option>Pelita Air</option>
          </select>
        </div>

        <div class="flex flex-col sm:col-span-2">
          <label class="text-xs font-semibold text-textPrimary mb-1">Kelas Maskapai *</label>
          <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
            <option>Ekonomi (Kelas Y)</option>
            <option>Ekonomi Fleksibel</option>
            <option>Bisnis (Khusus Direksi / KakANWIL)</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 3. FORM PULANG-PERGI (PP) -->
    <div class="space-y-3">
      <div class="flex items-center gap-2">
        <input
          id="roundtrip-check"
          type="checkbox"
          v-model="isRoundTrip"
          class="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
        />
        <label for="roundtrip-check" class="text-xs font-bold text-textPrimary font-headline cursor-pointer select-none">
          Pulang-Pergi (PP)
        </label>
        <span class="px-2 py-0.5 rounded bg-surfaceContainerLow text-primary text-[10px] font-bold">AKTIFF</span>
      </div>

      <div v-if="isRoundTrip" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs">
        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">Tanggal Pulang *</label>
          <input
            type="text"
            value="22 Mei 2026"
            class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">Jam Pulang *</label>
          <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
            <option>17:45 WIB</option>
            <option>14:20 WIB</option>
            <option>20:10 WIB</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">Maskapai Pulang *</label>
          <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
            <option>Garuda Indonesia</option>
            <option>Batik Air</option>
          </select>
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">Kelas Pulang *</label>
          <select class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
            <option>Ekonomi (Kelas Y)</option>
            <option>Ekonomi Fleksibel</option>
          </select>
        </div>
      </div>
    </div>

    <!-- 4. TOMBOL TAMBAHKAN KE DAFTAR (Pemicu Akses Hotel) -->
    <div class="flex justify-end pt-2">
      <button
        type="button"
        @click="handleAddTransport"
        class="px-5 py-2.5 rounded-lg bg-primary hover:bg-primaryHover text-onPrimary text-xs font-bold flex items-center gap-2 shadow-sm transition-all"
      >
        <span class="material-symbols-outlined text-[18px]">add</span>
        <span>Tambahkan ke Daftar</span>
      </button>
    </div>
  </div>
</template>