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

// 🟢 Minimal Tanggal Keberangkatan (Minimal 1 Minggu / 7 Hari dari Hari Ini)
const minDepDate = computed<string>(() => {
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() - 7)
  return targetDate.toISOString().split('T')[0] || ''
})

// State Form Personel
const form = ref({
  userId: null as string | null,
  name: '',
  npk: '',
  jabatan: '',
  phone: '',
  originCity: '',
  destCity: '',
  depDate: minDepDate.value || '',
  depTime: '00:00',
  maskapai: '',
  kelas: 'Ekonomi',
  retDate: minDepDate.value || '',
  retTime: '00:00',
  retMaskapai: '',
  retKelas: 'Ekonomi',
  estimatedPrice: 2816666,
})

// 🟢 Minimal Tanggal Pulang
const minRetDate = computed<string>(() => {
  return form.value.depDate || minDepDate.value || ''
})

// Function Callback saat Personel Dipilih dari Modal LOV
function handleTravelerSelected(emp: EmployeeItem) {
  form.value.userId = emp.id
  form.value.name = emp.name
  form.value.npk = emp.npk
  form.value.jabatan = emp.jabatan ? `${emp.jabatan} (${emp.golongan || ''})` : ''
  form.value.phone = emp.phone || ''
}

// Icon Dynamic per Moda Transportasi
const transportIcon = computed(() => {
  switch (orderStore.activeTransport) {
    case 'flight':
      return 'flight_takeoff'
    case 'train':
      return 'train'
    case 'sea':
      return 'directions_boat'
    case 'bus':
      return 'directions_bus'
    case 'car':
      return 'directions_car'
    default:
      return 'flight_takeoff'
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

  // Validasi Keberangkatan Minimal 1 Minggu (7 Hari)
  if (form.value.depDate < minDepDate.value) {
    alert('Pengajuan perjalanan dinas minimal dilakukan 1 minggu (7 hari) sebelum keberangkatan.')
    return
  }

  // Validasi Tanggal Pulang
  if (isRoundTrip.value && form.value.retDate < form.value.depDate) {
    alert('Tanggal pulang tidak boleh lebih awal dari tanggal keberangkatan.')
    return
  }

  const formattedDepTime = form.value.depTime ? `${form.value.depTime} WIB` : ''
  const formattedRetTime = form.value.retTime ? `${form.value.retTime} WIB` : ''

  // Push Data ke Store Pinia
  orderStore.addTraveller({
    category: activeCategory.value,
    userId: form.value.userId || null,
    name: form.value.name,
    npkOrKtp: form.value.npk || '-',
    jabatanOrInstansi: form.value.jabatan || '-',
    phone: form.value.phone || '-',

    route: `${form.value.originCity} ⇄ ${form.value.destCity}`,
    originCityId: (form.value as any).originCityId || 1,
    destinationCityId: (form.value as any).destinationCityId || 2,

    departureDate: form.value.depDate,
    departureTime: formattedDepTime,
    departureInfo: `${form.value.depDate} · ${formattedDepTime} (Pergi)`,
    maskapai: form.value.maskapai || '-',
    kelas: form.value.kelas || 'Ekonomi',
    transportId: (form.value as any).transportId || 1,
    transportClassId: (form.value as any).transportClassId || 1,

    isRoundTrip: isRoundTrip.value,
    returnDate: isRoundTrip.value ? form.value.retDate || form.value.depDate : null,
    returnTime: isRoundTrip.value ? formattedRetTime : null,
    returnInfo: isRoundTrip.value
      ? `${form.value.retDate || form.value.depDate} · ${formattedRetTime} (Pulang)`
      : null,
    returnMaskapai: isRoundTrip.value ? form.value.retMaskapai || form.value.maskapai : null,
    returnKelas: isRoundTrip.value ? form.value.retKelas || form.value.kelas : null,
    returnTransportId: isRoundTrip.value
      ? (form.value as any).returnTransportId || (form.value as any).transportId || 1
      : null,
    returnTransportClassId: isRoundTrip.value
      ? (form.value as any).returnTransportClassId || 1
      : null,

    price: form.value.estimatedPrice || 0,
  })

  // Reset Input Form Personel
  form.value.userId = null
  form.value.name = ''
  form.value.npk = ''
  form.value.jabatan = ''
  form.value.phone = ''
}
</script>

<template>
  <div
    class="bg-surfaceCard rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-2xs space-y-5 font-body"
  >
    <!-- Header Section 2 -->
    <div
      class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-gray-100"
    >
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-lg bg-sky-50 text-sky-700 shrink-0 mt-0.5">
          <span class="material-symbols-outlined text-[22px]">{{ transportIcon }}</span>
        </div>
        <div>
          <h2 class="text-base font-bold text-textPrimary font-headline">
            2. Data Traveller & Itinerary Penerbangan
          </h2>
          <p class="text-xs text-textMuted mt-0.5 leading-relaxed">
            Tentukan personalia yang ditugaskan beserta rincian jadwal maskapai penerbangan
          </p>
        </div>
      </div>

      <!-- Category Tab Buttons -->
      <div
        class="flex items-center gap-1 bg-surfaceCanvas p-1 rounded-xl border border-gray-200/80 w-full sm:w-auto overflow-x-auto no-scrollbar"
      >
        <button
          type="button"
          @click="activeCategory = 'INTERNAL'"
          :class="[
            'flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap',
            activeCategory === 'INTERNAL'
              ? 'bg-surfaceCard text-emerald-800 shadow-2xs'
              : 'text-textMuted hover:text-textPrimary',
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">badge</span>
          <span>Internal (BPJS)</span>
        </button>
        <button
          type="button"
          @click="activeCategory = 'EKSTERNAL'"
          :class="[
            'flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap',
            activeCategory === 'EKSTERNAL'
              ? 'bg-surfaceCard text-emerald-800 shadow-2xs'
              : 'text-textMuted hover:text-textPrimary',
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">group</span>
          <span>Eksternal (Tamu)</span>
        </button>
      </div>
    </div>

    <!-- 1. Form Penambahan Personel -->
    <div class="space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
        <span
          class="text-xs font-bold text-textPrimary uppercase tracking-wider font-headline flex items-center gap-1.5"
        >
          <span class="material-symbols-outlined text-primary text-[18px]">person_add</span>
          <span>Form Penambahan Personel</span>
        </span>
        <span class="text-[11px] text-textMuted"
          >Data penerbangan diverifikasi otomatis dengan kebijakan dinas</span
        >
      </div>

      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-surfaceCard p-3.5 sm:p-4 rounded-xl border border-gray-100 shadow-2xs"
      >
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
            <span
              class="material-symbols-outlined absolute right-3 top-2.5 text-primary text-[18px]"
              >search</span
            >
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
            <span class="material-symbols-outlined absolute left-3 text-textMuted text-[18px]"
              >call</span
            >
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
      <div class="p-3.5 sm:p-4 rounded-2xl bg-surfaceCanvas/60 border border-gray-100 space-y-3">
        <span
          class="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center gap-1.5 font-headline"
        >
          <span class="material-symbols-outlined text-[18px]">{{ transportIcon }}</span>
          <span>Penerbangan Pergi (Departure Leg)</span>
        </span>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <!-- Kota Berangkat (Input Manual) -->
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Kota Berangkat *</label>
            <input
              type="text"
              v-model="form.originCity"
              placeholder="Contoh: Jakarta (CGK)"
              class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
            />
          </div>

          <!-- Kota Tujuan (Input Manual) -->
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Kota Tujuan *</label>
            <input
              type="text"
              v-model="form.destCity"
              placeholder="Contoh: Surabaya (SUB)"
              class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
            />
          </div>

          <!-- Tanggal Berangkat -->
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Tanggal Berangkat *</label>
            <input
              v-model="form.depDate"
              type="date"
              :min="minDepDate"
              class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary cursor-pointer"
            />
            <span class="text-[10px] text-amber-700 font-medium mt-0.5"
              >Min. 7 hari dari hari ini</span
            >
          </div>

          <!-- Jam Berangkat -->
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Jam Berangkat *</label>
            <input
              type="time"
              v-model="form.depTime"
              class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary font-mono text-center focus:outline-none focus:border-primary cursor-pointer"
            />
          </div>

          <!-- Maskapai Pergi (Input Manual) -->
          <div class="flex flex-col sm:col-span-2">
            <label class="text-xs font-semibold text-textPrimary mb-1">Nama Maskapai *</label>
            <input
              type="text"
              v-model="form.maskapai"
              placeholder="Contoh: Garuda Indonesia"
              class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
            />
          </div>

          <!-- Kelas Pergi (4 Opsi) -->
          <div class="flex flex-col sm:col-span-2">
            <label class="text-xs font-semibold text-textPrimary mb-1">Kelas Maskapai *</label>
            <select
              v-model="form.kelas"
              class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
            >
              <option value="Ekonomi">Ekonomi</option>
              <option value="Ekonomi Premium">Ekonomi Premium</option>
              <option value="Bisnis Class">Bisnis Class</option>
              <option value="First Class">First Class</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- 3. Option Pulang-Pergi (PP) & Form Pulang -->
    <div class="space-y-3">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-4">
        <div class="flex items-center gap-2 flex-wrap">
          <input
            id="roundtrip-check"
            type="checkbox"
            v-model="isRoundTrip"
            class="w-4 h-4 text-emerald-800 rounded border-gray-300 focus:ring-emerald-700 cursor-pointer"
          />
          <label
            for="roundtrip-check"
            class="text-xs font-bold text-textPrimary font-headline cursor-pointer select-none flex items-center gap-1.5"
          >
            <span>Pulang-Pergi (PP)</span>
            <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold"
              >AKTIF</span
            >
          </label>
        </div>
        <span class="text-[11px] text-textMuted leading-tight"
          >Rute kembali akan dibuatkan otomatis berlawanan arah</span
        >
      </div>

      <div
        v-if="isRoundTrip"
        class="p-3.5 sm:p-4 rounded-2xl bg-surfaceCanvas/60 border border-gray-100 space-y-3"
      >
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <!-- Tanggal Pulang -->
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Tanggal Pulang *</label>
            <input
              v-model="form.retDate"
              type="date"
              :min="minRetDate"
              class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary cursor-pointer"
            />
          </div>

          <!-- Jam Pulang -->
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Jam Pulang *</label>
            <input
              type="time"
              v-model="form.retTime"
              class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary font-mono text-center focus:outline-none focus:border-primary cursor-pointer"
            />
          </div>

          <!-- Maskapai Pulang (Input Manual) -->
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Maskapai Pulang *</label>
            <input
              type="text"
              v-model="form.retMaskapai"
              placeholder="Contoh: Garuda Indonesia"
              class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
            />
          </div>

          <!-- Kelas Pulang (4 Opsi) -->
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Kelas Pulang *</label>
            <select
              v-model="form.retKelas"
              class="h-10 px-3 rounded-xl bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
            >
              <option value="Ekonomi">Ekonomi</option>
              <option value="Ekonomi Premium">Ekonomi Premium</option>
              <option value="Bisnis Class">Bisnis Class</option>
              <option value="First Class">First Class</option>
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
        class="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-[0.98]"
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
