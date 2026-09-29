<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useBudgetStore } from '@/stores/budgetStore'
import BudgetHeader from '@/components/master/budget/budgetHeader.vue'
import BudgetKpiCards from '@/components/master/budget/budgetKpiCards.vue'
import BudgetFilterBar from '@/components/master/budget/budgetFilterBar.vue'
import BudgetCoaTable from '@/components/master/budget/budgetCoaTable.vue'
import BudgetAnalyticsBottom from '@/components/master/budget/budgetAnalyticsBottom.vue'
import BudgetModal from '@/components/master/budget/budgetModal.vue'
import BudgetDeleteModal from '@/components/master/budget/budgetDeleteModal.vue'
import type { BudgetItem } from '@/models/budget'

const store = useBudgetStore()

const isFormModalOpen = ref(false)
const modalMode = ref<'create' | 'edit' | 'detail'>('create')
const selectedItem = ref<BudgetItem | null>(null)

const isDeleteModalOpen = ref(false)
const itemToDelete = ref<BudgetItem | null>(null)

onMounted(() => {
  store.fetchBudgets()
})

function handleOpenCreate() {
  modalMode.value = 'create'
  selectedItem.value = null
  isFormModalOpen.value = true
}

function handleOpenEdit(item: BudgetItem) {
  modalMode.value = 'edit'
  selectedItem.value = { ...item }
  isFormModalOpen.value = true
}

function handleOpenDetail(item: BudgetItem) {
  modalMode.value = 'detail'
  selectedItem.value = { ...item }
  isFormModalOpen.value = true
}

function handleOpenDelete(item: BudgetItem) {
  itemToDelete.value = item
  isDeleteModalOpen.value = true
}
</script>

<template>
  <div class="space-y-6 pb-12 font-body w-full max-w-full overflow-x-hidden">
    <!-- Header Page -->
    <BudgetHeader @open-modal="handleOpenCreate" />

    <!-- KPI Cards Analytics -->
    <BudgetKpiCards />

    <!-- Filter & Search Bar -->
    <BudgetFilterBar />

    <!-- COA Data Table -->
    <BudgetCoaTable
      @open-detail="handleOpenDetail"
      @open-edit="handleOpenEdit"
      @open-delete="handleOpenDelete"
    />

    <!-- Analytics Bottom Information Cards -->
    <BudgetAnalyticsBottom />

    <!-- Modal Form (Create / Edit / Detail) -->
    <BudgetModal
      v-if="isFormModalOpen"
      :is-open="isFormModalOpen"
      :mode="modalMode"
      :item="selectedItem"
      @close="isFormModalOpen = false"
    />

    <!-- Modal Delete Confirmation -->
    <BudgetDeleteModal
      v-if="isDeleteModalOpen"
      :is-open="isDeleteModalOpen"
      :item="itemToDelete"
      @close="isDeleteModalOpen = false"
    />
  </div>
</template>