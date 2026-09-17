<script setup lang="ts">
import { ref, computed } from 'vue'

export interface EmployeeItem {
  id: string
  name: string
  email: string
  npk: string
  jabatan: string
  golongan: string
  unitKerja: string
  phone: string
  status: 'Tersedia' | 'Sedang Cuti Dinas' | 'Dalam Perjalanan Dinas'
  avatarUrl?: string
  avatarInitials?: string
}

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'select', employee: EmployeeItem): void
}>()

// Tabs State
const activeTab = ref<'my-unit' | 'national'>('my-unit')
const searchQuery = ref('Kanwil Jatim')

// Dummy Data Karyawan HCIS
const employees = ref<EmployeeItem[]>([
  {
    id: '1',
    name: 'Bambang Sugianto, S.E.',
    email: 'bambang.sugianto@bpjsketenagakerjaan.go.id',
    npk: '19840215',
    jabatan: 'Penata Madya Pengendalian Mutu',
    golongan: 'Gol. III/C',
    unitKerja: 'Bidang Kepesertaan Kanwil Jatim',
    phone: '081234567890',
    status: 'Tersedia',
    avatarInitials: 'BS',
  },
  {
    id: '2',
    name: 'Dian Lestari, S.Psi.',
    email: 'dian.lestari@bpjsketenagakerjaan.go.id',
    npk: '19910811',
    jabatan: 'Asisten Ahli Komunikasi & Edukasi',
    golongan: 'Gol. III/A',
    unitKerja: 'Bidang Umum & SDM',
    phone: '081398765432',
    status: 'Tersedia',
    avatarInitials: 'DL',
  },
  {
    id: '3',
    name: 'Rendra Wijaya, S.Kom.',
    email: 'rendra.wijaya@bpjsketenagakerjaan.go.id',
    npk: '19941120',
    jabatan: 'Analis Sistem Informasi & TI',
    golongan: 'Gol. III/A',
    unitKerja: 'Bidang TI Kanwil Jatim',
    phone: '081122334455',
    status: 'Tersedia',
    avatarInitials: 'RW',
  },
  {
    id: '4',
    name: 'Siti Nurhaliza, M.M.',
    email: 'siti.nurhaliza@bpjsketenagakerjaan.go.id',
    npk: '19870605',
    jabatan: 'Kepala Bidang Pelayanan',
    golongan: 'Gol. IV/A',
    unitKerja: 'Cabang',
    phone: '085678901234',
    status: 'Sedang Cuti Dinas',
    avatarInitials: 'SN',
  },
])

