<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TravelOrderDetail } from '@/models/historyDetail'

const props = defineProps<{
  detail: TravelOrderDetail
}>()

// Tab navigasi diubah menjadi 2 pilihan
const activeTab = ref<'traveller' | 'hotel'>('traveller')

// Mengambil seluruh daftar traveller (gabungan INTERNAL & EKSTERNAL)
const allTravellers = computed(() => props.detail.transports || [])

// Menghitung subtotal estimasi biaya transportasi
const subtotalTransport = computed(() => {
  return props.detail.transports?.reduce((sum, t) => sum + Number(t.estimatedPrice || 0), 0) || 0
})

// Dapatkan rute utama penerbangan/transportasi
const mainRoute = computed(() => {
  return props.detail.transports?.[0]?.routeInfo || 'CGK ➔ SUB (PP)'
})

// Formatting Helpers
function formatRupiah(amount?: number | string) {
  if (amount === undefined || amount === null) return 'Rp 0'
  const num = typeof amount === 'string' ? parseFloat(amount) : amount
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(num)
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(timeStr?: string) {
  if (!timeStr) return ''
  return timeStr.substring(0, 5)
}
</script>

<template>
  <div
    class="bg-surfaceCard rounded-2xl border border-gray-100 shadow-2xs font-body overflow-hidden space-y-4 p-6"
  >
    <!-- Header Tab Filter (Hanya 2 Tab: Traveller & Hotel) -->
    <div class="flex items-center justify-between border-b border-gray-100 pb-3 flex-wrap gap-2">
      <div class="flex items-center gap-2">
        <!-- Tab 1: Traveller -->
        <button
          type="button"
          @click="activeTab = 'traveller'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer',
            activeTab === 'traveller'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs'
              : 'text-textMuted hover:bg-surfaceCanvas',
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">groups</span>
          <span>Traveller</span>
          <span
            :class="[
              'px-1.5 py-0.2 rounded-full text-[10px] font-extrabold',
              activeTab === 'traveller'
                ? 'bg-emerald-800 text-white'
                : 'bg-gray-200 text-textMuted',
            ]"
          >
            {{ allTravellers.length }}
          </span>
        </button>

        <!-- Tab 2: Akomodasi Hotel -->
        <button
          type="button"
          @click="activeTab = 'hotel'"
          :class="[
            'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer',
            activeTab === 'hotel'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs'
              : 'text-textMuted hover:bg-surfaceCanvas',
          ]"
        >
          <span class="material-symbols-outlined text-[16px]">hotel</span>
          <span>Akomodasi Hotel</span>
          <span
            :class="[
              'px-1.5 py-0.2 rounded-full text-[10px] font-extrabold',
              activeTab === 'hotel' ? 'bg-emerald-800 text-white' : 'bg-gray-200 text-textMuted',
            ]"
          >
            {{ detail.hotels?.length || 0 }}
          </span>
        </button>
      </div>

      <div class="text-xs text-textMuted font-medium">
        Rute: <strong class="text-textPrimary font-bold font-headline">{{ mainRoute }}</strong>
      </div>
    </div>

    <!-- Section Title Dynamic -->
    <div class="flex items-center justify-between pt-1">
      <h3
        class="text-xs font-bold text-textPrimary font-headline uppercase tracking-wider flex items-center gap-1.5"
      >
        <span class="w-2 h-2 rounded-full bg-sky-500"></span>
        <span>{{
          activeTab === 'traveller'
            ? 'Manifest Penerbangan & Personel'
            : 'Rincian Akomodasi Hotel & Penginap'
        }}</span>
      </h3>
    </div>

    <!-- TAB 1: TRAVELLER TABLE -->
    <div v-if="activeTab === 'traveller'" class="space-y-3">
      <div class="overflow-x-auto border border-gray-100 rounded-xl">
        <table class="w-full text-left text-xs">
          <thead
            class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100"
          >
            <tr>
              <th class="p-3 text-center w-10">NO</th>
              <th class="p-3">TRAVELLER</th>
              <th class="p-3">RUTE & JADWAL</th>
              <th class="p-3">MASKAPAI & KELAS</th>
              <th class="p-3 text-right">ESTIMASI BIAYA</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="allTravellers.length === 0">
              <td colspan="5" class="p-6 text-center text-textMuted">
                Tidak ada data traveller pada pengajuan ini.
              </td>
            </tr>
            <tr
              v-else
              v-for="(item, idx) in allTravellers"
              :key="item.id || idx"
              class="hover:bg-surfaceCanvas/50"
            >
              <td class="p-3 text-center text-textMuted font-bold">
                {{ String(idx + 1).padStart(2, '0') }}
              </td>
              <td class="p-3">
                <div class="flex flex-col gap-0.5">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-textPrimary font-headline text-xs">{{
                      item.guestName
                    }}</span>
                    <!-- Badge Kategori Internal / Eksternal -->
                    <span
                      :class="[
                        'px-1.5 py-0.2 rounded text-[9px] font-bold tracking-wider uppercase',
                        item.category === 'INTERNAL'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800',
                      ]"
                    >
                      {{ item.category }}
                    </span>
                  </div>
                  <span class="text-[10px] text-textMuted">
                    {{ item.category === 'INTERNAL' ? 'NPK:' : 'KTP:' }}
                    {{ item.npkOrKtp || '-' }} • {{ item.jabatan || item.instansi || '-' }}
                  </span>
                  <span class="text-[10px] text-textMuted font-mono"
                    >Kontak: {{ item.phone || '-' }}</span
                  >
                </div>
              </td>
              <td class="p-3">
                <div class="flex flex-col">
                  <strong class="font-bold text-textPrimary text-xs">{{
                    item.routeInfo || 'JKT ➔ SUB (PP)'
                  }}</strong>
                  <span class="text-[10px] text-textMuted"
                    >Berangkat: {{ formatDate(item.departureDate) }} ({{
                      formatTime(item.departureTime)
                    }})</span
                  >
                  <span
                    v-if="item.isRoundTrip && item.returnDate"
                    class="text-[10px] text-textMuted"
                  >
                    Kembali: {{ formatDate(item.returnDate) }} ({{ formatTime(item.returnTime) }})
                  </span>
                </div>
              </td>
              <td class="p-3">
                <div class="flex items-center gap-2">
                  <div
                    class="w-6 h-6 rounded bg-sky-500 text-white flex items-center justify-center shrink-0"
                  >
                    <span class="material-symbols-outlined text-[15px]">flight</span>
                  </div>
                  <div class="flex flex-col">
                    <span class="font-bold text-textPrimary text-xs">{{
                      item.maskapai || 'Garuda Indonesia'
                    }}</span>
                    <span class="text-[10px] text-textMuted">{{
                      item.departureInfo || 'Penerbangan Reguler'
                    }}</span>
                  </div>
                </div>
              </td>
              <td class="p-3 text-right">
                <span class="font-bold text-textPrimary font-headline text-xs">{{
                  formatRupiah(item.estimatedPrice)
                }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Subtotal Footer Banner -->
      <div
        class="p-3 rounded-xl bg-surfaceCanvas border border-gray-100 flex items-center justify-between text-xs"
      >
        <div class="flex items-center gap-2 text-textMuted">
          <span class="material-symbols-outlined text-[16px] text-sky-600">info</span>
          <span>Termasuk bagasi tercatat 20kg dan asuransi kecelakaan kerja dinas.</span>
        </div>
        <div class="text-right">
          <span class="text-[10px] font-bold text-textMuted uppercase block"
            >SUBTOTAL TIKET TRANSPORT:</span
          >
          <strong class="text-emerald-800 font-extrabold text-sm font-headline">{{
            formatRupiah(subtotalTransport)
          }}</strong>
        </div>
      </div>
    </div>

    <!-- TAB 2: AKOMODASI HOTEL TABLE -->
    <div v-else-if="activeTab === 'hotel'" class="space-y-4">
      <div
        v-if="!detail.hotels || detail.hotels.length === 0"
        class="p-6 text-center text-textMuted border border-gray-100 rounded-xl"
      >
        Tidak ada reservasi akomodasi hotel pada pengajuan ini.
      </div>

      <div
        v-else
        v-for="(hotel, hIdx) in detail.hotels"
        :key="hotel.id || hIdx"
        class="border border-gray-100 rounded-xl p-4 space-y-3 bg-surfaceCanvas/30"
      >
        <!-- Header Rincian Hotel -->
        <div class="flex items-center justify-between border-b border-gray-100 pb-2">
          <div class="flex items-center gap-2">
            <div
              class="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-2xs"
            >
              <span class="material-symbols-outlined text-[16px]">hotel</span>
            </div>
            <div>
              <h4 class="font-bold text-textPrimary font-headline text-xs">
                {{ hotel.hotelNameCustom }}
              </h4>
              <span class="text-[10px] text-textMuted">
                Kota: <strong>{{ hotel.cityName }}</strong> • {{ hotel.roomCount }} Kamar •
                {{ hotel.durationNights }} Malam
              </span>
            </div>
          </div>
          <div class="text-right">
            <span class="text-[9px] font-bold text-textMuted uppercase block">SUBTOTAL HOTEL:</span>
            <strong class="text-emerald-800 font-headline text-xs">{{
              formatRupiah(hotel.subtotalPrice)
            }}</strong>
          </div>
        </div>

        <!-- Tabel Daftar Tamu Penginap -->
        <div class="overflow-x-auto">
          <table
            class="w-full text-left text-xs bg-surfaceCard rounded-lg overflow-hidden border border-gray-100"
          >
            <thead
              class="bg-surfaceCanvas text-[10px] font-bold text-textMuted uppercase border-b border-gray-100"
            >
              <tr>
                <th class="p-2.5">KAMAR / BED</th>
                <th class="p-2.5">NAMA PENGINAP</th>
                <th class="p-2.5">JABATAN / INSTANSI</th>
                <th class="p-2.5">NO. TELEPON</th>
                <th class="p-2.5 text-center">KATEGORI</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-if="!hotel.guests || hotel.guests.length === 0">
                <td colspan="5" class="p-4 text-center text-textMuted text-[11px]">
                  Belum ada tamu yang dialokasikan.
                </td>
              </tr>
              <tr v-else v-for="g in hotel.guests" :key="g.id">
                <td class="p-2.5 font-bold text-textPrimary text-[11px]">
                  {{ g.roomNumber }} ({{ g.bedSlot }})
                </td>
                <td class="p-2.5 font-semibold text-textPrimary text-[11px]">
                  <div class="flex flex-col">
                    <span>{{ g.guestName || '[Belum diisi]' }}</span>
                    <span class="text-[10px] text-textMuted font-mono"
                      >NPK/KTP: {{ g.npkOrKtp || '-' }}</span
                    >
                  </div>
                </td>
                <td class="p-2.5 text-textMuted text-[10px]">{{ g.jabatanOrInstansi || '-' }}</td>
                <td class="p-2.5 text-textMuted font-mono text-[10px]">{{ g.phone || '-' }}</td>
                <td class="p-2.5 text-center">
                  <span
                    :class="[
                      'px-2 py-0.5 rounded text-[9px] font-bold uppercase',
                      g.category === 'INTERNAL'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800',
                    ]"
                  >
                    {{ g.category }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
