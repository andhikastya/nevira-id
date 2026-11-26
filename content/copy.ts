// All landing-page copy lives here.

export const LINKS = {
  signup: "https://backoffice.nevira.id/daftar-baru",
  login: "https://backoffice.nevira.id/login",
  terms: "https://nevira.id/terms-conditions",
  privacy: "https://nevira.id/privacy-policy",
  email: "mailto:help@nevira.id",
  instagram: "https://www.instagram.com/nevira.id/",
  tiktok: "https://www.tiktok.com/@nevira.id6",
  // Hotline 0851-2333-2445.
  whatsapp: "https://wa.me/6285123332445?text=Halo%20Nevira%2C%20saya%20ingin%20tahu%20lebih%20lanjut",
} as const;

/** Top navigation. The item with `menu: "fitur"` opens the feature dropdown (content/features.ts). */
export const NAV: readonly { label: string; href: string; menu?: "fitur" }[] = [
  { label: "Beranda", href: "/" },
  { label: "Cara Kerja", href: "/#cara-kerja" },
  { label: "Fitur", href: "/fitur", menu: "fitur" },
  { label: "Harga", href: "/harga" },
  { label: "FAQ", href: "/bantuan" },
  { label: "Kontak", href: "/kontak" },
];

export const HERO = {
  eyebrow: "Aplikasi Khusus Bisnis Laundry",
  // Desktop line breaks; joined with spaces on mobile.
  titleLines: ["Semua Proses Laundry", "Terhubung dalam", "Satu Aplikasi"],
  body: "Kasir, ruang cuci, kurir, owner, dan laporan keuangan dalam satu sistem. Tidak ada lagi nota hilang, order nyasar, atau laba yang cuma ditebak.",
  primary: "Coba Gratis",
  secondary: "Lihat cara kerjanya",
} as const;

export const NEEDS = {
  eyebrow: "Untuk setiap tahap bisnis",
  title: "Apa Pun Kebutuhan Bisnis Laundry Anda,",
  highlight: "Nevira Siap Support.",
  body: "Pilih yang paling sesuai dengan kondisi laundry Anda sekarang.",
  items: [
    { icon: "ri-store-2-line", tone: "violet", label: "Mau Buka Laundry", body: "Mulai dengan kasir, nota, dan laporan yang rapi sejak hari pertama.", href: "/kontak" },
    { icon: "ri-building-2-line", tone: "gold", label: "Mau Tambah Outlet", body: "Pantau setiap cabang dan pindahkan order antar outlet dari satu aplikasi.", href: "/fitur/aplikasi-owner" },
    { icon: "ri-arrow-left-right-line", tone: "blue", label: "Mau Pindah POS", body: "Beralih ke kasir yang mencatat order, pembayaran, dan status cucian sekaligus.", href: "/fitur/kasir-pos" },
    { icon: "ri-t-shirt-air-line", tone: "pink", label: "Mau Laundry Self Service", body: "Laundry makin hemat tanpa biaya extender device.", href: "/fitur/self-service" },
    { icon: "ri-stack-line", tone: "green", label: "Mau Laundry Full Service", body: "Lacak setiap order dari cuci, setrika, sampai siap diantar.", href: "/fitur/produksi" },
    { icon: "ri-smartphone-line", tone: "indigo", label: "Mau Digitalisasi", body: "Tinggalkan nota kertas dan rekap manual, semua tercatat otomatis.", href: "/fitur" },
  ],
} as const;

export type NeedTone = (typeof NEEDS.items)[number]["tone"];

export const PROBLEM = {
  eyebrow: "Kenyataannya",
  title: "Bisnis Laundry Tumbuh, tapi Catatannya Masih di Kertas.",
  items: [
    {
      icon: "ri-file-paper-2-line",
      title: "Nota Hilang, Cucian Tertukar",
      body: "Nota tulisan tangan terselip, pesanan tertukar, dan Anda yang menanggung ganti ruginya.",
    },
    {
      icon: "ri-route-line",
      title: "Kurir Jalan tanpa Rute",
      body: "Jadwal jemput-antar tercecer di chat. Satu pesan terlewat, satu pelanggan menunggu tanpa kabar.",
    },
    {
      icon: "ri-question-line",
      title: "Laba Cuma Perkiraan",
      body: "Uang masuk dan keluar bercampur. Di akhir bulan, Anda tidak yakin berapa yang benar-benar untung.",
    },
  ],
} as const;

export const TURN = {
  eyebrow: "Titik balik",
  title: "Cukup Satu Sistem, Laundry Anda Makin Naik Kelas!",
  body: "Mulai dari transaksi masuk sampai laporan keuangan, semua ada di Nevira.",
} as const;

