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
    class="bg-surfaceCard rounded-xl border border-gray-100 shadow-2xs font-body overflow-hidden relative"
  >
    <!-- Loading Overlay -->
    <div
      v-if="vendorStore.isLoading"
      class="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-20"
    >
      <span class="text-xs font-bold text-emerald-800 flex items-center gap-2">
        <span class="material-symbols-outlined animate-spin">sync</span>
        Memuat data vendor...
      </span>
    </div>

    <!-- 🟢 1. MOBILE VIEW: Kartu Item Vendor (Tampil di Layar HP) -->
    <div class="block md:hidden p-3.5 space-y-3">
      <div
        v-if="vendorStore.vendors.length === 0"
        class="p-8 text-center text-textMuted text-xs border border-dashed border-gray-200 rounded-xl"
      >
        Tidak ada data maskapai / vendor yang ditemukan.
      </div>

      <div
        v-else
        v-for="(item, index) in vendorStore.vendors"
        :key="item.id"
        class="bg-surfaceCanvas/50 border border-gray-200/80 rounded-xl p-3.5 space-y-3 relative"
      >
        <!-- Top Row: Simbol, Nama, & Status -->
        <div class="flex items-start justify-between gap-2 pb-2.5 border-b border-gray-200/60">
          <div class="flex items-center gap-2.5">
            <span
              :class="[
                'w-9 h-9 rounded-xl inline-flex items-center justify-center material-symbols-outlined text-[18px] shrink-0',
                getModaMeta(item.type).iconBg,
              ]"
            >
              {{ getModaMeta(item.type).icon }}
            </span>
            <div class="flex flex-col min-w-0">
              <div class="flex items-center gap-1.5">
                <span class="font-bold text-textPrimary text-xs truncate font-headline">
                  {{ item.name }}
                </span>
                <span
                  class="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-surfaceCard border border-gray-200 text-textMuted"
                >
                  {{ item.code }}
                </span>
              </div>
              <span class="text-[11px] text-textMuted truncate">
                {{ item.vendorFullName || item.name }}
              </span>
            </div>
          </div>

          <span
            :class="[
              'px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0',
              item.isActive ? 'text-emerald-700 bg-emerald-50' : 'text-gray-500 bg-gray-100',
            ]"
          >
            {{ item.isActive ? 'Aktif' : 'Nonaktif' }}
          </span>
        </div>

        <!-- Middle Row: Moda, Integrasi, & Armada -->
        <div class="grid grid-cols-2 gap-2 text-xs">
          <div class="space-y-1">
            <span class="text-[10px] text-textMuted uppercase font-bold block">Jenis Moda</span>
            <span
              :class="[
                'px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1 border',
                getModaMeta(item.type).typeBg,
              ]"
            >
              <span class="material-symbols-outlined text-[12px]">{{
                getModaMeta(item.type).icon
              }}</span>
              <span>{{ getModaMeta(item.type).label }}</span>
            </span>
          </div>

          <div class="space-y-1">
            <span class="text-[10px] text-textMuted uppercase font-bold block"
              >Integrasi Sistem</span
            >
            <span
              :class="[
                'px-2 py-0.5 rounded-full text-[10px] font-bold border inline-flex items-center gap-1',
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
          </div>

          <div class="col-span-2 pt-1 border-t border-gray-200/40">
            <span class="text-[10px] text-textMuted uppercase font-bold block">Kelas Armada</span>
            <span class="text-xs text-textPrimary font-medium">
              {{ formatClasses(item.classes) }}
            </span>
          </div>
        </div>

        <!-- Action Row -->
        <div class="flex items-center justify-end gap-2 pt-2 border-t border-gray-200/60">
          <button
            type="button"
            @click="handleEdit(item)"
            class="flex-1 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold flex items-center justify-center gap-1 border border-blue-100 cursor-pointer active:scale-95"
          >
            <span class="material-symbols-outlined text-[16px]">edit</span>
            <span>Edit</span>
          </button>
          <button
            type="button"
            @click="handleDelete(item)"
            class="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 text-xs font-bold flex items-center justify-center gap-1 border border-red-100 cursor-pointer active:scale-95"
          >
            <span class="material-symbols-outlined text-[16px]">delete</span>
            <span>Hapus</span>
          </button>
        </div>
      </div>
    </div>

    <!-- 💻 2. DESKTOP VIEW: Tabel Tradisional (Tampil di Desktop/Laptop) -->
    <div class="hidden md:block overflow-x-auto relative">
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
              <span
                :class="[
                  'px-2 py-0.5 rounded text-[10px] font-bold inline-flex items-center gap-1 border',
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

    <!-- Table Pagination Footer (Diperbaiki Responsifnya) -->
    <div
      class="p-3.5 sm:p-4 bg-surfaceCanvas/40 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-textMuted"
    >
      <span class="text-center sm:text-left">
        Menampilkan
        <strong
          >{{ vendorStore.vendors.length > 0 ? 1 : 0 }} - {{ vendorStore.vendors.length }}</strong
        >
        dari <strong>{{ vendorStore.totalData }}</strong> vendor
      </span>

      <div class="flex items-center justify-center gap-1">
        <button
          type="button"
          @click="changePage((vendorStore.filters.page || 1) - 1)"
          :disabled="(vendorStore.filters.page || 1) <= 1"
          class="h-9 min-w-[36px] px-2 rounded-lg border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted disabled:opacity-40 cursor-pointer active:scale-95 shadow-2xs font-bold"
        >
          ‹
        </button>

        <button
          v-for="p in vendorStore.totalPages"
          :key="p"
          type="button"
          @click="changePage(p)"
          :class="[
            'h-9 min-w-[36px] px-2 rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer active:scale-95 shadow-2xs',
            p === vendorStore.filters.page
              ? 'bg-emerald-800 text-white border border-emerald-800'
              : 'border border-gray-200 bg-surfaceCard text-textPrimary hover:bg-gray-100',
          ]"
        >
          {{ p }}
        </button>

        <button
          type="button"
          @click="changePage((vendorStore.filters.page || 1) + 1)"
          :disabled="(vendorStore.filters.page || 1) >= vendorStore.totalPages"
          class="h-9 min-w-[36px] px-2 rounded-lg border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary disabled:opacity-40 cursor-pointer active:scale-95 shadow-2xs font-bold"
        >
          ›
        </button>
      </div>
    </div>
  </div>
</template>
