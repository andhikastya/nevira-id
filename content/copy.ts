// All landing-page copy lives here.
// NOTE: PROOF (stats + testimonials) and LINKS.whatsapp are sample content —
// replace with real data before launch.

export const LINKS = {
  signup: "https://backoffice.nevira.id/daftar-baru",
  login: "https://backoffice.nevira.id/login",
  terms: "https://nevira.id/terms-conditions",
  privacy: "https://nevira.id/privacy-policy",
  email: "mailto:help@nevira.id",
  // PLACEHOLDER: replace with the real WhatsApp business number.
  whatsapp: "https://wa.me/6280000000000?text=Halo%20Nevira%2C%20saya%20ingin%20tahu%20lebih%20lanjut",
} as const;

/** Top navigation. The item with `menu: "fitur"` opens the feature dropdown (content/features.ts). */
export const NAV: readonly { label: string; href: string; menu?: "fitur" }[] = [
  { label: "Beranda", href: "/" },
  { label: "Cara Kerja", href: "/#cara-kerja" },
  { label: "Fitur", href: "/fitur", menu: "fitur" },
  { label: "Harga", href: "/harga" },
  { label: "FAQ", href: "/bantuan" },
];

export const HERO = {
  eyebrow: "Sistem operasional laundry",
  title: "Laundry Anda rapi, dari terima sampai antar.",
  body: "Kasir, ruang cuci, kurir, owner, dan laporan keuangan dalam satu sistem. Tidak ada lagi nota hilang, order nyasar, atau laba yang cuma ditebak.",
  primary: "Coba Gratis",
  secondary: "Lihat cara kerjanya",
  trust: ["Bayar per transaksi", "HP & tablet", "Kirim struk via WhatsApp"],
} as const;

export const PROBLEM = {
  eyebrow: "Kenyataannya",
  title: "Bisnis laundry tumbuh, tapi catatannya masih di kertas.",
  items: [
    {
      icon: "ri-file-paper-2-line",
      title: "Nota hilang, cucian tertukar",
      body: "Nota tulisan tangan terselip, pesanan tertukar, dan Anda yang menanggung ganti ruginya.",
    },
    {
      icon: "ri-route-line",
      title: "Kurir jalan tanpa rute",
      body: "Jadwal jemput-antar tercecer di chat. Satu pesan terlewat, satu pelanggan menunggu tanpa kabar.",
    },
    {
      icon: "ri-question-line",
      title: "Laba cuma perkiraan",
      body: "Uang masuk dan keluar bercampur. Di akhir bulan, Anda tidak yakin berapa yang benar-benar untung.",
    },
  ],
} as const;

export const TURN = {
  eyebrow: "Titik balik",
  title: "Satu sistem untuk semuanya.",
  body: "Setiap order dicatat sekali, lalu mengalir sendiri: dari kasir ke ruang cuci, ke kurir, ke pelanggan, sampai ke laporan Anda.",
} as const;

export type JourneyStep = {
  key: "terima" | "proses" | "antar" | "selesai" | "laporan";
  step: string;
  module: string;
  icon: string;
  title: string;
  body: string;
  points: string[];
  /** Real app screenshot for this step (shown when the 3D scene is off). */
  screen?: string;
};

