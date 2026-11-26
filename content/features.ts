// Feature pages (/fitur/<slug>). Every claim here was checked against the lessworry-fe and
// lessworry-mobile repos.
import type { Metadata } from "next";
import type { FeatureSlug } from "@/components/three/stations";

export type FeatureGroup = "outlet" | "manajemen" | "lainnya";

export type FeatureStationCopy = {
  title: string;
  body: string;
  points: string[];
};

export type Feature = {
  slug: FeatureSlug;
  name: string;
  /** Label in the header Fitur dropdown (falls back to name). */
  navName?: string;
  /** Short line for nav, cards and footer. */
  summary: string;
  icon: string;
  group: FeatureGroup;
  devices: string[];
  /** Screenshot shown when the 3D scene is off (see content/screens.ts). */
  screen: string;
  hero: { title: string; body: string; points?: string[]; primary?: "signup" | "contact" };
  stations: [FeatureStationCopy, FeatureStationCopy, FeatureStationCopy];
  capabilities: { title: string; body: string }[];
  related: FeatureSlug[];
  cta?: { title: string; body: string };
  /** Heading for the capability grid; defaults to "Semua kemampuan" / "Yang juga ada di <name>". */
  caps?: { eyebrow: string; title: string };
  /** Hide the feature-name badge on each station panel. */
  hideStationBadge?: boolean;
};

export const FEATURE_GROUPS: Record<FeatureGroup, string> = {
  outlet: "Operasional outlet",
  manajemen: "Pemilik & manajemen",
  lainnya: "Model bisnis lain",
};

