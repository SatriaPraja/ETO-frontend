<script setup lang="ts">
import { ref } from 'vue'
import { useTravelOrderEditStore } from '@/stores/travelOrderEditStore'
import AddTransportModal from '@/components/order/modal/addTransportModal.vue'
import type { EditTransportItem } from '@/models/travelOrderEdit'

const editStore = useTravelOrderEditStore()

const isAddTransportModalOpen = ref(false)
const selectedTransportIndex = ref<number | null>(null)
const selectedTransportData = ref<EditTransportItem | null>(null)

function formatRupiah(amount?: number | string) {
  const num = Number(amount) || 0
  return `Rp${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(num)}`
}

function getInitials(name?: string) {
  if (!name) return 'TR'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2 && parts[0]?.[0] && parts[1]?.[0]) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

function openAddModal() {
  selectedTransportIndex.value = null
  selectedTransportData.value = null
  isAddTransportModalOpen.value = true
}

function openEditModal(index: number) {
  const item = editStore.transports[index]
  if (!item) return

  selectedTransportIndex.value = index
  selectedTransportData.value = {
    ...item,
    guestName: item.guestName || item.guest_name || '', // Memastikan guestName selalu berupa string
  }
  isAddTransportModalOpen.value = true
}

function handleSaveTransport(payload: EditTransportItem) {
  if (selectedTransportIndex.value !== null) {
    editStore.transports[selectedTransportIndex.value] = payload
  } else {
    editStore.transports.push(payload)
  }
}

function removeTraveler(index: number) {
  if (confirm('Apakah Anda yakin ingin menghapus traveller ini dari daftar?')) {
    editStore.transports.splice(index, 1)
  }
}
</script>

