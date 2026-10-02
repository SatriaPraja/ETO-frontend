<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useOrderStore } from '@/stores/orderStore'
import type { ExistingTOItem } from '@/models/travelOrder'
import type { ApproverItem, BudgetItem } from '@/models/reference'

// Import Komponen Modal LOV
import ExistingTOModal from './modal/selectExistingTOModal.vue'
import SelectApproverModal from './modal/selectApproverModal.vue'
import SelectBudgetModal from './modal/selectBudgetModal.vue'

// Props untuk membedakan mode tampilan
const props = withDefaults(
  defineProps<{
    isReadOnlyMode?: boolean // Jika true (pada modul Transport/Hotel), form di-lock dan wajib pilih TO Existing
  }>(),
  {
    isReadOnlyMode: false,
  },
)

const orderStore = useOrderStore()

// State Modal LOV
const isExistingTOModalOpen = ref(false)
const isApproverModalOpen = ref(false)
const isBudgetModalOpen = ref(false)

const selectedExistingTO = ref<ExistingTOItem | null>(null)

// Form di-disable/readonly jika berada di mode Transport/Hotel ATAU jika sudah memilih TO Existing
const isFieldsDisabled = computed(() => {
  return props.isReadOnlyMode || Boolean(orderStore.formInfo.existingToOption)
})

