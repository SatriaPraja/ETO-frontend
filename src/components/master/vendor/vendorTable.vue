<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useVendorStore } from '@/stores/vendorStore'
import type { VendorItem } from '@/models/vendor'

const router = useRouter()
const vendorStore = useVendorStore()

onMounted(() => {
  vendorStore.fetchVendors()
})

function getModaMeta(type: string) {
  switch (type) {
    case 'flight':
      return {
        label: 'Pesawat',
        icon: 'flight',
        iconBg: 'text-sky-500 bg-sky-50',
        typeBg: 'text-sky-600 bg-sky-50',
      }
    case 'train':
      return {
        label: 'Kereta Api',
        icon: 'train',
        iconBg: 'text-orange-500 bg-orange-50',
        typeBg: 'text-orange-600 bg-orange-50',
      }
    case 'sea':
      return {
        label: 'Kapal Laut',
        icon: 'directions_boat',
        iconBg: 'text-blue-500 bg-blue-50',
        typeBg: 'text-blue-600 bg-blue-50',
      }
    default:
      return {
        label: 'Transport',
        icon: 'directions_car',
        iconBg: 'text-emerald-500 bg-emerald-50',
        typeBg: 'text-emerald-600 bg-emerald-50',
      }
  }
}

function formatClasses(classes: any[]) {
  if (!classes || classes.length === 0) return 'Tidak ada kelas'
  const names = classes.map((c) => c.className).join(', ')
  return `${classes.length} Kelas ${names}`
}

function handleView(item: VendorItem) {
  router.push(`/master/vendors/${item.id}`)
}

function handleEdit(item: VendorItem) {
  router.push(`/master/vendors/${item.id}/edit`)
}

async function handleDelete(item: VendorItem) {
  if (confirm(`Apakah Anda yakin ingin menghapus vendor ${item.name}?`)) {
    await vendorStore.removeVendor(item.id)
  }
}

function changePage(newPage: number) {
  if (newPage >= 1 && newPage <= vendorStore.totalPages) {
    vendorStore.filters.page = newPage
    vendorStore.fetchVendors()
  }
}
</script>

