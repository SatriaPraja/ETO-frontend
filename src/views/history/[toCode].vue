<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useHistoryDetailStore } from '@/stores/historyDetailStore'

// Import Sub-Komponen Modular
import DetailHeader from '@/components/history/detail/detailHeader.vue'
import ActivitySummaryCard from '@/components/history/detail/activitySummaryCard.vue'
import TravelerManifestCard from '@/components/history/detail/travelerManifestCard.vue'
import BudgetRatioCard from '@/components/history/detail/budgetRatioCard.vue'
import ApprovalWorkflowCard from '@/components/history/detail/approvalWorkflowCard.vue'
import PolicyRulesCard from '@/components/history/detail/policyRulesCard.vue'

const route = useRoute()
const store = useHistoryDetailStore()

const toCodeParam = computed(() => {
  const code = (route.params.toCode || route.params.id) as string
  return code ? code.replace(/-/g, '/') : ''
})

onMounted(() => {
  if (toCodeParam.value) {
    store.loadOrderDetail(toCodeParam.value)
  }
})
</script>

<template>
  <div class="space-y-4 font-body text-textPrimary text-xs pb-10">
    <!-- Breadcrumb Navigasi -->
    <div class="flex items-center gap-1.5 text-[11px] text-textMuted">
      <span class="material-symbols-outlined text-[14px]">home</span>
      <router-link to="/dashboard" class="hover:underline">Beranda</router-link>
      <span>›</span>
      <router-link to="/history" class="hover:underline">Riwayat Pengajuan</router-link>
      <span>›</span>
      <strong class="text-textPrimary font-semibold">Detail Travel Order</strong>
    </div>

    <!-- Loading State -->
    <div v-if="store.isLoading" class="p-12 text-center text-textMuted bg-surfaceCard rounded-2xl border border-gray-100 shadow-2xs">
      <span class="material-symbols-outlined animate-spin text-[32px] text-primary">progress_activity</span>
      <p class="mt-2 text-xs font-semibold">Memuat dokumen e-TO...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="store.errorMessage" class="p-8 text-center text-rose-600 bg-surfaceCard rounded-2xl border border-rose-100 shadow-2xs">
      <span class="material-symbols-outlined text-[36px]">error</span>
      <p class="mt-2 text-xs font-bold">{{ store.errorMessage }}</p>
      <button @click="store.loadOrderDetail(toCodeParam)" class="mt-4 px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold cursor-pointer">
        Segarkan Data
      </button>
    </div>

    <!-- Main Dynamic Content -->
    <template v-else-if="store.detail">
      <!-- 1. Header Utama Order -->
      <DetailHeader :detail="store.detail" />

      <!-- 2. Grid Layout Sesuai Desain (2/3 Kiri, 1/3 Kanan) -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
        <!-- 🟢 KOLOM KIRI (ISI DOKUMEN & MANIFEST) -->
        <div class="lg:col-span-2 space-y-4">
          <!-- Card Ringkasan Kegiatan & Pembebanan Anggaran -->
          <ActivitySummaryCard :detail="store.detail" />

          <!-- Card Manifest Penerbangan & Personel / Hotel -->
          <TravelerManifestCard :detail="store.detail" />

          <!-- Card Estimasi & Rasio Penggunaan Pagu Anggaran (Posisi Bawah Kiri) -->
          <BudgetRatioCard :detail="store.detail" />
        </div>

        <!-- 🟢 KOLOM KANAN (WORKFLOW, RULE, HELPDESK) -->
        <div class="space-y-4">
          <!-- Card Riwayat Persetujuan Workflow Stepper -->
          <ApprovalWorkflowCard :detail="store.detail" />

          <!-- Card Kebijakan & Ketentuan Tiket -->
          <PolicyRulesCard />

          <!-- Footer Bantuan Helpdesk -->
          <div class="text-center pt-2 text-[11px] text-textMuted">
            <span>Butuh bantuan mendesak? </span>
            <a href="#" class="text-primary font-bold hover:underline">Helpdesk Travel</a>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>