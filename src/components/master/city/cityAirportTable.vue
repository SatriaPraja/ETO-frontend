<script setup lang="ts">
import { useCityAirportStore } from '@/stores/cityAirportStore.ts'

const store = useCityAirportStore()
const emit = defineEmits(['open-detail', 'open-edit', 'open-delete'])

function changePage(newPage: number) {
  if (newPage >= 1 && newPage <= store.totalPages) {
    store.filters.page = newPage
    store.fetchData()
  }
}
</script>

<template>
  <div class="bg-surfaceCard rounded-xl border border-gray-100 shadow-2xs font-body overflow-hidden space-y-0">
    <div class="overflow-x-auto relative">
      <!-- Loading Overlay -->
      <div v-if="store.isLoading" class="absolute inset-0 bg-white/70 backdrop-blur-xs flex items-center justify-center z-10">
        <span class="text-xs font-bold text-emerald-800 flex items-center gap-2">
          <span class="material-symbols-outlined animate-spin">sync</span>
          Memuat data...
        </span>
      </div>

      <!-- TABLE BANDARA (IATA) -->
      <table v-if="store.activeTab === 'airport'" class="w-full text-left text-xs">
        <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100">
          <tr>
            <th class="p-3.5 text-center w-10">NO</th>
            <th class="p-3.5 text-center w-12">SIMBOL</th>
            <th class="p-3.5">KODE IATA</th>
            <th class="p-3.5">NAMA BANDARA</th>
            <th class="p-3.5">KOTA TERHUBUNG</th>
            <th class="p-3.5 text-center">STATUS</th>
            <th class="p-3.5 text-center">AKSI</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="store.airports.length === 0">
            <td colspan="7" class="p-8 text-center text-textMuted">Tidak ada data bandara yang ditemukan.</td>
          </tr>
          <tr v-else v-for="(item, idx) in store.airports" :key="item.id" class="hover:bg-surfaceCanvas/50 transition-colors">
            <td class="p-3.5 text-center text-textMuted font-medium">
              {{ ((store.filters.page || 1) - 1) * (store.filters.limit || 10) + idx + 1 }}
            </td>
            <td class="p-3.5 text-center">
              <span class="w-7 h-7 rounded-lg inline-flex items-center justify-center material-symbols-outlined text-[16px] text-sky-600 bg-sky-50">
                flight_takeoff
              </span>
            </td>
            <td class="p-3.5 font-bold font-headline text-textPrimary">{{ item.code }}</td>
            <td class="p-3.5 font-bold font-headline text-textPrimary">{{ item.name }}</td>
            <td class="p-3.5 text-textMuted font-medium">{{ item.cityName || '-' }}</td>
            <td class="p-3.5 text-center">
              <span :class="['px-2.5 py-0.5 rounded-full text-[10px] font-bold', item.isActive ? 'text-emerald-700 bg-emerald-50' : 'text-gray-500 bg-gray-100']">
                {{ item.isActive ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td class="p-3.5 text-center">
              <div class="flex items-center justify-center gap-1 text-textMuted">
                <button type="button" @click="emit('open-detail', item)" class="p-1 hover:text-textPrimary cursor-pointer"><span class="material-symbols-outlined text-[16px]">visibility</span></button>
                <button type="button" @click="emit('open-edit', item)" class="p-1 hover:text-textPrimary cursor-pointer"><span class="material-symbols-outlined text-[16px]">edit</span></button>
                <button type="button" @click="emit('open-delete', item)" class="p-1 hover:text-red-600 cursor-pointer"><span class="material-symbols-outlined text-[16px]">delete</span></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- TABLE KOTA & PROVINSI -->
      <table v-else class="w-full text-left text-xs">
        <thead class="bg-surfaceCanvas text-textMuted font-semibold uppercase text-[10px] tracking-wider border-b border-gray-100">
          <tr>
            <th class="p-3.5 text-center w-10">NO</th>
            <th class="p-3.5 text-center w-12">SIMBOL</th>
            <th class="p-3.5">KODE KOTA</th>
            <th class="p-3.5">NAMA KOTA / KABUPATEN</th>
            <th class="p-3.5">PROVINSI</th>
            <th class="p-3.5 text-center">STATUS</th>
            <th class="p-3.5 text-center">AKSI</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-if="store.cities.length === 0">
            <td colspan="7" class="p-8 text-center text-textMuted">Tidak ada data kota yang ditemukan.</td>
          </tr>
          <tr v-else v-for="(item, idx) in store.cities" :key="item.id" class="hover:bg-surfaceCanvas/50 transition-colors">
            <td class="p-3.5 text-center text-textMuted font-medium">
              {{ ((store.filters.page || 1) - 1) * (store.filters.limit || 10) + idx + 1 }}
            </td>
            <td class="p-3.5 text-center">
              <span class="w-7 h-7 rounded-lg inline-flex items-center justify-center material-symbols-outlined text-[16px] text-emerald-600 bg-emerald-50">
                location_city
              </span>
            </td>
            <td class="p-3.5 font-bold font-headline text-textPrimary">{{ item.code }}</td>
            <td class="p-3.5 font-bold font-headline text-textPrimary">{{ item.name }}</td>
            <td class="p-3.5 text-textMuted font-medium">{{ item.province || '-' }}</td>
            <td class="p-3.5 text-center">
              <span :class="['px-2.5 py-0.5 rounded-full text-[10px] font-bold', item.isActive ? 'text-emerald-700 bg-emerald-50' : 'text-gray-500 bg-gray-100']">
                {{ item.isActive ? 'Aktif' : 'Nonaktif' }}
              </span>
            </td>
            <td class="p-3.5 text-center">
              <div class="flex items-center justify-center gap-1 text-textMuted">
                <button type="button" @click="emit('open-detail', item)" class="p-1 hover:text-textPrimary cursor-pointer"><span class="material-symbols-outlined text-[16px]">visibility</span></button>
                <button type="button" @click="emit('open-edit', item)" class="p-1 hover:text-textPrimary cursor-pointer"><span class="material-symbols-outlined text-[16px]">edit</span></button>
                <button type="button" @click="emit('open-delete', item)" class="p-1 hover:text-red-600 cursor-pointer"><span class="material-symbols-outlined text-[16px]">delete</span></button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Footer -->
    <div class="p-4 bg-surfaceCanvas/40 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-textMuted">
      <span>
        Menampilkan <strong>{{ store.totalData > 0 ? 1 : 0 }} - {{ store.activeTab === 'airport' ? store.airports.length : store.cities.length }}</strong> dari <strong>{{ store.totalData }}</strong> data
      </span>

      <div class="flex items-center gap-1">
        <button
          type="button"
          @click="changePage((store.filters.page || 1) - 1)"
          :disabled="(store.filters.page || 1) <= 1"
          class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textMuted disabled:opacity-40 cursor-pointer"
        >‹</button>

        <button
          v-for="p in store.totalPages"
          :key="p"
          type="button"
          @click="changePage(p)"
          :class="[
            'w-7 h-7 rounded text-xs font-bold flex items-center justify-center cursor-pointer',
            p === store.filters.page ? 'bg-emerald-800 text-white' : 'border border-gray-200 bg-surfaceCard text-textPrimary'
          ]"
        >{{ p }}</button>

        <button
          type="button"
          @click="changePage((store.filters.page || 1) + 1)"
          :disabled="(store.filters.page || 1) >= store.totalPages"
          class="w-7 h-7 rounded border border-gray-200 bg-surfaceCard flex items-center justify-center text-textPrimary disabled:opacity-40 cursor-pointer"
        >›</button>
      </div>
    </div>
  </div>
</template>