export type JourneyStep = {
  key: "terima" | "proses" | "antar" | "selesai" | "laporan";
  step: string;
  module: string;
  icon: string;
  title: string;
  body?: string;
  points: string[];
  /** Real app screenshot for this step (shown when the 3D scene is off). */
  screen?: string;
};

export const JOURNEY = {
  eyebrow: "Cara kerja",
  title: "Ikuti Perjalanan ketika Transaksi Masuk",
  body: "Cukup 5 langkah, semua tercatat dengan rapi.",
  steps: [
    {
      key: "terima",
      step: "Terima",
      module: "Sistem Kasir",
      icon: "ri-store-2-line",
      title: "Transaksi Tercatat secara Akurat",
      points: [
        "Nota terpisah untuk durasi layanan berbeda",
        "Support split payment",
        "Bagikan struk ke WA customer/cetak nota sesuai kebutuhan",
      ],
      screen: "/screens/pos-kasir.png",
    },
    {
      key: "proses",
      step: "Proses",
      module: "Sistem Produksi",
      icon: "ri-t-shirt-air-line",
      title: "Owner Tahu Apa yang Dikerjakan Karyawan secara Real Time",
      body: "Memulai dan menyelesaikan tiap tahap produksi secara runtut.",
      points: [
        "Waktu pengerjaan tiap tahap tercatat",
        "Tahap produksi tidak akan tertukar dan tercampur",
        "Customer bisa pantau tahap produksi dari struk digital",
      ],
      screen: "/screens/pos-produksi.png",
    },
    {
      key: "antar",
      step: "Antar",
      module: "Sistem Kurir",
      icon: "ri-e-bike-2-line",
      title: "Kurir Punya Jadwal dan Rute Antar Jemput yang Terintegrasi",
      points: [
        "Antrian antar-jemput otomatis masuk di sistem kurir",
        "Penugasan kurir secara massal",
        "Tiap tahap kurir tercatat dengan rapi",
      ],
      screen: "/screens/pos-kurir.png",
    },
    {
      key: "selesai",
      step: "Selesai",
      module: "Serah terima",
      icon: "ri-checkbox-circle-line",
      title: "Cucian Sampai, Buktinya Tersimpan",
      body: "Kurir mengunggah foto bukti serah terima; status order ikut berubah, tanpa nota yang perlu dicocokkan lagi.",
      points: ["Foto bukti serah terima", "Status otomatis selesai", "Pelunasan tercatat di kasir"],
    },
    {
      key: "laporan",
      step: "Laporan",
      module: "Back office + Aplikasi Owner",
      icon: "ri-line-chart-line",
      title: "Laba Rugi Terbaca 100% Akurat",
      body: "Back office untuk pantau laporan lengkap dan setting perubahan. Aplikasi Owner dengan tampilan singkat melalui HP.",
      points: ["Pantau bisnis dengan mudah dari mana saja", "Akses hanya diketahui oleh owner"],
      screen: "/screens/admin.png",
    },
  ] satisfies JourneyStep[],
} as const;

export const CONNECTED = {
  eyebrow: "Semua terhubung",
  title: "Satu Data untuk Semua Peran.",
  body: "Order, produksi, pengantaran, dan uang selalu sinkron di HP, tablet, dan back office.",
  modules: [
    { icon: "ri-dashboard-line", name: "Website Admin", body: "Laporan, akuntansi, master data, dan promo." },
    { icon: "ri-store-2-line", name: "POS Kasir", body: "Transaksi, deposit pelanggan, dan laporan harian." },
    { icon: "ri-t-shirt-air-line", name: "POS Produksi", body: "Antrean per tahap dan status order." },
    { icon: "ri-e-bike-2-line", name: "POS Kurir", body: "Jadwal jemput-antar dan foto bukti serah terima." },
  ],
  moreTitle: "Lebih dari Sekadar Kasir",
  more: [
    { icon: "ri-smartphone-line", name: "Aplikasi Owner", body: "Omzet, piutang, persetujuan void & refund, top-up Saldo Koin." },
    { icon: "ri-shirt-line", name: "Self-Service", body: "Monitor mesin, mulai & hentikan sesi, mode maintenance." },
    { icon: "ri-fingerprint-line", name: "Absensi Karyawan", body: "Check-in dengan lokasi GPS, QR, RFID, atau NIP." },
    { icon: "ri-wallet-3-line", name: "Petty Cash", body: "Catat kas kecil dengan PIN dan ringkasan harian." },
    { icon: "ri-safe-2-line", name: "Deposit Pelanggan", body: "Paket deposit, saldo, riwayat, dan refund." },
    { icon: "ri-price-tag-3-line", name: "Promo & Harga", body: "Promo dan harga bertingkat per layanan." },
    { icon: "ri-book-2-line", name: "Akuntansi", body: "Arus kas, laba-rugi, neraca, buku besar." },
    { icon: "ri-arrow-left-right-line", name: "Transfer Order", body: "Pindahkan order antar outlet." },
    { icon: "ri-tablet-line", name: "HP & Tablet", body: "Satu aplikasi, printer thermal Bluetooth." },
  ],
} as const;

