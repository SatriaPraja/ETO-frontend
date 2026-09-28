<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTravelOrderEditStore } from '@/stores/travelOrderEditStore'

import EditBannerAlert from '@/components/history/edit/editBannerAlert.vue'
import EditActivityForm from '@/components/history/edit/editActivityForm.vue'
import EditTravelerTable from '@/components/history/edit/editTravelerTable.vue'
import EditHotelTable from '@/components/history/edit/editHotelTable.vue'
import EditDocumentUpload from '@/components/history/edit/editDocumentUpload.vue'
import EditFooterBar from '@/components/history/edit/editFooterBar.vue'

const route = useRoute()
const editStore = useTravelOrderEditStore()

// State untuk menyimpan hasil debug respons API
const rawApiResponse = ref<any>(null)
const fetchError = ref<string>('')

onMounted(async () => {
  try {
    const rawToCode = (route.params.toCode || route.params.id) as string

    if (rawToCode) {
      // Ubah "TO-2026-05-00215" kembali menjadi "TO/2026/05/00215"
      const cleanToCode = decodeURIComponent(rawToCode).replace(/-/g, '/')

      console.log('🔍 [DEBUG] Parameter Route:', rawToCode)
      console.log('🔍 [DEBUG] Cleaned toCode:', cleanToCode)

      // Panggil store API fetch data
      await editStore.fetchCorrectionData(cleanToCode)

      // Simpan data store ke ref lokal untuk inspeksi tampilan
      rawApiResponse.value = {
        travelOrderId: editStore.travelOrderId,
        toCode: editStore.toCode,
        orderDate: editStore.orderDate,
        activityName: editStore.activityName,
        unitKerjaNama: editStore.unitKerjaNama,
        sprinNumber: editStore.sprinNumber,
        approverNama: editStore.approverNama,
        transportsCount: editStore.transports.length,
        hotelsCount: editStore.hotels.length,
        transports: editStore.transports,
        hotels: editStore.hotels,
      }

      console.log('✅ [DEBUG] Data Store Berhasil Didaftarkan:', rawApiResponse.value)
    } else {
      fetchError.value = 'Parameter toCode / id tidak ditemukan di URL route.'
    }
  } catch (error: any) {
    fetchError.value = error.message || 'Gagal mengambil data dari API backend.'
    console.error('❌ [DEBUG] Error Fetch:', error)
  }
})
</script>

<template>
  <!-- Loading State -->
  <div v-if="editStore.isLoading" class="p-12 text-center text-textMuted font-body">
    <span class="material-symbols-outlined animate-spin text-[32px] text-primary">
      progress_activity
    </span>
    <p class="mt-2 text-xs font-medium">Memuat data draf koreksi Travel Order...</p>
  </div>

  <div v-else class="space-y-6 pb-28 font-body">
    <!-- Header Title -->
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-bold text-textPrimary font-headline">
        Koreksi Travel Order – {{ editStore.toCode || '—' }}
      </h1>
    </div>

    <!-- 1. Alert Status Dikembalikan -->
    <EditBannerAlert />

    <!-- 2. Form Kegiatan & Anggaran -->
    <EditActivityForm />

    <!-- 3. Tabel Traveller & Transportasi -->
    <EditTravelerTable />

    <!-- 4. Tabel Hotel & Kamar Akomodasi -->
    <EditHotelTable />

    <!-- 5. Upload Dokumen Lampiran -->
    <EditDocumentUpload />

    <!-- 6. Sticky Footer Action Bar -->
    <EditFooterBar />
  </div>
</template>
