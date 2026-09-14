<template>
  <div class="rounded-xl bg-surfaceCard p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-3">
        <div class="w-9 h-9 rounded-xl bg-green-50 flex items-center justify-center text-primary">
          <span class="material-symbols-outlined text-[20px]">flight_takeoff</span>
        </div>
        <div>
          <h3 class="font-bold text-textPrimary text-base font-headline">Sedang Berlangsung Hari Ini</h3>
          <p class="text-xs text-textMuted">Traveller dinas yang aktif bertugas di luar kantor</p>
        </div>
      </div>
      <span class="px-3 py-1 rounded-full bg-green-50 text-primary font-bold text-xs">
        4 Personel
      </span>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-3 my-2">
      <!-- Personel 1 -->
      <div class="rounded-xl bg-surfaceCanvas p-3.5 flex items-center gap-3 border border-gray-50">
        <img
          class="w-11 h-11 rounded-full object-cover shrink-0"
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
          alt="Bambang Wicaksono"
        />
        <div class="min-w-0 flex-1">
          <p class="font-bold text-textPrimary text-xs truncate">Bambang Wicaksono</p>
          <p class="text-[11px] text-textMuted mt-0.5">JKT ➔ SUB • Pesawat</p>
          <span class="text-[10px] font-bold text-emerald-600 block mt-1">Tiba di Surabaya (11:20 WIB)</span>
        </div>
      </div>

      <!-- Personel 2 -->
      <div class="rounded-xl bg-surfaceCanvas p-3.5 flex items-center gap-3 border border-gray-50">
        <img
          class="w-11 h-11 rounded-full object-cover shrink-0"
          src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
          alt="Dewi Anggraeni"
        />
        <div class="min-w-0 flex-1">
          <p class="font-bold text-textPrimary text-xs truncate">Dewi Anggraeni</p>
          <p class="text-[11px] text-textMuted mt-0.5">GMR ➔ BDG • Kereta Argo</p>
          <span class="text-[10px] font-bold text-blue-600 block mt-1">Dalam Perjalanan (ETA 14:05 WIB)</span>
        </div>
      </div>
    </div>

    <div class="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-textMuted">
      <span>Menampilkan 2 dari 4 perjalanan aktif</span>
      <a href="#" class="text-primary font-bold hover:underline inline-flex items-center gap-1 text-xs">
        <span>Lihat Pemantauan Peta</span>
        <span class="material-symbols-outlined text-[14px]">north_east</span>
      </a>
    </div>
  </div>
</template>