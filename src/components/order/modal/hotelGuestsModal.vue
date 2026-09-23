<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useOrderStore, type HotelItem, type HotelGuestItem } from '@/stores/orderStore'
import SelectOfficialBookerModal, {
  type OfficialBookerItem,
} from '@/components/order/modal/selectOfficialBookerModal.vue'

const props = defineProps<{
  isOpen: boolean
  hotelItem?: HotelItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', guests: HotelGuestItem[]): void
}>()

const orderStore = useOrderStore()

// State Modal LOV Pegawai
const isBookerModalOpen = ref(false)

// Form Tambah Penginap Cepat
const formGuest = ref({
  userId: null as string | null,
  name: '',
  npk: '',
  jabatan: '',
  phone: '',
  category: 'INTERNAL' as 'INTERNAL' | 'EKSTERNAL',
  selectedSlotId: '',
})

const guestsList = ref<HotelGuestItem[]>([])

// Reset form saat kategori penginap berubah
watch(
  () => formGuest.value.category,
  () => {
    formGuest.value.userId = null
    formGuest.value.name = ''
    formGuest.value.npk = ''
    formGuest.value.jabatan = ''
    formGuest.value.phone = ''
  },
)

// Inisialisasi Slot Tempat Tidur Sesuai Jumlah Kamar (Twin Sharing)
function initializeSlots() {
  if (!props.hotelItem) return

  const totalSlotsNeeded = (props.hotelItem.roomCount || 1) * 2
  const existingGuests = props.hotelItem.guests || []

  const generatedSlots: HotelGuestItem[] = []

  for (let i = 0; i < totalSlotsNeeded; i++) {
    const roomNum = Math.floor(i / 2) + 1
    const bedLetter = i % 2 === 0 ? 'A' : 'B'
    const slotId = `R${roomNum}-B${bedLetter}`

    const existing = existingGuests.find(
      (g) =>
        g.id === slotId ||
        (g.roomNumber === `Kamar 0${roomNum}` && g.bedSlot.includes(`Bed ${bedLetter}`)),
    )

    if (existing && existing.guestName) {
      generatedSlots.push({
        ...existing,
        id: slotId,
        roomNumber: `Kamar 0${roomNum}`,
        bedSlot: `Bed ${bedLetter} (Twin Bed)`,
        isFilled: true,
      })
    } else {
      generatedSlots.push({
        id: slotId,
        roomNumber: `Kamar 0${roomNum}`,
        bedSlot: `Bed ${bedLetter} (Kosong)`,
        category: 'INTERNAL',
        guestName: '',
        npkOrKtp: '',
        jabatanOrInstansi: '',
        phone: '',
        isFilled: false,
      })
    }
  }

  guestsList.value = generatedSlots

  const emptySlot = generatedSlots.find((g) => !g.isFilled)
  if (emptySlot && emptySlot.id) {
    formGuest.value.selectedSlotId = emptySlot.id
  }
}

watch(
  () => [props.isOpen, props.hotelItem],
  ([newOpen]) => {
    if (newOpen) {
      initializeSlots()
    }
  },
  { immediate: true },
)

const filledCount = computed(() => guestsList.value.filter((g) => g.isFilled).length)
const totalCapacity = computed(() => guestsList.value.length)

// Handler saat Pegawai dipilih dari Modal LOV
function handleBookerSelected(pegawai: OfficialBookerItem) {
  formGuest.value.userId = pegawai.id
  formGuest.value.name = pegawai.namaLengkap
  formGuest.value.npk = pegawai.npk
  formGuest.value.jabatan = `${pegawai.jabatan} - ${pegawai.unitKerjaNama}`
  formGuest.value.phone = pegawai.noHp || ''
  isBookerModalOpen.value = false
}

