<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import HotelGuestsModal from '@/components/order/modal/hotelGuestsModal.vue'
import SelectHotelModal, { type HotelItem } from '@/components/order/modal/selectHotelModal.vue'

const orderStore = useOrderStore()

// State Modal
const isGuestsModalOpen = ref(false)
const isHotelModalOpen = ref(false)
const selectedHotelForGuests = ref<any>(null)

// 🟢 Helper Tanggal Otomatis (Hari Ini & Besok)
function getTodayDate(): string {
  const today = new Date()
  return today.toISOString().split('T')[0] || ''
}

function getTomorrowDate(baseDateStr?: string): string {
  const baseDate = baseDateStr ? new Date(baseDateStr) : new Date()
  baseDate.setDate(baseDate.getDate() + 1)
  return baseDate.toISOString().split('T')[0] || ''
}

const newHotel = ref({
  hotelId: null as number | null,
  hotelNameCustom: '',
  cityName: '',
  cityId: null as number | null,
  roomCount: 1,
  checkInDate: getTodayDate(),
  checkOutDate: getTomorrowDate(),
  durationNights: 1,
  pricePerNight: 850000,
})

// 🟢 Hitung durasi malam otomatis saat Check-In / Check-Out diisi (Minimal 1 Malam)
watch(
  [() => newHotel.value.checkInDate, () => newHotel.value.checkOutDate],
  ([inDate, outDate]) => {
    if (inDate && outDate) {
      const start = new Date(inDate)
      const end = new Date(outDate)
      const diffTime = end.getTime() - start.getTime()
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

      // 🟢 Validasi minimal 1 malam: Jika Check-Out <= Check-In, otomatis koreksi ke besoknya
      if (diffDays < 1) {
        newHotel.value.checkOutDate = getTomorrowDate(inDate)
        diffDays = 1
      }

      newHotel.value.durationNights = diffDays
    }
  },
)

// Estimasi Subtotal untuk item yang sedang diisi di form
const calculatedSubtotal = computed(() => {
  return newHotel.value.roomCount * newHotel.value.durationNights * newHotel.value.pricePerNight
})

function increaseRoom() {
  newHotel.value.roomCount++
}

function decreaseRoom() {
  if (newHotel.value.roomCount > 1) newHotel.value.roomCount--
}

// Handler memilih hotel dari modal master LOV
function handleHotelSelected(hotel: HotelItem) {
  newHotel.value.hotelId = hotel.id
  newHotel.value.hotelNameCustom = hotel.name
  newHotel.value.cityName = hotel.cityName || ''
  newHotel.value.cityId = hotel.cityId || null

  isHotelModalOpen.value = false
}

// Fungsi tombol "Tambahkan ke Daftar"
function handleAddHotel() {
  if (!newHotel.value.hotelNameCustom) {
    alert('Mohon pilih hotel terlebih dahulu.')
    return
  }
  if (!newHotel.value.checkInDate || !newHotel.value.checkOutDate) {
    alert('Mohon lengkapi tanggal Check-In dan Check-Out.')
    return
  }

  orderStore.addHotel({
    hotelId: newHotel.value.hotelId,
    hotelNameCustom: newHotel.value.hotelNameCustom,
    cityId: newHotel.value.cityId,
    cityName: newHotel.value.cityName,
    roomCount: newHotel.value.roomCount,
    checkInDate: newHotel.value.checkInDate,
    checkOutDate: newHotel.value.checkOutDate,
    durationNights: newHotel.value.durationNights,
    pricePerNight: newHotel.value.pricePerNight,
    subtotalPrice: calculatedSubtotal.value,
    guests: [],
  })

  // Reset input form
  newHotel.value.hotelNameCustom = ''
  newHotel.value.hotelId = null
  newHotel.value.cityName = ''
  newHotel.value.cityId = null
  newHotel.value.checkInDate = getTodayDate()
  newHotel.value.checkOutDate = getTomorrowDate()
  newHotel.value.durationNights = 1
}

function openGuestsModal(hotelItem: any) {
  selectedHotelForGuests.value = hotelItem
  isGuestsModalOpen.value = true
}

function handleGuestsSaved() {
  isGuestsModalOpen.value = false
}
</script>