/** Home: "Untuk setiap peran" — the roles beyond the cashier (station: peran). */
export const PERAN = {
  eyebrow: "Untuk setiap peran",
  title: "Tidak Berhenti Hanya di Kasir",
  body: "Nevira dapat digunakan untuk produksi, kurir, dan owner cukup dalam 1 aplikasi.",
  roles: [
    { icon: "ri-smartphone-line", name: "Pemilik", body: "Omzet, piutang, dan persetujuan dari aplikasi owner.", href: "/fitur/aplikasi-owner" },
    { icon: "ri-fingerprint-line", name: "Karyawan", body: "Absensi GPS, QR/RFID, level akses, dan laporan kehadiran.", href: "/fitur/karyawan-absensi" },
    { icon: "ri-shirt-line", name: "Laundry Self Service", body: "Monitor mesin, sesi pelanggan, dan penarikan dana.", href: "/fitur/self-service" },
  ],
} as const;

/** Home: why owners switch to Nevira, seven advantages (station: usp). */
export const USP = {
  eyebrow: "Kenapa Nevira",
  title: "Ini Alasan Kenapa Banyak Owner Laundry Pindah ke",
  highlight: "Nevira.",
  body: "7 keunggulan Nevira yang menjawab kendala di atas.",
  items: [
    { title: "Customer Service Fast Respon", body: "Bukan bot atau AI. Tim kami memberi jawaban dan solusi nyata sesuai kebutuhan Anda." },
    { title: "Semua Peran dalam 1 Aplikasi", body: "Kasir, produksi, kurir, dan owner cukup pakai satu aplikasi." },
    { title: "Status Produksi Real Time", body: "Setiap proses cucian terlihat secara real time." },
    { title: "Feedback Benar\u2011Benar Didengar", body: "Feedback kami tampung untuk perbaikan dan kenyamanan user." },
    { title: "Laporan Keuangan Otomatis", body: "Disusun otomatis dengan standar perhitungan akuntansi, tanpa rekap manual." },
    { title: "Laundry Multi Outlet tanpa Biaya Tambahan", body: "Tambah cabang tanpa bayar lagi, cukup aktivasi di awal satu kali." },
    { title: "Pindah ke Nevira Mudah", body: "Tim kami akan bantu migrasi data layanan dan pelanggan secara gratis dan siap pakai." },
  ],
  badge: "CS Nevira Fast Respon",
  promise: "Tim kami siap membantu dengan cepat, dan setiap masukan Anda menjadi dasar pengembangan Nevira.",
} as const;

export const PRICING = {
  eyebrow: "Harga",
  title: "Bayar Sesuai Pemakaian dengan Saldo Koin.",
  body: "Isi saldo lewat transfer bank atau e-wallet. Koin hanya terpotong saat fitur dipakai, jadi biaya ikut naik-turun bersama bisnis Anda.",
  rates: [
    { icon: "ri-receipt-line", label: "Pencatatan transaksi", price: 100, unit: "per transaksi" },
    { icon: "ri-printer-line", label: "Cetak nota", price: 50, unit: "per nota" },
    { icon: "ri-whatsapp-line", label: "Pesan WhatsApp", price: 75, unit: "per pesan" },
    { icon: "ri-file-excel-2-line", label: "Ekspor laporan Excel", price: 500, unit: "per ekspor" },
  ],
  calculator: {
    title: "Hitung Estimasi Biaya Bulanan",
    txLabel: "Transaksi per bulan",
    printLabel: "Cetak nota setiap transaksi",
    waLabel: "Kirim pesan WhatsApp per transaksi",
    exportLabel: "Ekspor laporan Excel per bulan",
    resultLabel: "Estimasi Saldo Koin per bulan",
    perTxLabel: "per transaksi",
    note: "Estimasi berdasarkan tarif di bawah. Pemakaian sebenarnya bisa berbeda.",
  },
} as const;

