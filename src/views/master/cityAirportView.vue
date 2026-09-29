<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCityAirportStore } from '@/stores/cityAirportStore'
import CityAirportHeader from '@/components/master/city/cityAirportHeader.vue'
import CityAirportKpiCards from '@/components/master/city/cityAirportKpiCards.vue'
import CityAirportFilterBar from '@/components/master/city/cityAirportFilterBar.vue'
import CityAirportTable from '@/components/master/city/cityAirportTable.vue'
import CityAirportModal from '@/components/master/city/cityAirportModal.vue'
import CityAirportDeleteModal from '@/components/master/city/cityAirportDeleteModal.vue'

const store = useCityAirportStore()

const isFormModalOpen = ref(false)
const modalMode = ref<'create' | 'edit' | 'detail'>('create')
const selectedItem = ref<any>(null)

const isDeleteModalOpen = ref(false)
const itemToDelete = ref<any>(null)

onMounted(() => {
  store.fetchData()
})

function handleOpenCreate() {
  modalMode.value = 'create'
  selectedItem.value = null
  isFormModalOpen.value = true
}

function handleOpenEdit(item: any) {
  modalMode.value = 'edit'
  selectedItem.value = { ...item }
  isFormModalOpen.value = true
}

function handleOpenDetail(item: any) {
  modalMode.value = 'detail'
  selectedItem.value = { ...item }
  isFormModalOpen.value = true
}

function handleOpenDelete(item: any) {
  itemToDelete.value = item
  isDeleteModalOpen.value = true
}
</script>

<template>
  <div class="space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Header Page -->
    <CityAirportHeader @open-modal="handleOpenCreate" />

    <!-- KPI Analytics Cards -->
    <CityAirportKpiCards />

    <!-- Filter & Search Bar -->
    <CityAirportFilterBar />

    <!-- Data Table -->
    <CityAirportTable
      @open-detail="handleOpenDetail"
      @open-edit="handleOpenEdit"
      @open-delete="handleOpenDelete"
    />

    <!-- Form Modal (Add/Edit/Detail) -->
    <CityAirportModal
      v-if="isFormModalOpen"
      :is-open="isFormModalOpen"
      :mode="modalMode"
      :item="selectedItem"
      @close="isFormModalOpen = false"
    />

    <!-- Delete Confirmation Modal -->
    <CityAirportDeleteModal
      v-if="isDeleteModalOpen"
      :is-open="isDeleteModalOpen"
      :item="itemToDelete"
      @close="isDeleteModalOpen = false"
    />
  </div>
</template>