export const JOURNEY = {
  eyebrow: "Cara kerja",
  title: "Ikuti perjalanan satu order.",
  body: "Lima langkah dari kasir sampai laporan, semuanya tercatat sekali.",
  steps: [
    {
      key: "terima",
      step: "Terima",
      module: "POS Kasir",
      icon: "ri-store-2-line",
      title: "Order masuk dalam hitungan detik",
      body: "Pilih layanan, harga bertingkat, express. Bayar tunai, QRIS, EDC, transfer, atau nanti.",
      points: ["Katalog & harga bertingkat", "Tunai · QRIS · EDC · transfer", "Cetak & bagikan struk"],
      screen: "/screens/pos-kasir.png",
    },
    {
      key: "proses",
      step: "Proses",
      module: "POS Produksi",
      icon: "ri-t-shirt-air-line",
      title: "Ruang cuci tahu apa yang dikerjakan",
      body: "Staf mengambil order dari antrean dan mencatat tiap tahap sampai packing.",
      points: ["Daftar kerja produksi", "Tahapan per staf", "Packing, rak & catatan"],
      screen: "/screens/pos-produksi.png",
    },
    {
      key: "antar",
      step: "Antar",
      module: "POS Kurir",
      icon: "ri-e-bike-2-line",
      title: "Kurir punya jadwal, bukan tebakan",
      body: "Jadwal jemput-antar dan status pengiriman terlihat oleh kasir dan owner.",
      points: ["Jadwal jemput-antar", "Penugasan kurir massal", "Terjadwal · berjalan · riwayat"],
      screen: "/screens/pos-kurir.png",
    },
    {
      key: "selesai",
      step: "Selesai",
      module: "Serah terima",
      icon: "ri-checkbox-circle-line",
      title: "Cucian sampai, buktinya tersimpan",
      body: "Kurir mengunggah foto bukti serah terima; status order ikut berubah, tanpa nota yang perlu dicocokkan lagi.",
      points: ["Foto bukti serah terima", "Status otomatis selesai", "Pelunasan tercatat di kasir"],
    },
    {
      key: "laporan",
      step: "Laporan",
      module: "Back office + Aplikasi Owner",
      icon: "ri-line-chart-line",
      title: "Laba-rugi terbaca, bukan ditebak",
      body: "Laporan lengkap di back office web; omzet, piutang, dan persetujuan dari aplikasi owner.",
      points: ["Laba-rugi & arus kas", "Omzet & piutang dari HP", "Setujui void & refund"],
      screen: "/screens/admin.png",
    },
  ] satisfies JourneyStep[],
} as const;

export const CONNECTED = {
  eyebrow: "Semua terhubung",
  title: "Satu data untuk semua peran.",
  body: "Order, produksi, pengantaran, dan uang selalu sinkron di HP, tablet, dan back office.",
  modules: [
    { icon: "ri-dashboard-line", name: "Website Admin", body: "Laporan, akuntansi, master data, dan promo." },
    { icon: "ri-store-2-line", name: "POS Kasir", body: "Transaksi, deposit pelanggan, dan laporan harian." },
    { icon: "ri-t-shirt-air-line", name: "POS Produksi", body: "Antrean per tahap dan status order." },
    { icon: "ri-e-bike-2-line", name: "POS Kurir", body: "Jadwal jemput-antar dan foto bukti serah terima." },
  ],
  moreTitle: "Lebih dari sekadar kasir",
  more: [
    { icon: "ri-smartphone-line", name: "Aplikasi owner", body: "Omzet, piutang, persetujuan void & refund, top-up Saldo Koin." },
    { icon: "ri-shirt-line", name: "Self-service", body: "Monitor mesin, mulai & hentikan sesi, mode maintenance." },
    { icon: "ri-fingerprint-line", name: "Absensi karyawan", body: "Check-in dengan lokasi GPS, QR, RFID, atau NIP." },
    { icon: "ri-wallet-3-line", name: "Petty cash", body: "Catat kas kecil dengan PIN dan ringkasan harian." },
    { icon: "ri-safe-2-line", name: "Deposit pelanggan", body: "Paket deposit, saldo, riwayat, dan refund." },
    { icon: "ri-price-tag-3-line", name: "Promo & harga", body: "Promo dan harga bertingkat per layanan." },
    { icon: "ri-book-2-line", name: "Akuntansi", body: "Arus kas, laba-rugi, neraca, buku besar." },
    { icon: "ri-arrow-left-right-line", name: "Transfer order", body: "Pindahkan order antar outlet." },
    { icon: "ri-tablet-line", name: "HP & tablet", body: "Satu aplikasi, printer thermal Bluetooth." },
  ],
} as const;