<template>
  <div
    class="rounded-2xl bg-white shadow-2xs p-3.5 sm:p-6 font-body space-y-4 border border-gray-100"
  >
    <!-- Header Section -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100"
    >
      <div class="flex items-center justify-between sm:justify-start gap-2">
        <h3 class="text-sm sm:text-base font-bold text-gray-800 font-headline">
          Data Traveller & Itinerary Perjalanan
        </h3>
        <span
          class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-100 shrink-0"
        >
          {{ editStore.transports.length }} Personel
        </span>
      </div>

      <button
        type="button"
        @click="openAddModal"
        class="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 sm:py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-all border border-emerald-200/80 cursor-pointer active:scale-[0.98]"
      >
        <span class="material-symbols-outlined text-[18px]">person_add</span>
        <span>+ Tambah Traveller Baru</span>
      </button>
    </div>

    <!-- 🟢 1. VIEW MOBILE: Kartu Item Personel (Tampil di Layar HP) -->
    <div class="block sm:hidden space-y-3">
      <div
        v-if="editStore.transports.length === 0"
        class="p-6 text-center text-gray-400 text-xs border border-dashed border-gray-200 rounded-xl"
      >
        Belum ada traveller terdaftar. Klik <strong>+ Tambah Traveller Baru</strong>.
      </div>

      <div
        v-else
        v-for="(item, index) in editStore.transports"
        :key="item.id || index"
        class="bg-surfaceCanvas/50 border border-gray-200/80 rounded-xl p-3.5 space-y-3 relative"
      >
        <!-- Informasi Pegawai -->
        <div class="flex items-start justify-between gap-2 pb-2.5 border-b border-gray-200/60">
          <div class="flex items-center gap-2.5">
            <div
              class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 font-headline"
            >
              {{ getInitials(item.guestName || item.guest_name) }}
            </div>
            <div class="flex flex-col min-w-0">
              <span class="font-bold text-gray-800 text-xs truncate">
                {{ item.guestName || item.guest_name || 'Nama Belum Diisi' }}
              </span>
              <span class="text-[11px] text-gray-500 font-mono">
                NPK: {{ item.npkOrKtp || item.npk_or_ktp || '-' }}
              </span>
            </div>
          </div>

          <!-- Estimasi Harga -->
          <div class="text-right shrink-0">
            <span class="text-[10px] text-gray-400 block font-medium">Estimasi Biaya</span>
            <strong class="text-xs font-bold text-emerald-800 font-headline">
              {{ formatRupiah(item.estimatedPrice ?? item.estimated_price) }}
            </strong>
          </div>
        </div>

        <!-- Rute & Tanggal -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="space-y-0.5">
            <span class="text-[10px] text-gray-400 uppercase font-bold block">Rute Perjalanan</span>
            <div class="flex items-center gap-1 font-mono font-semibold text-gray-800">
              <span class="material-symbols-outlined text-sky-600 text-[16px]">flight</span>
              <span class="truncate">{{ item.routeInfo || item.route_info || 'JKT ⇄ SUB' }}</span>
            </div>
            <span class="text-[10px] text-gray-500 block">
              {{ (item.isRoundTrip ?? item.is_round_trip) ? 'Pulang Pergi (PP)' : 'Sekali Jalan' }}
            </span>
          </div>

          <div class="space-y-0.5">
            <span class="text-[10px] text-gray-400 uppercase font-bold block"
              >Tgl Keberangkatan</span
            >
            <div class="font-semibold text-gray-800">
              {{ item.departureDate || item.departure_date || '-' }}
            </div>
            <span
              v-if="item.departureTime || item.departure_time"
              class="text-[10px] text-gray-500 block"
            >
              Jam {{ item.departureTime || item.departure_time }}
            </span>
          </div>
        </div>

        <!-- Tombol Aksi Mobile -->
        <div class="flex items-center justify-end gap-2 pt-2 border-t border-gray-200/60">
          <button
            type="button"
            @click="openEditModal(index)"
            class="flex-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center gap-1 border border-blue-100 cursor-pointer active:scale-95"
          >
            <span class="material-symbols-outlined text-[16px]">edit</span>
            <span>Edit</span>
          </button>

          <button
            type="button"
            @click="removeTraveler(index)"
            class="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold flex items-center justify-center gap-1 border border-red-100 cursor-pointer active:scale-95"
          >
            <span class="material-symbols-outlined text-[16px]">delete</span>
            <span>Hapus</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 💻 2. VIEW DESKTOP: Tabel Tradisional (Tampil di Tablet/Laptop) -->
    <div class="hidden sm:block overflow-x-auto rounded-xl border border-gray-200">
      <table class="w-full text-left border-collapse text-xs">
        <thead>
          <tr
            class="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200"
          >
            <th class="py-3 px-4">Nama Pegawai & Identitas</th>
            <th class="py-3 px-4">Rute & Jenis</th>
            <th class="py-3 px-4">Tanggal Keberangkatan</th>
            <th class="py-3 px-4 text-right">Estimasi Biaya Tiket</th>
            <th class="py-3 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-if="editStore.transports.length === 0">
            <td colspan="5" class="p-8 text-center text-gray-400">
              Belum ada traveller terdaftar. Klik + Tambah Traveller Baru.
            </td>
          </tr>
          <tr
            v-else
            v-for="(item, index) in editStore.transports"
            :key="item.id || index"
            class="hover:bg-emerald-50/20 transition-colors"
          >
            <td class="py-3.5 px-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 font-headline"
                >
                  {{ getInitials(item.guestName || item.guest_name) }}
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="font-bold text-gray-800 text-xs truncate">
                    {{ item.guestName || item.guest_name || 'Nama Belum Diisi' }}
                  </span>
                  <span class="text-[11px] text-gray-500 font-mono">
                    {{ item.npkOrKtp || item.npk_or_ktp || '-' }}
                  </span>
                </div>
              </div>
            </td>

            <td class="py-3.5 px-4">
              <div class="flex items-center gap-2.5">
                <div
                  class="w-7 h-7 rounded-lg bg-[#30C5F7] text-white flex items-center justify-center shrink-0"
                >
                  <span class="material-symbols-outlined text-[16px]">flight</span>
                </div>
                <div>
                  <div class="font-medium text-gray-800 flex items-center gap-1 font-mono text-xs">
                    <span>{{ item.routeInfo || item.route_info || 'JKT ⇄ SUB' }}</span>
                  </div>
                  <span class="text-[10px] text-gray-500">
                    {{
                      (item.isRoundTrip ?? item.is_round_trip)
                        ? 'Pulang Pergi (PP)'
                        : 'Sekali Jalan'
                    }}
                  </span>
                </div>
              </div>
            </td>

            <td class="py-3.5 px-4 font-semibold text-gray-700">
              {{ item.departureDate || item.departure_date || '-' }}
              <span
                v-if="item.departureTime || item.departure_time"
                class="text-[11px] text-gray-400 font-normal ml-1"
              >
                ({{ item.departureTime || item.departure_time }})
              </span>
            </td>

            <td
              class="py-3.5 px-4 text-right font-bold text-gray-800 font-headline whitespace-nowrap"
            >
              {{ formatRupiah(item.estimatedPrice ?? item.estimated_price) }}
            </td>

            <td class="py-3.5 px-4 text-center">
              <div class="flex items-center justify-center gap-1">
                <button
                  type="button"
                  @click="openEditModal(index)"
                  class="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                  title="Edit Data Traveller"
                >
                  <span class="material-symbols-outlined text-[18px]">edit</span>
                </button>

                <button
                  type="button"
                  @click="removeTraveler(index)"
                  class="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Hapus Dari Order"
                >
                  <span class="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Form Add/Edit -->
    <AddTransportModal
      :is-open="isAddTransportModalOpen"
      :transport-data="selectedTransportData"
      @close="isAddTransportModalOpen = false"
      @save="handleSaveTransport"
    />
  </div>
</template>