export const PROOF = {
  title: "Nevira Telah Digunakan oleh Bisnis Laundry yang Tersebar di Indonesia",
  stats: [
    { value: "150+", label: "laundry aktif" },
    { value: "25 ribu", label: "nota tercatat per bulan" },
    { value: "44", label: "kota di Indonesia" },
  ],
  testimonials: [
    {
      logo: "/testimonials/kinka.png",
      name: "Kinka Laundry",
      business: "Sunter, Jakarta Utara",
      quote: "Customer Service Nevira cepat tanggap dalam menyelesaikan kendala seputar penggunaan Nevira di laundry kami.",
    },
    {
      logo: "/testimonials/daily-wosh.png",
      name: "Daily Wosh",
      business: "Laundry Karawaci",
      quote: "Fitur produksi sangat membantu karena bisa lihat siapa yang mengerjakan hingga sudah sampai tahap mana. Melalui fitur ini bisa jadi perhitungan poin untuk Employee of The Month.",
    },
    {
      logo: "/testimonials/super-clean.png",
      name: "Super Clean Laundry",
      business: "Apartemen Kalibata City",
      quote: "Semenjak pakai Nevira jarang ada miskom antar pegawai dan customer sehingga mengurangi adanya komplain.",
    },
    {
      logo: "/testimonials/jenius.png",
      name: "Jenius Laundry BSD",
      business: "Ruko Serpong Park, Tangerang Selatan",
      quote: "Nevira membantu kami untuk mengetahui siapa pelanggan yang paling loyal hingga layanan apa yang diminati oleh customer. Tim Nevira juga selalu terbuka ketika ada masukan dari kami terkait kebutuhan fitur.",
    },
    {
      logo: "/testimonials/clickwash.png",
      name: "Click Wash UPI",
      business: "Padang",
      quote: "Nevira membantu Laundry Self Service untuk bisa melakukan pemantauan waktu tunggu khususnya di HP konsumen sehingga tahu berapa sisa durasi dari tiap proses.",
    },
  ],
} as const;

/** Home: client logo marquee, below the testimonials (logos in public/clients). */
export const CLIENTS = {
  eyebrow: "Klien kami",
  title: "Dipercaya Bisnis Laundry dari Berbagai Kota",
  logos: [
    { src: "daffa-laundry", name: "Daffa Laundry" },
    { src: "clickwash", name: "ClickWash" },
    { src: "yours-laundry", name: "Yours Laundry" },
    { src: "kita-laundry", name: "Kita Laundry" },
    { src: "s-laundry", name: "Klien Nevira" },
    { src: "shostan-laundry", name: "Shostan Laundry" },
    { src: "kamee-laundry", name: "Kamee Laundry" },
    { src: "shafclean", name: "Shafclean Laundry" },
    { src: "resona-laundry", name: "Resona Laundry" },
    { src: "cahaya-laundry", name: "Cahaya Laundry" },
    { src: "the-55-laundry", name: "The 55 Laundry" },
    { src: "magnet-laundry", name: "Magnet Laundry" },
    { src: "difaya", name: "Difaya Laundry Service" },
    { src: "laundry-hour", name: "Laundry Hour" },
    { src: "kikin-laundry", name: "Kikin Laundry" },
    { src: "stakasi-bersih", name: "Stakasi Bersih Laundry" },
    { src: "s-laundry-services", name: "Klien Nevira" },
    { src: "kimilau", name: "Kimilau Laundry" },
    { src: "laundry-amarta", name: "Laundry Amarta" },
    { src: "neno-korean-laundry", name: "Neno Korean Laundry" },
    { src: "kinka", name: "Kinka Laundry" },
    { src: "vela-laundry", name: "Vela Laundry" },
    { src: "jenius-laundry", name: "Jenius Laundry" },
    { src: "lunara-laundry", name: "Lunara Laundry" },
    { src: "port-laundry", name: "Port Laundry" },
    { src: "benang-emas-laundry", name: "Benang Emas Laundry" },
    { src: "yaundry", name: "Yaundry" },
  ],
} as const;

export type FaqItem = { q: string; a: string };

export const FAQ: { eyebrow: string; title: string; body: string; items: FaqItem[] } = {
  eyebrow: "FAQ",
  title: "Pertanyaan yang Sering Muncul.",
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
  title: "Nevira, The Next Level of POS Laundry!",
  // Two lines; the CTA paragraph keeps the line break (whitespace-pre-line).
  body: "Satu Langkah, Semua Jadi Mudah\nRasakan Kemudahannya!",
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
