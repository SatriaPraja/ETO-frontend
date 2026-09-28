<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import SelectTravelerModal from '@/components/order/modal/selectTravelerModal.vue'
import type { EmployeeItem } from '@/models/employee'
import type { EditTransportItem } from '@/models/travelOrderEdit'

const props = defineProps<{
  isOpen: boolean
  transportData?: EditTransportItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', transport: EditTransportItem): void
}>()

// State Internal Modal
const activeCategory = ref<'INTERNAL' | 'EKSTERNAL'>('INTERNAL')
const transportType = ref<'flight' | 'train' | 'sea' | 'bus' | 'car'>('flight')
const isRoundTrip = ref(true)
const isTravelerModalOpen = ref(false)

// Options Moda Transportasi
const transportTypeOptions = [
  { value: 'flight', label: 'Pesawat (Flight)', icon: 'flight_takeoff' },
  { value: 'train', label: 'Kereta Api (Train)', icon: 'train' },
  { value: 'sea', label: 'Kapal Laut (Sea)', icon: 'directions_boat' },
  { value: 'bus', label: 'Bus Travel', icon: 'directions_bus' },
  { value: 'car', label: 'Mobil Dinas / Rental', icon: 'directions_car' },
]

// Options Kota dari Master Data DB
const cityOptions = [
  { id: 1, code: 'JKT', name: 'Jakarta (CGK / HLP)' },
  { id: 2, code: 'SUB', name: 'Surabaya (SUB)' },
  { id: 3, code: 'KNO', name: 'Medan (KNO)' },
  { id: 4, code: 'DPS', name: 'Denpasar (DPS)' },
]

const form = ref({
  id: undefined as string | undefined,
  userId: null as string | null,
  guestName: '',
  npkOrKtp: '',
  jabatan: '',
  instansi: 'BPJS Ketenagakerjaan',
  phone: '',
  originCityId: 1,
  destinationCityId: 2,
  routeInfo: 'JKT ⇄ SUB',
  departureDate: '',
  departureTime: '08:30:00',
  maskapai: 'Garuda Indonesia',
  kelas: 'Ekonomi (Kelas Y)',
  returnDate: '',
  returnTime: '17:45:00',
  returnMaskapai: 'Garuda Indonesia',
  returnKelas: 'Ekonomi (Kelas Y)',
  estimatedPrice: 2816666,
})

// Dynamic Icon Berdasarkan Transport Type
const activeTransportIcon = computed(() => {
  const found = transportTypeOptions.find((t) => t.value === transportType.value)
  return found ? found.icon : 'flight_takeoff'
})

// Clean state saat kategori berubah
watch(activeCategory, (newCat) => {
  if (newCat === 'EKSTERNAL') {
    form.value.userId = null
    if (form.value.instansi === 'BPJS Ketenagakerjaan') {
      form.value.instansi = ''
    }
  } else if (newCat === 'INTERNAL') {
    form.value.instansi = 'BPJS Ketenagakerjaan'
  }
})