<template>
  <div
    class="bg-surfaceCard rounded-xl border border-gray-100 shadow-2xs font-body overflow-hidden space-y-0"
  >
    <div class="overflow-x-auto relative">
      <!-- Loading Overlay -->
      <div
        v-if="vendorStore.isLoading"
        class="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-10"
      >
        <span class="text-xs font-bold text-emerald-800 flex items-center gap-2">
          <span class="material-symbols-outlined animate-spin">sync</span>
          Memuat data vendor...
        </span>
      </div>

      <table class="w-full text-left text-xs">
        <thead
          class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100"
        >
          <tr>
            <th class="p-3.5 text-center w-10">NO</th>
            <th class="p-3.5 text-center w-12">SIMBOL</th>
            <th class="p-3.5">KODE MITRA</th>
            <th class="p-3.5">NAMA MASKAPAI / VENDOR</th>
            <th class="p-3.5">JENIS MODA</th>
            <th class="p-3.5">INTEGRASI SISTEM</th>
            <th class="p-3.5">ARMADA & KELAS</th>
            <th class="p-3.5 text-center">STATUS</th>
            <th class="p-3.5 text-center">AKSI</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="vendorStore.vendors.length === 0">
            <td colspan="9" class="p-8 text-center text-textMuted">
              Tidak ada data maskapai / vendor yang ditemukan.
            </td>
          </tr>
          <tr
            v-else
            v-for="(item, index) in vendorStore.vendors"
            :key="item.id"
            class="hover:bg-surfaceCanvas/50 transition-colors"
          >
            <td class="p-3.5 text-center text-textMuted font-medium">
              {{
                ((vendorStore.filters.page || 1) - 1) * (vendorStore.filters.limit || 10) +
                index +
                1
              }}
            </td>
            <td class="p-3.5 text-center">
              <span
                :class="[
                  'w-7 h-7 rounded-lg inline-flex items-center justify-center material-symbols-outlined text-[16px]',
                  getModaMeta(item.type).iconBg,
                ]"
              >
                {{ getModaMeta(item.type).icon }}
              </span>
            </td>
            <td class="p-3.5 font-bold font-headline text-textPrimary">{{ item.code }}</td>
            <td class="p-3.5">
              <div class="flex flex-col">
                <strong class="font-bold text-textPrimary font-headline">{{ item.name }}</strong>
                <span class="text-[10px] text-textMuted">{{
                  item.vendorFullName || item.name
                }}</span>
              </div>
            </td>
            <td class="p-3.5">
              <div class="flex flex-col">
                <!-- Nama Brand / Singkat (Contoh: Garuda Indonesia / KAI) -->
                <strong class="font-bold text-textPrimary font-headline">{{ item.name }}</strong>

                <!-- Nama PT Legal (Contoh: PT Garuda Indonesia (Persero) Tbk) -->
                <span class="text-[10px] text-textMuted">
                  {{ item.vendorFullName || item.name }}
                </span>
              </div>
            </td>
            <td class="p-3.5">
              <span
                :class="[
                  'px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1',
                  getModaMeta(item.type).typeBg,
                ]"
              >
                <span class="material-symbols-outlined text-[12px]">{{
                  getModaMeta(item.type).icon
                }}</span>
                <span>{{ getModaMeta(item.type).label }}</span>
              </span>
            </td>
            <td class="p-3.5">
              <span
                :class="[
                  'px-2.5 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center gap-1',
                  item.integrationType.includes('API')
                    ? 'text-emerald-700 bg-emerald-50 border-emerald-100'
                    : 'text-gray-600 bg-gray-100 border-gray-200',
                ]"
              >
                <span
                  :class="[
                    'w-1.5 h-1.5 rounded-full',
                    item.integrationType.includes('API') ? 'bg-emerald-600' : 'bg-gray-400',
                  ]"
                ></span>
                <span>{{ item.integrationType }}</span>
              </span>
            </td>
            <td class="p-3.5 text-textMuted font-medium">{{ formatClasses(item.classes) }}</td>
            <td class="p-3.5 text-center">
              <span
                :class="[
                  'px-2.5 py-0.5 rounded-full text-[10px] font-bold',
                  item.isActive ? 'text-emerald-700 bg-emerald-50' : 'text-gray-500 bg-gray-100',
                ]"
              >
                {{ item.isActive ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td class="p-3.5 text-center">
              <div class="flex items-center justify-center gap-1 text-textMuted">
                <button
                  type="button"
                  @click="handleView(item)"
                  class="p-1 hover:text-textPrimary cursor-pointer"
                  title="Detail"
                >
                  <span class="material-symbols-outlined text-[16px]">visibility</span>
                </button>
                <button
                  type="button"
                  @click="handleEdit(item)"
                  class="p-1 hover:text-textPrimary cursor-pointer"
                  title="Edit"
                >
                  <span class="material-symbols-outlined text-[16px]">edit</span>
                </button>
                <button
                  type="button"
                  @click="handleDelete(item)"
                  class="p-1 hover:text-red-600 cursor-pointer"
                  title="Hapus"
                >
                  <span class="material-symbols-outlined text-[16px]">delete</span>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Table Pagination Footer -->
    <div
      class="p-4 bg-surfaceCanvas/40 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-textMuted"
    >
      <span>
        Menampilkan
        <strong
          >{{ vendorStore.vendors.length > 0 ? 1 : 0 }} - {{ vendorStore.vendors.length }}</strong
        >
        dari <strong>{{ vendorStore.totalData }}</strong> maskapai rekanan
      </span>

      <div class="flex items-center gap-1">
        <button
          type="button"
          @click="changePage((vendorStore.filters.page || 1) - 1)"
          :disabled="(vendorStore.filters.page || 1) <= 1"
          class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted disabled:opacity-40 cursor-pointer"
        >
          ‹
        </button>

        <button
          v-for="p in vendorStore.totalPages"
          :key="p"
          type="button"
          @click="changePage(p)"
          :class="[
            'w-7 h-7 rounded text-xs font-bold flex items-center justify-center transition-colors cursor-pointer',
            p === vendorStore.filters.page
              ? 'bg-emerald-800 text-white'
              : 'border border-gray-200 bg-surfaceCard text-textPrimary hover:bg-gray-100',
          ]"
        >
          {{ p }}
        </button>

        <button
          type="button"
          @click="changePage((vendorStore.filters.page || 1) + 1)"
          :disabled="(vendorStore.filters.page || 1) >= vendorStore.totalPages"
          class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary disabled:opacity-40 cursor-pointer"
        >
          ›
        </button>
      </div>
    </div>
  </div>
</template>
