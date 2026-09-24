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
  <!-- Pembungkus Action Bar dengan min-height agar tidak melompat -->
  <div
    v-if="approvalStore.selectedItem && approvalStore.activeTab === 'pending'"
    class="sticky bottom-0 bg-surfaceCard border-t border-gray-200 p-4 rounded-b-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg font-body z-20 min-h-[68px]"
  >
    <div class="flex items-center gap-2 text-xs text-textMuted">
      <span class="material-symbols-outlined text-emerald-600 text-[18px]">verified_user</span>
      <span
        >Anda menyetujui sebagai:
        <strong class="text-textPrimary font-bold">
          {{ authStore.user?.jabatan || 'Pejabat Penyetuju' }}
        </strong>
      </span>
    </div>

    <div class="flex items-center gap-2 self-end sm:self-auto">
      <!-- Tombol Kembalikan (Koreksi) -->
      <button
        type="button"
        @click="handleReturn"
        :disabled="approvalStore.isSubmitting || approvalStore.isDetailLoading"
        class="px-3.5 py-2 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span class="material-symbols-outlined text-[16px]">history_edu</span>
        <span>Kembalikan (Koreksi)</span>
      </button>

      <!-- Tombol Tolak -->
      <button
        type="button"
        @click="handleReject"
        :disabled="approvalStore.isSubmitting || approvalStore.isDetailLoading"
        class="px-3.5 py-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold inline-flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span class="material-symbols-outlined text-[16px]">cancel</span>
        <span>Tolak Pengajuan</span>
      </button>

      <!-- Tombol Setujui -->
      <button
        type="button"
        @click="handleApprove"
        :disabled="approvalStore.isSubmitting || approvalStore.isDetailLoading"
        class="px-5 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span
          v-if="approvalStore.isSubmitting"
          class="material-symbols-outlined text-[18px] animate-spin"
          >sync</span
        >
        <span v-else class="material-symbols-outlined text-[18px]">check_circle</span>
        <span>Setujui Pengajuan</span>
      </button>
    </div>
  </div>
</template>
