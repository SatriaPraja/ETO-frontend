<script setup lang="ts">
import { useApprovalStore } from '@/stores/approvalStore'
import { useAuthStore } from '@/stores/authStore'

const approvalStore = useApprovalStore()
const authStore = useAuthStore()

async function handleApprove() {
  if (!approvalStore.selectedItem) return

  // 🟢 Pembacaan role yang benar (dengan fallback ke user.activeRole)
  const currentRole = authStore.activeRole || authStore.activeRole

  const targetStatus = currentRole === 'APPROVER_KAKANWIL' ? 'WAITING_ADMINTRAVEL' : 'APPROVED'

  if (confirm(`Apakah Anda yakin ingin menyetujui pengajuan ${approvalStore.selectedItem.id}?`)) {
    try {
      await approvalStore.processApproval({
        travelOrderId: approvalStore.selectedItem.rawId,
        status: targetStatus,
        notes: 'Disetujui melalui sistem Inbox Approval',
      })
      alert('Pengajuan berhasil disetujui!')
    } catch (err: any) {
      alert(err.message)
    }
  }
}

async function handleReject() {
  if (!approvalStore.selectedItem) return

  const notes = prompt('Masukkan alasan penolakan pengajuan ini:')
  if (notes === null) return

  try {
    await approvalStore.processApproval({
      travelOrderId: approvalStore.selectedItem.rawId,
      status: 'REJECTED',
      notes: notes || 'Ditolak oleh Pejabat Penyetuju',
    })
    alert('Pengajuan telah ditolak.')
  } catch (err: any) {
    alert(err.message)
  }
}

async function handleReturn() {
  if (!approvalStore.selectedItem) return

  const notes = prompt('Masukkan catatan koreksi untuk Booker:')
  if (notes === null) return

  try {
    await approvalStore.processApproval({
      travelOrderId: approvalStore.selectedItem.rawId,
      status: 'RETURNED',
      notes: notes || 'Mohon perbaiki draf pengajuan',
    })
    alert('Pengajuan berhasil dikembalikan ke Booker untuk koreksi.')
  } catch (err: any) {
    alert(err.message)
  }
}
</script>
<template>
  <!-- Pembungkus Action Bar Responsif -->
  <div
    v-if="approvalStore.selectedItem && approvalStore.activeTab === 'pending'"
    class="sticky bottom-0 bg-surfaceCard border-t border-gray-200 p-3 sm:p-4 rounded-b-xl flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-lg font-body z-20 min-h-[68px]"
  >
    <!-- Metadata Informasi Role -->
    <div class="flex items-center gap-2 text-xs text-textMuted justify-between md:justify-start">
      <div class="flex items-center gap-1.5">
        <span class="material-symbols-outlined text-emerald-600 text-[18px] shrink-0">
          verified_user
        </span>
        <span class="leading-tight">
          Menyetujui sebagai:
          <strong class="text-textPrimary font-bold block sm:inline">
            {{ authStore.user?.jabatan || 'Pejabat Penyetuju' }}
          </strong>
        </span>
      </div>
    </div>

    <!-- Tombol Aksi (Grid simetris pada Mobile, Flex di Desktop) -->
    <div class="grid grid-cols-3 sm:flex sm:items-center gap-1.5 sm:gap-2 w-full md:w-auto">
      <!-- Tombol Kembalikan (Koreksi) -->
      <button
        type="button"
        @click="handleReturn"
        :disabled="approvalStore.isSubmitting || approvalStore.isDetailLoading"
        class="flex-1 sm:flex-none justify-center px-2 sm:px-3.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold inline-flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap active:scale-[0.98]"
        title="Kembalikan untuk Koreksi"
      >
        <span class="material-symbols-outlined text-[16px] shrink-0">history_edu</span>
        <span class="hidden sm:inline">Kembalikan (Koreksi)</span>
        <span class="sm:hidden text-[11px]">Koreksi</span>
      </button>

      <!-- Tombol Tolak -->
      <button
        type="button"
        @click="handleReject"
        :disabled="approvalStore.isSubmitting || approvalStore.isDetailLoading"
        class="flex-1 sm:flex-none justify-center px-2 sm:px-3.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold inline-flex items-center gap-1 sm:gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap active:scale-[0.98]"
        title="Tolak Pengajuan"
      >
        <span class="material-symbols-outlined text-[16px] shrink-0">cancel</span>
        <span class="hidden sm:inline">Tolak Pengajuan</span>
        <span class="sm:hidden text-[11px]">Tolak</span>
      </button>

      <!-- Tombol Setujui -->
      <button
        type="button"
        @click="handleApprove"
        :disabled="approvalStore.isSubmitting || approvalStore.isDetailLoading"
        class="flex-1 sm:flex-none justify-center px-2.5 sm:px-5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold inline-flex items-center gap-1 sm:gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap active:scale-[0.98]"
        title="Setujui Pengajuan"
      >
        <span
          v-if="approvalStore.isSubmitting"
          class="material-symbols-outlined text-[18px] animate-spin shrink-0"
        >
          sync
        </span>
        <span v-else class="material-symbols-outlined text-[18px] shrink-0">check_circle</span>
        <span class="hidden sm:inline">Setujui Pengajuan</span>
        <span class="sm:hidden text-[11px]">Setujui</span>
      </button>
    </div>
  </div>
</template>
