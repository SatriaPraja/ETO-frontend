<script setup lang="ts">
import { ref } from 'vue'

export interface GuestItem {
  id: string
  roomNumber: string
  bedSlot: string
  name: string
  npkOrKtp: string
  jabatanOrInstansi: string
  kategori: 'Internal BPJS' | 'Tamu Eksternal'
  phone: string
  isFilled: boolean
}

defineProps<{
  isOpen: boolean
  hotelName?: string
  reservationId?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'save', guests: GuestItem[]): void
}>()

// Form Tambah Penginap Cepat
const formGuest = ref({
  name: '',
  npk: '',
  jabatan: '',
  kategori: 'Karyawan Internal BPJS' as 'Karyawan Internal BPJS' | 'Tamu Eksternal',
  roomAndBed: 'Kamar 02 — Bed A (Tersedia)',
})

// Daftar Penginap
const guestsList = ref<GuestItem[]>([
  {
    id: '1',
    roomNumber: 'Kamar 01',
    bedSlot: 'Bed A (Twin Bed)',
    name: 'Bambang Sugianto',
    npkOrKtp: 'NPK: 19840215',
    jabatanOrInstansi: 'Penata Madya Pengendalian Mutu\nKanwil Jawa Timur',
    kategori: 'Internal BPJS',
    phone: '0812-3456-7890',
    isFilled: true,
  },
  {
    id: '2',
    roomNumber: 'Kamar 01',
    bedSlot: 'Bed B (Twin Bed)',
    name: 'Rendra Wijaya',
    npkOrKtp: 'NPK: 19941120',
    jabatanOrInstansi: 'Analis TI\nKanwil Jawa Timur',
    kategori: 'Internal BPJS',
    phone: '0812-9876-5432',
    isFilled: true,
  },
  {
    id: '3',
    roomNumber: 'Kamar 02',
    bedSlot: 'Bed A (Kosong)',
    name: '',
    npkOrKtp: '',
    jabatanOrInstansi: '',
    kategori: 'Internal BPJS',
    phone: '',
    isFilled: false,
  },
  {
    id: '4',
    roomNumber: 'Kamar 02',
    bedSlot: 'Bed B (Kosong)',
    name: '',
    npkOrKtp: '',
    jabatanOrInstansi: '',
    kategori: 'Internal BPJS',
    phone: '',
    isFilled: false,
  },
])
function handleAddGuest() {
  if (!formGuest.value.name) return

  // Cari slot kosong pertama
  const emptyIndex = guestsList.value.findIndex((g) => !g.isFilled)
  if (emptyIndex !== -1) {
    const current = guestsList.value[emptyIndex]
    
    guestsList.value[emptyIndex] = {
      id: current!.id,
      roomNumber: current!.roomNumber,
      bedSlot: current!.bedSlot,
      name: formGuest.value.name,
      npkOrKtp: formGuest.value.npk ? `NPK: ${formGuest.value.npk}` : 'NPK: 19900812',
      jabatanOrInstansi: formGuest.value.jabatan || 'Account Representative Khusus - KCP Surabaya',
      kategori: formGuest.value.kategori === 'Karyawan Internal BPJS' ? 'Internal BPJS' : 'Tamu Eksternal',
      phone: '0812-1122-3344',
      isFilled: true,
    }

    // Reset input
    formGuest.value.name = ''
    formGuest.value.npk = ''
    formGuest.value.jabatan = ''
  }
}

function handleRemoveGuest(id: string) {
  const index = guestsList.value.findIndex((g) => g.id === id)
  if (index !== -1) {
    const current = guestsList.value[index]
    
    guestsList.value[index] = {
      id: current!.id,
      roomNumber: current!.roomNumber,
      bedSlot: current!.bedSlot,
      kategori: current!.kategori,
      name: '',
      npkOrKtp: '',
      jabatanOrInstansi: '',
      phone: '',
      isFilled: false,
    }
  }
}