// Filtering Karyawan
const filteredEmployees = computed(() => {
  return employees.value.filter((emp) => {
    const q = searchQuery.value.toLowerCase()
    return (
      !q ||
      emp.name.toLowerCase().includes(q) ||
      emp.npk.includes(q) ||
      emp.email.toLowerCase().includes(q) ||
      emp.unitKerja.toLowerCase().includes(q)
    )
  })
})

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
      class="bg-surfaceCard rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[90vh] my-auto border border-gray-100 animate-in fade-in zoom-in-95 duration-200 font-body"
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
          class="text-textMuted hover:text-textPrimary p-1.5 rounded-xl hover:bg-surfaceCanvas transition-colors shrink-0"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Modal Body -->
      <div class="p-6 overflow-y-auto space-y-4 flex-1">
        <!-- Tabs & Metadata Info -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-2 bg-surfaceCanvas p-1 rounded-xl w-fit">
            <button
              type="button"
              @click="activeTab = 'my-unit'"
              :class="[
                'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2',
                activeTab === 'my-unit'
                  ? 'bg-surfaceCard text-primary shadow-2xs border border-gray-200/60'
                  : 'text-textMuted hover:text-textPrimary'
              ]"
            >
              <span class="material-symbols-outlined text-[16px]">domain</span>
              <span>Unit Kerja Saya (Kanwil Jatim)</span>
              <span class="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">42</span>
            </button>

            <button
              type="button"
              @click="activeTab = 'national'"
              :class="[
                'px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2',
                activeTab === 'national'
                  ? 'bg-surfaceCard text-primary shadow-2xs border border-gray-200/60'
                  : 'text-textMuted hover:text-textPrimary'
              ]"
            >
              <span class="material-symbols-outlined text-[16px]">groups</span>
              <span>Semua Unit Kerja Nasional</span>
              <span class="px-1.5 py-0.2 rounded-full bg-gray-200 text-textMuted text-[10px] font-extrabold">128</span>
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
              class="w-full h-10 pl-10 pr-8 bg-surfaceCard border border-gray-200 rounded-xl text-xs text-textPrimary placeholder:text-textMuted focus:outline-none focus:border-primary transition-all"
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

          <button
            type="button"
            class="h-10 px-5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs transition-all shrink-0"
          >
            <span class="material-symbols-outlined text-[18px]">search</span>
            <span>Cari</span>
          </button>
        </div>

        <!-- Table Karyawan -->
        <div class="border border-gray-200/80 rounded-xl overflow-hidden bg-surfaceCard">
          <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-surfaceCanvas border-b border-gray-200/80 text-[11px] font-bold text-textMuted uppercase tracking-wider">
                  <th class="py-3 px-3 w-10 text-center">#</th>
                  <th class="py-3 px-4">Data Karyawan</th>
                  <th class="py-3 px-4">NPK Resmi</th>
                  <th class="py-3 px-4">Jabatan & Golongan</th>
                  <th class="py-3 px-4">Status Ketersediaan</th>
                  <th class="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100 text-xs">
                <tr
                  v-for="(emp, index) in filteredEmployees"
                  :key="emp.id"
                  class="hover:bg-surfaceCanvas/60 transition-colors group"
                >
                  <td class="py-3.5 px-3 text-center font-bold text-textMuted">
                    {{ index + 1 }}
                  </td>

                  <!-- Data Karyawan -->
                  <td class="py-3.5 px-4">
                    <div class="flex items-center gap-3">
                      <div class="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 uppercase shadow-2xs border border-emerald-200">
                        {{ emp.avatarInitials }}
                      </div>
                      <div class="flex flex-col min-w-0">
                        <span class="font-bold text-textPrimary leading-tight font-headline group-hover:text-primary transition-colors">
                          {{ emp.name }}
                        </span>
                        <span class="text-[11px] text-textMuted mt-0.5 truncate">
                          {{ emp.email }}
                        </span>
                      </div>
                    </div>
                  </td>

                  <!-- NPK -->
                  <td class="py-3.5 px-4 font-mono font-bold text-textPrimary">
                    <span class="bg-surfaceCanvas px-2 py-1 rounded border border-gray-200/60">
                      {{ emp.npk }}
                    </span>
                  </td>

                  <!-- Jabatan & Golongan -->
                  <td class="py-3.5 px-4">
                    <div class="flex flex-col">
                      <span class="font-bold text-textPrimary leading-tight">{{ emp.jabatan }}</span>
                      <span class="text-[11px] text-textMuted mt-0.5">
                        <strong class="text-textPrimary font-semibold">{{ emp.golongan }}</strong> — {{ emp.unitKerja }}
                      </span>
                    </div>
                  </td>

                  <!-- Status -->
                  <td class="py-3.5 px-4">
                    <span
                      :class="[
                        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border',
                        emp.status === 'Tersedia'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border-amber-200'
                      ]"
                    >
                      <span class="w-1.5 h-1.5 rounded-full bg-current"></span>
                      {{ emp.status }}
                    </span>
                  </td>

                  <!-- Aksi -->
                  <td class="py-3.5 px-4 text-center">
                    <button
                      type="button"
                      @click="selectEmployee(emp)"
                      class="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold transition-all shadow-2xs active:scale-[0.98]"
                    >
                      <span class="material-symbols-outlined text-[16px]">check</span>
                      <span>Pilih</span>
                    </button>
                  </td>
                </tr>

                <tr v-if="filteredEmployees.length === 0">
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
          • Menampilkan 1-{{ filteredEmployees.length }} dari 128 karyawan aktif
        </span>

        <div class="flex items-center gap-4">
          <!-- Pagination Buttons -->
          <div class="flex items-center gap-1">
            <button type="button" class="w-7 h-7 rounded-lg border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted hover:bg-gray-100">
              <span class="material-symbols-outlined text-[16px]">chevron_left</span>
            </button>
            <button type="button" class="w-7 h-7 rounded-lg bg-emerald-800 text-white font-bold flex items-center justify-center">1</button>
            <button type="button" class="w-7 h-7 rounded-lg border border-gray-200 bg-surfaceCard font-semibold flex items-center justify-center text-textPrimary hover:bg-gray-100">2</button>
            <button type="button" class="w-7 h-7 rounded-lg border border-gray-200 bg-surfaceCard font-semibold flex items-center justify-center text-textPrimary hover:bg-gray-100">3</button>
            <span class="text-textMuted px-1">...</span>
            <button type="button" class="w-7 h-7 rounded-lg border border-gray-200 bg-surfaceCard font-semibold flex items-center justify-center text-textPrimary hover:bg-gray-100">26</button>
            <button type="button" class="w-7 h-7 rounded-lg border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary hover:bg-gray-100">
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