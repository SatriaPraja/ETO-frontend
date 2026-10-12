// src/services/reportPdfService.ts
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type {
  HotelReportStats,
  HotelTransactionItem,
  TransportReportStats,
  TransportTransactionItem,
} from '@/models/reports'

function formatDateOnly(dateStr?: string | null) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatRupiah(val?: number | null) {
  if (val === undefined || val === null) return 'Rp 0'
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(val)
}

// 🟢 1. GENERATE PDF LAPORAN HOTEL & AKOMODASI
export function generateHotelReportPdf(
  stats: HotelReportStats | null,
  listData: HotelTransactionItem[],
) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const safeList = Array.isArray(listData) ? listData : []

  // Header & Kop Surat BPJS TK
  doc.setFont('helvetica', 'bold').setFontSize(14).setTextColor(6, 95, 70)
  doc.text('BPJS KETENAGAKERJAAN', 14, 15)

  doc.setFontSize(8).setTextColor(71, 85, 105)
  doc.text('BADAN PENYELENGGARA JAMINAN SOSIAL KETENAGAKERJAAN', 14, 19.5)

  doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(100, 116, 139)
  doc.text('DIREKTORAT UTAMA — LAPORAN RESERVASI HOTEL & AKOMODASI DINAS', 14, 23)

  doc.setDrawColor(6, 95, 70).setLineWidth(0.8).line(14, 26, 283, 26)
  doc.setDrawColor(209, 213, 219).setLineWidth(0.2).line(14, 27, 283, 27)

  // Judul Dokumen
  doc.setFontSize(11).setFont('helvetica', 'bold').setTextColor(17, 24, 39)
  doc.text('LAPORAN REKAPITULASI AKOMODASI & HOTEL DINAS', 14, 34)

  doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(100, 116, 139)
  doc.text(`Tanggal Cetak: ${formatDateOnly(new Date().toISOString())} WIB`, 283, 34, {
    align: 'right',
  })

  // KPI Metrics Box
  autoTable(doc, {
    startY: 38,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    headStyles: { fillColor: [248, 250, 252] },
    styles: {
      fontSize: 8,
      cellPadding: 3,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
      valign: 'middle',
    },
    body: [
      [
        {
          content: `TOTAL RESERVASI:\n${stats?.totalReservasi || 0} Reservasi`,
          styles: { fontStyle: 'bold' },
        },
        { content: `TOTAL KAMAR:\n${stats?.totalKamar || 0} Kamar`, styles: { fontStyle: 'bold' } },
        {
          content: `TOTAL ROOM-NIGHTS:\n${stats?.totalRoomNights || 0} Malam`,
          styles: { fontStyle: 'bold' },
        },
        {
          content: `TOTAL BEBAN HOTEL:\n${formatRupiah(stats?.totalBebanHotel || 0)}`,
          styles: { fontStyle: 'bold', textColor: [6, 95, 70] },
        },
      ],
    ],
  })

  // Table Transaksi Hotel
  const currentY = (doc as any).lastAutoTable.finalY + 6
  const tableBody = safeList.map((item, index) => [
    index + 1,
    item.toCode || '-',
    `${item.hotelName || '-'}\n${item.starRating ? `(Bintang ${item.starRating})` : ''}`,
    item.cityName || '-',
    formatDateOnly(item.checkInDate),
    formatDateOnly(item.checkOutDate),
    `${item.durationNights || 1} Malam`,
    `${item.roomCount || 1} Kamar`,
    formatRupiah(item.pricePerNight),
    formatRupiah(item.subtotalPrice),
  ])

  autoTable(doc, {
    startY: currentY,
    margin: { left: 14, right: 14 },
    head: [
      [
        'NO',
        'NO. E-TO',
        'NAMA HOTEL & BINTANG',
        'KOTA',
        'CHECK-IN',
        'CHECK-OUT',
        'DURASI',
        'KAMAR',
        'TARIF / MALAM',
        'SUBTOTAL',
      ],
    ],
    body: tableBody,
    theme: 'grid',
    headStyles: {
      fillColor: [6, 95, 70],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'center',
    },
    styles: { fontSize: 7.5, cellPadding: 2.5, textColor: [30, 41, 59], valign: 'middle' },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      1: { halign: 'center', cellWidth: 32, fontStyle: 'bold' },
      2: { cellWidth: 55 },
      3: { cellWidth: 25 },
      4: { halign: 'center', cellWidth: 24 },
      5: { halign: 'center', cellWidth: 24 },
      6: { halign: 'center', cellWidth: 20 },
      7: { halign: 'center', cellWidth: 20 },
      8: { halign: 'right', cellWidth: 28 },
      9: { halign: 'right', cellWidth: 31, fontStyle: 'bold' },
    },
  })

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setDrawColor(226, 232, 240).setLineWidth(0.3).line(14, 198, 283, 198)
    doc.setFont('helvetica', 'normal').setFontSize(6.5).setTextColor(148, 163, 184)
    doc.text(
      'Dokumen Laporan Resmi Elektronik BPJS Ketenagakerjaan • Hak Cipta Direktorat Utama',
      14,
      202,
    )
    doc.text(`Halaman ${i} dari ${pageCount}`, 283, 202, { align: 'right' })
  }

  doc.save(`Laporan_Akomodasi_Hotel_${new Date().toISOString().split('T')[0]}.pdf`)
}

