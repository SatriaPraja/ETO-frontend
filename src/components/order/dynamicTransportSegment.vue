<script setup lang="ts">
import { ref, computed } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import SelectTravelerModal from '@/components/order/modal/selectTravelerModal.vue'
import type { EmployeeItem } from '@/models/employee'

const orderStore = useOrderStore()

// State Category Tab & Option PP
const activeCategory = ref<'INTERNAL' | 'EKSTERNAL'>('INTERNAL')
const isRoundTrip = ref(true)

// State Modal LOV Personel
const isTravelerModalOpen = ref(false)

// State Form Personel (Clean/Kosongkan untuk input user)
const form = ref({
  name: '',
  npk: '',
  jabatan: '',
  phone: '',
  originCity: 'Jakarta (CGK / HLP)',
  destCity: 'Surabaya (SUB)',
  depDate: '',
  depTime: '08:30 WIB',
  maskapai: 'Garuda Indonesia',
  kelas: 'Ekonomi (Kelas Y)',
  retDate: '',
  retTime: '17:45 WIB',
  retMaskapai: 'Garuda Indonesia',
  retKelas: 'Ekonomi (Kelas Y)',
  estimatedPrice: 2816666,
})

// Function Callback saat Personel Dipilih dari Modal LOV
function handleTravelerSelected(emp: EmployeeItem) {
  form.value.name = emp.name
  form.value.npk = emp.npk
  form.value.jabatan = emp.jabatan ? `${emp.jabatan} (${emp.golongan || ''})` : ''
  form.value.phone = emp.phone || ''
}

// Icon Dynamic per Moda Transportasi
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

// Fungsi Tambahkan ke Order Store
function handleAddTransport() {
  if (!form.value.name) {
    alert('Mohon isi nama traveller terlebih dahulu.')
    return
  }
  if (!form.value.depDate) {
    alert('Mohon isi tanggal keberangkatan.')
    return
  }

  const originCode = form.value.originCity.match(/\(([^)]+)\)/)?.[1] || 'JKT'
  const destCode = form.value.destCity.match(/\(([^)]+)\)/)?.[1] || 'SUB'

  // Push Data ke Store Pinia
 orderStore.addTraveller({
  category: activeCategory.value,
  userId: (form.value as any).userId || null,
  name: form.value.name,
  npkOrKtp: form.value.npk || '-',
  jabatanOrInstansi: form.value.jabatan || '-',
  phone: form.value.phone || '-',

  // Route & City IDs
  route: `${originCode} ⇄ ${destCode}`,
  originCityId: (form.value as any).originCityId || 1,
  destinationCityId: (form.value as any).destinationCityId || 2,

  // Departure Leg
  departureDate: form.value.depDate,
  departureTime: form.value.depTime,
  departureInfo: `${form.value.depDate} · ${form.value.depTime} (Pergi)`,
  maskapai: form.value.maskapai || 'Garuda Indonesia',
  kelas: (form.value as any).kelas || 'Ekonomi (Kelas Y)',
  transportId: (form.value as any).transportId || 1,
  transportClassId: (form.value as any).transportClassId || 1,

  // Return Leg
  isRoundTrip: isRoundTrip.value,
  returnDate: isRoundTrip.value ? (form.value.retDate || form.value.depDate) : null,
  returnTime: isRoundTrip.value ? form.value.retTime : null,
  returnInfo: isRoundTrip.value
    ? `${form.value.retDate || form.value.depDate} · ${form.value.retTime} (Pulang)`
    : null,
  returnMaskapai: isRoundTrip.value ? ((form.value as any).returnMaskapai || form.value.maskapai) : null,
  returnKelas: isRoundTrip.value ? ((form.value as any).returnKelas || (form.value as any).kelas) : null,
  returnTransportId: isRoundTrip.value ? ((form.value as any).returnTransportId || (form.value as any).transportId || 1) : null,
  returnTransportClassId: isRoundTrip.value ? ((form.value as any).returnTransportClassId || 1) : null,

  price: form.value.estimatedPrice || 0,
})

  // Reset Input Form Personel
  form.value.name = ''
  form.value.npk = ''
  form.value.jabatan = ''
  form.value.phone = ''
}
</script>

