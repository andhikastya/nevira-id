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
  /** Short line for nav, cards and footer. */
  summary: string;
  icon: string;
  group: FeatureGroup;
  devices: string[];
  /** Screenshot shown when the 3D scene is off (see content/screens.ts). */
  screen: string;
  hero: { title: string; body: string; primary?: "signup" | "contact" };
  stations: [FeatureStationCopy, FeatureStationCopy, FeatureStationCopy];
  capabilities: { title: string; body: string }[];
  related: FeatureSlug[];
  cta?: { title: string; body: string };
};

export const FEATURE_GROUPS: Record<FeatureGroup, string> = {
  outlet: "Operasional outlet",
  manajemen: "Pemilik & manajemen",
  lainnya: "Model bisnis lain",
};

export const FEATURES: Feature[] = [
  {
    slug: "kasir-pos",
    name: "Kasir & POS Tablet",
    summary: "Harga bertingkat, tunai/QRIS/EDC/transfer, struk Bluetooth, deposit.",
    icon: "ri-store-2-line",
    group: "outlet",
    devices: ["HP", "Tablet", "Printer Bluetooth"],
    screen: "/screens/pos-kasir.png",
    hero: {
      title: "Kasir yang cepat, di HP maupun tablet.",
      body: "Catat order, terima pembayaran, dan cetak struk dari satu aplikasi yang menyesuaikan perangkat.",
    },
    stations: [
      {
        title: "Katalog & harga bertingkat",
        body: "Pilih layanan per kategori, harga bertingkat, express, dan tipe order. Simpan sebagai draft bila belum selesai.",
        points: ["Kategori layanan & pencarian", "Harga bertingkat & express", "Draft order"],
      },
      {
        title: "Empat cara bayar, satu catatan",
        body: "Tunai, QRIS, EDC, transfer, atau bayar nanti. Piutang bisa dilunasi kemudian.",
        points: ["Tunai · QRIS · EDC · transfer", "Bayar sekarang atau nanti", "Pelunasan piutang & bukti bayar"],
      },
      {
        title: "Struk dicetak atau dibagikan",
        body: "Hubungkan printer thermal Bluetooth, atau bagikan struk ke WhatsApp pelanggan.",
        points: ["Printer thermal Bluetooth", "Bagikan ke WhatsApp", "Pengaturan isi struk"],
      },
    ],
    capabilities: [
      { title: "Pelunasan & piutang", body: "Catat pelunasan order yang belum lunas." },
      { title: "Void & refund", body: "Diajukan kasir, disetujui owner." },
      { title: "Transfer order", body: "Pindahkan order antar outlet." },
      { title: "Multi-outlet", body: "Pilih outlet saat masuk." },
      { title: "Data pelanggan", body: "Kontak dan riwayat transaksi." },
      { title: "Petty cash", body: "Kas kecil outlet dengan verifikasi PIN dan ringkasan harian." },
    ],
    related: ["produksi", "antar-jemput", "aplikasi-owner"],
  },
  {
    slug: "produksi",
    name: "Produksi",
    summary: "Daftar kerja, tahapan per staf, packing, rak.",
    icon: "ri-t-shirt-air-line",
    group: "outlet",
    devices: ["HP", "Tablet"],
    screen: "/screens/pos-produksi.png",
    hero: {
      title: "Ruang cuci yang tahu apa yang dikerjakan.",
      body: "Staf mengambil order dari antrean dan mencatat tiap tahap sampai siap diambil.",
    },
    stations: [
      {
        title: "Daftar kerja dari antrean",
        body: "Pilih order yang belum diproses dan jadikan daftar kerja, satu per satu atau sekaligus.",
        points: ["Order belum selesai", "Tambah ke daftar kerja (massal)", "Filter per status"],
      },
      {
        title: "Tahapan per staf",
        body: "Setiap tahap dicatat lengkap dengan staf yang mengerjakan.",
        points: ["Tahapan produksi", "Staf per tahap", "Catatan per order"],
      },
      {
        title: "Packing & rak",
        body: "Tandai packing selesai dan simpan di rak agar mudah dicari.",
        points: ["Packing", "Penempatan rak", "Foto & video order"],
      },
    ],
    capabilities: [
      { title: "Pengaturan produksi", body: "Atur tahap di back office." },
      { title: "Per outlet", body: "Antrean terpisah per outlet." },
      { title: "Level akses", body: "Staf hanya melihat tugasnya." },
      { title: "Detail order", body: "Layanan, berat, dan catatan." },
      { title: "Satu data", body: "Kasir dan owner melihat status yang sama." },
      { title: "Tampilan tablet", body: "Cocok untuk meja produksi." },
    ],
    related: ["kasir-pos", "antar-jemput", "karyawan-absensi"],
  },
  {
    slug: "antar-jemput",
    name: "Antar-Jemput",
    summary: "Jadwal, penugasan massal, foto bukti serah terima.",
    icon: "ri-e-bike-2-line",
    group: "outlet",
    devices: ["HP", "Web"],
    screen: "/screens/pos-kurir.png",
    hero: {
      title: "Jemput-antar terjadwal, bukan tebakan.",
      body: "Atur jadwal kurir dari back office, tugaskan order sekaligus, dan simpan bukti serah terima.",
    },
    stations: [
      {
        title: "Jadwal delivery",
        body: "Atur jadwal jemput-antar per kurir di back office, termasuk pengiriman tanpa jadwal.",
        points: ["Jadwal per kurir", "Pengiriman tanpa jadwal", "Pengaturan kurir"],
      },
      {
        title: "Penugasan massal",
        body: "Tugaskan banyak order sekaligus, ganti kurir, ubah tanggal, dan atur prioritas.",
        points: ["Tugaskan massal", "Ganti kurir & jadwal ulang", "Prioritas order"],
      },
      {
        title: "Bukti serah terima",
        body: "Kurir mengunggah foto saat menyerahkan cucian; status pengiriman ikut berubah.",
        points: ["Terjadwal · berjalan · riwayat", "Foto bukti serah terima", "Jemput & drop-off"],
      },
    ],
    capabilities: [
      { title: "Pengaturan kurir", body: "Atur di back office." },
      { title: "Per outlet", body: "Kurir per outlet." },
      { title: "Detail order", body: "Isi dan catatan order." },
      { title: "Kontak pelanggan", body: "Alamat dan nomor di satu tempat." },
      { title: "Riwayat", body: "Jejak setiap pengantaran." },
      { title: "Satu data", body: "Kasir dan owner melihat status yang sama." },
    ],
    related: ["produksi", "kasir-pos", "aplikasi-owner"],
  },
  {
    slug: "aplikasi-owner",
    name: "Aplikasi Owner",
    summary: "Omzet, piutang, persetujuan void & refund, top-up koin.",
    icon: "ri-smartphone-line",
    group: "manajemen",
    devices: ["HP"],
    screen: "/screens/admin.png",
    hero: {
      title: "Pantau bisnis dari HP, kapan saja.",
      body: "Ringkasan omzet, piutang, dan persetujuan penting ada di aplikasi owner.",
    },
    stations: [
      {
        title: "Ringkasan & omzet harian",
        body: "Lihat ringkasan operasional, omzet harian, dan pelanggan dengan belanja tertinggi.",
        points: ["Omzet harian", "Ringkasan operasional", "Pelanggan teratas"],
      },
      {
        title: "Persetujuan dari HP",
        body: "Setujui void, refund, dan refund deposit tanpa harus ke outlet. Dilindungi PIN owner.",
        points: ["Void & refund", "Refund deposit", "PIN keamanan"],
      },
      {
        title: "Saldo & dana",
        body: "Isi Saldo Koin, pantau piutang, dan tarik dana self-service ke rekening.",
        points: ["Top-up Saldo Koin", "Piutang pelanggan", "Penarikan dana self-service"],
      },
    ],
    capabilities: [
      { title: "Laporan penjualan", body: "Ringkasan penjualan dari HP." },
      { title: "Monitor mesin", body: "Status mesin self-service." },
      { title: "Tagihan langganan", body: "Lihat dan bayar tagihan self-service." },
      { title: "Rekening bank", body: "Kelola rekening penarikan." },
      { title: "Notifikasi", body: "Kabar penting langsung ke HP." },
      { title: "Multi-outlet", body: "Pindah antar outlet." },
    ],
    related: ["back-office", "self-service", "kasir-pos"],
  },
  {
    slug: "back-office",
    name: "Back Office & Laporan",
    summary: "Laporan penjualan, akuntansi, master data, promo.",
    icon: "ri-dashboard-line",
    group: "manajemen",
    devices: ["Web"],
    screen: "/screens/admin.png",
    hero: {
      title: "Semua angka bisnis di satu dashboard.",
      body: "Back office web untuk laporan, akuntansi, master data, dan pengaturan semua outlet.",
    },
    stations: [
      {
        title: "Laporan penjualan",
        body: "Ringkasan penjualan, laporan keuangan, pelanggan, dan performa layanan.",
        points: ["Ringkasan penjualan", "Laporan pelanggan", "Performa layanan"],
      },
      {
        title: "Akuntansi lengkap",
        body: "Arus kas, laba rugi, neraca, jurnal, buku besar, dan daftar akun.",
        points: ["Arus kas & laba rugi", "Neraca & buku besar", "Jurnal & daftar akun"],
      },
      {
        title: "Master data & pengaturan",
        body: "Kelola outlet, layanan, pelanggan, promo, karyawan, dan level akses.",
        points: ["Outlet & layanan", "Pelanggan & promo", "Karyawan & level akses"],
      },
    ],
    capabilities: [
      { title: "Dashboard investor", body: "Ringkasan untuk investor." },
      { title: "Void & refund", body: "Pantau void, refund layanan dan deposit." },
      { title: "Transfer order", body: "Pengaturan, konfirmasi, laporan." },
      { title: "Mutasi deposit", body: "Riwayat saldo deposit pelanggan." },
      { title: "Pengaturan operasional", body: "Transaksi, produksi, absensi, kurir, petty cash, struk." },
      { title: "Saldo Koin", body: "Riwayat pemakaian koin." },
    ],
    related: ["aplikasi-owner", "karyawan-absensi", "kasir-pos"],
  },
  {
    slug: "self-service",
    name: "Self-Service",
    summary: "Monitor mesin, sesi, maintenance, penarikan dana.",
    icon: "ri-shirt-line",
    group: "lainnya",
    devices: ["HP", "Web"],
    screen: "/screens/admin.png",
    hero: {
      title: "Laundry self service, terpantau dari mana saja.",
      body: "Pantau mesin, kelola sesi, dan terima laporan untuk outlet self-service.",
      primary: "contact",
    },
    stations: [
      {
        title: "Monitor mesin",
        body: "Lihat status setiap mesin per outlet, tandai maintenance, dan pasangkan perangkat baru.",
        points: ["Status mesin per outlet", "Mode maintenance", "Pairing perangkat"],
      },
      {
        title: "Sesi pelanggan",
        body: "Mulai sesi secara manual atau hentikan paksa bila ada kendala.",
        points: ["Daftar & detail sesi", "Mulai manual", "Hentikan paksa"],
      },
      {
        title: "Laporan & dana",
        body: "Laporan dan keuangan self-service, tagihan langganan, dan penarikan dana ke rekening.",
        points: ["Laporan self-service", "Tagihan langganan", "Penarikan ke rekening"],
      },
    ],
    capabilities: [
      { title: "Layanan self-service", body: "Layanan dan harga mesin." },
      { title: "Mesin & perangkat", body: "Daftar mesin dan perangkat." },
      { title: "Aktivasi mesin", body: "Aktifkan atau nonaktifkan mesin." },
      { title: "Absensi operator", body: "Kehadiran operator." },
      { title: "Petty cash", body: "Kas kecil outlet." },
      { title: "Aplikasi owner", body: "Mesin dan dana dari HP." },
    ],
    related: ["aplikasi-owner", "back-office", "karyawan-absensi"],
    cta: { title: "Punya laundry self-service?", body: "Ceritakan jumlah mesin Anda, tim kami bantu siapkan." },
  },
  {
    slug: "karyawan-absensi",
    name: "Karyawan & Absensi",
    summary: "GPS, QR/RFID, level akses, laporan kehadiran.",
    icon: "ri-fingerprint-line",
    group: "manajemen",
    devices: ["HP", "Web"],
    screen: "/screens/admin.png",
    hero: {
      title: "Absensi tanpa titip absen.",
      body: "Check-in dengan lokasi GPS, QR, atau kartu RFID, lalu pantau kehadiran dan performa tim.",
    },
    stations: [
      {
        title: "Check-in yang terverifikasi",
        body: "Validasi lokasi GPS saat check-in, atau scan QR, kartu RFID, dan NIP.",
        points: ["Lokasi GPS", "Scan QR", "RFID · NIP"],
      },
      {
        title: "Riwayat & laporan",
        body: "Riwayat kehadiran per karyawan, laporan absensi, dan performa karyawan di back office.",
        points: ["Riwayat kehadiran", "Laporan absensi", "Performa karyawan"],
      },
      {
        title: "Level akses & daftar karyawan",
        body: "Atur peran dan hak akses tiap karyawan, dan kelola daftar karyawan.",
        points: ["Level akses per peran", "Daftar karyawan", "Pengaturan absensi"],
      },
    ],
    capabilities: [
      { title: "Pengaturan absensi", body: "Aturan absensi per outlet." },
      { title: "Laporan absensi", body: "Rekap kehadiran di back office." },
      { title: "Laporan performa", body: "Performa karyawan di back office." },
      { title: "Pilih outlet", body: "Karyawan multi-outlet." },
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
