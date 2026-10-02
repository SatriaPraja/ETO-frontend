<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useTravelOrderEditStore } from '@/stores/travelOrderEditStore'
import HotelGuestsModal from '@/components/order/modal/hotelGuestsModal.vue'
import SelectHotelModal, { type HotelItem } from '@/components/order/modal/selectHotelModal.vue'

const editStore = useTravelOrderEditStore()

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

// Fungsi tombol "Tambahkan ke Daftar" pada Mode Edit
function handleAddHotel() {
  if (!newHotel.value.hotelNameCustom) {
    alert('Mohon pilih hotel terlebih dahulu.')
    return
  }
  if (!newHotel.value.checkInDate || !newHotel.value.checkOutDate) {
    alert('Mohon lengkapi tanggal Check-In dan Check-Out.')
    return
  }

  editStore.hotels.push({
    hotelId: newHotel.value.hotelId || 1,
    hotelNameCustom: newHotel.value.hotelNameCustom,
    cityId: newHotel.value.cityId || 2,
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

function removeHotel(index: number) {
  if (confirm('Apakah Anda yakin ingin menghapus pemesanan hotel ini?')) {
    editStore.hotels.splice(index, 1)
  }
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
  <div
    class="bg-white p-3.5 sm:p-6 rounded-2xl border border-gray-100 shadow-2xs space-y-4 sm:space-y-5 font-body"
  >
    <!-- Header Section -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100"
    >
      <div>
        <h2
          class="text-sm sm:text-base font-bold text-textPrimary font-headline flex items-center gap-2"
        >
          <span class="material-symbols-outlined text-[#930049] text-[20px]">hotel</span>
          <span>Data Hotel & Detail Kamar</span>
          <span
            class="px-2 py-0.5 rounded bg-[#930049] text-white text-[10px] font-bold uppercase tracking-wider shrink-0"
          >
            AKOMODASI
          </span>
        </h2>
        <p class="text-[11px] sm:text-xs text-textMuted mt-0.5 leading-relaxed">
          Masukkan rincian reservasi akomodasi hotel dinas sesuai plafon jabatan
        </p>
      </div>

      <button
        type="button"
        @click="isHotelModalOpen = true"
        class="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer self-start sm:self-auto"
      >
        <span class="material-symbols-outlined text-[16px]">domain</span>
        <span>Lihat Hotel Rekanan BPJS</span>
      </button>
    </div>

    <!-- Form Input / Order Hotel -->
    <div class="bg-surfaceCard p-3.5 sm:p-4 rounded-xl border border-gray-100 shadow-2xs space-y-3">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <!-- Nama Hotel -->
        <div class="flex flex-col sm:col-span-2 lg:col-span-2">
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
              class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-xs text-textMuted font-semibold cursor-not-allowed focus:outline-none truncate"
            />
          </div>
        </div>

        <!-- Jml Kamar -->
        <div class="flex flex-col">
          <label class="text-xs font-semibold text-textPrimary mb-1">Jml Kamar *</label>
          <div class="flex items-center h-9 rounded-lg border border-gray-200 bg-surfaceCard px-2">
            <button
              type="button"
              @click="decreaseRoom"
              class="w-6 h-6 flex items-center justify-center text-textMuted hover:text-textPrimary font-bold cursor-pointer active:scale-95"
            >
              -
            </button>
            <span class="flex-1 text-center text-xs font-bold text-textPrimary">
              {{ newHotel.roomCount }} Kamar
            </span>
            <button
              type="button"
              @click="increaseRoom"
              class="w-6 h-6 flex items-center justify-center text-textMuted hover:text-textPrimary font-bold cursor-pointer active:scale-95"
            >
              +
            </button>
          </div>
        </div>

        <!-- Check-In & Check-Out -->
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
        class="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-gray-100"
      >
        <div class="flex items-center justify-between sm:justify-start gap-3">
          <div
            class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold flex items-center gap-1.5 shrink-0"
          >
            <span class="material-symbols-outlined text-[16px]">schedule</span>
            <span>{{ newHotel.durationNights }} Malam</span>
          </div>
          <div class="text-xs">
            <span class="text-textMuted">Subtotal: </span>
            <strong class="text-textPrimary font-headline text-sm ml-1">
              Rp {{ calculatedSubtotal.toLocaleString('id-ID') }}
            </strong>
          </div>
        </div>

        <button
          type="button"
          @click="handleAddHotel"
          class="w-full sm:w-auto justify-center px-5 py-2 rounded-lg bg-primary hover:bg-primaryHover text-onPrimary text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
        >
          <span class="material-symbols-outlined text-[18px]">add_circle</span>
          <span>Tambahkan ke Daftar</span>
        </button>
      </div>
    </div>

    <!-- Section Daftar Pemesanan Hotel -->
    <div class="space-y-3 pt-2">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
        <h3
          class="text-xs font-bold text-textPrimary font-headline uppercase tracking-wider flex items-center gap-1.5"
        >
          <span>Daftar Pemesanan Hotel</span>
          <span class="px-2 py-0.5 rounded bg-surfaceContainerLow text-primary text-[10px]">
            {{ editStore.hotels.length }} Tersimpan
          </span>
        </h3>
        <span class="text-xs text-textMuted">
          Total Akomodasi:
          <strong class="text-emerald-700 font-bold text-sm">
            Rp {{ editStore.totalHotelCost.toLocaleString('id-ID') }}
          </strong>
        </span>
      </div>

      <!-- 🟢 1. VIEW MOBILE: Kartu Item Hotel (Tampil di Layar HP) -->
      <div class="block sm:hidden space-y-3">
        <div
          v-if="editStore.hotels.length === 0"
          class="p-6 text-center text-textMuted text-xs border border-dashed border-gray-200 rounded-xl"
        >
          Belum ada pemesanan hotel yang ditambahkan. Isi form di atas lalu klik
          <strong>"Tambahkan ke Daftar"</strong>.
        </div>

        <div
          v-else
          v-for="(item, idx) in editStore.hotels"
          :key="item.id || idx"
          class="bg-surfaceCanvas/50 border border-gray-200/80 rounded-xl p-3.5 space-y-3 relative"
        >
          <!-- Nama Hotel & Kota -->
          <div class="flex items-start justify-between gap-2 pb-2.5 border-b border-gray-200/60">
            <div>
              <div class="flex items-center gap-1.5">
                <span class="text-[11px] font-bold text-textMuted">#{{ idx + 1 }}</span>
                <h4 class="font-bold text-textPrimary font-headline text-xs">
                  {{ item.hotelNameCustom }}
                </h4>
              </div>
              <span class="text-[11px] text-textMuted block mt-0.5">
                📍 {{ item.cityName || 'Kota tidak diset' }}
              </span>
            </div>

            <button
              type="button"
              @click="removeHotel(idx)"
              class="p-1 text-rose-600 hover:text-rose-800 transition-colors cursor-pointer shrink-0"
              title="Hapus Pemesanan"
            >
              <span class="material-symbols-outlined text-[18px]">delete</span>
            </button>
          </div>

          <!-- Rincian Kamar, Periode, & Subtotal -->
          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="space-y-0.5">
              <span class="text-[10px] text-textMuted uppercase font-bold block"
                >Kamar & Durasi</span
              >
              <div class="font-semibold text-textPrimary">
                {{ item.roomCount }} Kamar · {{ item.durationNights }} Malam
              </div>
              <span class="text-[10px] text-textMuted block">
                Rp {{ (item.pricePerNight || 0).toLocaleString('id-ID') }} / malam
              </span>
            </div>

            <div class="space-y-0.5 text-right">
              <span class="text-[10px] text-textMuted uppercase font-bold block">Subtotal</span>
              <strong class="text-xs font-bold text-primary font-headline block">
                Rp {{ (item.subtotalPrice || 0).toLocaleString('id-ID') }}
              </strong>
              <span class="text-[10px] text-textMuted block">
                {{ item.checkInDate }} ➔ {{ item.checkOutDate }}
              </span>
            </div>
          </div>

          <!-- Tombol Isi Data Penginap Mobile -->
          <div class="pt-2 border-t border-gray-200/60">
            <button
              type="button"
              @click="openGuestsModal(item)"
              class="w-full px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 font-bold text-[11px] hover:bg-blue-100 transition-colors flex items-center justify-center gap-1.5 border border-blue-100 cursor-pointer active:scale-[0.98]"
            >
              <span class="material-symbols-outlined text-[16px]">person_add</span>
              <span>Isi Data Penginap ({{ item.guests?.length || 0 }} Tamu)</span>
            </button>
          </div>
        </div>
      </div>

      <!-- 💻 2. VIEW DESKTOP: Tabel Tradisional (Tampil di Tablet/Laptop) -->
      <div class="hidden sm:block overflow-x-auto border border-gray-100 rounded-xl bg-surfaceCard">
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
            <tr v-if="editStore.hotels.length === 0">
              <td colspan="10" class="p-8 text-center text-textMuted">
                Belum ada pemesanan hotel yang ditambahkan. Isi form di atas lalu klik
                <strong>"Tambahkan ke Daftar"</strong>.
              </td>
            </tr>

            <tr
              v-else
              v-for="(item, idx) in editStore.hotels"
              :key="item.id || idx"
              class="hover:bg-surfaceCanvas/50 transition-colors"
            >
              <td class="p-3 text-center font-bold text-textMuted">{{ idx + 1 }}</td>
              <td class="p-3 font-bold text-textPrimary font-headline">
                {{ item.hotelNameCustom }}
              </td>
              <td class="p-3 text-textMuted">{{ item.cityName || '-' }}</td>
              <td class="p-3 text-center font-bold text-textPrimary">{{ item.roomCount }} Kamar</td>
              <td class="p-3 text-center whitespace-nowrap">
                <span class="font-medium text-textPrimary">
                  {{ item.checkInDate }} ➔ {{ item.checkOutDate }}
                </span>
              </td>
              <td class="p-3 text-center">
                <span
                  class="px-2 py-0.5 rounded bg-surfaceCanvas font-bold text-textPrimary text-[11px]"
                >
                  {{ item.durationNights }} Malam
                </span>
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
                  class="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-[11px] hover:bg-blue-100 transition-colors inline-flex items-center gap-1 shadow-2xs cursor-pointer active:scale-95"
                >
                  <span class="material-symbols-outlined text-[14px]">person_add</span>
                  <span>Isi Data Penginap ({{ item.guests?.length || 0 }} Tamu)</span>
                </button>
              </td>
              <td class="p-3 text-center">
                <button
                  type="button"
                  @click="removeHotel(idx)"
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