function handleAddGuest() {
  if (!formGuest.value.name.trim()) {
    alert('Mohon isi atau pilih nama penginap terlebih dahulu.')
    return
  }

  let targetIndex = guestsList.value.findIndex(
    (g) => g.id === formGuest.value.selectedSlotId && !g.isFilled,
  )
  if (targetIndex === -1) {
    targetIndex = guestsList.value.findIndex((g) => !g.isFilled)
  }

  if (targetIndex !== -1) {
    const current = guestsList.value[targetIndex]
    guestsList.value[targetIndex] = {
      id: current!.id,
      roomNumber: current!.roomNumber,
      bedSlot: current!.bedSlot.replace('(Kosong)', '(Terisi)'),
      userId: formGuest.value.userId || null,
      guestName: formGuest.value.name,
      npkOrKtp: formGuest.value.npk
        ? formGuest.value.category === 'INTERNAL'
          ? `NPK: ${formGuest.value.npk}`
          : `KTP: ${formGuest.value.npk}`
        : '-',
      jabatanOrInstansi: formGuest.value.jabatan || 'Pegawai BPJS Ketenagakerjaan',
      category: formGuest.value.category,
      phone: formGuest.value.phone || '-',
      isFilled: true,
    }

    // Reset input form
    formGuest.value.userId = null
    formGuest.value.name = ''
    formGuest.value.npk = ''
    formGuest.value.jabatan = ''
    formGuest.value.phone = ''

    // Pindah ke slot kosong berikutnya
    const nextEmpty = guestsList.value.find((g) => !g.isFilled)
    if (nextEmpty && nextEmpty.id) {
      formGuest.value.selectedSlotId = nextEmpty.id
    }
  } else {
    alert('Seluruh slot tempat tidur untuk kamar ini sudah terisi penuh.')
  }
}

function handleRemoveGuest(id?: string) {
  if (!id) return
  const index = guestsList.value.findIndex((g) => g.id === id)
  if (index !== -1) {
    const current = guestsList.value[index]
    const bedLetter = index % 2 === 0 ? 'A' : 'B'
    guestsList.value[index] = {
      id: current!.id,
      roomNumber: current!.roomNumber,
      bedSlot: `Bed ${bedLetter} (Kosong)`,
      category: 'INTERNAL',
      userId: null,
      guestName: '',
      npkOrKtp: '',
      jabatanOrInstansi: '',
      phone: '',
      isFilled: false,
    }
  }
}

