<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title?: string
  message: string
  type?: 'error' | 'success' | 'warning' | 'info'
}>()

const emit = defineEmits(['close'])
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="fixed top-5 right-5 z-50 max-w-sm w-full p-4 rounded-2xl shadow-xl border font-body transition-all animate-bounce-in flex items-start gap-3 bg-surfaceCard"
      :class="[
        type === 'error'
          ? 'border-rose-200 bg-rose-50/90 text-rose-900'
          : type === 'warning'
          ? 'border-amber-200 bg-amber-50/90 text-amber-900'
          : type === 'success'
          ? 'border-emerald-200 bg-emerald-50/90 text-emerald-900'
          : 'border-blue-200 bg-blue-50/90 text-blue-900',
      ]"
    >
      <!-- Icon Modal -->
      <div
        class="p-2 rounded-xl shrink-0"
        :class="[
          type === 'error'
            ? 'bg-rose-100 text-rose-600'
            : type === 'warning'
            ? 'bg-amber-100 text-amber-600'
            : type === 'success'
            ? 'bg-emerald-100 text-emerald-600'
            : 'bg-blue-100 text-blue-600',
        ]"
      >
        <span class="material-symbols-outlined text-[20px]">
          {{
            type === 'error'
              ? 'error'
              : type === 'warning'
              ? 'warning'
              : type === 'success'
              ? 'check_circle'
              : 'info'
          }}
        </span>
      </div>

      <!-- Text Body -->
      <div class="flex-1 min-w-0 pr-1">
        <h4 class="text-xs font-bold leading-tight">
          {{ title || (type === 'error' ? 'Validasi Gagal' : 'Pemberitahuan') }}
        </h4>
        <p class="text-xs mt-1 leading-relaxed opacity-90">
          {{ message }}
        </p>
      </div>

      <!-- Close Button -->
      <button
        type="button"
        @click="$emit('close')"
        class="p-1 rounded-lg hover:bg-black/5 transition-colors cursor-pointer shrink-0"
      >
        <span class="material-symbols-outlined text-[16px] opacity-60">close</span>
      </button>
    </div>
  </Teleport>
</template>

<style scoped>
@keyframes bounceIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-bounce-in {
  animation: bounceIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
</style>