/** Home: "Untuk setiap peran" — the roles beyond the cashier (station: peran). */
export const PERAN = {
  eyebrow: "Untuk setiap peran",
  title: "Bukan cuma kasir.",
  body: "Nevira juga melayani pemilik, karyawan, dan laundry self service.",
  roles: [
    { icon: "ri-smartphone-line", name: "Pemilik", body: "Omzet, piutang, dan persetujuan dari aplikasi owner.", href: "/fitur/aplikasi-owner" },
    { icon: "ri-fingerprint-line", name: "Karyawan", body: "Absensi GPS, QR/RFID, level akses, dan laporan kehadiran.", href: "/fitur/karyawan-absensi" },
    { icon: "ri-shirt-line", name: "Laundry self service", body: "Monitor mesin, sesi pelanggan, dan penarikan dana.", href: "/fitur/self-service" },
  ],
} as const;

/** Home: unsolved problems from other laundry apps (station: usp). Pain points only; Nevira's answer is the CS line. */
export const USP = {
  eyebrow: "Kenapa Nevira",
  title: "Kendala yang sering tidak terselesaikan oleh aplikasi laundry.",
  body: "Lima masalah yang paling sering disampaikan pemilik laundry kepada kami.",
  items: [
    { key: "bot", title: "Dukungan hanya lewat bot", body: "Keluhan dijawab menu otomatis, tanpa tim yang menindaklanjuti." },
    { key: "apps", title: "Aplikasi terpisah-pisah", body: "Kasir, kurir, dan keuangan dikelola di aplikasi yang berbeda." },
    { key: "nota", title: "Status order sulit dilacak", body: "Posisi cucian harus ditanyakan satu per satu secara manual." },
    { key: "feedback", title: "Masukan tidak ditanggapi", body: "Saran pengguna untuk aplikasi tidak pernah mendapat jawaban." },
    { key: "data", title: "Laporan disusun manual", body: "Data harus direkap berjam-jam sebelum bisa dianalisis." },
  ],
  badge: "CS Nevira 24/7",
  promise: "Tim kami siap membantu kapan pun, dan setiap masukan Anda menjadi dasar pengembangan Nevira.",
} as const;

export type UspKey = (typeof USP.items)[number]["key"];

export const PRICING = {
  eyebrow: "Harga",
  title: "Bayar sesuai pemakaian dengan Saldo Koin.",
  body: "Isi saldo lewat transfer bank atau e-wallet. Koin hanya terpotong saat fitur dipakai, jadi biaya ikut naik-turun bersama bisnis Anda.",
  rates: [
    { icon: "ri-receipt-line", label: "Pencatatan transaksi", price: 100, unit: "per transaksi" },
    { icon: "ri-printer-line", label: "Cetak nota", price: 50, unit: "per nota" },
    { icon: "ri-whatsapp-line", label: "Pesan WhatsApp", price: 75, unit: "per pesan" },
    { icon: "ri-file-excel-2-line", label: "Ekspor laporan Excel", price: 500, unit: "per ekspor" },
  ],
  calculator: {
    title: "Hitung estimasi biaya bulanan",
    txLabel: "Transaksi per bulan",
    printLabel: "Cetak nota setiap transaksi",
    waLabel: "Kirim 2 pesan WhatsApp per transaksi",
    exportLabel: "Ekspor laporan Excel per bulan",
    resultLabel: "Estimasi Saldo Koin per bulan",
    perTxLabel: "per transaksi",
    note: "Estimasi berdasarkan tarif di bawah. Pemakaian sebenarnya bisa berbeda.",
  },
} as const;

