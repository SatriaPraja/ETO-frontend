<script setup lang="ts">
import { useTravelOrderEditStore } from '@/stores/travelOrderEditStore'

const editStore = useTravelOrderEditStore()

// Helper format angka rupiah ringkas (Rp2.800.000)
function formatRupiah(amount?: number | string) {
  if (amount === undefined || amount === null || amount === '') return 'Rp0'
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  if (isNaN(num)) return 'Rp0'
  const formatted = new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(num)
  return `Rp${formatted}`
}

function getInitials(name?: string) {
  if (!name) return 'PE'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length >= 2 && parts[0]?.[0] && parts[1]?.[0]) {
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
  }
  return name.substring(0, 2).toUpperCase()
}

function addNewTraveler() {
  const today = new Date().toISOString().split('T')[0]
  editStore.transports.push({
    guestName: '',
    phone: '081234567890',
    npkOrKtp: '',
    jabatan: '',
    instansi: '',
    routeInfo: 'CGK ⇄ SUB',
    departureDate: today,
    departureTime: '07:10',
    isRoundTrip: true,
    estimatedPrice: 2800000,
  })
}

function removeTraveler(index: number) {
  if (confirm('Apakah Anda yakin ingin menghapus traveller ini dari daftar?')) {
    editStore.transports.splice(index, 1)
  }
}
</script>

<template>
  <div class="rounded-xl bg-white shadow-sm p-4 md:p-6 font-body space-y-4">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-gray-100"
    >
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-base font-semibold text-gray-800 font-headline">
            Data Traveller & Itinerary Perjalanan
          </h3>
          <span
            class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold flex items-center gap-1.5 border border-blue-100/80"
          >
          </span>
        </div>
        <p class="text-xs text-gray-500 mt-0.5">
          Disesuaikan dengan jadwal Sprin revisi: Jakarta (CGK) menuju Surabaya (SUB) PP
        </p>
      </div>

      <button
        type="button"
        @click="addNewTraveler"
        class="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-gray-50 hover:bg-emerald-50 text-emerald-800 text-xs font-semibold transition-all border border-gray-200 cursor-pointer self-start md:self-auto"
      >
        <span class="material-symbols-outlined text-[18px]">person_add</span>
        <span>+ Tambah Traveller Baru</span>
      </button>
    </div>

    <!-- Table Wrapper -->
    <div class="overflow-x-auto rounded-xl border border-gray-100 shadow-2xs">
      <table class="w-full text-left border-collapse text-xs">
        <thead>
          <tr
            class="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-100"
          >
            <th class="py-3 px-4">Nama Pegawai & NPK</th>
            <th class="py-3 px-4">Moda & Rute</th>
            <th class="py-3 px-4">Tanggal Keberangkatan</th>
            <th class="py-3 px-4">Maskapai & Kelas</th>
            <th class="py-3 px-4 text-right">Estimasi Biaya</th>
            <th class="py-3 px-4 text-center">Aksi</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="editStore.transports.length === 0">
            <td colspan="6" class="p-8 text-center text-gray-500">
              Belum ada traveller terdaftar. Klik + Tambah Traveller Baru.
            </td>
          </tr>
          <tr
            v-else
            v-for="(item, index) in editStore.transports"
            :key="item.id || index"
            class="hover:bg-emerald-50/30 transition-colors"
          >
            <td class="py-3.5 px-4">
              <div class="flex items-center gap-3">
                <div
                  class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 font-headline"
                >
                  {{ getInitials(item.guestName) }}
                </div>
                <div class="flex flex-col min-w-0">
                  <input
                    v-model="item.guestName"
                    type="text"
                    placeholder="Nama Pegawai..."
                    class="font-semibold text-gray-800 bg-transparent focus:outline-none focus:border-b border-emerald-600 text-xs py-0.5"
                  />
                  <span class="text-[11px] text-gray-500 font-mono"
                    >{{ item.npkOrKtp || 'NPK 19840215' }} • {{ item.jabatan || 'Gol. IV' }}</span
                  >
                </div>
              </div>
            </td>

            <td class="py-3.5 px-4">
              <div class="flex items-center gap-2.5">
                <div
                  class="w-7 h-7 rounded-lg bg-[#30C5F7] text-white flex items-center justify-center shrink-0 shadow-2xs"
                >
                  <span class="material-symbols-outlined text-[16px]">flight</span>
                </div>
                <div>
                  <div class="font-medium text-gray-800 flex items-center gap-1 font-mono text-xs">
                    <span>CGK</span>
                    <span class="material-symbols-outlined text-[14px] text-gray-400"
                      >sync_alt</span
                    >
                    <span>SUB</span>
                  </div>
                  <span class="text-[10px] text-gray-500">{{
                    item.isRoundTrip ? 'Pulang Pergi (PP)' : 'Sekali Jalan'
                  }}</span>
                </div>
              </div>
            </td>

            <td class="py-3.5 px-4">
              <div class="flex flex-col gap-0.5">
                <div class="flex items-center gap-1.5">
                  <input
                    v-model="item.departureDate"
                    type="date"
                    class="font-bold text-gray-800 bg-transparent focus:outline-none text-xs"
                  />
                  <span
                    class="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold"
                    >Diubah</span
                  >
                </div>
                <span class="text-[11px] text-gray-400 line-through">Semula: 18 Mei 2026</span>
              </div>
            </td>

            <td class="py-3.5 px-4">
              <div class="flex flex-col">
                <span class="font-semibold text-gray-800 text-xs">Garuda Indonesia</span>
                <span class="text-[10px] text-gray-500">GA-308 • Ekonomi Y</span>
              </div>
            </td>

            <!-- Estimasi Biaya Langsung Tampil Rp2.850.000 -->
            <td class="py-3.5 px-4 text-right whitespace-nowrap">
              <span class="font-bold text-gray-800 font-headline text-xs">
                {{ formatRupiah(item.estimatedPrice) }}
              </span>
            </td>

            <td class="py-3.5 px-4 text-center">
              <div class="flex items-center justify-center gap-1">
                <button
                  type="button"
                  class="p-1.5 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors cursor-pointer"
                  title="Ubah Parameter"
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
  </div>
</template>
