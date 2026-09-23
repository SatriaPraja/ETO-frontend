<script setup lang="ts">
import { ref, watch } from 'vue'
import type { EmployeeItem } from '@/models/employee'
import { EmployeeService } from '@/services/employeeService'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', employee: EmployeeItem): void
}>()

// Reactive State
const activeTab = ref<'my-unit' | 'national'>('my-unit')
const searchQuery = ref('')
const employees = ref<EmployeeItem[]>([])
const isLoading = ref(false)
const errorMessage = ref('')

// Pagination State
const currentPage = ref(1)
const totalPages = ref(1)
const totalItems = ref(0)
const limit = ref(10)

// Fetch Data Personel dari API
async function fetchEmployees() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const res = await EmployeeService.getEmployees({
      search: searchQuery.value,
      scope: activeTab.value,
      page: currentPage.value,
      limit: limit.value,
    })

    employees.value = res.employees
    totalItems.value = res.pagination.totalItems
    totalPages.value = res.pagination.totalPages
  } catch (err: any) {
    errorMessage.value = err.message || 'Terjadi kesalahan jaringan.'
  } finally {
    isLoading.value = false
  }
}

// Watcher untuk Refetch saat Modal Dibuka, Tab Diganti, atau Halaman Berubah
watch(
  () => [props.isOpen, activeTab.value, currentPage.value],
  ([newIsOpen]) => {
    if (newIsOpen) {
      fetchEmployees()
    }
  },
  { immediate: true }
)

// Debounced Search untuk Efisiensi Query
let searchTimeout: ReturnType<typeof setTimeout>
watch(searchQuery, () => {
  clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    if (props.isOpen) {
      currentPage.value = 1 // Reset ke halaman 1 saat mencari
      fetchEmployees()
    }
  }, 400)
})

function changeTab(tab: 'my-unit' | 'national') {
  activeTab.value = tab
  currentPage.value = 1
}