// 🟢 2. GENERATE PDF LAPORAN TRANSPORTASI
export function generateTransportReportPdf(
  stats: TransportReportStats | null,
  listData: TransportTransactionItem[],
) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const safeList = Array.isArray(listData) ? listData : []

  // Header & Kop Surat BPJS TK
  doc.setFont('helvetica', 'bold').setFontSize(14).setTextColor(6, 95, 70)
  doc.text('BPJS KETENAGAKERJAAN', 14, 15)

  doc.setFontSize(8).setTextColor(71, 85, 105)
  doc.text('BADAN PENYELENGGARA JAMINAN SOSIAL KETENAGAKERJAAN', 14, 19.5)

  doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(100, 116, 139)
  doc.text('DIREKTORAT UTAMA — LAPORAN HISTORY PERJALANAN DINAS TRANSPORTASI', 14, 23)

  doc.setDrawColor(6, 95, 70).setLineWidth(0.8).line(14, 26, 283, 26)
  doc.setDrawColor(209, 213, 219).setLineWidth(0.2).line(14, 27, 283, 27)

  // Judul Dokumen
  doc.setFontSize(11).setFont('helvetica', 'bold').setTextColor(17, 24, 39)
  doc.text('LAPORAN REKAPITULASI LOGISTIK TIKET & MANIFEST PERSONEL', 14, 34)

  doc.setFontSize(7.5).setFont('helvetica', 'normal').setTextColor(100, 116, 139)
  doc.text(`Tanggal Cetak: ${formatDateOnly(new Date().toISOString())} WIB`, 283, 34, {
    align: 'right',
  })

  // KPI Metrics Box
  autoTable(doc, {
    startY: 38,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    headStyles: { fillColor: [248, 250, 252] },
    styles: {
      fontSize: 8,
      cellPadding: 3,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
      valign: 'middle',
    },
    body: [
      [
        {
          content: `TOTAL PENGAJUAN:\n${stats?.totalPengajuan || 0} Order`,
          styles: { fontStyle: 'bold' },
        },
        {
          content: `DISETUJUI RESMI:\n${stats?.disetujuiResmi || 0} Order`,
          styles: { fontStyle: 'bold' },
        },
        {
          content: `TOTAL PERSONEL:\n${stats?.totalPersonel || 0} Traveller`,
          styles: { fontStyle: 'bold' },
        },
        {
          content: `REALISASI ANGGARAN:\n${formatRupiah(stats?.realisasiAnggaran || 0)}`,
          styles: { fontStyle: 'bold', textColor: [6, 95, 70] },
        },
      ],
    ],
  })

  // Table Transaksi Transportasi
  const currentY = (doc as any).lastAutoTable.finalY + 6
  const tableBody = safeList.map((item, index) => [
    index + 1,
    formatDateOnly(item.tglRekam),
    item.toCode || '-',
    `${item.guestName || '-'}\n${item.npkOrKtp ? `(${item.npkOrKtp})` : ''}`,
    item.category || 'INTERNAL',
    item.routeInfo || '-',
    formatDateOnly(item.departureDate),
    item.maskapai ? `${item.maskapai}\n(${item.transportType})` : item.transportType,
    formatRupiah(item.estimatedPrice),
  ])

  autoTable(doc, {
    startY: currentY,
    margin: { left: 14, right: 14 },
    head: [
      [
        'NO',
        'TGL REKAM',
        'NO. E-TO',
        'NAMA TRAVELLER & NPK',
        'KATEGORI',
        'RUTE PERJALANAN',
        'TGL BERANGKAT',
        'MODA & MASKAPAI',
        'ESTIMASI BIAYA',
      ],
    ],
    body: tableBody,
    theme: 'grid',
    headStyles: {
      fillColor: [6, 95, 70],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'center',
    },
    styles: { fontSize: 7.5, cellPadding: 2.5, textColor: [30, 41, 59], valign: 'middle' },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      1: { halign: 'center', cellWidth: 22 },
      2: { halign: 'center', cellWidth: 32, fontStyle: 'bold' },
      3: { cellWidth: 50 },
      4: { halign: 'center', cellWidth: 22 },
      5: { cellWidth: 35 },
      6: { halign: 'center', cellWidth: 25 },
      7: { cellWidth: 38 },
      8: { halign: 'right', cellWidth: 35, fontStyle: 'bold' },
    },
  })

  // Footer
  const pageCount = (doc as any).internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setDrawColor(226, 232, 240).setLineWidth(0.3).line(14, 198, 283, 198)
    doc.setFont('helvetica', 'normal').setFontSize(6.5).setTextColor(148, 163, 184)
    doc.text(
      'Dokumen Laporan Resmi Elektronik BPJS Ketenagakerjaan • Hak Cipta Direktorat Utama',
      14,
      202,
    )
    doc.text(`Halaman ${i} dari ${pageCount}`, 283, 202, { align: 'right' })
  }

  doc.save(`Laporan_Transportasi_Dinas_${new Date().toISOString().split('T')[0]}.pdf`)
}
