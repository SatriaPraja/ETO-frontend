<script setup lang="ts">
import { useDashboardStore } from '@/stores/dashboardStore'

const dashboardStore = useDashboardStore()
</script>

<template>
  <div
    class="rounded-xl bg-surfaceCard p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-full"
  >
    <div>
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-primary">
            <span class="material-symbols-outlined text-[20px]">flight_takeoff</span>
          </div>
          <div>
            <h3 class="font-bold text-textPrimary text-base font-headline">
              Sedang Berlangsung Hari Ini
            </h3>
            <p class="text-xs text-textMuted">Traveller dinas yang aktif bertugas di luar kantor</p>
          </div>
        </div>
        <span class="px-3 py-1 rounded-full bg-green-50 text-primary font-bold text-xs">
          {{ dashboardStore.ongoingTravellers.length }} Personel
        </span>
      </div>

      <!-- Single Person Layout (1 Data) -->
      <div v-if="dashboardStore.ongoingTravellers.length === 1" class="my-2">
        <div class="rounded-xl bg-surfaceCanvas p-4 flex items-center gap-4 border border-gray-50">
          <div
            class="w-12 h-12 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-sm"
          >
            {{
              dashboardStore.ongoingTravellers[0]!.avatarInitials ||
              dashboardStore.ongoingTravellers[0]!.guestName.slice(0, 2).toUpperCase()
            }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-bold text-textPrimary text-sm truncate">
              {{ dashboardStore.ongoingTravellers[0]!.guestName }}
            </p>
            <p class="text-xs text-textMuted mt-0.5">
              {{ dashboardStore.ongoingTravellers[0]!.routeInfo }} •
              {{ dashboardStore.ongoingTravellers[0]!.maskapai }}
            </p>
            <span class="text-xs font-bold text-emerald-600 block mt-1">
              {{ dashboardStore.ongoingTravellers[0]!.departureInfo }}
            </span>
          </div>
        </div>
      </div>

      <!-- Grid Layout (Multiple Data) -->
      <div
        v-else-if="dashboardStore.ongoingTravellers.length > 1"
        class="grid grid-cols-1 md:grid-cols-2 gap-3 my-2"
      >
        <div
          v-for="item in dashboardStore.ongoingTravellers.slice(0, 2)"
          :key="item.id"
          class="rounded-xl bg-surfaceCanvas p-3.5 flex items-center gap-3 border border-gray-50"
        >
          <div
            class="w-11 h-11 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center shrink-0 text-xs"
          >
            {{ item.avatarInitials || item.guestName.slice(0, 2).toUpperCase() }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-bold text-textPrimary text-xs truncate">{{ item.guestName }}</p>
            <p class="text-[11px] text-textMuted mt-0.5">
              {{ item.routeInfo }} • {{ item.maskapai }}
            </p>
            <span class="text-[10px] font-bold text-emerald-600 block mt-1">{{
              item.departureInfo
            }}</span>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="py-8 text-center text-xs text-textMuted">
        Tidak ada personel yang bertugas hari ini
      </div>
    </div>

    <div
      class="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-textMuted"
    >
      <span>
        Menampilkan {{ Math.min(dashboardStore.ongoingTravellers.length, 2) }} dari
        {{ dashboardStore.ongoingTravellers.length }} perjalanan aktif
      </span>
      <a
        href="#"
        class="text-primary font-bold hover:underline inline-flex items-center gap-1 text-xs"
      >
        <span>Lihat Pemantauan Peta</span>
        <span class="material-symbols-outlined text-[14px]">north_east</span>
      </a>
    </div>
  </div>
</template>
