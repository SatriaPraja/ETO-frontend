<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import AppBreadcrumb from '@/components/layout/appBreadcrumb.vue'
import OrderHeaderBanner from '@/components/order/orderHeaderBanner.vue'
import ActivityInfoSection from '@/components/order/activityInfoSection.vue'
import HotelTransportSegment from '@/components/order/hotelTransportSegment.vue'
import OrderFooterBar from '@/components/order/orderFooterBar.vue'
import ConfirmSubmitModal from '@/components/order/modal/confirmSubmitModal.vue'
import AppToastAlert from '@/components/layout/appToastAlert.vue'

const router = useRouter()
const orderStore = useOrderStore()

// 🟢 PAKSA SET TRANSPORTER TO 'hotel' SAAT HALAMAN DIBUKA
onMounted(() => {
  orderStore.setTransport('hotel')
})

const isConfirmModalOpen = ref(false)
const isSuccessModalOpen = ref(false)

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

const currentTab = {
  type: 'hotel' as const,
  label: 'Hotel & Akomodasi',
  icon: 'hotel',
  color: 'text-[#930049]',
}

function handleOpenConfirmModal() {
  if (!orderStore.formInfo.existingToOption) {
    showToast('Silakan pilih Travel Order Terdaftar terlebih dahulu.')
    return
  }
  if (orderStore.hotels.length === 0) {
    showToast('Silakan tambahkan minimal 1 (satu) pemesanan hotel ke dalam daftar.')
    return
  }

  isConfirmModalOpen.value = true
}

async function handleConfirmSubmit() {
  isConfirmModalOpen.value = false
  try {
    await orderStore.submitHotelOrder()
    isSuccessModalOpen.value = true
  } catch (err: any) {
    showToast(err.message || 'Gagal menyimpan pemesanan hotel.', 'Terjadi Kesalahan', 'error')
  }
}

function stayOnHotel() {
  isSuccessModalOpen.value = false
}

function navigateToTransport() {
  isSuccessModalOpen.value = false
  router.push('/create-transport-order')
}

function navigateToHistory() {
  isSuccessModalOpen.value = false
  orderStore.resetForm()
  router.push('/history')
}
</script>

<template>
  <div
    class="space-y-6 pb-28 font-body w-full max-w-full overflow-x-hidden min-h-screen bg-surfaceCanvas"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 pt-2 space-y-6">
      <AppBreadcrumb />
      <OrderHeaderBanner :currentTab="currentTab" />

      <!-- Activity Section Locked (Pilih TO Existing) -->
      <ActivityInfoSection :isReadOnlyMode="true" />

      <!-- Form Hotel Segment -->
      <section
        class="bg-surfaceCard rounded-2xl shadow-2xs border border-gray-100 overflow-hidden p-4 sm:p-6"
      >
        <HotelTransportSegment />
      </section>
    </div>

    <!-- Bottom Footer Bar -->
    <OrderFooterBar @submit-click="handleOpenConfirmModal" />

    <!-- Modal Pop-Up Konfirmasi Submit -->
    <ConfirmSubmitModal
      :is-open="isConfirmModalOpen"
      :is-submitting="orderStore.isSubmitting"
      title="Konfirmasi Pesanan Hotel"
      description="Apakah Anda yakin ingin menambahkan reservasi hotel ini ke Travel Order terpilih?"
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

    <!-- Modal Pilihan Langkah Selanjutnya -->
    <Teleport to="body">
      <div
        v-if="isSuccessModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-body animate-fade-in"
      >
        <div
          class="bg-surfaceCard rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 space-y-5 text-center"
        >
          <div
            class="w-14 h-14 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center mx-auto shadow-inner"
          >
            <span class="material-symbols-outlined text-[36px]">hotel</span>
          </div>

          <div class="space-y-1.5">
            <h3 class="text-base sm:text-lg font-bold text-textPrimary font-headline">
              Pemesanan Hotel Berhasil Ditambahkan!
            </h3>
            <p class="text-xs text-textMuted leading-relaxed">
              Reservasi hotel telah dilampirkan pada Travel Order
              <strong class="text-emerald-800 font-mono">{{
                orderStore.formInfo.existingToOption
              }}</strong
              >.
              <br />
              Apa yang ingin Anda lakukan selanjutnya?
            </p>
          </div>

          <div class="grid grid-cols-1 gap-2.5 pt-2">
            <button
              type="button"
              @click="navigateToHistory"
              class="w-full px-4 py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-[0.98]"
            >
              <span class="material-symbols-outlined text-[18px]">receipt_long</span>
              <span>Selesai & Lihat Riwayat Pengajuan</span>
            </button>

            <button
              type="button"
              @click="navigateToTransport"
              class="w-full px-4 py-2.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
            >
              <span class="material-symbols-outlined text-[18px]">flight_takeoff</span>
              <span>Tambah Pesanan Transportasi</span>
            </button>

            <button
              type="button"
              @click="stayOnHotel"
              class="w-full px-4 py-2.5 rounded-xl bg-surfaceCanvas hover:bg-gray-200 text-textMuted hover:text-textPrimary text-xs font-bold transition-all cursor-pointer active:scale-[0.98]"
            >
              Tambah Hotel Lainnya
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
