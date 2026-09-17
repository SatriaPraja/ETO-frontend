<script setup lang="ts">
import type { UserDTO } from '@/models/userModel'

defineProps<{
  isOpen: boolean
  mode: 'create' | 'edit'
  loading: boolean
  errorMsg: string
}>()

const formData = defineModel<UserDTO>('formData', { required: true })

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
}>()
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 bg-neutralText/40 backdrop-blur-[4px] z-50 flex items-center justify-center p-4 overflow-y-auto">
    <div class="bg-surfaceCard rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col my-auto transition-all">
      <div class="p-5 border-b border-gray-100 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[22px]">
            {{ mode === 'create' ? 'person_add' : 'manage_accounts' }}
          </span>
          <h3 class="text-base font-bold text-textPrimary font-headline">
            {{ mode === 'create' ? 'Tambah Pengguna Baru' : 'Edit Pengguna & Otorisasi Role' }}
          </h3>
        </div>
        <button type="button" @click="emit('close')" class="text-textMuted hover:text-textPrimary p-1 rounded-lg hover:bg-surfaceCanvas">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <form @submit.prevent="emit('submit')" class="p-6 space-y-4 text-xs font-body">
        <div v-if="errorMsg" class="p-3 bg-errorContainer text-onErrorContainer rounded-xl font-bold flex items-center gap-2">
          <span class="material-symbols-outlined text-[18px]">error</span>
          <span>{{ errorMsg }}</span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col space-y-1">
            <label class="font-bold text-textPrimary">NPK Pegawai *</label>
            <input
              v-model="formData.npk"
              type="text"
              required
              :disabled="mode === 'edit'"
              placeholder="Contoh: 10000001"
              class="h-9 px-3 bg-surfaceCanvas border border-gray-200 rounded-xl text-textPrimary focus:outline-none focus:bg-surfaceCard transition-all disabled:opacity-60"
            />
          </div>

          <div class="flex flex-col space-y-1">
            <label class="font-bold text-textPrimary">Golongan *</label>
            <input
              v-model="formData.golongan"
              type="text"
              required
              placeholder="Contoh: IV/E"
              class="h-9 px-3 bg-surfaceCanvas border border-gray-200 rounded-xl text-textPrimary focus:outline-none focus:bg-surfaceCard transition-all"
            />
          </div>
        </div>

        <div class="flex flex-col space-y-1">
          <label class="font-bold text-textPrimary">Nama Lengkap & Gelar *</label>
          <input
            v-model="formData.namaLengkap"
            type="text"
            required
            placeholder="Contoh: Super Admin E-TO, S.Kom."
            class="h-9 px-3 bg-surfaceCanvas border border-gray-200 rounded-xl text-textPrimary focus:outline-none focus:bg-surfaceCard transition-all"
          />
        </div>

        <div class="flex flex-col space-y-1">
          <label class="font-bold text-textPrimary">Email Resmi BPJS *</label>
          <input
            v-model="formData.email"
            type="email"
            required
            placeholder="nama.user@bpjsketenagakerjaan.go.id"
            class="h-9 px-3 bg-surfaceCanvas border border-gray-200 rounded-xl text-textPrimary focus:outline-none focus:bg-surfaceCard transition-all"
          />
        </div>

        <div v-if="mode === 'create'" class="flex flex-col space-y-1">
          <label class="font-bold text-textPrimary">Password Default *</label>
          <input
            v-model="formData.password"
            type="password"
            required
            placeholder="Minimal 6 karakter"
            class="h-9 px-3 bg-surfaceCanvas border border-gray-200 rounded-xl text-textPrimary focus:outline-none focus:bg-surfaceCard transition-all"
          />
        </div>

        <div class="flex flex-col space-y-1">
          <label class="font-bold text-textPrimary">Jabatan Resmi *</label>
          <input
            v-model="formData.jabatan"
            type="text"
            required
            placeholder="Contoh: System Administrator"
            class="h-9 px-3 bg-surfaceCanvas border border-gray-200 rounded-xl text-textPrimary focus:outline-none focus:bg-surfaceCard transition-all"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div class="flex flex-col space-y-1">
            <label class="font-bold text-textPrimary">Kode Unit Kerja *</label>
            <input
              v-model="formData.unitKerjaKode"
              type="text"
              required
              placeholder="Contoh: KP-TI"
              class="h-9 px-3 bg-surfaceCanvas border border-gray-200 rounded-xl text-textPrimary focus:outline-none focus:bg-surfaceCard transition-all"
            />
          </div>

          <div class="flex flex-col space-y-1">
            <label class="font-bold text-textPrimary">Nama Unit Kerja *</label>
            <input
              v-model="formData.unitKerjaNama"
              type="text"
              required
              placeholder="Contoh: Kantor Pusat - TI"
              class="h-9 px-3 bg-surfaceCanvas border border-gray-200 rounded-xl text-textPrimary focus:outline-none focus:bg-surfaceCard transition-all"
            />
          </div>
        </div>

        <div class="flex flex-col space-y-1">
          <label class="font-bold text-textPrimary">Wewenang Role Utama *</label>
          <select
            v-model="formData.role"
            class="h-9 px-3 bg-surfaceCanvas border border-gray-200 rounded-xl text-textPrimary font-semibold focus:outline-none focus:bg-surfaceCard transition-all"
          >
            <option value="SUPER_ADMIN">SUPER_ADMIN (Super Admin System)</option>
            <option value="OFFICIAL_BOOKER">OFFICIAL_BOOKER (Pembuat Travel Order)</option>
            <option value="APPROVER_KAKANWIL">APPROVER_KAKANWIL (Pejabat Penyetuju)</option>
            <option value="ADMIN_TRAVEL_KP">ADMIN_TRAVEL_KP (Admin Travel Pusat)</option>
            <option value="ASDEP_KEUANGAN">ASDEP_KEUANGAN (Admin Anggaran & OTI)</option>
          </select>
        </div>

        <div class="pt-4 flex items-center justify-end gap-2 border-t border-gray-100 mt-2">
          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-2 rounded-xl bg-surfaceCanvas text-textMuted font-bold hover:bg-gray-200 transition-colors"
          >
            Batal
          </button>

          <button
            type="submit"
            :disabled="loading"
            class="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold shadow-sm transition-all"
          >
            <span v-if="loading" class="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
            <span>{{ loading ? 'Menyimpan...' : 'Simpan Pengguna' }}</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>