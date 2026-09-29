<script setup lang="ts">
import { useCityAirportStore } from '@/stores/cityAirportStore.ts'

const store = useCityAirportStore()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-body">
    <!-- Card 1: Total Bandara -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">TOTAL BANDARA</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-extrabold text-textPrimary font-headline">{{ store.stats.totalAirports }}</span>
        </div>
        <span class="text-[10px] text-emerald-600 font-semibold block mt-1">Terdaftar IATA Resmi</span>
      </div>
      <div class="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center border border-sky-100">
        <span class="material-symbols-outlined text-[22px]">flight_takeoff</span>
      </div>
    </div>

    <!-- Card 2: Total Kota / Kab -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">TOTAL KOTA / KAB</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-extrabold text-textPrimary font-headline">{{ store.stats.totalCities }}</span>
        </div>
        <span class="text-[10px] text-textMuted block mt-1">Wilayah Operasional</span>
      </div>
      <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
        <span class="material-symbols-outlined text-[22px]">location_city</span>
      </div>
    </div>

    <!-- Card 3: Status Aktif -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">STATUS AKTIF</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-extrabold text-textPrimary font-headline">{{ store.stats.activeAirports }}</span>
        </div>
        <span class="text-[10px] text-textMuted block mt-1">Siap Rute e-TO</span>
      </div>
      <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
        <span class="material-symbols-outlined text-[22px]">check_circle</span>
      </div>
    </div>

    <!-- Card 4: Provinsi Terbanyak -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">PROVINSI TERBANYAK</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-base font-extrabold text-textPrimary font-headline truncate max-w-[130px]">
            {{ store.stats.topProvince?.name || 'DKI Jakarta' }}
          </span>
        </div>
        <span class="text-[10px] text-textMuted block mt-1">{{ store.stats.topProvince?.count || 0 }} Bandara / Kota</span>
      </div>
      <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-100">
        <span class="material-symbols-outlined text-[22px]">map</span>
      </div>
    </div>
  </div>
</template>