<template>
  <div class="space-y-6 font-body">
    <!-- Section 2: Data Hotel & Detail Kamar -->
    <div class="space-y-4">
      <!-- Header Section -->
      <div class="flex items-center justify-between pb-1">
        <div>
          <h2 class="text-base font-bold text-textPrimary font-headline flex items-center gap-2">
            <span class="material-symbols-outlined text-[#930049] text-[20px]">hotel</span>
            2. Data Hotel & Detail Kamar
            <span
              class="px-2 py-0.5 rounded bg-[#930049] text-white text-[10px] font-bold uppercase tracking-wider"
              >AKOMODASI</span
            >
          </h2>
          <p class="text-xs text-textMuted mt-0.5">
            Masukkan rincian reservasi akomodasi hotel dinas sesuai plafon jabatan
          </p>
        </div>

        <button
          type="button"
          @click="isHotelModalOpen = true"
          class="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
        >
          <span class="material-symbols-outlined text-[16px]">domain</span>
          <span>Lihat Hotel Rekanan BPJS</span>
        </button>
      </div>

      <!-- Form Filter / Order Hotel -->
      <div class="bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <!-- Nama Hotel -->
          <div class="flex flex-col lg:col-span-2">
            <label class="text-xs font-semibold text-textPrimary mb-1">Nama Hotel *</label>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined absolute left-2.5 text-textMuted text-[18px]"
                >search</span
              >
              <input
                v-model="newHotel.hotelNameCustom"
                type="text"
                readonly
                @click="isHotelModalOpen = true"
                placeholder="Pilih dari master hotel..."
                class="w-full h-9 pl-8 pr-8 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium cursor-pointer"
              />
              <button
                type="button"
                @click="isHotelModalOpen = true"
                class="absolute right-2 text-textMuted hover:text-primary transition-colors cursor-pointer"
                title="Cari Master Hotel"
              >
                <span class="material-symbols-outlined text-[18px]">domain</span>
              </button>
            </div>
          </div>

          <!-- Kota -->
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Kota</label>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined absolute left-2.5 text-textMuted text-[18px]"
                >location_on</span
              >
              <input
                v-model="newHotel.cityName"
                type="text"
                readonly
                placeholder="Otomatis terisi..."
                class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-xs text-textMuted font-semibold cursor-not-allowed focus:outline-none"
              />
            </div>
          </div>

          <!-- Jml Kamar -->
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Jml Kamar *</label>
            <div
              class="flex items-center h-9 rounded-lg border border-gray-200 bg-surfaceCard px-2"
            >
              <button
                type="button"
                @click="decreaseRoom"
                class="w-6 h-6 flex items-center justify-center text-textMuted hover:text-textPrimary font-bold cursor-pointer"
              >
                -
              </button>
              <span class="flex-1 text-center text-xs font-bold text-textPrimary"
                >{{ newHotel.roomCount }} Kamar</span
              >
              <button
                type="button"
                @click="increaseRoom"
                class="w-6 h-6 flex items-center justify-center text-textMuted hover:text-textPrimary font-bold cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          <!-- Check-In & Check-Out (Minimal 1 Malam) -->
          <div class="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
            <div class="flex flex-col flex-1">
              <label class="text-xs font-semibold text-textPrimary mb-1">Check-In *</label>
              <input
                type="date"
                v-model="newHotel.checkInDate"
                class="h-9 px-2 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary text-center cursor-pointer"
              />
            </div>
            <div class="flex flex-col flex-1">
              <label class="text-xs font-semibold text-textPrimary mb-1">Check-Out *</label>
              <input
                type="date"
                v-model="newHotel.checkOutDate"
                :min="getTomorrowDate(newHotel.checkInDate)"
                class="h-9 px-2 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary text-center cursor-pointer"
              />
            </div>
          </div>
        </div>

        <!-- BARIS ESTIMASI & TOMBOL TAMBAHKAN KE DAFTAR -->
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-gray-100"
        >
          <div class="flex items-center gap-4">
            <div
              class="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold flex items-center gap-1.5"
            >
              <span class="material-symbols-outlined text-[16px]">schedule</span>
              <span>{{ newHotel.durationNights }} Malam</span>
            </div>
            <div class="text-xs">
              <span class="text-textMuted">Estimasi Subtotal: </span>
              <strong class="text-textPrimary font-headline text-sm ml-1">
                Rp {{ calculatedSubtotal.toLocaleString('id-ID') }}
              </strong>
            </div>
          </div>

          <button
            type="button"
            @click="handleAddHotel"
            class="px-5 py-2 rounded-lg bg-primary hover:bg-primaryHover text-onPrimary text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <span class="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Tambahkan ke Daftar</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Tabel Daftar Pemesanan Hotel -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="text-xs font-bold text-textPrimary font-headline uppercase tracking-wider">
          Daftar Pemesanan Hotel
          <span class="px-2 py-0.5 rounded bg-surfaceContainerLow text-primary ml-1">
            {{ orderStore.hotels.length }} Hotel tersimpan
          </span>
        </h3>
        <span class="text-[11px] text-textMuted">
          Total Akomodasi:
          <strong class="text-emerald-700 font-bold">
            Rp {{ orderStore.totalHotelCost.toLocaleString('id-ID') }}
          </strong>
        </span>
      </div>

      <div class="overflow-x-auto border border-gray-100 rounded-xl bg-surfaceCard">
        <table class="w-full text-left text-xs font-body">
          <thead
            class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100"
          >
            <tr>
              <th class="p-3 text-center w-10">NO</th>
              <th class="p-3">NAMA HOTEL</th>
              <th class="p-3">KOTA</th>
              <th class="p-3 text-center">JML KAMAR</th>
              <th class="p-3 text-center">PERIODE MENGINAP</th>
              <th class="p-3 text-center">DURASI</th>
              <th class="p-3 text-right">TARIF / MALAM</th>
              <th class="p-3 text-right">SUBTOTAL</th>
              <th class="p-3 text-center">STATUS PENGINAP</th>
              <th class="p-3 text-center">AKSI</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 text-xs">
            <tr v-if="orderStore.hotels.length === 0">
              <td colspan="10" class="p-8 text-center text-textMuted">
                Belum ada pemesanan hotel yang ditambahkan. Isi form di atas lalu klik
                <strong>"Tambahkan ke Daftar"</strong>.
              </td>
            </tr>

            <tr
              v-else
              v-for="(item, idx) in orderStore.hotels"
              :key="item.id"
              class="hover:bg-surfaceCanvas/50 transition-colors"
            >
              <td class="p-3 text-center font-bold text-textMuted">{{ idx + 1 }}</td>
              <td class="p-3 font-bold text-textPrimary font-headline">
                {{ item.hotelNameCustom }}
              </td>
              <td class="p-3 text-textMuted">{{ item.cityName }}</td>
              <td class="p-3 text-center font-bold text-textPrimary">{{ item.roomCount }} Kamar</td>
              <td class="p-3 text-center whitespace-nowrap">
                <span class="font-medium text-textPrimary"
                  >{{ item.checkInDate }} ➔ {{ item.checkOutDate }}</span
                >
              </td>
              <td class="p-3 text-center">
                <span
                  class="px-2 py-0.5 rounded bg-surfaceCanvas font-bold text-textPrimary text-[11px]"
                  >{{ item.durationNights }} Malam</span
                >
              </td>
              <td class="p-3 text-right font-medium text-textPrimary">
                Rp {{ (item.pricePerNight || 0).toLocaleString('id-ID') }}
              </td>
              <td class="p-3 text-right font-bold text-primary font-headline">
                Rp {{ (item.subtotalPrice || 0).toLocaleString('id-ID') }}
              </td>
              <td class="p-3 text-center">
                <button
                  type="button"
                  @click="openGuestsModal(item)"
                  class="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-[11px] hover:bg-blue-100 transition-colors inline-flex items-center gap-1 shadow-2xs cursor-pointer"
                >
                  <span class="material-symbols-outlined text-[14px]">person_add</span>
                  <span>Isi Data Penginap ({{ item.guests?.length || 0 }} Tamu)</span>
                </button>
              </td>
              <td class="p-3 text-center">
                <button
                  type="button"
                  @click="orderStore.removeHotel(item.id)"
                  class="p-1 text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                  title="Hapus"
                >
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal Alokasi Data Penginap -->
    <HotelGuestsModal
      :is-open="isGuestsModalOpen"
      :hotel-item="selectedHotelForGuests"
      @close="isGuestsModalOpen = false"
      @save="handleGuestsSaved"
    />

    <!-- Modal Master Hotel -->
    <SelectHotelModal
      :is-open="isHotelModalOpen"
      @close="isHotelModalOpen = false"
      @select="handleHotelSelected"
    />
  </div>
</template>
