<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import type { ExistingTOItem } from '@/models/travelOrder'
import type { ApproverItem, BudgetItem } from '@/models/reference' // 👈 Hapus ekstensi .ts

// 🟢 1. IMPORT BERKAS KOMPONEN MODAL .VUE
import ExistingTOModal from './modal/selectExistingTOModal.vue'
import SelectApproverModal from './modal/selectApproverModal.vue'
import SelectBudgetModal from './modal/selectBudgetModal.vue'

const orderStore = useOrderStore()

// State Modal
const isExistingTOModalOpen = ref(false)
const isApproverModalOpen = ref(false)
const isBudgetModalOpen = ref(false)

const selectedExistingTO = ref<ExistingTOItem | null>(null)

// Computed: Cek apakah form mode "Existing TO"
const isExistingMode = computed(() => {
  return Boolean(
    orderStore.formInfo.existingToOption && orderStore.formInfo.existingToOption !== '',
  )
})

function truncateText(text: string, maxLength: number = 35) {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// Reset Form saat berpindah ke mode "Buat Baru"
function handleDropdownChange(event: Event) {
  const target = event.target as HTMLSelectElement
  if (target.value === '') {
    selectedExistingTO.value = null
    orderStore.resetForm() // Reset form jika kembali ke Buat Baru
  }
}

function openApproverModal() {
  if (isExistingMode.value) {
    alert('Informasi Penyetuju sudah terkunci mengikuti Travel Order Existing yang dipilih.')
    return
  }
  isApproverModalOpen.value = true
}

function openBudgetModal() {
  if (isExistingMode.value) {
    alert('Mata Anggaran sudah terkunci mengikuti Travel Order Existing yang dipilih.')
    return
  }
  isBudgetModalOpen.value = true
}

// Handler Callback dari Modal Existing TO
function handleTOSelected(item: ExistingTOItem) {
  selectedExistingTO.value = item
  orderStore.selectExistingTO(item)
}

// Handler Callback dari Modal Penyetuju
function handleApproverSelected(item: ApproverItem) {
  orderStore.formInfo.approverId = item.id
  orderStore.formInfo.approverNama = `${item.namaLengkap} (${item.jabatan})`
}

// Handler Callback dari Modal Mata Anggaran
function handleBudgetSelected(item: BudgetItem) {
  orderStore.formInfo.budgetId = item.id
  orderStore.formInfo.budgetAccount = `${item.accountNumber} - ${item.accountName}`
  orderStore.formInfo.programKerja = item.programName
  orderStore.formInfo.remainingBudget = item.paguBudget - item.usedBudget
}

onMounted(() => {
  if (!orderStore.formInfo.orderDate) {
    const nowInJakarta = new Date().toLocaleDateString('sv-SE', {
      timeZone: 'Asia/Jakarta',
    })
    orderStore.formInfo.orderDate = nowInJakarta
  }
})
</script>

<template>
  <section
    class="bg-surfaceCard rounded-2xl p-6 shadow-sm border border-gray-100 space-y-5 font-body"
  >
    <!-- Header Section -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-100"
    >
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

      <div
        class="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 self-start sm:self-auto"
      >
        <span class="material-symbols-outlined text-[18px]">verified</span>
        <span>
          Saldo Anggaran Tersedia: Rp
          {{ (orderStore.formInfo.remainingBudget || 0).toLocaleString('id-ID') }}
        </span>
      </div>
    </div>

    <!-- Row 1: Existing TO, No. TO, Tanggal Order -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
      <!-- Pilih Travel Order Existing -->
      <div class="md:col-span-6 flex flex-col">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-xs font-semibold text-textPrimary"
            >Pilih Travel Order Existing (Opsional)</label
          >
          <span class="text-[11px] text-textMuted">Hubungkan kegiatan serumpun</span>
        </div>
        <div class="flex items-center gap-2">
          <select
            v-model="orderStore.formInfo.existingToOption"
            @change="handleDropdownChange"
            class="flex-1 h-10 px-3 pr-8 rounded-xl bg-surfaceCard border border-gray-200 text-xs font-medium text-textPrimary focus:outline-none focus:border-primary appearance-none cursor-pointer truncate"
          >
            <option value="">— Buat Baru (Stand-alone TO) —</option>
            <option v-if="selectedExistingTO" :value="selectedExistingTO.toCode">
              {{ selectedExistingTO.toCode }} - {{ truncateText(selectedExistingTO.title, 35) }}
            </option>
          </select>

          <button
            type="button"
            @click="isExistingTOModalOpen = true"
            class="w-10 h-10 rounded-xl bg-surfaceCanvas hover:bg-gray-200 border border-gray-200 flex items-center justify-center text-textMuted transition-colors shrink-0 cursor-pointer"
            title="Cari Travel Order Existing"
          >
            <span class="material-symbols-outlined text-[20px]">search</span>
          </button>
        </div>
      </div>

      <!-- No. Travel Order (Selalu Readonly / Otomatis) -->
      <div class="md:col-span-3 flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">No. Travel Order</label>
        <div class="relative flex items-center">
          <span class="absolute left-3 text-textMuted font-bold text-xs">#</span>
          <input
            type="text"
            :value="orderStore.formInfo.toCode || 'Otomatis oleh sistem'"
            readonly
            placeholder="Nomor TO Otomatis"
            class="w-full h-10 pl-7 pr-3 rounded-xl bg-surfaceCanvas border border-gray-200 text-xs font-bold text-textMuted font-mono truncate cursor-not-allowed"
          />
        </div>
      </div>

      <!-- Tanggal Order -->
      <div class="md:col-span-3 flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">Tanggal Order *</label>
        <div class="relative flex items-center">
          <input
            v-model="orderStore.formInfo.orderDate"
            type="date"
            :readonly="isExistingMode"
            :class="[
              'w-full h-10 px-3 rounded-xl border text-xs font-medium focus:outline-none',
              isExistingMode
                ? 'bg-surfaceCanvas border-gray-200 text-textMuted cursor-not-allowed'
                : 'bg-surfaceCard border-gray-200 text-textPrimary focus:border-primary cursor-pointer',
            ]"
          />
        </div>
      </div>
    </div>

    <!-- Row 2: Nama Kegiatan -->
    <div class="flex flex-col">
      <label class="text-xs font-semibold text-textPrimary mb-1.5">Nama Kegiatan *</label>
      <input
        v-model="orderStore.formInfo.activityName"
        type="text"
        :readonly="isExistingMode"
        placeholder="Masukkan nama kegiatan resmi penugasan..."
        :class="[
          'w-full h-10 px-3 rounded-xl border text-xs font-medium focus:outline-none',
          isExistingMode
            ? 'bg-surfaceCanvas border-gray-200 text-textMuted cursor-not-allowed'
            : 'bg-surfaceCard border-gray-200 text-textPrimary focus:border-primary',
        ]"
      />
    </div>

    <!-- Row 3: Nama Unit Kerja & Program Kerja -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">Nama Unit Kerja *</label>
        <input
          v-model="orderStore.formInfo.unitKerjaNama"
          type="text"
          :readonly="isExistingMode"
          placeholder="Contoh: KANWIL JAWA TIMUR"
          :class="[
            'h-10 px-3 rounded-xl border text-xs font-medium focus:outline-none',
            isExistingMode
              ? 'bg-surfaceCanvas border-gray-200 text-textMuted cursor-not-allowed'
              : 'bg-surfaceCard border-gray-200 text-textPrimary focus:border-primary',
          ]"
        />
      </div>

      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">Nama Program Kerja</label>
        <input
          v-model="orderStore.formInfo.programKerja"
          type="text"
          :readonly="isExistingMode"
          placeholder="Nama Program Kerja (Otomatis dari Mata Anggaran)"
          :class="[
            'h-10 px-3 rounded-xl border text-xs font-medium focus:outline-none',
            isExistingMode
              ? 'bg-surfaceCanvas border-gray-200 text-textMuted cursor-not-allowed'
              : 'bg-surfaceCard border-gray-200 text-textPrimary focus:border-primary',
          ]"
        />
      </div>
    </div>

    <!-- Row 4: Penyetuju, Mata Anggaran, No. Sprin -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Penyetuju (LOV / Modal) -->
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5"
          >Nama Kepala Unit Kerja (Penyetuju) *</label
        >
        <div
          @click="openApproverModal"
          :class="[
            'relative flex items-center rounded-xl border transition-all cursor-pointer',
            isExistingMode
              ? 'bg-surfaceCanvas border-gray-200 cursor-not-allowed'
              : 'bg-surfaceCard border-gray-200 hover:border-primary',
          ]"
        >
          <span class="material-symbols-outlined absolute left-3 text-emerald-600 text-[18px]"
            >verified_user</span
          >
          <input
            type="text"
            :value="orderStore.formInfo.approverNama"
            readonly
            placeholder="Pilih Pejabat Penyetuju..."
            class="w-full h-10 pl-9 pr-8 bg-transparent text-xs font-medium text-textPrimary truncate pointer-events-none focus:outline-none"
          />
          <span
            v-if="!isExistingMode"
            class="material-symbols-outlined absolute right-3 text-textMuted text-[18px]"
            >search</span
          >
        </div>
      </div>

      <!-- Mata Anggaran (LOV / Modal) -->
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">Mata Anggaran (MAK) *</label>
        <div
          @click="openBudgetModal"
          :class="[
            'relative flex items-center rounded-xl border transition-all cursor-pointer',
            isExistingMode
              ? 'bg-surfaceCanvas border-gray-200 cursor-not-allowed'
              : 'bg-surfaceCard border-gray-200 hover:border-primary',
          ]"
        >
          <span class="material-symbols-outlined absolute left-3 text-textMuted text-[18px]"
            >account_balance</span
          >
          <input
            type="text"
            :value="orderStore.formInfo.budgetAccount"
            readonly
            placeholder="Pilih Kode & Nama Mata Anggaran..."
            class="w-full h-10 pl-9 pr-8 bg-transparent text-xs font-mono text-textPrimary truncate pointer-events-none focus:outline-none"
          />
          <span
            v-if="!isExistingMode"
            class="material-symbols-outlined absolute right-3 text-textMuted text-[18px]"
            >search</span
          >
        </div>
      </div>

      <!-- No. Sprin / SPPD -->
      <div class="flex flex-col">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">No. Sprin / SPPD *</label>
        <div class="relative flex items-center">
          <span class="material-symbols-outlined absolute left-3 text-textMuted text-[18px]"
            >description</span
          >
          <input
            v-model="orderStore.formInfo.sprinNumber"
            type="text"
            :readonly="isExistingMode"
            placeholder="Nomor Surat Perintah / SPPD"
            :class="[
              'w-full h-10 pl-9 pr-3 rounded-xl border text-xs font-mono font-semibold focus:outline-none',
              isExistingMode
                ? 'bg-surfaceCanvas border-gray-200 text-textMuted cursor-not-allowed'
                : 'bg-surfaceCard border-gray-200 text-textPrimary focus:border-primary',
            ]"
          />
        </div>
      </div>
    </div>

    <!-- Row 5: Detail Kegiatan Sesuai Sprin & Catatan Tambahan -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-xs font-semibold text-textPrimary"
            >Detail Kegiatan Sesuai Sprin *</label
          >
          <span class="text-[10px] text-textMuted font-mono">
            {{ orderStore.formInfo.sprinDetail ? orderStore.formInfo.sprinDetail.length : 0 }}/100
          </span>
        </div>
        <textarea
          v-model="orderStore.formInfo.sprinDetail"
          rows="3"
          maxlength="100"
          :readonly="isExistingMode"
          placeholder="Tuliskan rincian kegiatan penugasan resmi..."
          :class="[
            'w-full p-3 rounded-xl border text-xs resize-none leading-relaxed focus:outline-none',
            isExistingMode
              ? 'bg-surfaceCanvas border-gray-200 text-textMuted cursor-not-allowed'
              : 'bg-surfaceCard border-gray-200 text-textPrimary focus:border-primary',
          ]"
        ></textarea>
      </div>

      <div class="flex flex-col">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-xs font-semibold text-textPrimary">Catatan Tambahan (Opsional)</label>
          <span class="text-[10px] text-textMuted font-mono">
            {{ orderStore.formInfo.notes ? orderStore.formInfo.notes.length : 0 }}/250
          </span>
        </div>
        <textarea
          v-model="orderStore.formInfo.notes"
          rows="3"
          maxlength="250"
          :readonly="isExistingMode"
          placeholder="Tambahkan preferensi khusus atau instruksi penjemputan..."
          :class="[
            'w-full p-3 rounded-xl border text-xs resize-none leading-relaxed focus:outline-none',
            isExistingMode
              ? 'bg-surfaceCanvas border-gray-200 text-textMuted cursor-not-allowed'
              : 'bg-surfaceCard border-gray-200 text-textPrimary focus:border-primary',
          ]"
        ></textarea>
      </div>
    </div>

    <!-- Modal-Modal LOV -->
    <ExistingTOModal
      :is-open="isExistingTOModalOpen"
      @close="isExistingTOModalOpen = false"
      @select="handleTOSelected"
    />

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
