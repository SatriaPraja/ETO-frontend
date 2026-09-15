<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
</script>

<template>
  <div class="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-16 bg-surfaceCanvas relative">
    
    <!-- Floating Toast Popup Notification (Mengambang agar tidak merusak layout) -->
    <Transition name="fade">
      <div 
        v-if="authStore.errorMessage" 
        class="fixed top-6 right-6 z-50 max-w-md bg-surfaceCard border-l-4 border-error p-4 rounded-xl shadow-2xl flex items-start gap-3 transition-all"
      >
        <span class="material-symbols-outlined text-error text-[22px] shrink-0 mt-0.5">error</span>
        <div class="flex flex-col flex-1 text-sm">
          <div class="flex items-center justify-between">
            <span class="font-bold text-textPrimary">Autentikasi Gagal</span>
            <button 
              type="button" 
              @click="authStore.clearError()" 
              class="text-textMuted hover:text-textPrimary text-xs font-bold ml-2"
            >
              ✕
            </button>
          </div>
          <p class="text-xs mt-1 text-textMuted leading-relaxed">
            {{ authStore.errorMessage }}
          </p>
          <!-- Detail rincian validasi field jika ada (Error 400 array) -->
          <ul v-if="authStore.validationErrors.length > 0" class="mt-2 list-disc list-inside text-[11px] text-error">
            <li v-for="(err, idx) in authStore.validationErrors" :key="idx">
              <strong class="capitalize">{{ err.field }}</strong>: {{ err.message }}
            </li>
          </ul>
        </div>
      </div>
    </Transition>

    <div class="w-full max-w-[490px] flex flex-col">
      <div class="bg-surfaceCard rounded-2xl shadow-xl p-8 sm:p-10 flex flex-col relative">
        
        <!-- Header Status -->
        <div class="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <div class="flex items-center gap-2">
            <span class="flex h-2.5 w-2.5 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
            </span>
            <span class="text-xs font-semibold uppercase text-secondary tracking-wide">Gerbang Autentikasi Aktif</span>
          </div>
          <span class="text-xs px-2.5 py-1 rounded-full bg-surfaceContainerHigh text-textMuted font-medium">Node ID: JKT-HQ-01</span>
        </div>

        <!-- Main Title -->
        <div class="mb-7">
          <h2 class="text-2xl font-bold tracking-tight text-textPrimary font-headline">Masuk ke Sistem e-TO</h2>
          <p class="text-sm text-textMuted mt-1.5 font-body">
            Gunakan akun Portal SSO BPJS Ketenagakerjaan resmi Anda untuk mengakses otorisasi dinas.
          </p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="authStore.handleLogin" class="flex flex-col space-y-5">
          <!-- Username -->
          <div class="flex flex-col space-y-1.5">
            <label class="text-xs font-semibold text-textPrimary flex items-center justify-between" for="username">
              <span>Username / NPK Pegawai <span class="text-error font-bold">*</span></span>
              <span class="text-[11px] text-textMuted font-normal">Contoh: 982144</span>
            </label>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined absolute left-3 text-textMuted text-[20px] pointer-events-none">badge</span>
              <input
                id="username"
                v-model="authStore.username"
                type="text"
                required
                :disabled="authStore.loading"
                placeholder="Masukkan NPK atau email institusi"
                class="w-full h-11 pl-10 pr-3.5 bg-surfaceCard border border-gray-200 rounded-lg text-sm text-textPrimary placeholder:text-textMuted/60 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all"
              />
            </div>
          </div>

          <!-- Password -->
          <div class="flex flex-col space-y-1.5">
            <div class="flex items-center justify-between">
              <label class="text-xs font-semibold text-textPrimary" for="password">
                Kata Sandi Portal SSO <span class="text-error font-bold">*</span>
              </label>
              <a href="#forgot" class="text-xs text-primary hover:text-primaryHover font-semibold transition-colors hover:underline">
                Lupa Kata Sandi?
              </a>
            </div>
            <div class="relative flex items-center">
              <span class="material-symbols-outlined absolute left-3 text-textMuted text-[20px] pointer-events-none">key</span>
              <input
                id="password"
                v-model="authStore.password"
                :type="authStore.isPasswordVisible ? 'text' : 'password'"
                required
                :disabled="authStore.loading"
                placeholder="••••••••••••"
                class="w-full h-11 pl-10 pr-11 bg-surfaceCard border border-gray-200 rounded-lg text-sm text-textPrimary placeholder:text-textMuted/60 focus:outline-none focus:ring-2 focus:ring-primary shadow-sm transition-all"
              />
              <button
                type="button"
                @click="authStore.togglePasswordVisibility"
                class="absolute right-3 text-textMuted hover:text-textPrimary p-1 rounded transition-colors"
              >
                <span class="material-symbols-outlined text-[20px] block">
                  {{ authStore.isPasswordVisible ? 'visibility_off' : 'visibility' }}
                </span>
              </button>
            </div>
          </div>

          <!-- Checkbox & Status -->
          <div class="flex items-center justify-between pt-1">
            <label class="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                v-model="authStore.rememberMe"
                class="w-4 h-4 rounded text-primary focus:ring-primary bg-background cursor-pointer"
              />
              <span class="text-xs text-textPrimary">Ingat kredensial di perangkat dinas ini</span>
            </label>
            <div class="flex items-center gap-1 text-textMuted text-xs">
              <span class="material-symbols-outlined text-[14px]">shield</span>
              <span class="text-[11px] font-semibold">Token Active</span>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="pt-2">
            <button
              type="submit"
              :disabled="authStore.loading"
              :class="[
                'w-full h-12 rounded-xl bg-primary hover:bg-primaryHover text-onPrimary font-semibold flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all',
                authStore.loading ? 'opacity-50 cursor-not-allowed' : 'active:scale-[0.99]'
              ]"
            >
              <span>{{ authStore.loading ? 'Memverifikasi...' : 'Masuk ke Aplikasi' }}</span>
              <span v-if="!authStore.loading" class="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </div>
        </form>

        <!-- Additional SSO Card Option -->
        <div class="mt-6 pt-6 flex flex-col items-center">
          <span class="text-[11px] text-textMuted uppercase tracking-wider mb-3 font-semibold">Opsi Autentikasi Tambahan</span>
          <button type="button" class="w-full h-10 px-4 rounded-lg bg-surfaceContainerLow hover:bg-surfaceContainer text-textPrimary text-xs font-medium flex items-center justify-center gap-2 transition-all">
            <span class="material-symbols-outlined text-secondary text-[20px]">contactless</span>
            <span>Masuk dengan Kartu Pegawai Digital (NFC/PKI)</span>
          </button>
        </div>
      </div>

      <!-- Helpdesk Notice -->
      <div class="mt-6 bg-surfaceCard rounded-xl p-4 shadow-sm flex items-start gap-3">
        <span class="material-symbols-outlined text-primary text-[24px] shrink-0 mt-0.5">support_agent</span>
        <div class="flex flex-col">
          <span class="text-xs font-bold text-textPrimary">Butuh Bantuan Teknis?</span>
          <p class="text-xs text-textMuted mt-0.5 leading-relaxed">
            Hubungi <strong>IT Service Desk BPJS Ketenagakerjaan</strong> melalui Ext. <span class="font-bold text-primary">1400</span> atau email ke <a href="mailto:ext-helpdesk@bpjsketenagakerjaan.go.id" class="text-primary hover:underline font-medium">ext-helpdesk@bpjsketenagakerjaan.go.id</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>