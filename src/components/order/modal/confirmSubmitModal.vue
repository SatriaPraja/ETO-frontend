<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title?: string
  description?: string
  isSubmitting?: boolean
}>()

const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-body animate-fade-in"
    >
      <div
        class="bg-surfaceCard rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 space-y-5 transform transition-all scale-100"
      >
        <!-- Icon & Header -->
        <div class="flex items-start gap-4">
          <div
            class="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200/60"
          >
            <span class="material-symbols-outlined text-[28px]">mark_email_read</span>
          </div>
          <div class="space-y-1">
            <h3 class="text-base font-bold text-textPrimary font-headline">
              {{ title || 'Konfirmasi Pengajuan Travel Order' }}
            </h3>
            <p class="text-xs text-textMuted leading-relaxed">
              {{
                description ||
                'Apakah Anda yakin data pengajuan sudah benar? Setelah diterbitkan, dokumen akan dikirimkan ke Penyetuju.'
              }}
            </p>
          </div>
        </div>

        <!-- Warning / Highlight Info -->
        <div
          class="p-3.5 bg-surfaceCanvas rounded-xl border border-gray-200/80 text-xs text-textPrimary space-y-1"
        >
          <div class="flex items-center gap-1.5 font-bold text-emerald-800">
            <span class="material-symbols-outlined text-[18px]">verified</span>
            <span>Pemeriksaan Otomatis</span>
          </div>
          <p class="text-[11px] text-textMuted leading-normal">
            Pastikan nama personel, jadwal, dan alokasi mata anggaran (MAK) telah diperiksa dengan saksama.
          </p>
        </div>

        <!-- Tombol Aksi (Batal & Ya, Kirim) -->
        <div class="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            @click="$emit('close')"
            :disabled="isSubmitting"
            class="px-4 py-2.5 rounded-xl bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 active:scale-[0.98]"
          >
            Batal
          </button>

          <button
            type="button"
            @click="$emit('confirm')"
            :disabled="isSubmitting"
            class="px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-2 shadow-2xs transition-all cursor-pointer disabled:opacity-50 active:scale-[0.98]"
          >
            <span
              v-if="isSubmitting"
              class="material-symbols-outlined text-[18px] animate-spin"
            >
              progress_activity
            </span>
            <span v-else class="material-symbols-outlined text-[18px]">send</span>
            <span>{{ isSubmitting ? 'Memproses...' : 'Ya, Terbitkan' }}</span>
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>