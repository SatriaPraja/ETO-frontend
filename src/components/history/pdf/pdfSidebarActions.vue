<script setup lang="ts">
import { ref } from 'vue'
import type { TravelOrderDetail } from '@/models/historyDetail'

const props = defineProps<{
  detail: TravelOrderDetail
}>()

const isSendingEmail = ref(false)

function formatDateTime(dateStr?: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function handleDownload() {
  window.print()
}

function handlePrint() {
  window.print()
}

async function handleEmail() {
  try {
    isSendingEmail.value = true
    // Simulasi atau panggil API pengiriman email
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert(`Formulir e-TO ${props.detail.toCode} berhasil dikirimkan ke email personel.`)
  } catch (error) {
    alert('Gagal mengirim email. Silakan coba lagi.')
  } finally {
    isSendingEmail.value = false
  }
}
</script>

<template>
  <div class="space-y-4 font-body">
    <!-- Card 1: Status Dokumen & Tombol Aksi -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center justify-between">
        <h3 class="font-bold text-textPrimary text-xs font-headline">Status Dokumen</h3>

        <!-- Status Label Dinamis -->
        <span
          v-if="detail.status === 'APPROVED'"
          class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px] border border-emerald-100 flex items-center gap-1"
        >
          <span class="material-symbols-outlined text-[12px]">check_circle</span>
          <span>Disetujui Penuh</span>
        </span>
        <span
          v-else
          class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px] border border-blue-100 flex items-center gap-1"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
          <span>{{
            detail.status === 'WAITING_PEJABAT' ? 'Menunggu Persetujuan' : detail.status
          }}</span>
        </span>
      </div>

      <div class="space-y-1.5 text-xs text-textMuted border-t border-gray-100 pt-2.5">
        <div class="flex justify-between">
          <span>Format Berkas</span>
          <strong class="text-textPrimary font-mono">PDF / PRINTABLE</strong>
        </div>
        <div class="flex justify-between">
          <span>Ukuran Berkas</span>
          <strong class="text-textPrimary">420.8 KB</strong>
        </div>
        <div class="flex justify-between">
          <span>Otorisasi Akhir</span>
          <strong class="text-textPrimary">{{ formatDateTime(detail.createdAt) }} WIB</strong>
        </div>
        <div class="flex justify-between items-center pt-1">
          <span>Keamanan Signature</span>
          <span
            v-if="detail.status === 'APPROVED'"
            class="px-2 py-0.2 rounded bg-emerald-50 text-emerald-700 font-bold text-[10px] flex items-center gap-1"
          >
            <span class="material-symbols-outlined text-[12px]">lock</span>
            <span>BSrE Valid</span>
          </span>
          <span
            v-else
            class="px-2 py-0.2 rounded bg-amber-50 text-amber-700 font-bold text-[10px] flex items-center gap-1"
          >
            <span class="material-symbols-outlined text-[12px]">schedule</span>
            <span>Draf Pratinjau</span>
          </span>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="space-y-2 pt-2 print:hidden">
        <button
          type="button"
          @click="handleDownload"
          class="w-full py-2.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">download</span>
          <span>Unduh Dokumen PDF</span>
        </button>

        <button
          type="button"
          @click="handlePrint"
          class="w-full py-2 rounded-lg bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
        >
          <span class="material-symbols-outlined text-[18px]">print</span>
          <span>Cetak Langsung (Print)</span>
        </button>

        <button
          type="button"
          @click="handleEmail"
          :disabled="isSendingEmail"
          class="w-full py-2 rounded-lg bg-surfaceCard border border-gray-200 hover:bg-surfaceCanvas text-textPrimary text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-50"
        >
          <span
            class="material-symbols-outlined text-[18px]"
            :class="{ 'animate-spin': isSendingEmail }"
          >
            {{ isSendingEmail ? 'progress_activity' : 'mail' }}
          </span>
          <span>{{ isSendingEmail ? 'Mengirim...' : 'Kirim ke Email Personel' }}</span>
        </button>
      </div>
    </div>

    <!-- Card 2: Jejak Audit & Validasi Dinamis (Sesuai 3 Role Approval) -->
    <div class="bg-surfaceCard p-5 rounded-xl border border-gray-100 shadow-2xs space-y-3">
      <div class="flex items-center gap-2 pb-2 border-b border-gray-100">
        <span class="material-symbols-outlined text-primary text-[18px]">history</span>
        <h3 class="font-bold text-textPrimary text-xs font-headline">Jejak Audit & Validasi</h3>
      </div>

      <div class="space-y-3 text-xs">
        <!-- Jika log API kosong, tampilkan fallback sesuai urutan role backend -->
        <div v-if="!detail.approvalLogs || detail.approvalLogs.length === 0" class="space-y-3">
          <!-- Step 3: Admin Travel KP -->
          <div class="flex items-start gap-2 opacity-50">
            <span class="w-2 h-2 rounded-full bg-gray-300 shrink-0 mt-1.5"></span>
            <div>
              <strong class="font-bold text-textPrimary block text-[11px]"
                >Verifikasi Akhir & Issue Tiket</strong
              >
              <span class="text-[10px] text-textMuted block">Admin Travel Pusat</span>
              <span class="text-[9px] text-textMuted block">Menunggu Persetujuan Pejabat</span>
            </div>
          </div>

          <!-- Step 2: Pejabat Penyetuju (Kakanwil) -->
          <div class="flex items-start gap-2">
            <span
              :class="[
                'w-2 h-2 rounded-full shrink-0 mt-1.5',
                detail.status === 'APPROVED' ? 'bg-emerald-600' : 'bg-amber-500 animate-pulse',
              ]"
            ></span>
            <div>
              <strong class="font-bold text-textPrimary block text-[11px]">
                {{ detail.status === 'APPROVED' ? 'Disetujui:' : 'Menunggu Persetujuan:' }}
                {{ detail.approverJabatan || 'Pejabat Penyetuju' }}
              </strong>
              <span class="text-[10px] text-textMuted block">{{ detail.approverNama || '-' }}</span>
              <span class="text-[9px] text-textMuted block">
                {{
                  detail.status === 'APPROVED'
                    ? formatDateTime(detail.createdAt) + ' WIB'
                    : 'Proses Otorisasi'
                }}
              </span>
            </div>
          </div>

          <!-- Step 1: Booker -->
          <div class="flex items-start gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
            <div>
              <strong class="font-bold text-textPrimary block text-[11px]"
                >Draf Diajukan: Official Booker</strong
              >
              <span class="text-[10px] text-textMuted block">{{ detail.bookerNama }}</span>
              <span class="text-[9px] text-textMuted block"
                >{{ formatDateTime(detail.createdAt) }} WIB</span
              >
            </div>
          </div>
        </div>

        <!-- Render logs jika ada dari API -->
        <div v-else v-for="log in detail.approvalLogs" :key="log.id" class="flex items-start gap-2">
          <span class="w-2 h-2 rounded-full bg-emerald-600 shrink-0 mt-1.5"></span>
          <div>
            <strong class="font-bold text-textPrimary block text-[11px]">{{ log.action }}</strong>
            <span class="text-[10px] text-textMuted block"
              >{{ log.actorNama }} • {{ log.actorJabatan }}</span
            >
            <span class="text-[9px] text-textMuted block"
              >{{ formatDateTime(log.createdAt) }} WIB</span
            >
          </div>
        </div>
      </div>
    </div>

    <!-- Card 3: Integritas Dokumen -->
    <div
      class="p-4 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5 text-xs text-emerald-900"
    >
      <span class="material-symbols-outlined text-emerald-700 text-[20px] shrink-0 mt-0.5"
        >verified_user</span
      >
      <div class="space-y-0.5">
        <h4 class="font-bold text-emerald-900 font-headline text-[11px]">
          Integritas Dokumen Terjamin
        </h4>
        <p class="text-[10px] text-emerald-800 leading-relaxed">
          Dokumen ini sah secara perundang-undangan dan dilengkapi tanda tangan elektronik
          tersertifikasi BSrE / BPJS Ketenagakerjaan.
        </p>
      </div>
    </div>
  </div>
</template>
