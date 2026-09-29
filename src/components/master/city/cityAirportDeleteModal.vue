<script setup lang="ts">
import { ref } from 'vue'
import { useCityAirportStore } from '@/stores/cityAirportStore'
import { cityAirportService } from '@/services/cityAirportService'

const props = defineProps<{
  isOpen: boolean
  item: any
}>()

const emit = defineEmits(['close'])
const store = useCityAirportStore()
const isDeleting = ref(false)

async function handleDeleteConfirm() {
  if (!props.item) return
  isDeleting.value = true
  try {
    if (store.activeTab === 'city') {
      await cityAirportService.deleteCity(props.item.id)
    } else {
      await cityAirportService.deleteAirport(props.item.id)
    }
    await store.fetchData()
    emit('close')
  } catch (err: any) {
    alert(err.message || 'Gagal menghapus data.')
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-body">
    <div class="bg-surfaceCard w-full max-w-sm rounded-2xl border border-gray-100 shadow-xl p-6 text-center space-y-4">
      <div class="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mx-auto">
        <span class="material-symbols-outlined text-[26px]">warning</span>
      </div>

      <div class="space-y-1">
        <h3 class="text-base font-bold text-textPrimary font-headline">Hapus Data {{ store.activeTab === 'airport' ? 'Bandara' : 'Kota' }}?</h3>
        <p class="text-xs text-textMuted">
          Apakah Anda yakin ingin menghapus <strong>{{ item?.name }}</strong>? Tindakan ini tidak dapat dibatalkan.
        </p>
      </div>

      <div class="flex items-center justify-center gap-2 pt-2">
        <button type="button" @click="emit('close')" class="w-full py-2 rounded-lg border border-gray-200 text-xs font-bold text-textPrimary hover:bg-surfaceCanvas cursor-pointer">
          Batal
        </button>
        <button
          type="button"
          @click="handleDeleteConfirm"
          :disabled="isDeleting"
          class="w-full py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold inline-flex items-center justify-center gap-1 cursor-pointer"
        >
          <span v-if="isDeleting" class="material-symbols-outlined animate-spin text-[16px]">sync</span>
          <span>Ya, Hapus</span>
        </button>
      </div>
    </div>
  </div>
</template>