// Sinkronisasi data saat modal dibuka / data diedit
watch(
  () => [props.isOpen, props.transportData],
  ([newOpen]) => {
    if (newOpen) {
      if (props.transportData) {
        // Mode Edit Data Eksisting
        const d = props.transportData
        form.value.id = d.id
        transportType.value = d.transportType || 'flight'
        activeCategory.value = d.category || 'INTERNAL'
        isRoundTrip.value = d.isRoundTrip ?? d.is_round_trip ?? true
        form.value.userId = d.userId || d.user_id || null
        form.value.guestName = d.guestName || d.guest_name || ''
        form.value.npkOrKtp = d.npkOrKtp || d.npk_or_ktp || ''
        form.value.jabatan = d.jabatan || ''
        form.value.instansi =
          d.instansi || (activeCategory.value === 'INTERNAL' ? 'BPJS Ketenagakerjaan' : '')
        form.value.phone = d.phone || ''
        form.value.originCityId = Number(d.originCityId || d.origin_city_id || 1)
        form.value.destinationCityId = Number(d.destinationCityId || d.destination_city_id || 2)
        form.value.departureDate = d.departureDate || d.departure_date || ''
        form.value.departureTime = d.departureTime || d.departure_time || '08:30:00'
        form.value.maskapai = d.maskapai || 'Garuda Indonesia'
        form.value.kelas = d.kelas || 'Ekonomi (Kelas Y)'
        form.value.returnDate = d.returnDate || d.return_date || ''
        form.value.returnTime = d.returnTime || d.return_time || '17:45:00'
        form.value.returnMaskapai = d.returnMaskapai || d.return_maskapai || 'Garuda Indonesia'
        form.value.returnKelas = d.returnKelas || d.return_kelas || 'Ekonomi (Kelas Y)'
        form.value.estimatedPrice = Number(d.estimatedPrice || d.estimated_price || 0)
      } else {
        // Mode Tambah Baru (Reset Form)
        form.value = {
          id: undefined,
          userId: null,
          guestName: '',
          npkOrKtp: '',
          jabatan: '',
          instansi: 'BPJS Ketenagakerjaan',
          phone: '',
          originCityId: 1,
          destinationCityId: 2,
          routeInfo: 'JKT ⇄ SUB',
          departureDate: new Date().toISOString().split('T')[0]!,
          departureTime: '08:30:00',
          maskapai: 'Garuda Indonesia',
          kelas: 'Ekonomi (Kelas Y)',
          returnDate: '',
          returnTime: '17:45:00',
          returnMaskapai: 'Garuda Indonesia',
          returnKelas: 'Ekonomi (Kelas Y)',
          estimatedPrice: 2816666,
        }
        transportType.value = 'flight'
        activeCategory.value = 'INTERNAL'
        isRoundTrip.value = true
      }
    }
  },
  { immediate: true },
)

function openTravelerModal() {
  if (activeCategory.value === 'INTERNAL') {
    isTravelerModalOpen.value = true
  }
}

function handleTravelerSelected(emp: EmployeeItem) {
  form.value.userId = emp.id
  form.value.guestName = emp.name
  form.value.npkOrKtp = emp.npk
  form.value.jabatan = emp.jabatan ? `${emp.jabatan} (${emp.golongan || ''})` : 'Pegawai'
  form.value.phone = emp.phone || ''
}

