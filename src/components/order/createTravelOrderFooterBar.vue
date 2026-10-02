<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import ConfirmSubmitModal from './modal/confirmSubmitModal.vue'

const router = useRouter()
const orderStore = useOrderStore()

const emit = defineEmits<{
  (e: 'submit-header'): void
}>()

// State Modal Konfirmasi
const isConfirmModalOpen = ref(false)

function handleCancel() {
  orderStore.resetForm()
  router.push('/dashboard')
}

// Buka Modal Konfirmasi saat tombol 'Terbitkan' diklik
function openConfirmModal() {
  isConfirmModalOpen.value = true
}

// Handler eksekusi submit sesungguhnya setelah dikonfirmasi di Modal
function handleConfirmSubmit() {
  isConfirmModalOpen.value = false
  emit('submit-header')
}
</script>

<template>
  <div
    class="fixed bottom-0 left-0 lg:left-[16.25rem] right-0 bg-surfaceCard border-t border-gray-200 p-3 sm:p-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 z-30 shadow-lg font-body"
  >
    <!-- Left Section: Info Rangkuman Pagu -->
    <div class="flex items-center justify-between sm:justify-start gap-3 sm:gap-6 text-xs">
      <div class="flex flex-col">
        <span class="text-[10px] text-textMuted uppercase font-semibold">MATA ANGGARAN:</span>
        <span
          class="text-xs sm:text-sm font-bold text-textPrimary truncate max-w-[180px] sm:max-w-[320px]"
        >
          {{ orderStore.formInfo.budgetAccount || 'Belum dipilih' }}
        </span>
      </div>

      <div class="border-l border-gray-200 pl-3 sm:pl-6 flex flex-col justify-center">
        <span class="text-[9px] sm:text-[10px] text-textMuted uppercase font-semibold">
          SALDO ANGGARAN:
        </span>
        <span class="text-xs sm:text-sm font-bold text-emerald-700 whitespace-nowrap">
          Rp {{ (orderStore.formInfo.remainingBudget || 0).toLocaleString('id-ID') }}
        </span>
      </div>
    </div>

    <!-- Right Section: Action Buttons -->
    <div class="flex items-center gap-2 w-full sm:w-auto">
      <button
        type="button"
        @click="handleCancel"
        class="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-[0.98]"
      >
        <span class="material-symbols-outlined text-[16px]">close</span>
        <span>Batal</span>
      </button>

      <button
        type="button"
        @click="openConfirmModal"
        :disabled="orderStore.isSubmitting"
        class="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap active:scale-[0.98]"
      >
        <span
          v-if="orderStore.isSubmitting"
          class="material-symbols-outlined text-[18px] animate-spin"
        >
          progress_activity
        </span>
        <span v-else class="material-symbols-outlined text-[18px]">post_add</span>
        <span>
          {{ orderStore.isSubmitting ? 'Memproses...' : 'Terbitkan Travel Order Mandiri' }}
        </span>
      </button>
    </div>

    <!-- Modal Pop-Up Konfirmasi -->
    <ConfirmSubmitModal
      :is-open="isConfirmModalOpen"
      :is-submitting="orderStore.isSubmitting"
      title="Konfirmasi Terbitkan Travel Order"
      description="Apakah Anda yakin ingin menerbitkan Travel Order Mandiri ini? Dokumen akan didaftarkan ke sistem."
      @close="isConfirmModalOpen = false"
      @confirm="handleConfirmSubmit"
    />
  </div>
</template>
