<script setup lang="ts">
defineProps<{
  isOpen: boolean
  title?: string
  message: string
  type?: 'error' | 'success' | 'warning' | 'info'
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4 scale-95"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-4 scale-95"
    >
      <div
        v-if="isOpen"
        class="fixed top-5 left-1/2 -translate-x-1/2 sm:left-auto sm:right-6 sm:translate-x-0 z-[9999] max-w-md w-[calc(100%-2rem)] sm:w-auto p-4 rounded-2xl shadow-xl border flex items-start gap-3 font-body bg-surfaceCard backdrop-blur-md"
        :class="[
          type === 'error'
            ? 'border-rose-200 bg-rose-50/95 text-rose-900 shadow-rose-100/50'
            : type === 'warning'
              ? 'border-amber-200 bg-amber-50/95 text-amber-900 shadow-amber-100/50'
              : type === 'success'
                ? 'border-emerald-200 bg-emerald-50/95 text-emerald-900 shadow-emerald-100/50'
                : 'border-blue-200 bg-blue-50/95 text-blue-900 shadow-blue-100/50',
        ]"
      >
        <!-- Icon Modal -->
        <div
          class="p-2 rounded-xl shrink-0 mt-0.5"
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
          <h4 class="text-xs font-bold leading-snug font-headline">
            {{ title || (type === 'error' ? 'Validasi Gagal' : 'Pemberitahuan') }}
          </h4>
          <p class="text-xs mt-1 leading-relaxed opacity-90 break-words">
            {{ message }}
          </p>
        </div>

        <!-- Close Button -->
        <button
          type="button"
          @click="emit('close')"
          class="p-1 rounded-lg hover:bg-black/5 transition-colors cursor-pointer shrink-0"
        >
          <span class="material-symbols-outlined text-[18px] opacity-60 hover:opacity-100"
            >close</span
          >
        </button>
      </div>
    </Transition>
  </Teleport>
</template>
