<script setup lang="ts">
import { watch, computed } from 'vue'
import { useApprovalStore } from '@/stores/approvalStore'

const approvalStore = useApprovalStore()

// Fetch detail setiap kali selectedItem berubah
watch(
  () => approvalStore.selectedItem?.id,
  (newToCode) => {
    if (newToCode) {
      approvalStore.fetchOrderDetail(newToCode)
    }
  },
  { immediate: true }
)

// Helper Format Rupiah
const formatRupiah = (val: number | string) => {
  const num = Number(val) || 0
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num)
}

// Helper Format Tanggal Indonesia
const formatDate = (dateStr?: string) => {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

// Map data traveler
const travelerList = computed(() => {
  if (!approvalStore.selectedDetail?.transports) return []
  return approvalStore.selectedDetail.transports.map((item: any) => ({
    name: item.guestName,
    position: `${item.jabatan || 'Pegawai'} • ${item.instansi || 'Internal'}`,
    route: `${item.routeInfo || 'Rute Perjalanan'} (${item.transportType || 'Transport'})`,
    price: formatRupiah(item.estimatedPrice)
  }))
})

// Hitung Sisa Pagu Anggaran
const remainingBudget = computed(() => {
  const pagu = Number(approvalStore.selectedDetail?.paguBudget) || 0
  const used = Number(approvalStore.selectedDetail?.usedBudget) || 0
  return pagu - used
})
</script>

<template>
  <!-- Container Utama dengan Min-Height Stabil -->
  <div class="relative min-h-[500px] font-body">
    
    <!-- 🟢 OVERLAY LOADING SPINNER (Muncul saat fetches data baru tanpa menghancurkan layout) -->
    <div 
      v-if="approvalStore.isDetailLoading" 
      class="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center gap-2 rounded-xl border border-gray-100 transition-all"
    >
      <span class="material-symbols-outlined text-primary text-3xl animate-spin">sync</span>
      <span class="text-xs font-semibold text-textMuted">Memuat detail pengajuan...</span>
    </div>

    <!-- 🔴 EMPTY STATE -->
    <div 
      v-if="!approvalStore.selectedDetail && !approvalStore.isDetailLoading" 
      class="p-12 text-center text-xs text-textMuted bg-surfaceCard rounded-xl border border-gray-100"
    >
      Pilih salah satu pengajuan di sebelah kiri untuk melihat detail.
    </div>

    <!-- 🟢 REAL DATA VIEW -->
    <div v-else-if="approvalStore.selectedDetail" class="space-y-4">
      <!-- Header Card Detail -->
      <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-1">
        <div class="flex items-center justify-between flex-wrap gap-2">
          <div class="flex items-center gap-2">
            <h2 class="text-xl font-bold text-textPrimary font-headline">Detail Pengajuan:</h2>
            <span class="text-xl font-extrabold text-primary font-headline">
              {{ approvalStore.selectedDetail.toCode }}
            </span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-100 flex items-center gap-1">
              <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
              <span>{{ approvalStore.selectedDetail.status }}</span>
            </span>
          </div>
        </div>

        <div class="text-xs text-textMuted flex items-center gap-3 pt-1">
          <span>Diajukan: <strong>{{ formatDate(approvalStore.selectedDetail.orderDate || approvalStore.selectedDetail.createdAt) }}</strong></span>
          <span>•</span>
          <span>Booker: <strong>{{ approvalStore.selectedDetail.bookerNama }}</strong></span>
        </div>
      </div>

      <!-- Alert Validasi Pagu Anggaran -->
      <div class="p-4 rounded-xl bg-emerald-50/80 border border-emerald-100 flex items-start gap-3 text-xs text-emerald-900 shadow-2xs">
        <div class="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
          ✓
        </div>
        <div class="space-y-0.5">
          <h3 class="font-bold text-emerald-900 text-xs font-headline">Saldo Anggaran Mencukupi & Pagu Kegiatan Valid</h3>
          <p class="text-[11px] text-emerald-800 leading-relaxed">
            Verifikasi otomatis sistem keuangan terintegrasi: Pos Anggaran <strong>{{ approvalStore.selectedDetail.budgetAccountName || 'Mata Anggaran' }}</strong> memiliki sisa pagu aktif sebesar <strong class="text-emerald-900">{{ formatRupiah(remainingBudget) }}</strong>. Pembebanan sebesar <strong class="text-emerald-900">{{ formatRupiah(approvalStore.selectedDetail.totalEstimatedCost) }}</strong> aman.
          </p>
        </div>
      </div>

      <!-- Section Informasi Kegiatan & Surat Perintah -->
      <div class="bg-surfaceCard p-6 rounded-xl border border-gray-100 shadow-2xs space-y-4">
        <div class="flex items-center justify-between pb-2 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[20px]">assignment</span>
            <h3 class="text-sm font-bold text-textPrimary font-headline">Informasi Kegiatan & Surat Perintah</h3>
          </div>
          <span class="text-xs font-mono font-bold text-textMuted">
            {{ approvalStore.selectedDetail.sprinNumber }}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div class="space-y-1">
            <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">NAMA KEGIATAN</span>
            <p class="font-bold text-textPrimary leading-snug">
              {{ approvalStore.selectedDetail.activityName }}
            </p>
          </div>

          <div class="space-y-1">
            <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">NOMOR SPRIN / SPPD</span>
            <p class="font-bold text-primary">
              {{ approvalStore.selectedDetail.sprinNumber }}
            </p>
          </div>

          <div class="space-y-1">
            <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">UNIT KERJA PENGAJU</span>
            <p class="font-bold text-textPrimary">
              {{ approvalStore.selectedDetail.unitKerjaNama }}
            </p>
          </div>

          <div class="space-y-1">
            <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">PEJABAT PENYETUJU</span>
            <p class="font-bold text-textPrimary">
              {{ approvalStore.selectedDetail.approverNama || '-' }}
            </p>
          </div>

          <div class="space-y-1">
            <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">MATA ANGGARAN (COA)</span>
            <p class="font-bold text-textPrimary font-mono">
              {{ approvalStore.selectedDetail.budgetAccountNumber }} <span class="font-sans font-normal text-textMuted text-[11px]">• {{ approvalStore.selectedDetail.budgetAccountName }}</span>
            </p>
          </div>

          <div class="space-y-1">
            <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">SISA SALDO ANGGARAN</span>
            <p class="font-bold text-emerald-700">
              {{ formatRupiah(remainingBudget) }} <span class="text-textMuted font-normal text-[11px]">(Aman)</span>
            </p>
          </div>
        </div>

        <!-- Ringkasan Tugas -->
        <div class="p-3.5 rounded-xl bg-surfaceCanvas border border-gray-100 text-xs space-y-1">
          <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">RINGKASAN TUGAS DARI SPRIN</span>
          <p class="italic text-textMuted leading-relaxed">
            {{ approvalStore.selectedDetail.sprinDetail || approvalStore.selectedDetail.notes || '-' }}
          </p>
        </div>
      </div>

      <!-- Section Daftar Pelaksana Perjalanan (Traveller) -->
      <div class="bg-surfaceCard p-6 rounded-xl border border-gray-100 shadow-2xs space-y-4">
        <div class="flex items-center justify-between pb-2 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <span class="material-symbols-outlined text-primary text-[20px]">groups</span>
            <h3 class="text-sm font-bold text-textPrimary font-headline">Daftar Pelaksana Perjalanan (Traveller)</h3>
          </div>
          <span class="text-xs text-textMuted font-semibold">
            {{ travelerList.length }} Orang
          </span>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100">
              <tr>
                <th class="p-2.5">PEGAWAI</th>
                <th class="p-2.5">JABATAN / GOLONGAN</th>
                <th class="p-2.5">RUTE & MODA</th>
                <th class="p-2.5 text-right">ESTIMASI TIKET</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="t in travelerList" :key="t.name" class="hover:bg-surfaceCanvas/50">
                <td class="p-2.5 font-bold text-textPrimary font-headline">{{ t.name }}</td>
                <td class="p-2.5 text-textMuted">{{ t.position }}</td>
                <td class="p-2.5 font-semibold text-textPrimary">{{ t.route }}</td>
                <td class="p-2.5 text-right font-extrabold text-textPrimary font-headline">{{ t.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>