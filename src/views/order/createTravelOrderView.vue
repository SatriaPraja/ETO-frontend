<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import AppBreadcrumb from '@/components/layout/appBreadcrumb.vue'
import ActivityInfoSection from '@/components/order/activityInfoSection.vue'
import ConfirmSubmitModal from '@/components/order/modal/confirmSubmitModal.vue'
import AppToastAlert from '@/components/layout/appToastAlert.vue'

const router = useRouter()
const orderStore = useOrderStore()

// State Modal & Toast
const isConfirmModalOpen = ref(false)
const isSuccessChoiceModalOpen = ref(false) // 🟢 Modal Pilihan Langkah Selanjutnya
const createdToCode = ref('')

const toastInfo = ref({
  isOpen: false,
  title: '',
  message: '',
  type: 'error' as 'error' | 'success' | 'warning',
})

function showToast(
  message: string,
  title = 'Data Belum Lengkap',
  type: 'error' | 'success' | 'warning' = 'error',
) {
  toastInfo.value = { isOpen: true, title, message, type }
  setTimeout(() => {
    toastInfo.value.isOpen = false
  }, 4000)
}

function handleCancel() {
  orderStore.resetForm()
  router.push('/dashboard')
}

// 🟢 Validasi Sebelum Konfirmasi
function openConfirmModal() {
  const info = orderStore.formInfo

  if (!info.orderDate) {
    showToast('Tanggal Order wajib diisi.')
    return
  }
  if (!info.activityName) {
    showToast('Nama Kegiatan wajib diisi.')
    return
  }
  if (!info.unitKerjaNama) {
    showToast('Nama Unit Kerja wajib diisi.')
    return
  }
  if (!info.approverId) {
    showToast('Silakan pilih Pejabat Penyetuju (Kepala Unit Kerja).')
    return
  }
  if (!info.budgetId) {
    showToast('Silakan pilih Mata Anggaran (MAK).')
    return
  }
  if (!info.sprinNumber) {
    showToast('Nomor Sprin / SPPD wajib diisi.')
    return
  }
  if (!info.sprinDetail) {
    showToast('Rincian/Detail Kegiatan Sesuai Sprin wajib diisi.')
    return
  }

  isConfirmModalOpen.value = true
}

// 🟢 Callback Submit Setelah Dikonfirmasi
async function handleConfirmSubmit() {
  isConfirmModalOpen.value = false
  try {
    const res = await orderStore.submitTravelOrderHeader()
    createdToCode.value = res.data?.to_code || ''

    // 🟢 Tampilkan Modal Pilihan Langkah Selanjutnya (Bukan langsung redirect)
    isSuccessChoiceModalOpen.value = true
  } catch (err: any) {
    showToast(err.message || 'Gagal membuat Header Travel Order.', 'Terjadi Kesalahan', 'error')
  }
}

// 🟢 Handler Pilihan Pengguna setelah Sukses:
function navigateToTransport() {
  isSuccessChoiceModalOpen.value = false
  // Mengarahkan ke pembuatan transport
  router.push('/create-transport-order')
}

function navigateToHotel() {
  isSuccessChoiceModalOpen.value = false
  // Mengarahkan ke pemesanan hotel
  router.push('/create-hotel-order')
}

function navigateToHistory() {
  isSuccessChoiceModalOpen.value = false
  orderStore.resetForm()
  router.push('/history')
}
</script>