function truncateText(text: string, maxLength: number = 30) {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// Handler perubahan dropdown TO Existing
function handleDropdownChange(event: Event) {
  const target = event.target as HTMLSelectElement
  if (target.value === '') {
    selectedExistingTO.value = null
    orderStore.resetForm()
  }
}

function openApproverModal() {
  if (isFieldsDisabled.value) return
  isApproverModalOpen.value = true
}

function openBudgetModal() {
  if (isFieldsDisabled.value) return
  isBudgetModalOpen.value = true
}

// Callback dari Modal LOV TO Existing
function handleTOSelected(item: ExistingTOItem) {
  selectedExistingTO.value = item
  orderStore.selectExistingTO(item)
}

// Callback dari Modal LOV Penyetuju
function handleApproverSelected(item: ApproverItem) {
  orderStore.formInfo.approverId = item.id
  orderStore.formInfo.approverNama = `${item.namaLengkap} (${item.jabatan})`
}

// Callback dari Modal LOV Mata Anggaran
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
    class="bg-surfaceCard rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 space-y-5 font-body w-full max-w-full overflow-hidden"
  >
    <!-- Header Section -->
    <div
      class="flex flex-col lg:flex-row lg:items-center justify-between gap-3 pb-3 border-b border-gray-100"
    >
      <div class="flex items-start gap-3 min-w-0">
        <div class="p-2 rounded-lg bg-emerald-50 text-emerald-700 shrink-0 mt-0.5">
          <span class="material-symbols-outlined text-[20px] sm:text-[22px]">assignment</span>
        </div>
        <div class="min-w-0 flex-1">
          <h2 class="text-sm sm:text-base font-bold text-textPrimary font-headline leading-tight">
            Informasi Kegiatan & Pembebanan Anggaran
          </h2>
          <p class="text-[11px] sm:text-xs text-textMuted mt-0.5 leading-relaxed">
            <template v-if="props.isReadOnlyMode">
              Pilih Travel Order terdaftar. Informasi kegiatan & anggaran terkunci otomatis.
            </template>
            <template v-else>
              Parameter Surat Perintah Resmi dan Pembebanan Anggaran Unit Kerja
            </template>
          </p>
        </div>
      </div>

      <div
        class="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-3 py-1.5 rounded-full text-xs font-bold shrink-0 self-start lg:self-auto w-fit"
      >
        <span class="material-symbols-outlined text-[16px] sm:text-[18px]">verified</span>
        <span class="text-[11px] sm:text-xs">
          Saldo Anggaran Tersedia: Rp
          {{ (orderStore.formInfo.remainingBudget || 0).toLocaleString('id-ID') }}
        </span>
      </div>
    </div>

    <!-- Row 1: Existing TO, No. TO, Tanggal Order -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
      <!-- Dropdown / Selector Travel Order Terdaftar (Khusus Modul Transport & Hotel) -->
      <div v-if="props.isReadOnlyMode" class="sm:col-span-2 lg:col-span-6 flex flex-col min-w-0">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-1.5 gap-0.5">
          <label class="text-xs font-bold text-emerald-800 truncate">
            Pilih Travel Order Terdaftar *
          </label>
          <span class="text-[10px] sm:text-[11px] text-textMuted shrink-0">
            Wajib dipilih untuk melampirkan pesanan
          </span>
        </div>

        <!-- Pembungkus Fleksibel Bebas Overflow -->
        <div class="flex items-center gap-2 w-full min-w-0">
          <div class="relative flex-1 min-w-0">
            <select
              v-model="orderStore.formInfo.existingToOption"
              @change="handleDropdownChange"
              class="w-full h-10 pl-3 pr-8 rounded-xl bg-surfaceCard border border-emerald-300 text-xs font-bold text-textPrimary focus:outline-none focus:border-primary appearance-none cursor-pointer truncate"
            >
              <option value="">— Pilih TO Terdaftar —</option>
              <option v-if="selectedExistingTO" :value="selectedExistingTO.toCode">
                {{ selectedExistingTO.toCode }} - {{ truncateText(selectedExistingTO.title, 25) }}
              </option>
            </select>
            <span
              class="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-700 text-[18px] pointer-events-none"
            >
              expand_more
            </span>
          </div>

          <button
            type="button"
            @click="isExistingTOModalOpen = true"
            class="w-10 h-10 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer shadow-2xs"
            title="Cari Travel Order Terdaftar"
          >
            <span class="material-symbols-outlined text-[20px]">search</span>
          </button>
        </div>
      </div>

      <!-- No. Travel Order (Otomatis) -->
      <div
        :class="[
          props.isReadOnlyMode ? 'sm:col-span-1 lg:col-span-3' : 'sm:col-span-1 lg:col-span-6',
          'flex flex-col min-w-0',
        ]"
      >
        <label class="text-xs font-semibold text-textPrimary mb-1.5">No. Travel Order</label>
        <div class="relative flex items-center w-full min-w-0">
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
      <div
        :class="[
          props.isReadOnlyMode ? 'sm:col-span-1 lg:col-span-3' : 'sm:col-span-1 lg:col-span-6',
          'flex flex-col min-w-0',
        ]"
      >
        <label class="text-xs font-semibold text-textPrimary mb-1.5">Tanggal Order *</label>
        <div class="relative flex items-center w-full min-w-0">
          <input
            v-model="orderStore.formInfo.orderDate"
            type="date"
            :disabled="isFieldsDisabled"
            :class="[
              'w-full h-10 px-3 rounded-xl border text-xs font-medium focus:outline-none min-w-0',
              isFieldsDisabled
                ? 'bg-surfaceCanvas border-gray-200 text-textMuted cursor-not-allowed'
                : 'bg-surfaceCard border-gray-200 text-textPrimary focus:border-primary cursor-pointer',
            ]"
          />
        </div>
      </div>
    </div>

    <!-- Row 2: Nama Kegiatan -->
    <div class="flex flex-col w-full min-w-0">
      <label class="text-xs font-semibold text-textPrimary mb-1.5">Nama Kegiatan *</label>
      <input
        v-model="orderStore.formInfo.activityName"
        type="text"
        :disabled="isFieldsDisabled"
        placeholder="Masukkan nama kegiatan resmi penugasan..."
        :class="[
          'w-full h-10 px-3 rounded-xl border text-xs font-medium focus:outline-none min-w-0',
          isFieldsDisabled
            ? 'bg-surfaceCanvas border-gray-200 text-textMuted cursor-not-allowed'
            : 'bg-surfaceCard border-gray-200 text-textPrimary focus:border-primary',
        ]"
      />
    </div>

    <!-- Row 3: Nama Unit Kerja & Program Kerja -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col min-w-0">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">Nama Unit Kerja *</label>
        <input
          v-model="orderStore.formInfo.unitKerjaNama"
          type="text"
          :disabled="isFieldsDisabled"
          placeholder="Contoh: KANWIL JAWA TIMUR"
          :class="[
            'w-full h-10 px-3 rounded-xl border text-xs font-medium focus:outline-none min-w-0',
            isFieldsDisabled
              ? 'bg-surfaceCanvas border-gray-200 text-textMuted cursor-not-allowed'
              : 'bg-surfaceCard border-gray-200 text-textPrimary focus:border-primary',
          ]"
        />
      </div>

      <div class="flex flex-col min-w-0">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">Nama Program Kerja</label>
        <input
          v-model="orderStore.formInfo.programKerja"
          type="text"
          :disabled="isFieldsDisabled"
          placeholder="Nama Program Kerja (Otomatis dari Mata Anggaran)"
          :class="[
            'w-full h-10 px-3 rounded-xl border text-xs font-medium focus:outline-none min-w-0',
            isFieldsDisabled
              ? 'bg-surfaceCanvas border-gray-200 text-textMuted cursor-not-allowed'
              : 'bg-surfaceCard border-gray-200 text-textPrimary focus:border-primary',
          ]"
        />
      </div>
    </div>

    <!-- Row 4: Penyetuju, Mata Anggaran, No. Sprin -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Penyetuju -->
      <div class="flex flex-col min-w-0">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">
          Nama Kepala Unit Kerja (Penyetuju) *
        </label>
        <div
          @click="openApproverModal"
          :class="[
            'relative flex items-center rounded-xl border transition-all w-full min-w-0',
            isFieldsDisabled
              ? 'bg-surfaceCanvas border-gray-200 cursor-not-allowed'
              : 'bg-surfaceCard border-gray-200 hover:border-primary cursor-pointer',
          ]"
        >
          <span class="material-symbols-outlined absolute left-3 text-emerald-600 text-[18px]">
            verified_user
          </span>
          <input
            type="text"
            :value="orderStore.formInfo.approverNama"
            readonly
            placeholder="Pilih Pejabat Penyetuju..."
            class="w-full h-10 pl-9 pr-8 bg-transparent text-xs font-medium text-textPrimary truncate pointer-events-none focus:outline-none"
          />
          <span
            v-if="!isFieldsDisabled"
            class="material-symbols-outlined absolute right-3 text-textMuted text-[18px]"
          >
            search
          </span>
        </div>
      </div>

      <!-- Mata Anggaran -->
      <div class="flex flex-col min-w-0">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">Mata Anggaran (MAK) *</label>
        <div
          @click="openBudgetModal"
          :class="[
            'relative flex items-center rounded-xl border transition-all w-full min-w-0',
            isFieldsDisabled
              ? 'bg-surfaceCanvas border-gray-200 cursor-not-allowed'
              : 'bg-surfaceCard border-gray-200 hover:border-primary cursor-pointer',
          ]"
        >
          <span class="material-symbols-outlined absolute left-3 text-textMuted text-[18px]">
            account_balance
          </span>
          <input
            type="text"
            :value="orderStore.formInfo.budgetAccount"
            readonly
            placeholder="Pilih Kode & Nama Mata Anggaran..."
            class="w-full h-10 pl-9 pr-8 bg-transparent text-xs font-mono text-textPrimary truncate pointer-events-none focus:outline-none"
          />
          <span
            v-if="!isFieldsDisabled"
            class="material-symbols-outlined absolute right-3 text-textMuted text-[18px]"
          >
            search
          </span>
        </div>
      </div>

      <!-- No. Sprin -->
      <div class="flex flex-col min-w-0">
        <label class="text-xs font-semibold text-textPrimary mb-1.5">No. Sprin / SPPD *</label>
        <div class="relative flex items-center w-full min-w-0">
          <span class="material-symbols-outlined absolute left-3 text-textMuted text-[18px]">
            description
          </span>
          <input
            v-model="orderStore.formInfo.sprinNumber"
            type="text"
            :disabled="isFieldsDisabled"
            placeholder="Nomor Surat Perintah / SPPD"
            :class="[
              'w-full h-10 pl-9 pr-3 rounded-xl border text-xs font-mono font-semibold focus:outline-none min-w-0',
              isFieldsDisabled
                ? 'bg-surfaceCanvas border-gray-200 text-textMuted cursor-not-allowed'
                : 'bg-surfaceCard border-gray-200 text-textPrimary focus:border-primary',
            ]"
          />
        </div>
      </div>
    </div>

    <!-- Row 5: Detail Kegiatan Sesuai Sprin & Catatan Tambahan -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="flex flex-col min-w-0">
        <div class="flex items-center justify-between mb-1.5">
          <label class="text-xs font-semibold text-textPrimary">
            Detail Kegiatan Sesuai Sprin *
          </label>
          <span class="text-[10px] text-textMuted font-mono">
            {{ orderStore.formInfo.sprinDetail ? orderStore.formInfo.sprinDetail.length : 0 }}/100
          </span>
        </div>
        <textarea
          v-model="orderStore.formInfo.sprinDetail"
          rows="3"
          maxlength="100"
          :disabled="isFieldsDisabled"
          placeholder="Tuliskan rincian kegiatan penugasan resmi..."
          :class="[
            'w-full p-3 rounded-xl border text-xs resize-none leading-relaxed focus:outline-none min-w-0',
            isFieldsDisabled
              ? 'bg-surfaceCanvas border-gray-200 text-textMuted cursor-not-allowed'
              : 'bg-surfaceCard border-gray-200 text-textPrimary focus:border-primary',
          ]"
        ></textarea>
      </div>

      <div class="flex flex-col min-w-0">
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
          :disabled="isFieldsDisabled"
          placeholder="Tambahkan preferensi khusus atau instruksi penjemputan..."
          :class="[
            'w-full p-3 rounded-xl border text-xs resize-none leading-relaxed focus:outline-none min-w-0',
            isFieldsDisabled
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
