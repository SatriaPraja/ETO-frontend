<script setup lang="ts">
import { ref } from 'vue'
import { useTravelOrderEditStore } from '@/stores/travelOrderEditStore'
import SelectApproverModal from '@/components/order/modal/selectApproverModal.vue'
import SelectBudgetModal from '@/components/order/modal/selectBudgetModal.vue'

const editStore = useTravelOrderEditStore()

const isApproverModalOpen = ref(false)
const isBudgetModalOpen = ref(false)

function formatRupiah(amount: number | string) {
  const num = Number(amount) || 0
  return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(num)
}

function handleApproverSelected(item: any) {
  editStore.approverId = item.id
  editStore.approverNama = `${item.namaLengkap} (${item.jabatan})`
  isApproverModalOpen.value = false
}

function handleBudgetSelected(item: any) {
  editStore.budgetId = item.id
  editStore.budgetAccountNumber = item.accountNumber
  editStore.budgetAccountName = item.accountName
  editStore.programKerja = item.programName
  editStore.remainingBudget = item.paguBudget - item.usedBudget
  isBudgetModalOpen.value = false
}
</script>

<template>
  <section
    class="bg-white rounded-2xl p-4 sm:p-6 shadow-2xs border border-gray-100 space-y-4 sm:space-y-5 font-body"
  >
    <!-- Header Section -->
    <div
      class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-gray-100"
    >
      <div class="flex items-start gap-3">
        <div class="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
          <span class="material-symbols-outlined text-[20px] sm:text-[22px]">assignment</span>
        </div>
        <div>
          <h2 class="text-sm sm:text-base font-bold text-gray-800 font-headline leading-tight">
            Informasi Kegiatan & Anggaran
          </h2>
          <p class="text-[11px] sm:text-xs text-gray-500 mt-0.5 leading-relaxed">
            Parameter Surat Perintah Resmi dan Pembebanan Anggaran Unit Kerja
          </p>
        </div>
      </div>

      <!-- Badges Status (Responsif Flex) -->
      <div class="flex items-center gap-2 flex-wrap">
        <div
          class="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-bold shrink-0"
        >
          <span class="material-symbols-outlined text-[16px]">verified</span>
          <span>Saldo Anggaran: Rp {{ formatRupiah(editStore.remainingBudget) }}</span>
        </div>

        <span
          class="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[11px] sm:text-xs font-bold shrink-0"
        >
          <span class="material-symbols-outlined text-[15px]">edit_calendar</span>
          Mode Koreksi Aktif
        </span>
      </div>
    </div>

    <!-- Row 1: No. TO & Tanggal Order -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-gray-700 mb-1">No. Travel Order (e-TO)</label>
        <input
          type="text"
          :value="editStore.toCode"
          readonly
          class="h-10 px-3 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold font-mono text-gray-500 select-none cursor-not-allowed"
        />
      </div>

      <div class="flex flex-col">
        <label class="text-xs font-semibold text-gray-700 mb-1">Tanggal Order *</label>
        <input
          v-model="editStore.orderDate"
          type="date"
          class="h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-800 focus:outline-none focus:border-primary cursor-pointer"
        />
      </div>
    </div>

    <!-- Row 2: Nama Kegiatan -->
    <div class="flex flex-col">
      <label class="text-xs font-semibold text-gray-700 mb-1">Nama Kegiatan *</label>
      <input
        v-model="editStore.activityName"
        type="text"
        placeholder="Masukkan nama kegiatan penugasan resmi..."
        class="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-800 focus:outline-none focus:border-primary"
      />
    </div>

    <!-- Row 3: Nama Unit Kerja & Program Kerja -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-gray-700 mb-1">Nama Unit Kerja *</label>
        <input
          v-model="editStore.unitKerjaNama"
          type="text"
          class="h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs font-medium text-gray-800 focus:outline-none focus:border-primary"
        />
      </div>

      <div class="flex flex-col">
        <label class="text-xs font-semibold text-gray-700 mb-1">Nama Program Kerja</label>
        <input
          :value="editStore.programKerja || 'Otomatis terisi dari MAK'"
          type="text"
          readonly
          class="h-10 px-3 rounded-xl border border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 cursor-not-allowed select-none truncate"
        />
      </div>
    </div>

    <!-- Row 4: Penyetuju, Mata Anggaran, No. Sprin -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
      <!-- Select Penyetuju -->
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-gray-700 mb-1">Pejabat Penyetuju *</label>
        <div
          @click="isApproverModalOpen = true"
          class="relative flex items-center rounded-xl border border-gray-200 bg-white hover:border-primary transition-all cursor-pointer"
        >
          <span class="material-symbols-outlined absolute left-3 text-emerald-600 text-[18px]"
            >verified_user</span
          >
          <input
            type="text"
            :value="editStore.approverNama"
            readonly
            placeholder="Pilih Penyetuju..."
            class="w-full h-10 pl-9 pr-8 bg-transparent text-xs font-medium text-gray-800 truncate pointer-events-none"
          />
        </div>
      </div>

      <!-- Select MAK -->
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-gray-700 mb-1">Mata Anggaran (MAK) *</label>
        <div
          @click="isBudgetModalOpen = true"
          class="relative flex items-center rounded-xl border border-gray-200 bg-white hover:border-primary transition-all cursor-pointer"
        >
          <span class="material-symbols-outlined absolute left-3 text-gray-400 text-[18px]"
            >account_balance</span
          >
          <input
            type="text"
            :value="
              editStore.budgetAccountNumber
                ? `${editStore.budgetAccountNumber} - ${editStore.budgetAccountName}`
                : ''
            "
            readonly
            placeholder="Pilih MAK..."
            class="w-full h-10 pl-9 pr-8 bg-transparent text-xs font-mono text-gray-800 truncate pointer-events-none"
          />
        </div>
      </div>

      <!-- Input No. Sprin -->
      <div class="flex flex-col sm:col-span-2 lg:col-span-1">
        <label class="text-xs font-semibold text-gray-700 mb-1">No. Sprin / SPPD *</label>
        <input
          v-model="editStore.sprinNumber"
          type="text"
          placeholder="Nomor Surat Perintah"
          class="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs font-mono font-semibold text-gray-800 focus:outline-none focus:border-primary"
        />
      </div>
    </div>

    <!-- Row 5: Detail Penugasan & Catatan Booker -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-gray-700 mb-1"
          >Detail Kegiatan Sesuai Sprin *</label
        >
        <textarea
          v-model="editStore.sprinDetail"
          rows="3"
          placeholder="Tuliskan rincian kegiatan penugasan..."
          class="w-full p-3 rounded-xl border border-gray-200 bg-white text-xs resize-none text-gray-800 focus:outline-none focus:border-primary leading-relaxed"
        ></textarea>
      </div>

      <div class="flex flex-col">
        <label class="text-xs font-semibold text-gray-700 mb-1"
          >Catatan Penjelasan Perbaikan (Booker Notes) *</label
        >
        <textarea
          v-model="editStore.notes"
          rows="3"
          placeholder="Jelaskan perbaikan yang telah dilakukan..."
          class="w-full p-3 rounded-xl border border-gray-200 bg-white text-xs resize-none text-gray-800 focus:outline-none focus:border-primary leading-relaxed"
        ></textarea>
      </div>
    </div>

    <!-- Modals -->
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
