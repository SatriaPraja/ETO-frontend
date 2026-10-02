<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore, type TransportType } from '@/stores/orderStore'
import AppBreadcrumb from '@/components/layout/appBreadcrumb.vue'
import OrderHeaderBanner from '@/components/order/orderHeaderBanner.vue'
import ActivityInfoSection from '@/components/order/activityInfoSection.vue'
import DynamicTransportSegment from '@/components/order/dynamicTransportSegment.vue'
import TravellerTableList from '@/components/order/travellerTableList.vue'
import OrderFooterBar from '@/components/order/orderFooterBar.vue'
import ConfirmSubmitModal from '@/components/order/modal/confirmSubmitModal.vue'
import AppToastAlert from '@/components/layout/appToastAlert.vue'

const router = useRouter()
const orderStore = useOrderStore()

onMounted(() => {
  if (orderStore.activeTransport === 'hotel') {
    orderStore.setTransport('flight')
  }
})

// State Modal & Toast Alert
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

const transportTabs: { type: TransportType; label: string; icon: string; color: string }[] = [
  { type: 'flight', label: 'Pesawat', icon: 'flight', color: 'text-[#30C5F7]' },
  { type: 'train', label: 'Kereta Api', icon: 'train', color: 'text-[#FF8927]' },
  { type: 'sea', label: 'Kapal Laut', icon: 'directions_boat', color: 'text-[#0099FF]' },
  { type: 'bus', label: 'Bus / Travel', icon: 'directions_bus', color: 'text-[#6A0000]' },
  { type: 'car', label: 'Mobil Dinas', icon: 'directions_car', color: 'text-[#00BE5F]' },
]

const currentTab = computed(() => {
  return transportTabs.find((t) => t.type === orderStore.activeTransport) ?? transportTabs[0]!
})

// 🟢 Validasi Sebelum Submit Transportasi
function handleOpenConfirmModal() {
  if (!orderStore.formInfo.existingToOption) {
    showToast('Silakan pilih Travel Order Terdaftar terlebih dahulu.')
    return
  }
  if (orderStore.travellers.length === 0) {
    showToast('Silakan tambahkan minimal 1 (satu) personel/traveller penerbangan.')
    return
  }

  isConfirmModalOpen.value = true
}

// 🟢 Submit Pesanan Transport
async function handleConfirmSubmit() {
  isConfirmModalOpen.value = false
  try {
    await orderStore.submitTransportOrder()
    isSuccessModalOpen.value = true
  } catch (err: any) {
    showToast(err.message || 'Gagal menyimpan pesanan transportasi.', 'Terjadi Kesalahan', 'error')
  }
}

// 🟢 Navigasi Pilihan Langkah Selanjutnya
function navigateToHotel() {
  isSuccessModalOpen.value = false
  router.push('/create-hotel-order')
}

function stayOnTransport() {
  isSuccessModalOpen.value = false
  // Tetap di halaman ini untuk menambah moda transport lain
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

      <!-- Form Transport & Keranjang -->
      <DynamicTransportSegment />
      <TravellerTableList />
    </div>

    <!-- Bottom Footer Bar dengan Modal Trigger -->
    <OrderFooterBar @submit-click="handleOpenConfirmModal" />

    <!-- Modal Pop-Up Konfirmasi Submit -->
    <ConfirmSubmitModal
      :is-open="isConfirmModalOpen"
      :is-submitting="orderStore.isSubmitting"
      title="Konfirmasi Pesanan Transportasi"
      description="Apakah Anda yakin ingin menambahkan pesanan transportasi ini ke Travel Order terpilih?"
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

    <!-- 🟢 MODAL PILIHAN LANGKAH SELANJUTNYA (Pesanan Transport Sukses) -->
    <Teleport to="body">
      <div
        v-if="isSuccessModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs font-body animate-fade-in"
      >
        <div
          class="bg-surfaceCard rounded-2xl max-w-md w-full p-6 shadow-xl border border-gray-100 space-y-5 text-center"
        >
          <div
            class="w-14 h-14 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center mx-auto shadow-inner"
          >
            <span class="material-symbols-outlined text-[36px]">flight_takeoff</span>
          </div>

          <div class="space-y-1.5">
            <h3 class="text-base sm:text-lg font-bold text-textPrimary font-headline">
              Pesanan Transportasi Berhasil Ditambahkan!
            </h3>
            <p class="text-xs text-textMuted leading-relaxed">
              Tiket transportasi telah terlampir pada Travel Order
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
              @click="navigateToHotel"
              class="w-full px-4 py-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer active:scale-[0.98]"
            >
              <span class="material-symbols-outlined text-[18px]">hotel</span>
              <span>Lanjut Pesan Hotel (Akomodasi)</span>
            </button>

            <button
              type="button"
              @click="stayOnTransport"
              class="w-full px-4 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-[0.98]"
            >
              <span class="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Pesan Transportasi Lainnya</span>
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