function selectEmployee(emp: EmployeeItem) {
  emit('select', emp)
  emit('close')
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-neutralText/50 backdrop-blur-[4px] z-50 flex items-center justify-center p-4 overflow-y-auto"
  >
    <div
      class="bg-surfaceCard rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] my-auto border border-gray-100 font-body"
    >
      <!-- Modal Header -->
      <div class="p-5 px-6 border-b border-gray-100 flex items-start justify-between bg-surfaceCard shrink-0">
        <div class="flex items-start gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-primary flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[22px]">person_search</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-bold text-textPrimary font-headline">
                Cari Personel / Karyawan (LOV)
              </h3>
              <span class="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                HCIS Sinkron
              </span>
            </div>
            <p class="text-xs text-textMuted mt-0.5">
              Pilih nama karyawan internal BPJS Ketenagakerjaan sebagai traveller perjalanan dinas.
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="emit('close')"
          class="text-textMuted hover:text-textPrimary p-1.5 rounded-xl hover:bg-surfaceCanvas shrink-0"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 overflow-y-auto space-y-4 flex-1">
        <!-- Tabs & Scope Filter -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2 bg-surfaceCanvas p-1 rounded-xl w-fit">
            <button
              type="button"
              @click="changeTab('my-unit')"
              :class="[
                'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2',
                activeTab === 'my-unit'
                  ? 'bg-surfaceCard text-primary shadow-2xs border border-gray-200/60'
                  : 'text-textMuted hover:text-textPrimary'
              ]"
            >
              <span class="material-symbols-outlined text-[16px]">domain</span>
              <span>Unit Kerja Saya</span>
            </button>

            <button
              type="button"
              @click="changeTab('national')"
              :class="[
                'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2',
                activeTab === 'national'
                  ? 'bg-surfaceCard text-primary shadow-2xs border border-gray-200/60'
                  : 'text-textMuted hover:text-textPrimary'
              ]"
            >
              <span class="material-symbols-outlined text-[16px]">groups</span>
              <span>Semua Unit Kerja Nasional</span>
            </button>
          </div>

          <span class="text-[11px] text-textMuted font-semibold flex items-center gap-1">
            <span class="material-symbols-outlined text-[14px] text-emerald-700">verified</span>
            Direktori Resmi HCIS BPJSTK
          </span>
        </div>

        <!-- Search Input Bar -->
        <div class="flex items-center gap-2">
          <div class="relative flex-1">
            <span class="material-symbols-outlined absolute left-3.5 top-2.5 text-textMuted text-[18px]">search</span>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari NPK, nama karyawan, jabatan, atau email..."
              class="w-full h-10 pl-10 pr-8 bg-surfaceCard border border-gray-200 rounded-xl text-xs text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary"
            />
            <button
              v-if="searchQuery"
              type="button"
              @click="searchQuery = ''"
              class="absolute right-2.5 top-2.5 text-textMuted hover:text-textPrimary"
            >
              <span class="material-symbols-outlined text-[18px]">cancel</span>
            </button>
          </div>
        </div>

        <!-- States: Loading / Error / Data Table -->
        <div v-if="isLoading" class="py-12 text-center text-textMuted space-y-2">
          <span class="material-symbols-outlined text-[36px] animate-spin">progress_activity</span>
          <p class="text-xs font-bold text-textPrimary">Memuat data personel HCIS...</p>
        </div>

        <div v-else-if="errorMessage" class="py-12 text-center text-rose-600 space-y-2">
          <span class="material-symbols-outlined text-[36px]">error</span>
          <p class="text-xs font-bold">{{ errorMessage }}</p>
          <button type="button" @click="fetchEmployees" class="text-xs underline text-primary font-bold">Coba lagi</button>
        </div>

        <div v-else class="border border-gray-200/80 rounded-xl overflow-hidden bg-surfaceCard">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surfaceCanvas border-b border-gray-200/80 text-[11px] font-bold text-textMuted uppercase tracking-wider">
                  <th class="py-3 px-3 w-10 text-center">#</th>
                  <th class="py-3 px-4">Data Karyawan</th>
                  <th class="py-3 px-4">NPK Resmi</th>
                  <th class="py-3 px-4">Jabatan & Golongan</th>
                  <th class="py-3 px-4">Status</th>
                  <th class="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-xs">
                <tr
                  v-for="(emp, index) in employees"
                  :key="emp.id"
                  class="hover:bg-surfaceCanvas/60 transition-colors group"
                >
                  <td class="py-3.5 px-3 text-center font-bold text-textMuted">
                    {{ (currentPage - 1) * limit + index + 1 }}
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 uppercase border border-emerald-200">
                        {{ emp.avatarInitials }}
                      </div>
                      <div class="flex flex-col min-w-0">
                        <span class="font-bold text-textPrimary leading-tight font-headline group-hover:text-primary">
                          {{ emp.name }}
                        </span>
                        <span class="text-[11px] text-textMuted mt-0.5 truncate">
                          {{ emp.email }}
                        </span>
                      </div>
                    </div>
                  </td>

                  <td class="py-3.5 px-4 font-mono font-bold text-textPrimary">
                    <span class="bg-surfaceCanvas px-2 py-1 rounded border border-gray-200/60">
                      {{ emp.npk }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4">
                    <div class="flex flex-col">
                      <span class="font-bold text-textPrimary leading-tight">{{ emp.jabatan }}</span>
                      <span class="text-[11px] text-textMuted mt-0.5">
                        <strong class="text-textPrimary font-semibold">{{ emp.golongan }}</strong> — {{ emp.unitKerja }}
                      </span>
                    </div>
                  </td>

                  <td class="py-3.5 px-4">
                    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {{ emp.status }}
                    </span>
                  </td>

                  <td class="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      @click="selectEmployee(emp)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-2xs"
                    >
                      <span class="material-symbols-outlined text-[16px]">check</span>
                      <span>Pilih</span>
                    </button>
                  </td>
                </tr>

                <tr v-if="employees.length === 0">
                  <td colspan="6" class="py-10 text-center text-textMuted">
                    <div class="flex flex-col items-center justify-center gap-1">
                      <span class="material-symbols-outlined text-[32px]">person_off</span>
                      <span class="font-bold text-textPrimary">Karyawan tidak ditemukan</span>
                      <span class="text-[11px]">Coba ubah kata kunci pencarian NPK atau Nama.</span>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Modal Footer Pagination -->
      <div class="p-4 px-6 border-t border-gray-100 bg-surfaceCanvas flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs">
        <span class="text-[11px] text-textMuted font-medium">
          • Menampilkan {{ employees.length }} dari {{ totalItems }} karyawan aktif
        </span>

        <div class="flex items-center gap-4">
          <!-- Dynamic Pagination Buttons -->
          <div v-if="totalPages > 1" class="flex items-center gap-1">
            <button
              type="button"
              :disabled="currentPage === 1"
              @click="currentPage--"
              class="w-7 h-7 rounded-lg border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted hover:bg-gray-100 disabled:opacity-50"
            >
              <span class="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>

            <span class="px-2 font-bold text-textPrimary">Halaman {{ currentPage }} dari {{ totalPages }}</span>

            <button
              type="button"
              :disabled="currentPage === totalPages"
              @click="currentPage++"
              class="w-7 h-7 rounded-lg border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary hover:bg-gray-100 disabled:opacity-50"
            >
              <span class="material-symbols-outlined text-[16px]">chevron_right</span>
            </button>
          </div>

          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-1.5 rounded-xl bg-surfaceCard border border-gray-200 text-textPrimary font-bold hover:bg-gray-100 transition-colors"
          >
            Batal / Tutup
          </button>
        </div>
      </div>
    </div>
  </div>
</template>