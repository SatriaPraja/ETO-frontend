<script setup lang="ts">
import { useTravelOrderEditStore } from '@/stores/travelOrderEditStore'

const editStore = useTravelOrderEditStore()

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

function addNewTraveler() {
  const today = new Date().toISOString().split('T')[0]! // 👈 Tambahkan tanda '!' di sini
  editStore.transports.push({
    category: 'INTERNAL',
    guestName: '',
    phone: '081234567890',
    npkOrKtp: '',
    jabatan: '',
    instansi: 'BPJS Ketenagakerjaan',
    departureDate: today,
    departureTime: '08:30',
    isRoundTrip: true,
    estimatedPrice: 2816666,
  })
}

function removeTraveler(index: number) {
  if (confirm('Apakah Anda yakin ingin menghapus traveller ini dari daftar?')) {
    editStore.transports.splice(index, 1)
  }
}
</script>

<template>
  <div class="rounded-2xl bg-white shadow-sm p-4 md:p-6 font-body space-y-4 border border-gray-100">
    <!-- Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-gray-100">
      <div>
        <div class="flex items-center gap-2">
          <h3 class="text-base font-bold text-gray-800 font-headline">
            Data Traveller & Itinerary Perjalanan
          </h3>
          <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider border border-blue-100">
            {{ editStore.transports.length }} Personel
          </span>
        </div>
        <p class="text-xs text-gray-500 mt-0.5">
          Disesuaikan dengan jadwal Surat Perintah resmi revisi penugasan
        </p>
      </div>

      <button
        type="button"
        @click="addNewTraveler"
        class="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold transition-all border border-emerald-200/80 cursor-pointer self-start md:self-auto"
      >
        <span class="material-symbols-outlined text-[18px]">person_add</span>
        <span>+ Tambah Traveller Baru</span>
      </button>
    </div>

    <!-- Table Wrapper -->
    <div class="overflow-x-auto rounded-xl border border-gray-200">
      <table class="w-full text-left border-collapse text-xs">
        <thead>
          <tr class="bg-gray-50 text-gray-500 font-bold uppercase tracking-wider text-[10px] border-b border-gray-200">
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
                <div class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 font-headline">
                  {{ getInitials(item.guestName) }}
                </div>
                <div class="flex flex-col min-w-0 flex-1">
                  <input
                    v-model="item.guestName"
                    type="text"
                    placeholder="Nama Lengkap Pegawai..."
                    class="font-semibold text-gray-800 bg-transparent focus:outline-none focus:border-b border-emerald-600 text-xs py-0.5"
                  />
                  <input
                    v-model="item.npkOrKtp"
                    type="text"
                    placeholder="NPK / Nomor KTP..."
                    class="text-[11px] text-gray-500 font-mono bg-transparent focus:outline-none py-0.5"
                  />
                </div>
              </div>
            </td>

            <td class="py-3.5 px-4">
              <div class="flex items-center gap-2.5">
                <div class="w-7 h-7 rounded-lg bg-[#30C5F7] text-white flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-[16px]">flight</span>
                </div>
                <div>
                  <div class="font-medium text-gray-800 flex items-center gap-1 font-mono text-xs">
                    <span>CGK</span>
                    <span class="material-symbols-outlined text-[14px] text-gray-400">sync_alt</span>
                    <span>SUB</span>
                  </div>
                  <span class="text-[10px] text-gray-500">
                    {{ item.isRoundTrip ? 'Pulang Pergi (PP)' : 'Sekali Jalan' }}
                  </span>
                </div>
              </div>
            </td>

            <td class="py-3.5 px-4">
              <div class="flex flex-col gap-1">
                <input
                  v-model="item.departureDate"
                  type="date"
                  class="font-semibold text-gray-800 bg-transparent focus:outline-none text-xs border border-gray-200 rounded-lg px-2 py-1"
                />
              </div>
            </td>

            <td class="py-3.5 px-4 text-right whitespace-nowrap">
              <input
                v-model.number="item.estimatedPrice"
                type="number"
                class="font-bold text-gray-800 font-headline text-xs text-right border border-gray-200 rounded-lg px-2 py-1 w-28"
              />
            </td>

            <td class="py-3.5 px-4 text-center">
              <button
                type="button"
                @click="removeTraveler(index)"
                class="p-1.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                title="Hapus Dari Order"
              >
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>