export const FEATURES: Feature[] = [
  {
    slug: "kasir-pos",
    navName: "Sistem Kasir",
    name: "Kasir & POS Tablet",
    summary: "Harga bertingkat, tunai/QRIS/EDC/transfer, struk Bluetooth, deposit.",
    icon: "ri-store-2-line",
    group: "outlet",
    devices: ["HP", "Tablet", "Printer Bluetooth"],
    screen: "/screens/pos-kasir.png",
    hero: {
      title: "Lewat HP maupun Tablet, Kasir Bisa Input Transaksi",
      body: "Sistem pencatatan kasir yang lengkap dan tepat.",
    },
    caps: { eyebrow: "Sesuaikan dengan kebutuhan laundry", title: "Apa yang Bisa Dilakukan Kasir" },
    hideStationBadge: true,
    stations: [
      {
        title: "Katalog & Harga Bertingkat",
        body: "Pilih layanan per kategori, harga bertingkat, express, dan tipe order. Simpan sebagai draft bila belum selesai.",
        points: ["Kategori layanan & pencarian", "Harga bertingkat & express", "Draft order"],
      },
      {
        title: "Empat Cara Bayar, Satu Catatan",
        body: "Tunai, QRIS, EDC, transfer, atau bayar nanti. Piutang bisa dilunasi kemudian.",
        points: ["Tunai · QRIS · EDC · transfer", "Bayar sekarang atau nanti", "Pelunasan piutang & bukti bayar"],
      },
      {
        title: "Struk Dicetak atau Dibagikan",
        body: "Hubungkan printer thermal Bluetooth, atau bagikan struk ke WhatsApp pelanggan.",
        points: ["Printer thermal Bluetooth", "Bagikan ke WhatsApp", "Pengaturan isi struk"],
      },
    ],
    capabilities: [
      { title: "Pelunasan & Piutang", body: "Catat pelunasan order yang belum lunas." },
      { title: "Void & Refund", body: "Diajukan kasir, disetujui owner." },
      { title: "Transfer Order", body: "Pindahkan order antar outlet." },
      { title: "Multi-Outlet", body: "Pilih outlet saat masuk." },
      { title: "Data Pelanggan", body: "Kontak dan riwayat transaksi." },
      { title: "Petty Cash", body: "Kas kecil outlet dengan verifikasi PIN dan ringkasan harian." },
    ],
    related: ["produksi", "antar-jemput", "aplikasi-owner"],
  },
  {
    slug: "produksi",
    navName: "Sistem Produksi",
    name: "Produksi",
    summary: "Daftar kerja, tahapan per staf, packing, rak.",
    icon: "ri-t-shirt-air-line",
    group: "outlet",
    devices: ["HP", "Tablet"],
    screen: "/screens/pos-produksi.png",
    hero: {
      title: "Owner Tahu Apa yang Dikerjakan Karyawan secara Real Time",
      body: "Memulai dan menyelesaikan tiap tahap produksi secara runtut.",
      points: [
        "Waktu pengerjaan tiap tahap tercatat",
        "Tahap produksi tidak akan tertukar dan tercampur",
        "Customer bisa pantau tahap produksi dari struk digital",
      ],
    },
    stations: [
      {
        title: "Daftar Kerja dari Antrean",
        body: "Pilih order yang belum diproses dan jadikan daftar kerja, satu per satu atau sekaligus.",
        points: ["Order belum selesai", "Tambah ke daftar kerja (massal)", "Filter per status"],
      },
      {
        title: "Tahapan per Staf",
        body: "Setiap tahap dicatat lengkap dengan staf yang mengerjakan.",
        points: ["Tahapan produksi", "Staf per tahap", "Catatan per order"],
      },
      {
        title: "Packing & Rak",
        body: "Tandai packing selesai dan simpan di rak agar mudah dicari.",
        points: ["Packing", "Penempatan rak", "Foto & video order"],
      },
    ],
    capabilities: [
      { title: "Pengaturan Produksi", body: "Atur tahap di back office." },
      { title: "Per Outlet", body: "Antrean terpisah per outlet." },
      { title: "Level Akses", body: "Staf hanya melihat tugasnya." },
      { title: "Detail Order", body: "Layanan, berat, dan catatan." },
      { title: "Satu Data", body: "Kasir dan owner melihat status yang sama." },
      { title: "Tampilan Tablet", body: "Cocok untuk meja produksi." },
    ],
    related: ["kasir-pos", "antar-jemput", "karyawan-absensi"],
  },
  {
    slug: "antar-jemput",
    navName: "Sistem Kurir",
    name: "Antar-Jemput",
    summary: "Jadwal, penugasan massal, foto bukti serah terima.",
    icon: "ri-e-bike-2-line",
    group: "outlet",
    devices: ["HP", "Web"],
    screen: "/screens/pos-kurir.png",
    hero: {
      title: "Kurir Punya Jadwal dan Rute Antar Jemput yang Terintegrasi",
      body: "Atur jadwal kurir melalui back office/sistem kasir.",
    },
    stations: [
      {
        title: "Jadwal Delivery",
        body: "Atur jadwal jemput-antar per kurir di back office, termasuk pengiriman tanpa jadwal.",
        points: ["Jadwal per kurir", "Pengiriman tanpa jadwal", "Pengaturan kurir"],
      },
      {
        title: "Penugasan Massal",
        body: "Tugaskan banyak order sekaligus, ganti kurir, ubah tanggal, dan atur prioritas.",
        points: ["Tugaskan massal", "Ganti kurir & jadwal ulang", "Prioritas order"],
      },
      {
        title: "Bukti Serah Terima",
        body: "Kurir mengunggah foto saat menyerahkan cucian; status pengiriman ikut berubah.",
        points: ["Terjadwal · berjalan · riwayat", "Foto bukti serah terima", "Jemput & drop-off"],
      },
    ],
    capabilities: [
      { title: "Pengaturan Kurir", body: "Atur di back office." },
      { title: "Per Outlet", body: "Kurir per outlet." },
      { title: "Detail Order", body: "Isi dan catatan order." },
      { title: "Kontak Pelanggan", body: "Alamat dan nomor di satu tempat." },
      { title: "Riwayat", body: "Jejak setiap pengantaran." },
      { title: "Satu Data", body: "Kasir dan owner melihat status yang sama." },
    ],
    related: ["produksi", "kasir-pos", "aplikasi-owner"],
  },
  {
    slug: "aplikasi-owner",
    navName: "Aplikasi Owner",
    name: "Aplikasi Owner",
    summary: "Omzet, piutang, persetujuan void & refund, top-up koin.",
    icon: "ri-smartphone-line",
    group: "manajemen",
    devices: ["HP"],
    screen: "/screens/admin.png",
    hero: {
      title: "Pantau Bisnis dari HP, Kapan Saja.",
      body: "Ringkasan omzet, piutang, dan persetujuan penting ada di aplikasi owner.",
    },
    stations: [
      {
        title: "Ringkasan & Omzet Harian",
        body: "Lihat ringkasan operasional, omzet harian, dan pelanggan dengan belanja tertinggi.",
        points: ["Omzet harian", "Ringkasan operasional", "Pelanggan teratas"],
      },
      {
        title: "Persetujuan dari HP",
        body: "Setujui void, refund, dan refund deposit tanpa harus ke outlet. Dilindungi PIN owner.",
        points: ["Void & refund", "Refund deposit", "PIN keamanan"],
      },
      {
        title: "Saldo & Dana",
        body: "Isi Saldo Koin, pantau piutang, dan tarik dana self-service ke rekening.",
        points: ["Top-up Saldo Koin", "Piutang pelanggan", "Penarikan dana self-service"],
      },
    ],
    capabilities: [
      { title: "Laporan Penjualan", body: "Ringkasan penjualan dari HP." },
      { title: "Monitor Mesin", body: "Status mesin self-service." },
      { title: "Tagihan Langganan", body: "Lihat dan bayar tagihan self-service." },
      { title: "Rekening Bank", body: "Kelola rekening penarikan." },
      { title: "Notifikasi", body: "Kabar penting langsung ke HP." },
      { title: "Multi-Outlet", body: "Pindah antar outlet." },
    ],
    related: ["back-office", "self-service", "kasir-pos"],
  },
  {
    slug: "back-office",
    navName: "Back Office",
    name: "Back Office & Laporan",
    summary: "Laporan penjualan, akuntansi, master data, promo.",
    icon: "ri-dashboard-line",
    group: "manajemen",
    devices: ["Web"],
    screen: "/screens/admin.png",
    hero: {
      title: "Semua Angka Bisnis di Satu Dashboard.",
      body: "Back office web untuk laporan, akuntansi, master data, dan pengaturan semua outlet.",
    },
    stations: [
      {
        title: "Laporan Penjualan",
        body: "Ringkasan penjualan, laporan keuangan, pelanggan, dan performa layanan.",
        points: ["Ringkasan penjualan", "Laporan pelanggan", "Performa layanan"],
      },
      {
        title: "Akuntansi Lengkap",
        body: "Arus kas, laba rugi, neraca, jurnal, buku besar, dan daftar akun.",
        points: ["Arus kas & laba rugi", "Neraca & buku besar", "Jurnal & daftar akun"],
      },
      {
        title: "Master Data & Pengaturan",
        body: "Kelola outlet, layanan, pelanggan, promo, karyawan, dan level akses.",
        points: ["Outlet & layanan", "Pelanggan & promo", "Karyawan & level akses"],
      },
    ],
    capabilities: [
      { title: "Dashboard Investor", body: "Ringkasan untuk investor." },
      { title: "Void & Refund", body: "Pantau void, refund layanan dan deposit." },
      { title: "Transfer Order", body: "Pengaturan, konfirmasi, laporan." },
      { title: "Mutasi Deposit", body: "Riwayat saldo deposit pelanggan." },
      { title: "Pengaturan Operasional", body: "Transaksi, produksi, absensi, kurir, petty cash, struk." },
      { title: "Saldo Koin", body: "Riwayat pemakaian koin." },
    ],
    related: ["aplikasi-owner", "karyawan-absensi", "kasir-pos"],
  },
  {
    slug: "self-service",
    navName: "Penggunaan Nevira di Laundry Self Service",
    name: "Self-Service",
    summary: "Monitor mesin, sesi, maintenance, penarikan dana.",
    icon: "ri-shirt-line",
    group: "lainnya",
    devices: ["HP", "Web"],
    screen: "/screens/admin.png",
    hero: {
      title: "Solusi Digital untuk Operasional Laundry Self Service",
      body: "Laundry Self Service lebih hemat, tanpa extender device tambahan. Mesin bisa langsung terhubung dengan Nevira tanpa perlu dibongkar.",
      primary: "contact",
    },
    stations: [
      {
        title: "Monitor Mesin",
        body: "Lihat status setiap mesin per outlet, tandai maintenance, dan pasangkan perangkat baru.",
        points: ["Status mesin per outlet", "Mode maintenance", "Pairing perangkat"],
      },
      {
        title: "Sesi Pelanggan",
        body: "Mulai sesi secara manual atau hentikan paksa bila ada kendala.",
        points: ["Daftar & detail sesi", "Mulai manual", "Hentikan paksa"],
      },
      {
        title: "Laporan & Dana",
        body: "Laporan dan keuangan self-service, tagihan langganan, dan penarikan dana ke rekening.",
        points: ["Laporan self-service", "Tagihan langganan", "Penarikan ke rekening"],
      },
    ],
    capabilities: [
      { title: "Layanan Self-Service", body: "Layanan dan harga mesin." },
      { title: "Mesin & Perangkat", body: "Daftar mesin dan perangkat." },
      { title: "Aktivasi Mesin", body: "Aktifkan atau nonaktifkan mesin." },
      { title: "Absensi Operator", body: "Kehadiran operator." },
      { title: "Petty Cash", body: "Kas kecil outlet." },
      { title: "Aplikasi Owner", body: "Mesin dan dana dari HP." },
    ],
    related: ["aplikasi-owner", "back-office", "karyawan-absensi"],
    cta: { title: "Punya Laundry Self-Service?", body: "Ceritakan jumlah mesin Anda, tim kami bantu siapkan." },
  },
  {
    slug: "karyawan-absensi",
    navName: "Pengaturan Karyawan & Absensi",
    name: "Karyawan & Absensi",
    summary: "GPS, QR/RFID, level akses, laporan kehadiran.",
    icon: "ri-fingerprint-line",
    group: "manajemen",
    devices: ["HP", "Web"],
    screen: "/screens/admin.png",
    hero: {
      title: "Absensi tanpa Titip Absen.",
      body: "Check-in dengan lokasi GPS, QR, atau kartu RFID, lalu pantau kehadiran dan performa tim.",
    },
    stations: [
      {
        title: "Check-In yang Terverifikasi",
        body: "Validasi lokasi GPS saat check-in, atau scan QR, kartu RFID, dan NIP.",
        points: ["Lokasi GPS", "Scan QR", "RFID · NIP"],
      },
      {
        title: "Riwayat & Laporan",
        body: "Riwayat kehadiran per karyawan, laporan absensi, dan performa karyawan di back office.",
        points: ["Riwayat kehadiran", "Laporan absensi", "Performa karyawan"],
      },
      {
        title: "Level Akses & Daftar Karyawan",
        body: "Atur peran dan hak akses tiap karyawan, dan kelola daftar karyawan.",
        points: ["Level akses per peran", "Daftar karyawan", "Pengaturan absensi"],
      },
    ],
    capabilities: [
      { title: "Pengaturan Absensi", body: "Aturan absensi per outlet." },
      { title: "Laporan Absensi", body: "Rekap kehadiran di back office." },
      { title: "Laporan Performa", body: "Performa karyawan di back office." },
      { title: "Pilih Outlet", body: "Karyawan multi-outlet." },
    ],
    related: ["back-office", "produksi", "self-service"],
  },
];

export const featureBySlug = (slug: FeatureSlug) => FEATURES.find((f) => f.slug === slug)!;
export const featureHref = (slug: FeatureSlug) => `/fitur/${slug}`;

export const featureMetadata = (f: Feature): Metadata => ({
  title: f.name,
  description: f.hero.body,
  alternates: { canonical: featureHref(f.slug) },
  openGraph: { title: `${f.name} · Nevira`, description: f.hero.body, url: featureHref(f.slug) },
});
