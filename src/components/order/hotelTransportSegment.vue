<script setup lang="ts">
import { ref } from 'vue'

const roomCount = ref(2)

function increaseRoom() {
  roomCount.value++
}

function decreaseRoom() {
  if (roomCount.value > 1) roomCount.value--
}
</script>

<template>
  <div class="space-y-6 font-body">
    <!-- Section 2: Data Hotel & Detail Kamar -->
    <div class="space-y-4">
      <div class="flex items-center justify-between pb-1">
        <div>
          <h2 class="text-base font-bold text-textPrimary font-headline flex items-center gap-2">
            <span class="material-symbols-outlined text-[#930049] text-[20px]">hotel</span>
            2. Data Hotel & Detail Kamar
            <span class="px-2 py-0.5 rounded bg-[#930049] text-white text-[10px] font-bold uppercase tracking-wider">AKOMODASI</span>
          </h2>
          <p class="text-xs text-textMuted mt-0.5">Masukkan rincian reservasi akomodasi hotel dinas sesuai plafon jabatan</p>
        </div>
        <button type="button" class="text-xs font-bold text-primary hover:underline flex items-center gap-1">
          <span class="material-symbols-outlined text-[16px]">domain</span>
          <span>Lihat Hotel Rekanan BPJS</span>
        </button>
      </div>

      <!-- Form Filter/Order Hotel -->
      <div class="bg-surfaceCard p-4 rounded-xl border border-gray-100 shadow-2xs space-y-3">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <!-- Nama Hotel -->
          <div class="flex flex-col lg:col-span-2">
            <label class="text-xs font-semibold text-textPrimary mb-1">Nama Hotel *</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-textMuted text-[18px]">search</span>
              <input
                type="text"
                value="Hotel Santika Premiere Gubeng Sur"
                class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
              />
            </div>
          </div>

          <!-- Kota -->
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Kota *</label>
            <div class="relative">
              <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-textMuted text-[18px]">location_on</span>
              <select class="w-full h-9 pl-8 pr-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary">
                <option>Surabaya (Jawa T</option>
                <option>Jakarta Pusat</option>
                <option>Bandung</option>
              </select>
            </div>
          </div>

          <!-- Jml Kamar -->
          <div class="flex flex-col">
            <label class="text-xs font-semibold text-textPrimary mb-1">Jml Kamar *</label>
            <div class="flex items-center h-9 rounded-lg border border-gray-200 bg-surfaceCard px-2">
              <button type="button" @click="decreaseRoom" class="w-6 h-6 flex items-center justify-center text-textMuted hover:text-textPrimary font-bold">-</button>
              <span class="flex-1 text-center text-xs font-bold text-textPrimary">{{ roomCount }} Kamar</span>
              <button type="button" @click="increaseRoom" class="w-6 h-6 flex items-center justify-center text-textMuted hover:text-textPrimary font-bold">+</button>
            </div>
          </div>

          <!-- Check-In & Check-Out -->
          <div class="flex items-center gap-2 sm:col-span-2 lg:col-span-1">
            <div class="flex flex-col flex-1">
              <label class="text-xs font-semibold text-textPrimary mb-1">Check-In *</label>
              <input type="text" value="12 Mei 2026" class="h-9 px-2.5 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary text-center" />
            </div>
            <div class="flex flex-col flex-1">
              <label class="text-xs font-semibold text-textPrimary mb-1">Check-Out *</label>
              <input type="text" value="15 Mei 2026" class="h-9 px-2.5 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary text-center" />
            </div>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div class="flex items-center gap-4">
            <div class="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold flex items-center gap-1.5">
              <span class="material-symbols-outlined text-[16px]">schedule</span>
              <span>3 Malam</span>
            </div>
            <div class="text-xs">
              <span class="text-textMuted">Tarif / Kamar / Malam: </span>
              <strong class="text-textPrimary font-headline text-sm ml-1">Rp 850.000</strong>
              <span class="text-[10px] text-emerald-600 font-semibold ml-2">✓ SBU ≤ Rp 950rb</span>
            </div>
          </div>

          <button
            type="button"
            class="px-5 py-2 rounded-lg bg-primary hover:bg-primaryHover text-onPrimary text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
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
          <span class="px-2 py-0.5 rounded bg-surfaceContainerLow text-primary ml-1">1 Hotel • 2 Kamar • 6 Room-Nights</span>
        </h3>
        <span class="text-[11px] text-textMuted">Standar SBU Kelas Jabatan: <strong>Golongan III - Deputi Dir.</strong></span>
      </div>

      <div class="overflow-x-auto border border-gray-100 rounded-xl bg-surfaceCard">
        <table class="w-full text-left text-xs font-body">
          <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100">
            <tr>
              <th class="p-3 text-center w-10">NO</th>
              <th class="p-3">NAMA HOTEL & BINTANG</th>
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
            <tr class="hover:bg-surfaceCanvas/50">
              <td class="p-3 text-center font-bold text-textMuted">1</td>
              <td class="p-3">
                <div class="flex flex-col">
                  <span class="font-bold text-textPrimary font-headline">Hotel Santika Premiere Gubeng</span>
                  <div class="flex items-center gap-1 text-amber-400 text-[11px] mt-0.5">
                    <span>★★★★☆</span>
                    <span class="text-[10px] text-textMuted ml-1">Bintang 4 • Deluxe Twin</span>
                  </div>
                </div>
              </td>
              <td class="p-3 text-textMuted">Surabaya (Jawa Timur)</td>
              <td class="p-3 text-center font-bold text-textPrimary">2 Kamar</td>
              <td class="p-3 text-center whitespace-nowrap">
                <span class="font-medium text-textPrimary">12 Mei ➔ 15 Mei 2026</span>
              </td>
              <td class="p-3 text-center">
                <span class="px-2 py-0.5 rounded bg-surfaceCanvas font-bold text-textPrimary text-[11px]">3 Malam</span>
              </td>
              <td class="p-3 text-right font-medium text-textPrimary">Rp 850.000</td>
              <td class="p-3 text-right font-bold text-primary font-headline">Rp 5.100.000</td>
              <td class="p-3 text-center">
                <button type="button" class="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 font-bold text-[11px] hover:bg-blue-100 transition-colors inline-flex items-center gap-1">
                  <span class="material-symbols-outlined text-[14px]">person_add</span>
                  <span>Isi Data Penginap 1 (2/4 Tamu)</span>
                </button>
              </td>
              <td class="p-3 text-center">
                <div class="flex items-center justify-center gap-1.5">
                  <button type="button" class="p-1 text-textMuted hover:text-textPrimary" title="Edit"><span class="material-symbols-outlined text-[16px]">edit</span></button>
                  <button type="button" class="p-1 text-error hover:text-red-700" title="Hapus"><span class="material-symbols-outlined text-[16px]">delete</span></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Banner Ringkasan / Kepatuhan Plafon -->
      <div class="p-3.5 bg-emerald-50/80 border border-emerald-100 rounded-xl flex items-center justify-between text-xs text-emerald-800">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-emerald-600 text-[18px]">verified</span>
          <span><strong>Total Estimasi Akomodasi: Rp 5.100.000</strong> • Plafon SBU Sesuai Standar BPJS TK (Maks. Rp 950.000 / Malam)</span>
        </div>
        <span class="text-[11px] text-emerald-600 font-medium">✓ Termasuk Pajak & Sarapan Pagi</span>
      </div>
    </div>

    <!-- Ketentuan Plafon Collapsible Banner -->
    <div class="border border-gray-100 rounded-xl bg-surfaceCard p-4 flex items-center justify-between cursor-pointer hover:bg-surfaceCanvas/40 transition-colors">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-textMuted text-[20px]">help_outline</span>
        <div>
          <h4 class="text-xs font-bold text-textPrimary font-headline">Ketentuan Plafon Hotel Dinas Wilayah Jawa Timur</h4>
          <p class="text-[11px] text-textMuted">Pedoman Peraturan Direksi BPJS Ketenagakerjaan No. PERDIR/28/092025</p>
        </div>
      </div>
      <span class="material-symbols-outlined text-textMuted text-[20px]">keyboard_arrow_down</span>
    </div>
  </div>
</template>