export const PROOF = {
  eyebrow: "Bukti",
  title: "Dipakai laundry yang ingin tumbuh rapi.",
  stats: [
    { value: "120+", label: "laundry aktif" },
    { value: "85 rb", label: "order tercatat per bulan" },
    { value: "18", label: "kota di Indonesia" },
  ],
  testimonials: [
    {
      quote: "Dulu tiap akhir bulan saya pusing cocokkan nota. Sekarang laba-rugi tinggal buka dashboard.",
      name: "Nama Pemilik",
      business: "Laundry Contoh, Malang",
    },
    {
      quote: "Saya bisa setujui refund dari HP tanpa harus datang ke outlet.",
      name: "Nama Pemilik",
      business: "Laundry Contoh, Surabaya",
    },
    {
      quote: "Kurir kami tidak lagi salah alamat. Semua jadwal jemput-antar ada di satu tempat.",
      name: "Nama Pemilik",
      business: "Laundry Contoh, Bandung",
    },
  ],
} as const;

export type FaqItem = { q: string; a: string };

export const FAQ: { eyebrow: string; title: string; body: string; items: FaqItem[] } = {
  eyebrow: "FAQ",
  title: "Pertanyaan yang sering muncul.",
  body: "Belum menemukan jawabannya? Tim kami siap membantu lewat WhatsApp atau email.",
  items: [
    {
      q: "Apa itu Nevira?",
      a: "Nevira adalah sistem operasional untuk bisnis laundry. Kasir, produksi, kurir, aplikasi owner, dan laporan keuangan ada dalam satu sistem yang saling terhubung.",
    },
    {
      q: "Bagaimana sistem Saldo Koin bekerja?",
      a: "Anda mengisi Saldo Koin terlebih dahulu, lalu koin terpotong setiap kali fitur dipakai: Rp100 per transaksi, Rp50 per cetak nota, Rp75 per pesan WhatsApp, dan Rp500 per ekspor laporan Excel.",
    },
    {
      q: "Bagaimana cara mengisi ulang Saldo Koin?",
      a: "Isi ulang lewat transfer bank atau e-wallet. Saldo masuk otomatis setelah pembayaran terkonfirmasi.",
    },
    {
      q: "Apakah cocok untuk laundry kiloan maupun premium?",
      a: "Ya. Layanan dan harga bisa diatur sesuai kebutuhan bisnis Anda, dari laundry kiloan sampai layanan premium.",
    },
    {
      q: "Bagaimana saya memantau status cucian?",
      a: "Tahap order, produksi, dan pengantaran terlihat di aplikasi kasir dan aplikasi owner. Struk juga bisa dibagikan ke WhatsApp pelanggan.",
    },
    {
      q: "Bisa dipakai di HP dan tablet?",
      a: "Bisa. Satu aplikasi untuk HP dan tablet, dengan tampilan yang menyesuaikan layar.",
    },
    {
      q: "Apakah bisa mencetak struk?",
      a: "Bisa, lewat printer thermal Bluetooth. Struk juga bisa dikirim ke WhatsApp pelanggan.",
    },
  ],
};

export const FINAL_CTA = {
  title: "Rapikan laundry Anda mulai hari ini.",
  body: "Daftar gratis, isi saldo kapan saja, dan rasakan bedanya sejak order pertama.",
  primary: "Coba Gratis",
  secondary: "Chat via WhatsApp",
} as const;

export const FOOTER = {
  tagline: "Sistem operasional laundry: kasir, produksi, kurir, owner, dan self-service.",
  // The "Fitur" column is generated from content/features.ts in Footer.tsx.
  columns: [
    {
      title: "Perusahaan",
      links: [
        { label: "Tentang", href: "/tentang" },
        { label: "Kontak", href: "/kontak" },
        { label: "Harga", href: "/harga" },
      ],
    },
    {
      title: "Bantuan",
      links: [
        { label: "Bantuan", href: "/bantuan" },
        { label: "FAQ", href: "/#faq" },
        { label: "help@nevira.id", href: LINKS.email },
        { label: "WhatsApp", href: LINKS.whatsapp },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Syarat & Ketentuan", href: "/legal/syarat-ketentuan" },
        { label: "Kebijakan Privasi", href: "/legal/kebijakan-privasi" },
      ],
    },
  ],
  legal: "© 2026 Nevira · Malang, Indonesia",
} as const;
