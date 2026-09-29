<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useCityAirportStore } from '@/stores/cityAirportStore'
import { cityAirportService } from '@/services/cityAirportService'
import type { CreateAirportPayload, CreateCityPayload } from '@/models/cityAirport'

const props = defineProps<{
  isOpen: boolean
  mode: 'create' | 'edit' | 'detail'
  item?: any
}>()

const emit = defineEmits(['close'])
const store = useCityAirportStore()

const isSubmitting = ref(false)
const availableCities = ref<any[]>([])

const form = ref({
  code: '',
  name: '',
  province: '',
  cityId: undefined as number | undefined,
  isActive: true,
})

onMounted(async () => {
  if (store.activeTab === 'airport') {
    const res = await cityAirportService.getCities({ limit: 100, status: 'active' })
    availableCities.value = res.data || []

    if (availableCities.value.length > 0 && !form.value.cityId) {
      form.value.cityId = availableCities.value[0].id
    }
  }
})

watch(
  () => props.item,
  (val) => {
    if (val && props.mode !== 'create') {
      form.value = {
        code: val.code || '',
        name: val.name || '',
        province: val.province || '',
        cityId: val.cityId,
        isActive: val.isActive ?? true,
      }
    } else {
      form.value = {
        code: '',
        name: '',
        province: '',
        cityId: availableCities.value[0]?.id,
        isActive: true,
      }
    }
  },
  { immediate: true },
)

async function handleSubmit() {
  if (props.mode === 'detail') {
    emit('close')
    return
  }

  isSubmitting.value = true
  try {
    if (store.activeTab === 'city') {
      const cityPayload: CreateCityPayload = {
        code: form.value.code,
        name: form.value.name,
        province: form.value.province,
        isActive: form.value.isActive,
      }

      if (props.mode === 'create') {
        await cityAirportService.createCity(cityPayload)
      } else {
        await cityAirportService.updateCity(props.item.id, cityPayload)
      }
    } else {
      if (!form.value.cityId) {
        alert('Silakan pilih Kota Terhubung terlebih dahulu.')
        isSubmitting.value = false
        return
      }

      const airportPayload: CreateAirportPayload = {
        code: form.value.code,
        name: form.value.name,
        cityId: form.value.cityId,
        isActive: form.value.isActive,
      }

      if (props.mode === 'create') {
        await cityAirportService.createAirport(airportPayload)
      } else {
        await cityAirportService.updateAirport(props.item.id, airportPayload)
      }
    }

    await store.fetchData()
    emit('close')
  } catch (err: any) {
    alert(err.message || 'Gagal menyimpan data.')
  } finally {
    // <--- DIPERBAIKI (hapus font-body {)
    isSubmitting.value = false
  }
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs font-body"
  >
    <div
      class="bg-surfaceCard w-full max-w-md rounded-2xl border border-gray-100 shadow-xl overflow-hidden space-y-0"
    >
      <!-- Modal Header -->
      <div class="p-5 border-b border-gray-100 flex items-center justify-between bg-surfaceCanvas">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary text-[22px]">
            {{ store.activeTab === 'airport' ? 'flight_takeoff' : 'location_city' }}
          </span>
          <h3 class="text-sm font-bold text-textPrimary font-headline">
            {{ mode === 'create' ? 'Tambah' : mode === 'edit' ? 'Edit' : 'Detail' }}
            {{ store.activeTab === 'airport' ? 'Bandara (IATA)' : 'Kota & Provinsi' }}
          </h3>
        </div>
        <button type="button" @click="emit('close')" class="text-textMuted hover:text-textPrimary">
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Modal Body -->
      <form @submit.prevent="handleSubmit" class="p-6 space-y-4 text-xs">
        <!-- Kode Field -->
        <div>
          <label class="block font-semibold text-textPrimary mb-1">
            {{ store.activeTab === 'airport' ? 'Kode IATA (3 Huruf) *' : 'Kode Kota *' }}
          </label>
          <input
            type="text"
            v-model="form.code"
            :disabled="mode === 'detail'"
            :placeholder="store.activeTab === 'airport' ? 'CGK' : 'JKT'"
            class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-bold text-textPrimary uppercase focus:outline-none focus:border-primary disabled:bg-gray-50"
            required
          />
        </div>

        <!-- Nama Field -->
        <div>
          <label class="block font-semibold text-textPrimary mb-1">
            {{ store.activeTab === 'airport' ? 'Nama Resmi Bandara *' : 'Nama Kota / Kabupaten *' }}
          </label>
          <input
            type="text"
            v-model="form.name"
            :disabled="mode === 'detail'"
            :placeholder="
              store.activeTab === 'airport' ? 'Soekarno-Hatta International Airport' : 'Jakarta'
            "
            class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary disabled:bg-gray-50"
            required
          />
        </div>

        <!-- Kota Terhubung (If Airport) -->
        <div v-if="store.activeTab === 'airport'">
          <label class="block font-semibold text-textPrimary mb-1">Kota Terhubung *</label>
          <select
            v-model="form.cityId"
            :disabled="mode === 'detail'"
            class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs font-medium text-textPrimary focus:outline-none focus:border-primary disabled:bg-gray-50"
            required
          >
            <option v-for="c in availableCities" :key="c.id" :value="c.id">
              {{ c.name }} ({{ c.code }})
            </option>
          </select>
        </div>

        <!-- Provinsi (If City) -->
        <div v-if="store.activeTab === 'city'">
          <label class="block font-semibold text-textPrimary mb-1">Provinsi *</label>
          <input
            type="text"
            v-model="form.province"
            :disabled="mode === 'detail'"
            placeholder="DKI Jakarta"
            class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary disabled:bg-gray-50"
            required
          />
        </div>

        <!-- Status Active Toggle -->
        <div class="flex items-center justify-between pt-2">
          <span class="font-semibold text-textPrimary">Status Operasional</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              v-model="form.isActive"
              :disabled="mode === 'detail'"
              class="sr-only peer"
            />
            <div
              class="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"
            ></div>
          </label>
        </div>

        <!-- Modal Footer -->
        <div class="pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
          <button
            type="button"
            @click="emit('close')"
            class="px-4 py-2 rounded-lg text-textMuted hover:text-textPrimary font-bold"
          >
            {{ mode === 'detail' ? 'Tutup' : 'Batal' }}
          </button>
          <button
            v-if="mode !== 'detail'"
            type="submit"
            :disabled="isSubmitting"
            class="px-4 py-2 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white font-bold inline-flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span v-if="isSubmitting" class="material-symbols-outlined animate-spin text-[16px]"
              >sync</span
            >
            <span>Simpan</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
