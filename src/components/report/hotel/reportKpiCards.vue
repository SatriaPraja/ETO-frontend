<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-body">
    <!-- Card 1: Total Reservasi Hotel -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">TOTAL RESERVASI HOTEL</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-extrabold text-textPrimary font-headline">142</span>
          <span class="text-xs text-textMuted font-medium">Reservasi</span>
        </div>
        <span class="text-[10px] text-emerald-600 font-semibold block mt-1">✓ 98.6% Terlaksana Sesuai Jadwal</span>
      </div>
      <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
        <span class="material-symbols-outlined text-[22px]">calendar_month</span>
      </div>
    </div>

    <!-- Card 2: Total Kamar -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">TOTAL KAMAR</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-extrabold text-textPrimary font-headline">216</span>
          <span class="text-xs text-textMuted font-medium">Kamar</span>
        </div>
        <span class="text-[10px] text-textMuted block mt-1">Rasio 1.52 kamar / reservasi dinas</span>
      </div>
      <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100">
        <span class="material-symbols-outlined text-[22px]">meeting_room</span>
      </div>
    </div>

    <!-- Card 3: Total Room-Nights -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">TOTAL ROOM-NIGHTS</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-2xl font-extrabold text-textPrimary font-headline">584</span>
          <span class="text-xs text-textMuted font-medium">Malam</span>
        </div>
        <span class="text-[10px] text-textMuted block mt-1">Rata-rata menginap: 2.7 malam</span>
      </div>
      <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100">
        <span class="material-symbols-outlined text-[22px]">bedtime</span>
      </div>
    </div>

    <!-- Card 4: Total Beban Hotel -->
    <div class="p-4 rounded-xl bg-surfaceCard border border-gray-100 shadow-2xs flex items-center justify-between">
      <div>
        <span class="text-[10px] font-bold text-textMuted uppercase tracking-wider block">TOTAL BEBAN HOTEL</span>
        <div class="flex items-baseline gap-1 mt-1">
          <span class="text-xl font-extrabold text-emerald-800 font-headline">Rp 496.400.000</span>
        </div>
        <div class="flex items-center gap-2 text-[10px] mt-1">
          <span class="text-textMuted">Rata-rata: Rp 850.000/Malam</span>
          <span class="px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800 font-bold">Kepatuhan SBU 100%</span>
        </div>
      </div>
      <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
        <span class="material-symbols-outlined text-[22px]">payments</span>
      </div>
    </div>
  </div>
</template>