function handleSave() {
  if (!form.value.guestName.trim()) {
    alert('Mohon isi nama traveller terlebih dahulu.')
    return
  }
  if (!form.value.departureDate) {
    alert('Mohon isi tanggal keberangkatan.')
    return
  }

  const originObj = cityOptions.find((c) => c.id === form.value.originCityId)
  const destObj = cityOptions.find((c) => c.id === form.value.destinationCityId)
  const routeString = `${originObj?.code || 'JKT'} ⇄ ${destObj?.code || 'SUB'}`

  // Format Payload Disesuaikan dengan DB SQL & Pinia Store
  const payload: EditTransportItem = {
    id: form.value.id,
    transportType: transportType.value,
    category: activeCategory.value,
    userId: activeCategory.value === 'INTERNAL' ? form.value.userId || undefined : undefined,
    user_id: activeCategory.value === 'INTERNAL' ? form.value.userId || undefined : undefined,
    guestName: form.value.guestName,
    guest_name: form.value.guestName,
    npkOrKtp: form.value.npkOrKtp || '-',
    npk_or_ktp: form.value.npkOrKtp || '-',
    jabatan: form.value.jabatan || '-',
    instansi:
      activeCategory.value === 'INTERNAL'
        ? 'BPJS Ketenagakerjaan'
        : form.value.instansi || 'Eksternal',
    phone: form.value.phone || '-',

    // Route & Cities
    routeInfo: routeString,
    route_info: routeString,
    originCityId: form.value.originCityId,
    origin_city_id: form.value.originCityId,
    destinationCityId: form.value.destinationCityId,
    destination_city_id: form.value.destinationCityId,

    // Departure Leg
    departureDate: form.value.departureDate,
    departure_date: form.value.departureDate,
    departureTime:
      form.value.departureTime.length === 5
        ? `${form.value.departureTime}:00`
        : form.value.departureTime,
    departure_time:
      form.value.departureTime.length === 5
        ? `${form.value.departureTime}:00`
        : form.value.departureTime,
    maskapai: form.value.maskapai,
    kelas: form.value.kelas,

    // Return Leg
    isRoundTrip: isRoundTrip.value,
    is_round_trip: isRoundTrip.value,
    returnDate: isRoundTrip.value ? form.value.returnDate || form.value.departureDate : undefined,
    return_date: isRoundTrip.value ? form.value.returnDate || form.value.departureDate : undefined,
    returnTime: isRoundTrip.value
      ? form.value.returnTime.length === 5
        ? `${form.value.returnTime}:00`
        : form.value.returnTime
      : undefined,
    return_time: isRoundTrip.value
      ? form.value.returnTime.length === 5
        ? `${form.value.returnTime}:00`
        : form.value.returnTime
      : undefined,
    returnMaskapai: isRoundTrip.value ? form.value.returnMaskapai : undefined,
    return_maskapai: isRoundTrip.value ? form.value.returnMaskapai : undefined,
    returnKelas: isRoundTrip.value ? form.value.returnKelas : undefined,
    return_kelas: isRoundTrip.value ? form.value.returnKelas : undefined,

    estimatedPrice: Number(form.value.estimatedPrice) || 0,
    estimated_price: Number(form.value.estimatedPrice) || 0,
  }

  emit('save', payload)
  emit('close')
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 overflow-y-auto font-body"
  >
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-3xl overflow-hidden my-8">
      <!-- Header -->
      <div
        class="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/50"
      >
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-emerald-700 text-2xl">{{
            activeTransportIcon
          }}</span>
          <h3 class="text-base font-bold text-gray-800 font-headline">
            {{
              transportData
                ? 'Edit Data Traveller & Transport'
                : 'Tambah Traveller & Transport Baru'
            }}
          </h3>
        </div>
        <button
          type="button"
          @click="emit('close')"
          class="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
        <!-- Moda Transportasi & Kategori Traveller -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 pb-3 border-b border-gray-100">
          <!-- Pilih Moda Transportasi -->
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-gray-600 mb-1">Moda Transportasi:</label>
            <div class="relative">
              <select
                v-model="transportType"
                class="w-full h-10 pl-9 pr-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
              >
                <option v-for="t in transportTypeOptions" :key="t.value" :value="t.value">
                  {{ t.label }}
                </option>
              </select>
              <span
                class="material-symbols-outlined absolute left-2.5 top-2.5 text-emerald-700 text-[18px]"
              >
                {{ activeTransportIcon }}
              </span>
            </div>
          </div>

          <!-- Kategori Traveller Button Switch -->
          <div class="flex flex-col justify-end">
            <label class="text-xs font-semibold text-gray-600 mb-1">Kategori Traveller:</label>
            <div
              class="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200/80"
            >
              <button
                type="button"
                @click="activeCategory = 'INTERNAL'"
                :class="[
                  'flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer',
                  activeCategory === 'INTERNAL'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800',
                ]"
              >
                <span class="material-symbols-outlined text-[16px]">badge</span>
                <span>Internal (BPJS)</span>
              </button>
              <button
                type="button"
                @click="activeCategory = 'EKSTERNAL'"
                :class="[
                  'flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer',
                  activeCategory === 'EKSTERNAL'
                    ? 'bg-white text-emerald-800 shadow-xs'
                    : 'text-gray-500 hover:text-gray-800',
                ]"
              >
                <span class="material-symbols-outlined text-[16px]">group</span>
                <span>Eksternal (Tamu)</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 1. Form Personel -->
        <div class="space-y-3">
          <span
            class="text-xs font-bold text-gray-800 uppercase tracking-wider font-headline flex items-center gap-1.5"
          >
            <span class="material-symbols-outlined text-emerald-600 text-[18px]">person_add</span>
            <span>Informasi Personel ({{ activeCategory }})</span>
          </span>

          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50/50 p-4 rounded-xl border border-gray-100"
          >
            <!-- Nama Traveller -->
            <div class="flex flex-col">
              <label class="text-xs font-semibold text-gray-700 mb-1">
                Nama Traveller *
                <span
                  v-if="activeCategory === 'EKSTERNAL'"
                  class="text-[10px] text-emerald-600 font-normal ml-1"
                  >(Input Bebas)</span
                >
              </label>

              <!-- Input INTERNAL: Menggunakan Click/LOV -->
              <div
                v-if="activeCategory === 'INTERNAL'"
                class="relative cursor-pointer"
                @click="openTravelerModal"
              >
                <input
                  type="text"
                  v-model="form.guestName"
                  readonly
                  placeholder="Klik untuk pilih pegawai BPJS..."
                  class="w-full h-10 pl-3 pr-9 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-emerald-600 cursor-pointer"
                />
                <span
                  class="material-symbols-outlined absolute right-3 top-2.5 text-emerald-600 text-[18px]"
                  >search</span
                >
              </div>

              <!-- Input EKSTERNAL: Aktif Bisa Diketik Langsung -->
              <input
                v-else
                type="text"
                v-model="form.guestName"
                placeholder="Ketik nama lengkap narasumber / tamu..."
                class="w-full h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-800 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <!-- NPK / KTP -->
            <div class="flex flex-col">
              <label class="text-xs font-semibold text-gray-700 mb-1">
                {{ activeCategory === 'INTERNAL' ? 'NPK Pegawai' : 'No. KTP / Identitas' }}
              </label>
              <input
                type="text"
                v-model="form.npkOrKtp"
                :placeholder="activeCategory === 'INTERNAL' ? 'NPK Pegawai' : 'Nomor KTP Tamu'"
                class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs font-mono font-semibold text-gray-700 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <!-- Jabatan / Instansi -->
            <div class="flex flex-col">
              <label class="text-xs font-semibold text-gray-700 mb-1">
                {{ activeCategory === 'INTERNAL' ? 'Jabatan' : 'Jabatan / Instansi Asal' }}
              </label>
              <input
                type="text"
                v-model="form.jabatan"
                :placeholder="
                  activeCategory === 'INTERNAL' ? 'Jabatan' : 'Contoh: Pemateri / Kementerian'
                "
                class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs text-gray-700 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <!-- No HP -->
            <div class="flex flex-col">
              <label class="text-xs font-semibold text-gray-700 mb-1">No. Handphone *</label>
              <input
                type="text"
                v-model="form.phone"
                placeholder="081234567890"
                class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs font-mono text-gray-800 focus:outline-none focus:border-emerald-600"
              />
            </div>
          </div>
        </div>

        <!-- 2. Form Keberangkatan -->
        <div class="space-y-3">
          <div class="p-4 rounded-2xl bg-sky-50/40 border border-sky-100 space-y-3">
            <span
              class="text-xs font-bold text-sky-800 uppercase tracking-wider flex items-center gap-1.5 font-headline"
            >
              <span class="material-symbols-outlined text-[18px]">{{ activeTransportIcon }}</span>
              <span>Rincian Keberangkatan (Departure Leg)</span>
            </span>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div class="flex flex-col">
                <label class="text-xs font-semibold text-gray-700 mb-1">Kota Berangkat</label>
                <select
                  v-model="form.originCityId"
                  class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs"
                >
                  <option v-for="c in cityOptions" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>

              <div class="flex flex-col">
                <label class="text-xs font-semibold text-gray-700 mb-1">Kota Tujuan</label>
                <select
                  v-model="form.destinationCityId"
                  class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs"
                >
                  <option v-for="c in cityOptions" :key="c.id" :value="c.id">{{ c.name }}</option>
                </select>
              </div>

              <div class="flex flex-col">
                <label class="text-xs font-semibold text-gray-700 mb-1">Tanggal Berangkat *</label>
                <input
                  type="date"
                  v-model="form.departureDate"
                  class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs"
                />
              </div>

              <div class="flex flex-col">
                <label class="text-xs font-semibold text-gray-700 mb-1">Jam Berangkat</label>
                <input
                  type="time"
                  v-model="form.departureTime"
                  class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs font-mono text-center"
                />
              </div>

              <div class="flex flex-col sm:col-span-2">
                <label class="text-xs font-semibold text-gray-700 mb-1"
                  >Operator / Maskapai / Penyedia</label
                >
                <input
                  type="text"
                  v-model="form.maskapai"
                  placeholder="Garuda Indonesia / PT KAI / Fleet"
                  class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs"
                />
              </div>

              <div class="flex flex-col sm:col-span-2">
                <label class="text-xs font-semibold text-gray-700 mb-1">Kelas Layanan</label>
                <select
                  v-model="form.kelas"
                  class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs"
                >
                  <option>Ekonomi (Kelas Y)</option>
                  <option>Ekonomi Fleksibel</option>
                  <option>Eksekutif / Bisnis</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Form Kepulangan -->
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <input
              id="roundtrip-check"
              type="checkbox"
              v-model="isRoundTrip"
              class="w-4 h-4 text-emerald-600 rounded border-gray-300"
            />
            <label
              for="roundtrip-check"
              class="text-xs font-bold text-gray-800 font-headline cursor-pointer select-none"
            >
              Pulang-Pergi (PP)
            </label>
          </div>

          <div
            v-if="isRoundTrip"
            class="p-4 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-3"
          >
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <div class="flex flex-col">
                <label class="text-xs font-semibold text-gray-700 mb-1">Tanggal Pulang</label>
                <input
                  type="date"
                  v-model="form.returnDate"
                  class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs"
                />
              </div>

              <div class="flex flex-col">
                <label class="text-xs font-semibold text-gray-700 mb-1">Jam Pulang</label>
                <input
                  type="time"
                  v-model="form.returnTime"
                  class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs font-mono text-center"
                />
              </div>

              <div class="flex flex-col">
                <label class="text-xs font-semibold text-gray-700 mb-1">Operator Pulang</label>
                <input
                  type="text"
                  v-model="form.returnMaskapai"
                  placeholder="Operator Pulang"
                  class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs"
                />
              </div>

              <div class="flex flex-col">
                <label class="text-xs font-semibold text-gray-700 mb-1">Kelas Pulang</label>
                <select
                  v-model="form.returnKelas"
                  class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs"
                >
                  <option>Ekonomi (Kelas Y)</option>
                  <option>Ekonomi Fleksibel</option>
                  <option>Eksekutif / Bisnis</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <!-- 4. Estimasi Biaya -->
        <div
          class="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
        >
          <label class="text-xs font-bold text-gray-700"
            >Estimasi Biaya Tiket / Transportasi (Rp)</label
          >
          <input
            type="number"
            v-model.number="form.estimatedPrice"
            class="h-10 px-3 rounded-xl bg-white border border-gray-200 text-xs font-bold font-headline text-right w-44"
          />
        </div>
      </div>

      <!-- Footer -->
      <div
        class="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50/50"
      >
        <button
          type="button"
          @click="emit('close')"
          class="px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-xs font-bold hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Batal
        </button>
        <button
          type="button"
          @click="handleSave"
          class="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors cursor-pointer"
        >
          {{ transportData ? 'Simpan Perubahan' : 'Tambah ke Daftar' }}
        </button>
      </div>
    </div>

    <!-- Modal Select Traveler LOV (Khusus INTERNAL) -->
    <SelectTravelerModal
      :is-open="isTravelerModalOpen"
      @close="isTravelerModalOpen = false"
      @select="handleTravelerSelected"
    />
  </div>
</template>
