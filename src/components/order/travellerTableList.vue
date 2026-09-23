<script setup lang="ts">
import { useOrderStore } from '@/stores/orderStore'

const orderStore = useOrderStore()

// Helper pembuat avatar inisial nama
function getInitials(name: string): string {
  if (!name) return 'TR'
  return name
    .trim()
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase()
}
</script>

<template>
  <div class="space-y-3 font-body">
    <!-- Section Header Table -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
      <h3 class="text-xs font-bold text-textPrimary font-headline uppercase tracking-wider flex items-center gap-2">
        Daftar Traveller Ditambahkan
        <span class="px-2.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold">
          {{ orderStore.travellers.length }} Orang · {{ orderStore.totalSegments }} Segmen
        </span>
      </h3>
      <span class="text-[11px] text-textMuted flex items-center gap-1">
        <span class="material-symbols-outlined text-emerald-600 text-[14px]">check_circle</span>
        <span>Semua segmen telah memenuhi standar pagu SBM 2026</span>
      </span>
    </div>

    <!-- Tabel Data Keranjang Traveller -->
    <div class="overflow-x-auto border border-gray-200/80 rounded-2xl bg-surfaceCard shadow-2xs">
      <table class="w-full text-left text-xs font-body">
        <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-200/80">
          <tr>
            <th class="p-3.5 text-center w-12">NO</th>
            <th class="p-3.5">NAMA TRAVELLER</th>
            <th class="p-3.5">NPK / JABATAN</th>
            <th class="p-3.5">RUTE PERJALANAN</th>
            <th class="p-3.5">JADWAL & JAM</th>
            <th class="p-3.5">MASKAPAI</th>
            <th class="p-3.5 text-center w-16">AKSI</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <!-- State Jika Keranjang Masih Kosong -->
          <tr v-if="orderStore.travellers.length === 0">
            <td colspan="7" class="p-8 text-center text-textMuted">
              <p class="font-bold text-sm text-textPrimary mb-1">Belum Ada Traveller Ditambahkan</p>
              <p class="text-xs">Isi form penambahan personel di atas lalu klik "+ Tambahkan ke Daftar".</p>
            </td>
          </tr>

          <!-- State Jika Ada Data Traveller -->
          <tr v-for="(item, idx) in orderStore.travellers" :key="item.id" class="hover:bg-surfaceCanvas/50 transition-colors">
            <td class="p-3.5 text-center font-bold text-textMuted font-mono">{{ idx + 1 }}</td>
            <td class="p-3.5">
              <div class="flex items-center gap-2.5">
                <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold flex items-center justify-center shrink-0 font-mono">
                  {{ getInitials(item.name) }}
                </div>
                <div>
                  <strong class="text-textPrimary block font-bold font-headline">{{ item.name }}</strong>
                  <span class="text-[10px] text-textMuted font-mono">{{ item.phone }}</span>
                </div>
              </div>
            </td>
            <td class="p-3.5">
              <div class="flex flex-col">
                <span class="font-mono font-semibold text-textPrimary text-[11px]">{{ item.npkOrKtp }}</span>
                <span class="text-[10px] text-textMuted leading-tight">{{ item.jabatanOrInstansi }}</span>
              </div>
            </td>
            <td class="p-3.5 font-bold text-textPrimary font-mono text-xs">{{ item.route }}</td>
            <td class="p-3.5">
              <div class="flex flex-col text-[11px]">
                <span class="text-textPrimary font-medium">{{ item.departureInfo }}</span>
                <span v-if="item.returnInfo" class="text-textMuted text-[10px]">{{ item.returnInfo }}</span>
              </div>
            </td>
            <td class="p-3.5">
              <span class="px-2.5 py-1 rounded-md bg-sky-50 text-sky-800 font-semibold text-[11px] inline-block">
                {{ item.maskapai }}
              </span>
            </td>
            <td class="p-3.5 text-center">
              <button
                type="button"
                @click="orderStore.removeTraveller(item.id)"
                class="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                title="Hapus Traveller"
              >
                <span class="material-symbols-outlined text-[18px]">delete</span>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Footnotes Info Badge -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
      <div class="p-3 rounded-xl bg-surfaceCard border border-gray-100 flex items-center gap-2.5 text-xs text-textMuted">
        <span class="material-symbols-outlined text-emerald-600 text-[20px]">verified</span>
        <div>
          <strong class="block font-bold text-textPrimary text-[11px]">Kepatuhan SBM Pemda</strong>
          <span class="text-[10px]">100% Sesuai Plafon Wilayah</span>
        </div>
      </div>
      <div class="p-3 rounded-xl bg-surfaceCard border border-gray-100 flex items-center gap-2.5 text-xs text-textMuted">
        <span class="material-symbols-outlined text-sky-600 text-[20px]">confirmation_number</span>
        <div>
          <strong class="block font-bold text-textPrimary text-[11px]">Vendor Reservasi Tiket</strong>
          <span class="text-[10px]">Official Partner Airlines (API B2B)</span>
        </div>
      </div>
      <div class="p-3 rounded-xl bg-surfaceCard border border-gray-100 flex items-center gap-2.5 text-xs text-textMuted">
        <span class="material-symbols-outlined text-indigo-600 text-[20px]">health_and_safety</span>
        <div>
          <strong class="block font-bold text-textPrimary text-[11px]">Proteksi Manfaat Ekstra</strong>
          <span class="text-[10px]">Cover Asuransi Perjalanan Dinas</span>
        </div>
      </div>
    </div>
  </div>
</template>