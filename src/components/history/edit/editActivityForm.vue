<script setup lang="ts">
import { ref } from 'vue'
import { useTravelOrderEditStore } from '@/stores/travelOrderEditStore'
import SelectApproverModal from '@/components/order/modal/selectApproverModal.vue'
import SelectBudgetModal from '@/components/order/modal/selectBudgetModal.vue'

const editStore = useTravelOrderEditStore()

// State Modal LOV
const isApproverModalOpen = ref(false)
const isBudgetModalOpen = ref(false)

function formatRupiah(amount: number | string) {
  const num = Number(amount) || 0
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: 0,
  }).format(num)
}

function handleApproverSelected(item: any) {
  editStore.approverId = item.id
  editStore.approverNama = `${item.namaLengkap} (${item.jabatan})`
}

function handleBudgetSelected(item: any) {
  editStore.budgetId = item.id
  editStore.budgetAccountNumber = item.accountNumber
  editStore.budgetAccountName = item.accountName
  editStore.programKerja = item.programName
  editStore.remainingBudget = item.paguBudget - item.usedBudget
}
</script>

<template>
  <section class="bg-surfaceCard rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5 font-body">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100">
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
          <span class="material-symbols-outlined text-[22px]">assignment</span>
        </div>
        <div>
          <h2 class="text-base font-bold text-textPrimary font-headline">
            1. Informasi Kegiatan & Anggaran
          </h2>
          <p class="text-xs text-textMuted mt-0.5">
            Parameter Surat Perintah Resmi dan Pembebanan Anggaran Unit Kerja
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <div class="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0">
          <span class="material-symbols-outlined text-[18px]">verified</span>
          <span>
            Saldo Anggaran Tersedia: Rp {{ formatRupiah(editStore.remainingBudget) }}
          </span>
        </div>
        <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
          <span class="material-symbols-outlined text-[15px]">edit_calendar</span>
          Mode Koreksi Aktif
        </span>
      </div>
    </div>

    <!-- Row 1: Existing TO (Readonly/Disabled context), No. TO, Tanggal Order -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
      <!-- Option Existing TO -->
      <div class="md:col-span-6 flex flex-col">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-xs font-semibold text-textPrimary">Pilih Travel Order Existing (Opsional)</label>
          <span class="text-[11px] text-textMuted">Hubungkan kegiatan serumpun</span>
        </div>
        <div class="flex items-center gap-2">
          <input
            type="text"
            :value="editStore.existingToOption || editStore.toCode || '— Koreksi Stand-alone TO —'"
            readonly
            class="flex-1 h-10 px-3 rounded-xl bg-surfaceCanvas border border-gray-200 text-xs font-medium text-textMuted cursor-not-allowed select-none"
          />
          <button
            type="button"
            disabled
            class="w-10 h-10 rounded-xl bg-surfaceCanvas border border-gray-200 flex items-center justify-center text-gray-300 cursor-not-allowed shrink-0"
          >
            <span class="material-symbols-outlined text-[20px]">search</span>
          </button>
        </div>
      </div>

      <!-- No. Travel Order (Readonly) -->
      <div class="md:col-span-3 flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">No. Travel Order</label>
        <div class="relative flex items-center">
          <span class="absolute left-3 text-textMuted font-bold text-xs">#</span>
          <input
            type="text"
            :value="editStore.toCode || 'TO/2026/05/00187'"
            readonly
            class="w-full h-10 pl-7 pr-3 rounded-xl bg-surfaceCanvas border border-gray-200 text-xs font-bold text-textMuted font-mono cursor-not-allowed select-none"
          />
        </div>
      </div>

      <!-- Tanggal Order -->
      <div class="md:col-span-3 flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">Tanggal Order *</label>
        <div class="relative flex items-center">
          <input
            v-model="editStore.orderDate"
            type="date"
            class="w-full h-10 px-3 rounded-xl border border-gray-200 bg-surfaceCard text-xs font-medium text-textPrimary focus:outline-none focus:border-primary cursor-pointer"
          />
        </div>
      </div>
    </div>

    <!-- Row 2: Nama Kegiatan -->
    <div class="flex flex-col">
      <label class="text-xs font-semibold text-textPrimary mb-1.5">Nama Kegiatan *</label>
      <input
        v-model="editStore.activityName"
        type="text"
        placeholder="Masukkan nama kegiatan resmi penugasan..."
        class="w-full h-10 px-3 rounded-xl border border-gray-200 bg-surfaceCard text-xs font-medium text-textPrimary focus:outline-none focus:border-primary"
      />
    </div>

    <!-- Row 3: Nama Unit Kerja & Program Kerja -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">Nama Unit Kerja *</label>
        <input
          v-model="editStore.unitKerjaNama"
          type="text"
          placeholder="Contoh: KANWIL JAWA TIMUR"
          class="h-10 px-3 rounded-xl border border-gray-200 bg-surfaceCard text-xs font-medium text-textPrimary focus:outline-none focus:border-primary"
        />
      </div>

      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">Nama Program Kerja</label>
        <input
          v-model="editStore.programKerja"
          type="text"
          placeholder="Nama Program Kerja (Otomatis dari Mata Anggaran)"
          class="h-10 px-3 rounded-xl border border-gray-200 bg-surfaceCard text-xs font-medium text-textPrimary focus:outline-none focus:border-primary"
        />
      </div>
    </div>

    <!-- Row 4: Penyetuju, Mata Anggaran, No. Sprin -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Penyetuju (Modal LOV) -->
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">Nama Kepala Unit Kerja (Penyetuju) *</label>
        <div
          @click="isApproverModalOpen = true"
          class="relative flex items-center rounded-xl border border-gray-200 bg-surfaceCard hover:border-primary transition-all cursor-pointer"
        >
          <span class="material-symbols-outlined absolute left-3 text-emerald-600 text-[18px]">verified_user</span>
          <input
            type="text"
            :value="editStore.approverNama"
            readonly
            placeholder="Pilih Pejabat Penyetuju..."
            class="w-full h-10 pl-9 pr-8 bg-transparent text-xs font-medium text-textPrimary truncate pointer-events-none focus:outline-none"
          />
          <span class="material-symbols-outlined absolute right-3 text-textMuted text-[18px]">search</span>
        </div>
      </div>

      <!-- Mata Anggaran (Modal LOV) -->
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">Mata Anggaran (MAK) *</label>
        <div
          @click="isBudgetModalOpen = true"
          class="relative flex items-center rounded-xl border border-gray-200 bg-surfaceCard hover:border-primary transition-all cursor-pointer"
        >
          <span class="material-symbols-outlined absolute left-3 text-textMuted text-[18px]">account_balance</span>
          <input
            type="text"
            :value="editStore.budgetAccountNumber ? `${editStore.budgetAccountNumber} - ${editStore.budgetAccountName}` : ''"
            readonly
            placeholder="Pilih Kode & Nama Mata Anggaran..."
            class="w-full h-10 pl-9 pr-8 bg-transparent text-xs font-mono text-textPrimary truncate pointer-events-none focus:outline-none"
          />
          <span class="material-symbols-outlined absolute right-3 text-textMuted text-[18px]">search</span>
        </div>
      </div>

      <!-- No. Sprin / SPPD -->
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">No. Sprin / SPPD *</label>
        <div class="relative flex items-center">
          <span class="material-symbols-outlined absolute left-3 text-textMuted text-[18px]">description</span>
          <input
            v-model="editStore.sprinNumber"
            type="text"
            placeholder="Nomor Surat Perintah / SPPD"
            class="w-full h-10 pl-9 pr-3 rounded-xl border border-gray-200 bg-surfaceCard text-xs font-mono font-semibold text-textPrimary focus:outline-none focus:border-primary"
          />
        </div>
      </div>
    </div>

    <!-- Row 5: Detail Penugasan & Catatan Booker -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-xs font-semibold text-textPrimary">Detail Kegiatan Sesuai Sprin *</label>
          <span class="text-[10px] text-textMuted font-mono">
            {{ editStore.sprinDetail ? editStore.sprinDetail.length : 0 }}/100
          </span>
        </div>
        <textarea
          v-model="editStore.sprinDetail"
          rows="3"
          maxlength="100"
          placeholder="Tuliskan rincian kegiatan penugasan resmi..."
          class="w-full p-3 rounded-xl border border-gray-200 bg-surfaceCard text-xs resize-none leading-relaxed text-textPrimary focus:outline-none focus:border-primary"
        ></textarea>
      </div>

      <div class="flex flex-col">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-xs font-semibold text-textPrimary">Catatan Penjelasan Perbaikan (Booker Notes) *</label>
          <span class="text-[10px] text-textMuted font-mono">
            {{ editStore.notes ? editStore.notes.length : 0 }}/250
          </span>
        </div>
        <textarea
          v-model="editStore.notes"
          rows="3"
          maxlength="250"
          placeholder="Jelaskan perubahan yang telah dilakukan untuk mempermudah approver..."
          class="w-full p-3 rounded-xl border border-gray-200 bg-surfaceCard text-xs resize-none leading-relaxed text-textPrimary focus:outline-none focus:border-primary"
        ></textarea>
      </div>
    </div>

    <!-- Modal-Modal LOV -->
    <SelectApproverModal
      :is-open="isApproverModalOpen"
      @close="isApproverModalOpen = false"
      @select="handleApproverSelected"
    />

    <SelectBudgetModal
      :is-open="isBudgetModalOpen"
      @close="isBudgetModalOpen = false"
      @select="handleBudgetSelected"
    />
  </section>
</template>