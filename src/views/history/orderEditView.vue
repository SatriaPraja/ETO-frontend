<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTravelOrderEditStore } from '@/stores/travelOrderEditStore'
import { useHistoryStore } from '@/stores/historyStore' // atau store yang punya API getDetailByToCode

// Import Komponen Form
import EditBannerAlert from '@/components/history/edit/editBannerAlert.vue'
import EditActivityForm from '@/components/history//edit/editActivityForm.vue'
import EditTravelerTable from '@/components/history//edit/editTravelerTable.vue'
import EditDocumentUpload from '@/components/history//edit/editDocumentUpload.vue'
import EditFooterBar from '@/components/history//edit/editFooterBar.vue'
import { useHistoryDetailStore } from '@/stores/historyDetailStore'

const route = useRoute()
const editStore = useTravelOrderEditStore()
const historyDetailStore = useHistoryDetailStore() // 🟢 Inisialisasi Detail Store

const isLoading = ref(true)

onMounted(async () => {
  try {
    const rawToCode = route.params.toCode as string
    const cleanToCode = rawToCode ? rawToCode.replace(/-/g, '/') : ''

    // 🟢 Panggil loadOrderDetail dari historyDetailStore
    const detailData = await historyDetailStore.loadOrderDetail(cleanToCode)

    if (detailData) {
      editStore.setFormData(detailData)
    }
  } catch (error) {
    console.error('Gagal memuat data draf koreksi:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
<template>
  <!-- Loading State -->
  <div v-if="isLoading" class="p-12 text-center text-textMuted">
    <span class="material-symbols-outlined animate-spin text-[32px] text-primary"
      >progress_activity</span
    >
    <p class="mt-2 text-xs">Memuat data draf koreksi Travel Order...</p>
  </div>

  <!-- Form View saat Data Selesai Dimuat -->
  <div v-else class="space-y-6 pb-24 font-body">
    <!-- Header Title View -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-textPrimary font-headline">
        Koreksi Travel Order – {{ editStore.toCode }}
      </h1>
    </div>

    <!-- 1. Banner Alert Status Dikembalikan -->
    <EditBannerAlert />

    <!-- 2. Form Kegiatan & Anggaran -->
    <EditActivityForm />

    <!-- 3. Tabel Traveller -->
    <EditTravelerTable />

    <!-- 4. Upload Lampiran -->
    <EditDocumentUpload />

    <!-- 5. Footer Action Bar (Sticky Bottom) -->
    <EditFooterBar />
  </div>
</template>