function handleSave() {
  if (props.hotelItem?.id) {
    orderStore.updateHotelGuests(props.hotelItem.id, guestsList.value)
  }
  emit('save', guestsList.value)
  emit('close')
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/50 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto font-body"
  >
    <div
      class="bg-surfaceCard rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh] my-auto border border-gray-100 animate-fade-in"
    >
      <!-- Header Modal -->
      <div
        class="p-5 px-6 border-b border-gray-100 flex items-start justify-between bg-surfaceCard shrink-0"
      >
        <div class="flex items-start gap-3.5">
          <div
            class="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 text-[#930049] flex items-center justify-center shrink-0"
          >
            <span class="material-symbols-outlined text-[22px]">hotel</span>
          </div>
          <div>
            <h3 class="text-base font-bold text-textPrimary font-headline">
              Alokasi Data Penginap — {{ hotelItem?.hotelNameCustom || 'Hotel' }}
            </h3>
            <p class="text-xs text-textMuted mt-0.5">
              Masukkan daftar nama pegawai BPJS TK atau tamu eksternal untuk pemenuhan reservasi
              kamar dinas.
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="emit('close')"
          class="text-textMuted hover:text-textPrimary p-1.5 rounded-xl hover:bg-surfaceCanvas transition-colors shrink-0 cursor-pointer"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Content Body -->
      <div class="p-6 overflow-y-auto space-y-5 flex-1">
        <!-- Banner Metadata Info Kamar -->
        <div
          class="p-4 rounded-xl bg-surfaceCanvas border border-gray-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
        >
          <div class="flex items-center gap-3">
            <div
              class="w-9 h-9 rounded-lg bg-surfaceCard border border-gray-200 flex items-center justify-center text-primary shrink-0"
            >
              <span class="material-symbols-outlined text-[20px]">king_bed</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-textPrimary font-headline">
                  {{ hotelItem?.roomCount || 1 }} Kamar Deluxe (Twin Sharing)
                </span>
                <span class="text-[11px] text-textMuted">
                  {{ hotelItem?.checkInDate }} ➔ {{ hotelItem?.checkOutDate }} ({{
                    hotelItem?.durationNights
                  }}
                  Malam)
                </span>
              </div>
              <p class="text-[11px] text-textMuted mt-0.5">
                Kota: {{ hotelItem?.cityName || 'Surabaya' }}
              </p>
            </div>
          </div>

          <div class="text-left sm:text-right">
            <div class="flex items-center sm:justify-end gap-1.5">
              <span class="text-xs text-textMuted font-semibold">Kapasitas Terisi:</span>
              <strong class="text-xs font-bold text-textPrimary"
                >{{ filledCount }} dari {{ totalCapacity }} Tamu</strong
              >
              <span
                :class="[
                  'px-2 py-0.5 rounded-full text-[10px] font-bold',
                  filledCount === totalCapacity
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800',
                ]"
              >
                {{
                  filledCount === totalCapacity
                    ? 'Lengkap'
                    : `Kurang ${totalCapacity - filledCount} Penginap`
                }}
              </span>
            </div>
            <span class="text-[10px] text-textMuted block mt-0.5"
              >Maksimal 2 Orang / Kamar (Twin Sharing Standar SBU)</span
            >
          </div>
        </div>

        <!-- Form Tambah Data Penginap Cepat -->
        <div class="p-4 rounded-xl border border-gray-200 bg-surfaceCard space-y-3 shadow-2xs">
          <div class="flex items-center justify-between">
            <span
              class="text-xs font-bold text-textPrimary font-headline flex items-center gap-1.5"
            >
              <span class="material-symbols-outlined text-primary text-[18px]">person_add</span>
              Tambah Data Penginap Cepat
            </span>
            <span class="text-[10px] text-textMuted">Isian bertanda * wajib diisi</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <!-- Kategori Penginap -->
            <div class="flex flex-col">
              <label class="text-[11px] font-semibold text-textPrimary mb-1"
                >Kategori Penginap *</label
              >
              <select
                v-model="formGuest.category"
                class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="INTERNAL">Karyawan Internal BPJS</option>
                <option value="EKSTERNAL">Tamu Eksternal</option>
              </select>
            </div>

            <!-- Input Nama Penginap (Dinamis: LOV vs Manual) -->
            <div class="flex flex-col">
              <label class="text-[11px] font-semibold text-textPrimary mb-1">Nama Penginap *</label>

              <!-- Mode INTERNAL: Readonly + Klik panggil Modal LOV -->
              <div v-if="formGuest.category === 'INTERNAL'" class="relative flex items-center">
                <input
                  v-model="formGuest.name"
                  type="text"
                  @click="isBookerModalOpen = true"
                  readonly
                  placeholder="Klik untuk pilih pegawai..."
                  class="w-full h-9 pl-3 pr-8 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary cursor-pointer font-medium"
                />
                <button
                  type="button"
                  @click="isBookerModalOpen = true"
                  class="absolute right-2 text-textMuted hover:text-primary transition-colors cursor-pointer"
                  title="Cari Pegawai"
                >
                  <span class="material-symbols-outlined text-[18px]">search</span>
                </button>
              </div>

              <!-- Mode EKSTERNAL: Ketik manual -->
              <input
                v-else
                v-model="formGuest.name"
                type="text"
                placeholder="Ketik nama lengkap tamu..."
                class="w-full h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary font-medium"
              />
            </div>

            <!-- Alokasi Kamar & Bed -->
            <div class="flex flex-col">
              <label class="text-[11px] font-semibold text-textPrimary mb-1"
                >Alokasi Kamar & Bed *</label
              >
              <select
                v-model="formGuest.selectedSlotId"
                class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary cursor-pointer"
              >
                <option
                  v-for="slot in guestsList"
                  :key="slot.id"
                  :value="slot.id"
                  :disabled="slot.isFilled"
                >
                  {{ slot.roomNumber }} — {{ slot.bedSlot }}
                  {{ slot.isFilled ? '(Terisi)' : '(Tersedia)' }}
                </option>
              </select>
            </div>

            <!-- NPK / No. Identitas KTP -->
            <div class="flex flex-col">
              <label class="text-[11px] font-semibold text-textPrimary mb-1">
                {{ formGuest.category === 'INTERNAL' ? 'NPK Pegawai' : 'No. Identitas / KTP' }}
              </label>
              <input
                v-model="formGuest.npk"
                type="text"
                :readonly="formGuest.category === 'INTERNAL'"
                :placeholder="
                  formGuest.category === 'INTERNAL' ? 'Terisi otomatis...' : '357801...'
                "
                :class="[
                  'h-9 px-3 rounded-lg border text-xs',
                  formGuest.category === 'INTERNAL'
                    ? 'bg-surfaceCanvas border-gray-200 text-textMuted'
                    : 'bg-surfaceCard border-gray-200 text-textPrimary focus:outline-none focus:border-primary',
                ]"
              />
            </div>

            <!-- Jabatan & Unit Kerja / Instansi -->
            <div class="flex flex-col">
              <label class="text-[11px] font-semibold text-textPrimary mb-1">
                {{
                  formGuest.category === 'INTERNAL'
                    ? 'Jabatan & Unit Kerja'
                    : 'Instansi / Perusahaan'
                }}
              </label>
              <input
                v-model="formGuest.jabatan"
                type="text"
                :readonly="formGuest.category === 'INTERNAL'"
                :placeholder="
                  formGuest.category === 'INTERNAL'
                    ? 'Terisi otomatis...'
                    : 'PT Kemitraan Indonesia...'
                "
                :class="[
                  'h-9 px-3 rounded-lg border text-xs',
                  formGuest.category === 'INTERNAL'
                    ? 'bg-surfaceCanvas border-gray-200 text-textMuted'
                    : 'bg-surfaceCard border-gray-200 text-textPrimary focus:outline-none focus:border-primary',
                ]"
              />
            </div>

            <!-- No. Handphone / WA -->
            <div class="flex flex-col">
              <label class="text-[11px] font-semibold text-textPrimary mb-1"
                >No. Handphone / WA *</label
              >
              <input
                v-model="formGuest.phone"
                type="text"
                :readonly="formGuest.category === 'INTERNAL'"
                :placeholder="
                  formGuest.category === 'INTERNAL' ? 'Terisi otomatis...' : '081234567890'
                "
                :class="[
                  'h-9 px-3 rounded-lg border text-xs font-mono',
                  formGuest.category === 'INTERNAL'
                    ? 'bg-surfaceCanvas border-gray-200 text-textMuted'
                    : 'bg-surfaceCard border-gray-200 text-textPrimary focus:outline-none focus:border-primary',
                ]"
              />
            </div>

            <div class="flex items-end lg:col-span-3 justify-end">
              <button
                type="button"
                @click="handleAddGuest"
                class="w-full sm:w-auto px-6 h-9 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
              >
                <span class="material-symbols-outlined text-[18px]">add_circle</span>
                <span>+ Tambahkan Penginap</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Daftar Penginap Terdaftar -->
        <div class="space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <h4 class="text-xs font-bold text-textPrimary font-headline uppercase tracking-wider">
                Daftar Penginap Terdaftar
              </h4>
              <span
                class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold"
              >
                {{ filledCount }} Ditugaskan
              </span>
            </div>
            <span class="text-[11px] text-textMuted"
              >Kebutuhan Kamar: {{ totalCapacity }} Tempat Tidur</span
            >
          </div>

          <div class="border border-gray-200/80 rounded-xl overflow-hidden bg-surfaceCard">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr
                    class="bg-surfaceCanvas border-b border-gray-200/80 text-[10px] font-bold text-textMuted uppercase tracking-wider"
                  >
                    <th class="py-3 px-3 w-8 text-center">#</th>
                    <th class="py-3 px-3">ALOKASI KAMAR</th>
                    <th class="py-3 px-4">NAMA PENGINAP & NPK</th>
                    <th class="py-3 px-4">JABATAN / INSTANSI</th>
                    <th class="py-3 px-3">NO. TELEPON</th>
                    <th class="py-3 px-3">KATEGORI</th>
                    <th class="py-3 px-3 text-center">AKSI</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 text-xs">
                  <tr
                    v-for="(g, idx) in guestsList"
                    :key="g.id"
                    :class="[
                      'transition-colors',
                      !g.isFilled ? 'bg-amber-50/40' : 'hover:bg-surfaceCanvas/50',
                    ]"
                  >
                    <td class="py-3.5 px-3 text-center font-mono font-bold text-textMuted">
                      0{{ idx + 1 }}
                    </td>

                    <td class="py-3.5 px-3">
                      <div class="flex items-center gap-2">
                        <span
                          :class="[
                            'material-symbols-outlined text-[18px]',
                            g.isFilled ? 'text-pink-700' : 'text-amber-500',
                          ]"
                        >
                          hotel
                        </span>
                        <div class="flex flex-col">
                          <span class="font-bold text-textPrimary leading-tight">{{
                            g.roomNumber
                          }}</span>
                          <span class="text-[10px] text-textMuted">{{ g.bedSlot }}</span>
                        </div>
                      </div>
                    </td>

                    <td class="py-3.5 px-4">
                      <template v-if="g.isFilled">
                        <div class="flex flex-col">
                          <span class="font-bold text-textPrimary font-headline">{{
                            g.guestName
                          }}</span>
                          <span class="text-[10px] text-textMuted font-mono">{{ g.npkOrKtp }}</span>
                        </div>
                      </template>
                      <template v-else>
                        <span
                          class="text-amber-700 text-[11px] font-semibold italic flex items-center gap-1"
                        >
                          <span class="material-symbols-outlined text-[14px]">info</span>
                          [Slot Belum Diisi — Silakan pilih/isi penginap di atas]
                        </span>
                      </template>
                    </td>

                    <td class="py-3.5 px-4">
                      <span
                        v-if="g.isFilled"
                        class="whitespace-pre-line text-textMuted text-[11px] font-medium leading-tight block"
                      >
                        {{ g.jabatanOrInstansi }}
                      </span>
                      <span v-else class="text-textMuted">-</span>
                    </td>

                    <td class="py-3.5 px-3 font-mono text-[11px] text-textMuted">
                      {{ g.isFilled ? g.phone || '-' : '-' }}
                    </td>

                    <td class="py-3.5 px-3">
                      <span
                        v-if="g.isFilled"
                        :class="[
                          'px-2 py-0.5 rounded-md text-[10px] font-bold border inline-block',
                          g.category === 'INTERNAL'
                            ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                            : 'bg-blue-100 text-blue-800 border-blue-200',
                        ]"
                      >
                        {{ g.category === 'INTERNAL' ? 'Internal BPJS' : 'Tamu Eksternal' }}
                      </span>
                      <span v-else class="text-textMuted">-</span>
                    </td>

                    <td class="py-3.5 px-3 text-center">
                      <div v-if="g.isFilled" class="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          @click="handleRemoveGuest(g.id)"
                          class="p-1 text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
                          title="Hapus"
                        >
                          <span class="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                      <div v-else>
                        <button
                          type="button"
                          @click="formGuest.selectedSlotId = g.id || ''"
                          class="px-2.5 py-1 rounded bg-amber-100 text-amber-800 hover:bg-amber-200 text-[10px] font-bold transition-colors cursor-pointer"
                        >
                          Pilih Slot
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer -->
      <div
        class="p-4 px-6 border-t border-gray-100 bg-surfaceCanvas flex items-center justify-between shrink-0 text-xs"
      >
        <button
          type="button"
          @click="emit('close')"
          class="px-4 py-2 rounded-xl bg-surfaceCard border border-gray-200 text-textPrimary font-bold hover:bg-gray-100 transition-colors cursor-pointer"
        >
          Batal / Tutup
        </button>

        <button
          type="button"
          @click="handleSave"
          class="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer active:scale-[0.98]"
        >
          <span class="material-symbols-outlined text-[18px]">check_circle</span>
          <span>Simpan & Terapkan Penginap ({{ filledCount }} Tamu)</span>
        </button>
      </div>
    </div>

    <!-- Pasang Komponen SelectOfficialBookerModal -->
    <SelectOfficialBookerModal
      :is-open="isBookerModalOpen"
      @close="isBookerModalOpen = false"
      @select="handleBookerSelected"
    />
  </div>
</template>