<template>
  <div class="bg-surfaceCard rounded-2xl border border-gray-100 p-6 shadow-2xs space-y-5 font-body">
    <!-- Header Section 2 -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-lg bg-sky-50 text-sky-700 shrink-0 mt-0.5">
          <span class="material-symbols-outlined text-[22px]">{{ transportIcon }}</span>
        </div>
        <div>
          <h2 class="text-base font-bold text-textPrimary font-headline">
            2. Data Traveller & Itinerary Penerbangan
          </h2>
          <p class="text-xs text-textMuted mt-0.5">
            Tentukan personalia yang ditugaskan beserta rincian jadwal maskapai penerbangan
          </p>
        </div>
      </div>

      <!-- Category Tab Buttons -->
      <div class="flex items-center gap-1 bg-surfaceCanvas p-1 rounded-xl border border-gray-200/80 shrink-0">
        <button
          type="button"
          @click="activeCategory = 'INTERNAL'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
            activeCategory === 'INTERNAL'
              ? 'bg-surfaceCard text-emerald-800 shadow-2xs'
              : 'text-textMuted hover:text-textPrimary'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">badge</span>
          <span>Traveller Internal (Karyawan BPJS)</span>
        </button>
        <button
          type="button"
          @click="activeCategory = 'EKSTERNAL'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5',
            activeCategory === 'EKSTERNAL'
              ? 'bg-surfaceCard text-emerald-800 shadow-2xs'
              : 'text-textMuted hover:text-textPrimary'
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">group</span>
          <span>Traveller Eksternal (Tamu / Narasumber)</span>
        </button>
      </div>
    </div>

    <!-- 1. Form Penambahan Personel -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-textPrimary uppercase tracking-wider font-headline flex items-center gap-1.5">
          <span class="material-symbols-outlined text-primary text-[18px]">person_add</span>
          <span>Form Penambahan Personel</span>
        </span>
        <span class="text-[11px] text-textMuted">Data penerbangan diverifikasi otomatis dengan kebijakan dinas</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs">
        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">Nama Traveller *</label>
          <div class="relative cursor-pointer" @click="isTravelerModalOpen = true">
            <input
              type="text"
              v-model="form.name"
              readonly
              placeholder="Pilih nama karyawan..."
              class="w-full h-10 pl-3 pr-9 rounded-xl bg-surfaceCard border border-gray-200 text-xs font-bold text-textPrimary focus:outline-none focus:border-primary cursor-pointer hover:border-primary/60 transition-all"
            />
            <span class="material-symbols-outlined absolute right-3 top-2.5 text-primary text-[18px]">search</span>
          </div>
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">NPK</label>
          <input
            type="text"
            v-model="form.npk"
            readonly
            placeholder="NPK Karyawan"
            class="h-10 px-3 rounded-xl bg-surfaceCanvas border border-gray-200 text-xs text-textMuted font-mono font-semibold"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">Jabatan</label>
          <input
            type="text"
            v-model="form.jabatan"
            readonly
            placeholder="Jabatan"
            class="h-10 px-3 rounded-xl bg-surfaceCanvas border border-gray-200 text-xs text-textMuted truncate"
          />
        </div>

        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">No. Handphone *</label>
          <div class="relative flex items-center">
            <span class="material-symbols-outlined absolute left-3 text-textMuted text-[18px]">call</span>
            <input
              type="text"
              v-model="form.phone"
              placeholder="081234567890"
              class="w-full h-10 pl-9 pr-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary font-mono focus:outline-none focus:border-primary"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 2. Form Penerbangan Pergi (Departure Leg) -->
    <div class="space-y-3">
      <div class="p-4 rounded-2xl bg-surfaceCanvas/60 border border-gray-100 space-y-3">
        <span class="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center gap-1.5 font-headline">
          <span class="material-symbols-outlined text-[18px]">{{ transportIcon }}</span>
          <span>Penerbangan Pergi (Departure Leg)</span>
        </span>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Kota Berangkat *</label>
            <select v-model="form.originCity" class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
              <option>Jakarta (CGK / HLP)</option>
              <option>Surabaya (SUB)</option>
              <option>Medan (KNO)</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Kota Tujuan *</label>
            <select v-model="form.destCity" class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
              <option>Surabaya (SUB)</option>
              <option>Jakarta (CGK / HLP)</option>
              <option>Denpasar (DPS)</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Tanggal Berangkat *</label>
            <input
              v-model="form.depDate"
              type="date"
              class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary cursor-pointer"
            />
          </div>

          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Jam Berangkat *</label>
            <select v-model="form.depTime" class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary font-mono text-center focus:outline-none focus:border-primary">
              <option>08:30 WIB</option>
              <option>11:15 WIB</option>
              <option>16:45 WIB</option>
            </select>
          </div>

          <div class="flex flex-col sm:col-span-2">
            <label class="text-xs font-semibold text-textPrimary mb-1">Nama Maskapai *</label>
            <select v-model="form.maskapai" class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
              <option>Garuda Indonesia</option>
              <option>Batik Air</option>
              <option>Pelita Air</option>
            </select>
          </div>

          <div class="flex flex-col sm:col-span-2">
            <label class="text-xs font-semibold text-textPrimary mb-1">Kelas Maskapai *</label>
            <select v-model="form.kelas" class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
              <option>Ekonomi (Kelas Y)</option>
              <option>Ekonomi Fleksibel</option>
              <option>Bisnis (Khusus Direksi / Kakanwil)</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Option Pulang-Pergi (PP) & Form Pulang -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <input
            id="roundtrip-check"
            type="checkbox"
            v-model="isRoundTrip"
            class="w-4 h-4 text-emerald-800 rounded border-gray-300 focus:ring-emerald-700"
          />
          <label for="roundtrip-check" class="text-xs font-bold text-textPrimary font-headline cursor-pointer select-none flex items-center gap-1.5">
            Pulang-Pergi (PP)
            <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">AKTIF</span>
          </label>
        </div>
        <span class="text-[11px] text-textMuted">Rute kembali akan dibuatkan otomatis berlawanan arah</span>
      </div>

      <div v-if="isRoundTrip" class="p-4 rounded-2xl bg-surfaceCanvas/60 border border-gray-100 space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Tanggal Pulang *</label>
            <input
              v-model="form.retDate"
              type="date"
              class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary cursor-pointer"
            />
          </div>

          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Jam Pulang *</label>
            <select v-model="form.retTime" class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary font-mono text-center focus:outline-none focus:border-primary">
              <option>17:45 WIB</option>
              <option>14:20 WIB</option>
              <option>20:10 WIB</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Maskapai Pulang *</label>
            <select v-model="form.retMaskapai" class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
              <option>Garuda Indonesia</option>
              <option>Batik Air</option>
            </select>
          </div>

          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Kelas Pulang *</label>
            <select v-model="form.retKelas" class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
              <option>Ekonomi (Kelas Y)</option>
              <option>Ekonomi Fleksibel</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 4. Tombol Tambahkan ke Daftar -->
    <div class="flex justify-end pt-2">
      <button
        type="button"
        @click="handleAddTransport"
        class="px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-2 shadow-2xs transition-all active:scale-[0.98]"
      >
        <span class="material-symbols-outlined text-[18px]">add_circle</span>
        <span>Tambahkan ke Daftar</span>
      </button>
    </div>

    <!-- Modal Select Traveler LOV -->
    <SelectTravelerModal
      :is-open="isTravelerModalOpen"
      @close="isTravelerModalOpen = false"
      @select="handleTravelerSelected"
    />
  </div>
</template>