function handleSave() {
  emit('save', guestsList.value)
  emit('close')
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-neutralText/50 backdrop-blur-[4px] z-50 flex items-center justify-center p-4 overflow-y-auto"
  >
    <div
      class="bg-surfaceCard rounded-2xl shadow-2xl w-full max-w-4xl overflow-hidden flex flex-col max-h-[92vh] my-auto border border-gray-100 animate-in fade-in zoom-in-95 duration-200 font-body"
    >
      <!-- Header Modal -->
      <div class="p-5 px-6 border-b border-gray-100 flex items-start justify-between bg-surfaceCard shrink-0">
        <div class="flex items-start gap-3.5">
          <div class="w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 text-[#930049] flex items-center justify-center shrink-0">
            <span class="material-symbols-outlined text-[22px]">hotel</span>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h3 class="text-base font-bold text-textPrimary font-headline">
                Alokasi Data Penginap — {{ hotelName || 'Hotel Santika Premiere Gubeng Surabaya' }}
              </h3>
              <span class="text-[10px] font-bold text-textMuted bg-surfaceCanvas border border-gray-200 px-2 py-0.5 rounded-md font-mono">
                ID Reservasi: {{ reservationId || 'HTL-202605-042' }}
              </span>
            </div>
            <p class="text-xs text-textMuted mt-0.5">
              Masukkan daftar nama pegawai BPJS TK atau tamu eksternal untuk pemenuhan reservasi kamar dinas.
            </p>
          </div>
        </div>

        <button
          type="button"
          @click="emit('close')"
          class="text-textMuted hover:text-textPrimary p-1.5 rounded-xl hover:bg-surfaceCanvas transition-colors shrink-0"
        >
          <span class="material-symbols-outlined text-[20px]">close</span>
        </button>
      </div>

      <!-- Content Body -->
      <div class="p-6 overflow-y-auto space-y-5 flex-1">
        <!-- Banner Metadata Info Kamar -->
        <div class="p-4 rounded-xl bg-surfaceCanvas border border-gray-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-surfaceCard border border-gray-200 flex items-center justify-center text-primary shrink-0">
              <span class="material-symbols-outlined text-[20px]">king_bed</span>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-textPrimary font-headline">2 Kamar Deluxe Twin</span>
                <span class="text-[11px] text-textMuted">12–15 Mei 2026 (3 Malam)</span>
              </div>
              <p class="text-[11px] text-textMuted mt-0.5">
                Surabaya, Jawa Timur • Terkoneksi Surat Tugas ST/481/05/2026
              </p>
            </div>
          </div>

          <div class="text-left sm:text-right">
            <div class="flex items-center sm:justify-end gap-1.5">
              <span class="text-xs text-textMuted font-semibold">Kapasitas Terisi:</span>
              <strong class="text-xs font-bold text-textPrimary">2 dari 4 Tamu</strong>
              <span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">Kurang 2 Penginap</span>
            </div>
            <span class="text-[10px] text-textMuted block mt-0.5">Maksimal 2 Orang / Kamar (Twin Sharing Standar SBU)</span>
          </div>
        </div>

        <!-- Form Tambah Data Penginap Cepat -->
        <div class="p-4 rounded-xl border border-gray-200 bg-surfaceCard space-y-3 shadow-2xs">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold text-textPrimary font-headline flex items-center gap-1.5">
              <span class="material-symbols-outlined text-primary text-[18px]">person_add</span>
              Tambah Data Penginap Cepat
            </span>
            <span class="text-[10px] text-textMuted">Isian bertanda * wajib diisi</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div class="flex flex-col">
              <label class="text-[11px] font-semibold text-textPrimary mb-1">Nama Penginap *</label>
              <div class="relative">
                <input
                  v-model="formGuest.name"
                  type="text"
                  placeholder="Ketik nama pegawai / NPK / tamu..."
                  class="w-full h-9 pl-3 pr-8 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
                />
                <span class="material-symbols-outlined absolute right-2.5 top-2.5 text-textMuted text-[16px]">search</span>
              </div>
            </div>

            <div class="flex flex-col">
              <label class="text-[11px] font-semibold text-textPrimary mb-1">Kategori Penginap *</label>
              <select
                v-model="formGuest.kategori"
                class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
              >
                <option value="Karyawan Internal BPJS">Karyawan Internal BPJS</option>
                <option value="Tamu Eksternal">Tamu Eksternal</option>
              </select>
            </div>

            <div class="flex flex-col">
              <label class="text-[11px] font-semibold text-textPrimary mb-1">Alokasi Kamar & Bed *</label>
              <select
                v-model="formGuest.roomAndBed"
                class="h-9 px-3 rounded-lg bg-surfaceCard border border-gray-200 text-xs text-textPrimary focus:outline-none focus:border-primary"
              >
                <option>Kamar 02 — Bed A (Tersedia)</option>
                <option>Kamar 02 — Bed B (Tersedia)</option>
              </select>
            </div>

            <div class="flex flex-col">
              <label class="text-[11px] font-semibold text-textPrimary mb-1">NPK / No. Identitas KTP</label>
              <input
                v-model="formGuest.npk"
                type="text"
                placeholder="19900812 (Terverifikasi)"
                class="h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-xs text-textMuted"
              />
            </div>

            <div class="flex flex-col">
              <label class="text-[11px] font-semibold text-textPrimary mb-1">Jabatan & Unit Kerja</label>
              <input
                v-model="formGuest.jabatan"
                type="text"
                placeholder="Account Representative Khusus - KCP Surabaya"
                class="h-9 px-3 rounded-lg bg-surfaceCanvas border border-gray-200 text-xs text-textMuted"
              />
            </div>

            <div class="flex items-end">
              <button
                type="button"
                @click="handleAddGuest"
                class="w-full h-9 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all active:scale-[0.98]"
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
              <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                2 Ditugaskan
              </span>
            </div>
            <span class="text-[11px] text-textMuted">Kebutuhan Kamar: 4 Tempat Tidur</span>
          </div>

          <div class="border border-gray-200/80 rounded-xl overflow-hidden bg-surfaceCard">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse">
                <thead>
                  <tr class="bg-surfaceCanvas border-b border-gray-200/80 text-[10px] font-bold text-textMuted uppercase tracking-wider">
                    <th class="py-3 px-3 w-8 text-center">#</th>
                    <th class="py-3 px-3">ALOKASI KAMAR</th>
                    <th class="py-3 px-4">NAMA PENGINAP & NPK</th>
                    <th class="py-3 px-4">JABATAN / INSTANSI</th>
                    <th class="py-3 px-3">KATEGORI</th>
                    <th class="py-3 px-3">NO. HANDPHONE</th>
                    <th class="py-3 px-3 text-center">AKSI</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 text-xs">
                  <tr
                    v-for="(g, idx) in guestsList"
                    :key="g.id"
                    :class="[
                      'transition-colors',
                      !g.isFilled ? 'bg-amber-50/40' : 'hover:bg-surfaceCanvas/50'
                    ]"
                  >
                    <td class="py-3.5 px-3 text-center font-mono font-bold text-textMuted">
                      0{{ idx + 1 }}
                    </td>

                    <!-- Alokasi Kamar -->
                    <td class="py-3.5 px-3">
                      <div class="flex items-center gap-2">
                        <span
                          :class="[
                            'material-symbols-outlined text-[18px]',
                            g.isFilled ? 'text-pink-700' : 'text-amber-500'
                          ]"
                        >
                          hotel
                        </span>
                        <div class="flex flex-col">
                          <span class="font-bold text-textPrimary leading-tight">{{ g.roomNumber }}</span>
                          <span class="text-[10px] text-textMuted">{{ g.bedSlot }}</span>
                        </div>
                      </div>
                    </td>

                    <!-- Nama Penginap & NPK -->
                    <td class="py-3.5 px-4">
                      <template v-if="g.isFilled">
                        <div class="flex flex-col">
                          <span class="font-bold text-textPrimary font-headline">{{ g.name }}</span>
                          <span class="text-[10px] text-textMuted font-mono">{{ g.npkOrKtp }}</span>
                        </div>
                      </template>
                      <template v-else>
                        <span class="text-amber-700 text-[11px] font-semibold italic flex items-center gap-1">
                          <span class="material-symbols-outlined text-[14px]">info</span>
                          [Slot Belum Diisi — Silakan pilih & tambahkan penginap melalui form di atas]
                        </span>
                      </template>
                    </td>

                    <!-- Jabatan / Instansi -->
                    <td class="py-3.5 px-4">
                      <span v-if="g.isFilled" class="whitespace-pre-line text-textMuted text-[11px] font-medium leading-tight block">
                        {{ g.jabatanOrInstansi }}
                      </span>
                      <span v-else class="text-textMuted">-</span>
                    </td>

                    <!-- Kategori -->
                    <td class="py-3.5 px-3">
                      <span
                        v-if="g.isFilled"
                        class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200 inline-block"
                      >
                        {{ g.kategori }}
                      </span>
                      <span v-else class="text-textMuted">-</span>
                    </td>

                    <!-- No HP -->
                    <td class="py-3.5 px-3 font-mono text-[11px] text-textMuted">
                      {{ g.isFilled ? g.phone : '-' }}
                    </td>

                    <!-- Aksi -->
                    <td class="py-3.5 px-3 text-center">
                      <div v-if="g.isFilled" class="flex items-center justify-center gap-1">
                        <button type="button" class="p-1 text-textMuted hover:text-primary transition-colors" title="Edit">
                          <span class="material-symbols-outlined text-[16px]">edit</span>
                        </button>
                        <button type="button" @click="handleRemoveGuest(g.id)" class="p-1 text-error hover:text-red-700 transition-colors" title="Hapus">
                          <span class="material-symbols-outlined text-[16px]">delete</span>
                        </button>
                      </div>
                      <div v-else>
                        <button
                          type="button"
                          class="px-2.5 py-1 rounded bg-amber-100 text-amber-800 hover:bg-amber-200 text-[10px] font-bold transition-colors"
                        >
                          Isi Bed {{ idx === 2 ? 'A' : 'B' }}
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
      <div class="p-4 px-6 border-t border-gray-100 bg-surfaceCanvas flex items-center justify-between shrink-0 text-xs">
        <button
          type="button"
          @click="emit('close')"
          class="px-4 py-2 rounded-xl bg-surfaceCard border border-gray-200 text-textPrimary font-bold hover:bg-gray-100 transition-colors"
        >
          Batal / Tutup
        </button>

        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-4 py-2 rounded-xl bg-surfaceCard border border-gray-200 text-textMuted font-bold hover:bg-gray-100 transition-colors"
          >
            Simpan Draf
          </button>
          <button
            type="button"
            @click="handleSave"
            class="px-5 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold flex items-center gap-1.5 shadow-2xs transition-all active:scale-[0.98]"
          >
            <span class="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Simpan & Terapkan Penginap (2 Tamu)</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>