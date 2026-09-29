<script setup lang="ts">
import { ref, watch } from 'vue'
import { useBudgetStore } from '@/stores/budgetStore'
import type { BudgetItem, CreateBudgetPayload } from '@/models/budget'

const props = defineProps<{
  isOpen: boolean
  mode: 'create' | 'edit' | 'detail'
  item?: BudgetItem | null
}>()

const emit = defineEmits(['close'])
const store = useBudgetStore()

const form = ref<CreateBudgetPayload>({
  officeName: 'Kanwil Jawa Timur',
  accountNumber: '',
  accountName: '',
  programName: '',
  activityName: '',
  paguBudget: 0,
  usedBudget: 0,
})

watch(
  () => props.item,
  (val) => {
    if (val && props.mode !== 'create') {
      form.value = {
        officeName: val.officeName || 'Kanwil Jawa Timur',
        accountNumber: val.accountNumber || '',
        accountName: val.accountName || '',
        programName: val.programName || '',
        activityName: val.activityName || '',
        paguBudget: val.paguBudget || 0,
        usedBudget: val.usedBudget || 0,
      }
    } else {
      form.value = {
        officeName: 'Kanwil Jawa Timur',
        accountNumber: '',
        accountName: '',
        programName: '',
        activityName: '',
        paguBudget: 0,
        usedBudget: 0,
      }
    }
  },
  { immediate: true }
)

async function handleSubmit() {
  if (props.mode === 'detail') {
    emit('close')
    return
  }

  try {
    if (props.mode === 'create') {
      await store.addBudget(form.value)
    } else if (props.item?.id) {
      await store.editBudget(props.item.id, form.value)
    }
    emit('close')
  } catch (err: any) {
    alert(err.message || 'Gagal menyimpan mata anggaran.')
  }
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-body">
    <div class="bg-surfaceCard w-full max-w-lg rounded-2xl border border-gray-100 shadow-xl overflow-hidden space-y-0">
      <!-- Modal Header -->
      <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-surfaceCanvas">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-emerald-800 text-[22px]">account_balance_wallet</span>
          <h3 class="text-sm font-bold text-textPrimary font-headline">
            {{ mode === 'create' ? 'Tambah' : mode === 'edit' ? 'Edit' : 'Detail' }} Mata Anggaran (MAK)
          </h3>
        </div>
        <button type="button" @click="emit('close')" class="text-textMuted hover:text-textPrimary cursor-pointer">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4 text-xs">
        <div>
          <label class="block font-semibold text-textPrimary mb-1">Kantor / Unit Kerja *</label>
          <select
            v-model="form.officeName"
            :disabled="mode === 'detail'"
            class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-medium text-textPrimary focus:outline-none focus:border-primary disabled:bg-gray-50"
            required
          >
            <option value="Kanwil Jawa Timur">Kanwil Jawa Timur</option>
            <option value="Cabang Surabaya Rungkut">Cabang Surabaya Rungkut</option>
            <option value="Cabang Sidoarjo">Cabang Sidoarjo</option>
            <option value="Cabang Malang">Cabang Malang</option>
            <option value="Kantor Pusat Jakarta">Kantor Pusat Jakarta</option>
          </select>
        </div>

        <div>
          <label class="block font-semibold text-textPrimary mb-1">Nomor Akun (COA) *</label>
          <input
            type="text"
            v-model="form.accountNumber"
            :disabled="mode === 'detail'"
            placeholder="e.g. 5.2.1.04.01"
            class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-mono font-bold text-textPrimary focus:outline-none focus:border-primary disabled:bg-gray-50"
            required
          />
        </div>

        <div>
          <label class="block font-semibold text-textPrimary mb-1">Nama Uraian Anggaran *</label>
          <input
            type="text"
            v-model="form.accountName"
            :disabled="mode === 'detail'"
            placeholder="e.g. Belanja Perjalanan Dinas Sosialisasi JKP"
            class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary disabled:bg-gray-50"
            required
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold text-textPrimary mb-1">Program Kerja Resmi *</label>
            <input
              type="text"
              v-model="form.programName"
              :disabled="mode === 'detail'"
              placeholder="e.g. Peningkatan Kepesertaan Aktif"
              class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary disabled:bg-gray-50"
              required
            />
          </div>

          <div>
            <label class="block font-semibold text-textPrimary mb-1">Kegiatan Operasional *</label>
            <input
              type="text"
              v-model="form.activityName"
              :disabled="mode === 'detail'"
              placeholder="e.g. Sosialisasi JKP Wilayah II"
              class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary disabled:bg-gray-50"
              required
            />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="block font-semibold text-textPrimary mb-1">Pagu DIPA (Rp) *</label>
            <input
              type="number"
              v-model.number="form.paguBudget"
              :disabled="mode === 'detail'"
              placeholder="200000000"
              class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary disabled:bg-gray-50 font-bold"
              required
            />
          </div>

          <div>
            <label class="block font-semibold text-textPrimary mb-1">Anggaran Terpakai (Rp)</label>
            <input
              type="number"
              v-model.number="form.usedBudget"
              :disabled="mode === 'detail'"
              placeholder="0"
              class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary disabled:bg-gray-50"
            />
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
          <button type="button" @click="emit('close')" class="px-4 py-2 rounded-lg text-textMuted hover:text-textPrimary font-bold cursor-pointer">
            {{ mode === 'detail' ? 'Tutup' : 'Batal' }}
          </button>
          <button
            v-if="mode !== 'detail'"
            type="submit"
            :disabled="store.isSubmitting"
            class="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span v-if="store.isSubmitting" class="material-symbols-outlined animate-spin text-[16px]">sync</span>
            <span>Simpan MAK</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>