<template>
  <div
    class="space-y-6 pb-28 font-body w-full max-w-full overflow-x-hidden min-h-screen bg-surfaceCanvas"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 pt-4 space-y-6">
      <AppBreadcrumb />

      <!-- Banner Informasi -->
      <div
        class="bg-surfaceCard p-4 sm:p-6 rounded-2xl border border-gray-100 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
      >
        <div>
          <h1 class="text-lg sm:text-xl font-bold text-textPrimary font-headline">
            Buat Header Travel Order Baru
          </h1>
          <p class="text-xs text-textMuted mt-0.5 leading-relaxed">
            Terbitkan surat perintah dan alokasi anggaran kegiatan dinas sebelum memproses pemesanan
            tiket / hotel.
          </p>
        </div>
        <span
          class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold font-mono self-start sm:self-auto shrink-0"
        >
          HEADER STANDALONE
        </span>
      </div>

      <!-- Form Informasi Kegiatan -->
      <ActivityInfoSection :isReadOnlyMode="false" />
    </div>

    <!-- Bottom Footer Bar -->
    <div
      class="fixed bottom-0 left-0 lg:left-[16.25rem] right-0 bg-surfaceCard border-t border-gray-200 p-3 sm:p-4 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-4 z-30 shadow-lg font-body"
    >
      <div class="flex items-center justify-between sm:justify-start gap-3 sm:gap-6 text-xs">
        <div class="flex flex-col min-w-0">
          <span class="text-[9px] sm:text-[10px] text-textMuted uppercase font-semibold">
            MATA ANGGARAN:
          </span>
          <span
            class="text-xs sm:text-sm font-bold text-textPrimary truncate max-w-[140px] xs:max-w-[180px] sm:max-w-[320px]"
          >
            {{ orderStore.formInfo.budgetAccount || 'Belum dipilih' }}
          </span>
        </div>

        <div class="border-l border-gray-200 pl-3 sm:pl-6 flex flex-col justify-center shrink-0">
          <span class="text-[9px] sm:text-[10px] text-textMuted uppercase font-semibold">
            SALDO ANGGARAN:
          </span>
          <span class="text-xs sm:text-sm font-bold text-emerald-700 whitespace-nowrap">
            Rp {{ (orderStore.formInfo.remainingBudget || 0).toLocaleString('id-ID') }}
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2 w-full sm:w-auto">
        <button
          type="button"
          @click="handleCancel"
          class="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-surfaceCanvas hover:bg-gray-200 text-textPrimary text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-[0.98]"
        >
          <span class="material-symbols-outlined text-[16px]">close</span>
          <span>Batal</span>
        </button>

        <button
          type="button"
          @click="openConfirmModal"
          :disabled="orderStore.isSubmitting"
          class="flex-1 sm:flex-none px-4 sm:px-5 py-2.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer disabled:opacity-50 whitespace-nowrap active:scale-[0.98]"
        >
          <span
            v-if="orderStore.isSubmitting"
            class="material-symbols-outlined text-[18px] animate-spin"
          >
            progress_activity
          </span>
          <span v-else class="material-symbols-outlined text-[18px]">post_add</span>
          <span>
            {{ orderStore.isSubmitting ? 'Memproses...' : 'Terbitkan TO Mandiri' }}
          </span>
        </button>
      </div>
    </div>

    <!-- Modal Konfirmasi Submit -->
    <ConfirmSubmitModal
      :is-open="isConfirmModalOpen"
      :is-submitting="orderStore.isSubmitting"
      title="Konfirmasi Terbitkan Travel Order"
      description="Apakah Anda yakin ingin menerbitkan Travel Order Mandiri ini? Dokumen akan didaftarkan ke sistem."
      @close="isConfirmModalOpen = false"
      @confirm="handleConfirmSubmit"
    />

    <!-- Toast Alert Kustom -->
    <AppToastAlert
      :is-open="toastInfo.isOpen"
      :title="toastInfo.title"
      :message="toastInfo.message"
      :type="toastInfo.type"
      @close="toastInfo.isOpen = false"
    />

    <!-- 🟢 MODAL PILIHAN LANGKAH SELANJUTNYA (Pesan Transportasi/Hotel/Selesai) -->
    <Teleport to="body">
      <div
        v-if="isSuccessChoiceModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-body animate-fade-in"
      >
        <div
          class="bg-surfaceCard rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 space-y-5 text-center"
        >
          <!-- Icon Centang Sukses -->
          <div
            class="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto shadow-inner"
          >
            <span class="material-symbols-outlined text-[36px]">check_circle</span>
          </div>

          <div class="space-y-1.5">
            <h3 class="text-base sm:text-lg font-bold text-textPrimary font-headline">
              Travel Order Berhasil Diterbitkan!
            </h3>
            <p class="text-xs text-textMuted leading-relaxed">
              Nomor TO: <strong class="text-emerald-800 font-mono">{{ createdToCode }}</strong>
              <br />
              Ingin melanjutkan pemesanan untuk kegiatan ini?
            </p>
          </div>

          <!-- Opsi Tombol Aksi -->
          <div class="grid grid-cols-1 gap-2.5 pt-2">
            <button
              type="button"
              @click="navigateToTransport"
              class="w-full px-4 py-3 rounded-xl bg-primary hover:bg-primaryHover text-onPrimary text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-[0.98]"
            >
              <span class="material-symbols-outlined text-[18px]">flight_takeoff</span>
              <span>Lanjut Pesan Transportasi (Tiket)</span>
            </button>

            <button
              type="button"
              @click="navigateToHotel"
              class="w-full px-4 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-[0.98]"
            >
              <span class="material-symbols-outlined text-[18px]">hotel</span>
              <span>Lanjut Pesan Hotel (Akomodasi)</span>
            </button>

            <button
              type="button"
              @click="navigateToHistory"
              class="w-full px-4 py-2.5 rounded-xl bg-surfaceCanvas hover:bg-gray-200 text-textMuted hover:text-textPrimary text-xs font-bold transition-all cursor-pointer active:scale-[0.98]"
            >
              Selesai & Lihat Riwayat
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
