import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import type { TravelOrderDetail } from '@/models/historyDetail'

function formatDateOnly(dateStr?: string) {
  if (!dateStr) return '-'
  return new Date(dateStr).toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

/**
 * Pembersihan total karakter Unicode panah agar menjadi <=> atau ->
 */
function formatRouteText(routeStr?: string): string {
  if (!routeStr) return '-'
  return (
    routeStr
      // Mengganti semua variasi Unicode panah bolak-balik dengan <=>
      .replace(/[\u21C4\u21C6\u2194\u21CE\u21D4\u21E4\u21E6\u21E8\u21E2]/g, ' <=> ')
      .replace(/⇄|↔|<=>|PP|pp/g, ' <=> ')
      // Mengganti panah satu arah dengan ->
      .replace(/[\u2192\u21D2\u2794\u279E\u27A1]/g, ' -> ')
      .replace(/→|=>/g, '-> ')
      // Merapikan spasi ganda berlebih
      .replace(/\s+/g, ' ')
      .trim()
  )
}

export function generateTravelOrderPdf(detail: TravelOrderDetail) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  })

  const isApproved = detail?.status === 'APPROVED'

  // ==========================================
  // 1. KOP SURAT FORMAL INSTANSI PUSAT
  // ==========================================
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(6, 95, 70) // Emerald 800
  doc.text('BPJS KETENAGAKERJAAN', 14, 15)

  doc.setFontSize(7.5)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(71, 85, 105)
  doc.text('BADAN PENYELENGGARA JAMINAN SOSIAL KETENAGAKERJAAN', 14, 19)

  doc.setFontSize(7)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 116, 139)
  doc.text(`${detail.unitKerjaNama || 'Kantor Wilayah'} — ${detail.toCode}`, 14, 22.5)

  // Status Badge (Kanan Atas)
  if (isApproved) {
    doc.setFillColor(236, 253, 245)
    doc.setDrawColor(167, 243, 208)
    doc.roundedRect(162, 11, 34, 6.5, 1, 1, 'FD')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(6, 95, 70)
    doc.text('e-TO RESMI', 179, 15.2, { align: 'center' })
  } else {
    doc.setFillColor(254, 243, 199)
    doc.setDrawColor(253, 230, 138)
    doc.roundedRect(162, 11, 34, 6.5, 1, 1, 'FD')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.setTextColor(180, 83, 9)
    doc.text('DRAFT e-TO', 179, 15.2, { align: 'center' })
  }

  // Garis Pemisah Utama Kop Surat
  doc.setDrawColor(6, 95, 70)
  doc.setLineWidth(0.8)
  doc.line(14, 26, 196, 26)

  // ==========================================
  // 2. JUDUL DOKUMEN & REGISTRASI
  // ==========================================
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(17, 24, 39)
  doc.text('FORMULIR ELECTRONIC TRAVEL ORDER (E-TO)', 105, 33, { align: 'center' })

  doc.setFontSize(8)
  doc.setFont('courier', 'bold')
  doc.setTextColor(6, 95, 70)
  doc.text(`NOMOR REGISTRASI: ${detail.toCode}/${detail.unitKerjaKode || ''}`, 105, 37, {
    align: 'center',
  })

  // ==========================================
  // 3. TABEL METADATA PENUGASAN
  // ==========================================
  autoTable(doc, {
    startY: 40,
    margin: { left: 14, right: 14 },
    theme: 'grid',
    headStyles: { fillColor: [248, 250, 252] },
    styles: {
      fontSize: 7.5,
      cellPadding: 2.5,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
      valign: 'middle',
    },
    body: [
      [
        { content: `NO. SPRIN:\n${detail.sprinNumber || '-'}`, styles: { fontStyle: 'bold' } },
        {
          content: `TGL DITERBITKAN:\n${formatDateOnly(detail.orderDate)}`,
          styles: { fontStyle: 'bold' },
        },
        { content: `MAK:\n${detail.budgetAccountNumber || '-'}`, styles: { fontStyle: 'bold' } },
        { content: `BOOKER:\n${detail.bookerNama || '-'}`, styles: { fontStyle: 'bold' } },
      ],
      [
        {
          content: `DASAR PENUGASAN:\n${detail.activityName || ''} — ${detail.sprinDetail || ''}`,
          colSpan: 4,
          styles: { fontStyle: 'normal', fillColor: [255, 255, 255] },
        },
      ],
    ],
  })

  // ==========================================
  // 4. SECTION 1: MANIFEST DELEGASI & TIKET
  // ==========================================
  let currentY = (doc as any).lastAutoTable.finalY + 6

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(15, 23, 42)
  doc.text('1. MANIFEST DELEGASI & TIKET', 14, currentY)

  doc.setFontSize(7.5)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 116, 139)
  doc.text(`Total ${detail.transports?.length || 0} Personel`, 196, currentY, { align: 'right' })

  const tableTransports = (detail.transports || []).map((item, index) => [
    index + 1,
    `${item.guestName}\nNPK/KTP: ${item.npkOrKtp || '-'}`,
    item.jabatan || item.instansi || '-',
    `${formatRouteText(item.routeInfo)}\n${item.maskapai || '-'}`,
    `${formatDateOnly(item.departureDate)}\n${item.departureTime ? item.departureTime.substring(0, 5) + ' WIB' : ''}`,
  ])

  autoTable(doc, {
    startY: currentY + 2,
    margin: { left: 14, right: 14 },
    head: [['NO', 'NAMA & IDENTITAS', 'JABATAN DINAS', 'RUTE & MASKAPAI', 'KEBERANGKATAN']],
    body: tableTransports,
    theme: 'grid',
    headStyles: {
      fillColor: [241, 245, 249],
      textColor: [71, 85, 105],
      fontSize: 7.5,
      fontStyle: 'bold',
      halign: 'left',
    },
    styles: {
      fontSize: 7.5,
      cellPadding: 2.5,
      textColor: [30, 41, 59],
      valign: 'middle',
      lineColor: [226, 232, 240],
      lineWidth: 0.1,
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10, fontStyle: 'bold', textColor: [100, 116, 139] },
      1: { cellWidth: 50 },
      2: { cellWidth: 50 },
      3: { cellWidth: 42, fontStyle: 'bold' }, // Menjadikan rute lebih tegas & rapi
      4: { halign: 'center', cellWidth: 30 },
    },
  })

  // ==========================================
  // 5. SECTION 2: AKOMODASI HOTEL
  // ==========================================
  currentY = (doc as any).lastAutoTable.finalY + 6

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(9)
  doc.setTextColor(15, 23, 42)
  doc.text('2. RESERVASI AKOMODASI HOTEL', 14, currentY)

  const tableHotels =
    detail.hotels && detail.hotels.length > 0
      ? detail.hotels.map((h, i) => [
          i + 1,
          `${h.hotelNameCustom || '-'}\n${h.cityName || '-'}`,
          `${h.roomCount || 1} Kamar`,
          `Check-In: ${formatDateOnly(h.checkInDate)}\nCheck-Out: ${formatDateOnly(h.checkOutDate)}`,
          `DURASI: ${h.durationNights || 1} MALAM`,
        ])
      : [['-', 'Tidak ada reservasi akomodasi hotel.', '-', '-', '-']]

  autoTable(doc, {
    startY: currentY + 2,
    margin: { left: 14, right: 14 },
    head: [['NO', 'NAMA HOTEL & KOTA', 'JUMLAH KAMAR', 'PERIODE IN / OUT', 'DURASI']],
    body: tableHotels,
    theme: 'grid',
    headStyles: {
      fillColor: [248, 250, 252],
      textColor: [71, 85, 105],
      fontSize: 7.5,
      fontStyle: 'bold',
    },
    styles: {
      fontSize: 7.5,
      cellPadding: 2.5,
      textColor: [30, 41, 59],
      valign: 'middle',
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { halign: 'center', cellWidth: 10 },
      2: { halign: 'center' },
      4: { halign: 'center', fontStyle: 'bold' },
    },
  })

  // ==========================================
  // 6. TANDA TANGAN & LEGALITAS PEJABAT
  // ==========================================
  currentY = (doc as any).lastAutoTable.finalY + 8

  if (currentY > 230) {
    doc.addPage()
    currentY = 20
  }

  // Blok Verifikasi BSrE Digital (Kiri)
  doc.setDrawColor(226, 232, 240)
  doc.setFillColor(248, 250, 252)
  doc.roundedRect(14, currentY, 80, 32, 1.5, 1.5, 'FD')

  doc.setFillColor(30, 41, 59)
  doc.rect(18, currentY + 4, 24, 24, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(5.5)
  doc.setFont('courier', 'bold')
  doc.text('[QR BSrE]', 30, currentY + 17, { align: 'center' })

  doc.setTextColor(6, 95, 70)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(7.5)
  doc.text(isApproved ? 'TERVERIFIKASI DIGITAL' : 'DRAFT PRATINJAU', 46, currentY + 8)

  doc.setTextColor(100, 116, 139)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(6.5)
  const bSreDesc = isApproved
    ? 'Dokumen ini telah ditandatangani secara elektronik menggunakan sertifikat elektronik resmi BSrE.'
    : 'Dokumen pratinjau internal, belum memiliki legalitas hukum otorisasi pejabat.'
  doc.text(doc.splitTextToSize(bSreDesc, 45), 46, currentY + 12)

  // Blok Tanda Tangan Pejabat (Kanan)
  doc.setTextColor(71, 85, 105)
  doc.setFontSize(7.5)
  doc.setFont('helvetica', 'normal')
  doc.text(`Diterbitkan pada ${formatDateOnly(detail.createdAt)}`, 155, currentY + 4, {
    align: 'center',
  })

  doc.setFont('helvetica', 'bold')
  doc.setTextColor(15, 23, 42)
  doc.text('Menyetujui Penugasan,', 155, currentY + 8, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 116, 139)
  doc.setFontSize(7)
  doc.text(detail.approverJabatan || 'Kepala Kantor Wilayah', 155, currentY + 12, {
    align: 'center',
  })

  if (isApproved) {
    doc.setDrawColor(167, 243, 208)
    doc.setFillColor(236, 253, 245)
    doc.roundedRect(125, currentY + 14, 60, 10, 1, 1, 'FD')
    doc.setTextColor(6, 95, 70)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.text('BSrE DIGITALLY SIGNED', 155, currentY + 20, { align: 'center' })
  } else {
    doc.setDrawColor(253, 230, 138)
    doc.setFillColor(254, 243, 199)
    doc.roundedRect(125, currentY + 14, 60, 10, 1, 1, 'FD')
    doc.setTextColor(180, 83, 9)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(7)
    doc.text('MENUNGGU OTORISASI PEJABAT', 155, currentY + 20, { align: 'center' })
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(8)
  doc.setTextColor(15, 23, 42)
  doc.text(detail.approverNama || 'Pejabat Penyetuju', 155, currentY + 29, { align: 'center' })

  // ==========================================
  // 7. FOOTER HALAMAN
  // ==========================================
  const pageCount = (doc as any).internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setDrawColor(226, 232, 240)
    doc.setLineWidth(0.3)
    doc.line(14, 283, 196, 283)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(6.5)
    doc.setTextColor(148, 163, 184)
    doc.text(
      'Dokumen Resmi Elektronik BPJS Ketenagakerjaan (UU ITE No. 11/2008 Ps. 5) • Hak Cipta Direktorat Utama',
      14,
      287,
    )
    doc.text(`Halaman ${i} dari ${pageCount}`, 196, 287, { align: 'right' })
  }

  // Simpan File PDF
  const fileName = `Formulir_eTO_${detail.toCode ? detail.toCode.replace(/\//g, '_') : 'download'}.pdf`
  doc.save(fileName)
}
