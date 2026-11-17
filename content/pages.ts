// Copy for the secondary pages (harga, bantuan, tentang, kontak).
// Only facts we can stand behind; what the team still has to supply is listed in README.md ("Before launch").
import { FAQ, PRICING } from "./copy";

export type FaqGroup = { title: string; icon: string; items: { q: string; a: string }[] };

const faq = (q: string) => {
  const item = FAQ.items.find((i) => i.q === q);
  if (!item) throw new Error(`FAQ item not found: ${q}`);
  return item;
};

export const HARGA = {
  title: "Bayar sesuai pemakaian.",
  body: "Isi Saldo Koin lewat transfer bank atau e-wallet. Koin terpotong hanya saat fitur dipakai.",
  steps: {
    eyebrow: "Cara kerja",
    title: "Tiga langkah Saldo Koin",
    items: [
      { icon: "ri-wallet-3-line", title: "Isi saldo", body: "Transfer bank atau e-wallet. Owner juga bisa top-up dari aplikasi." },
      { icon: "ri-receipt-line", title: "Pakai fitur", body: "Catat transaksi, cetak nota, kirim struk, ekspor laporan." },
      { icon: "ri-coins-line", title: "Koin terpotong", body: "Hanya saat fitur dipakai; riwayat terlihat di back office." },
    ],
  },
  ratesTitle: "Tarif per pemakaian",
  topup: {
    title: "Cara isi ulang & tagihan",
    items: [
      { icon: "ri-bank-line", title: "Transfer bank", body: "Saldo masuk setelah pembayaran terkonfirmasi." },
      { icon: "ri-wallet-line", title: "E-wallet", body: "Isi ulang dari dompet digital." },
      { icon: "ri-smartphone-line", title: "Dari aplikasi owner", body: "Top-up langsung dari HP pemilik." },
      { icon: "ri-shirt-line", title: "Langganan self-service", body: "Tagihan mesin dilihat dan dibayar dari aplikasi owner." },
    ],
  },
  faqTitle: "Soal biaya & saldo.",
  faq: [
    faq("Bagaimana sistem Saldo Koin bekerja?"),
    faq("Bagaimana cara mengisi ulang Saldo Koin?"),
    { q: "Bagaimana melihat riwayat pemakaian koin?", a: "Riwayat pemakaian dan pengisian Saldo Koin tercatat di back office." },
    {
      q: "Bagaimana tagihan self-service dihitung?",
      a: "Self-service ditagih per bulan: Rp100.000 per stack (mesin cuci dan pengering yang ditumpuk) dan Rp50.000 per mesin tambahan.",
    },
    {
      q: "Apakah Saldo Koin bisa diuangkan kembali?",
      a: "Tidak. Sesuai Syarat & Ketentuan, Saldo Koin tidak dapat diuangkan kembali dan hanya dapat digunakan di dalam aplikasi Nevira.",
    },
  ],
  cta: "Coba dulu, bayar sesuai pemakaian.",
  rates: PRICING.rates,
} as const;

/** Self-service machine subscription (per month). Prices supplied by the team. */
export const SELF_SERVICE_PRICING = {
  eyebrow: "Harga self service",
  title: "Bayar per mesin yang Anda pasang.",
  body: "Ditagih per bulan. Tagihannya bisa dilihat dari aplikasi owner.",
  period: "bulan",
  items: [
    { key: "stack", icon: "ri-stack-line", label: "Per stack", price: 100000, note: "1 stack = mesin cuci dan pengering yang ditumpuk." },
    { key: "mesin", icon: "ri-shirt-line", label: "Per mesin", price: 50000, note: "Satu mesin tambahan." },
  ],
  calculator: { title: "Hitung tagihan bulanan", stackLabel: "Jumlah stack", machineLabel: "Jumlah mesin tambahan", totalLabel: "Estimasi tagihan per bulan" },
} as const;

export const BANTUAN: { title: string; body: string; groups: FaqGroup[] } = {
  title: "Ada yang bisa kami bantu?",
  body: "Jawaban seputar Nevira, Saldo Koin, perangkat, dan akun. Belum ketemu? Hubungi tim kami.",
  groups: [
    {
      title: "Umum",
      icon: "ri-information-line",
      items: [
        faq("Apa itu Nevira?"),
        faq("Apakah cocok untuk laundry kiloan maupun premium?"),
        {
          q: "Bisa dipakai untuk banyak outlet?",
          a: "Bisa. Karyawan memilih outlet saat masuk, order bisa dipindahkan antar outlet, dan laporan bisa dilihat per outlet di back office.",
        },
      ],
    },
    {
      title: "Saldo Koin & harga",
      icon: "ri-coins-line",
      items: [faq("Bagaimana sistem Saldo Koin bekerja?"), faq("Bagaimana cara mengisi ulang Saldo Koin?")],
    },
    {
      title: "Kasir & perangkat",
      icon: "ri-tablet-line",
      items: [faq("Bisa dipakai di HP dan tablet?"), faq("Apakah bisa mencetak struk?"), faq("Bagaimana saya memantau status cucian?")],
    },
    {
      title: "Akun & keamanan",
      icon: "ri-shield-user-line",
      items: [
        {
          q: "Bagaimana mengatur hak akses karyawan?",
          a: "Atur level akses per peran di back office, sehingga kasir, staf produksi, dan kurir hanya melihat menu yang mereka perlukan.",
        },
        {
          q: "Untuk apa PIN owner?",
          a: "Void, refund, dan refund deposit perlu persetujuan owner dari aplikasi owner, dilindungi PIN.",
        },
      ],
    },
  ],
};

export const TENTANG = {
  title: "Kami membangun sistem operasional untuk laundry Indonesia.",
  body: "Nevira lahir dari masalah yang sama di banyak laundry: nota hilang, kurir tanpa jadwal, dan laba yang cuma ditebak.",
  mission: {
    title: "Membuat bisnis laundry rapi dan bisa tumbuh.",
    body: "Satu sistem yang dipakai dari kasir sampai pemilik, supaya setiap order tercatat sekali dan mengalir sendiri.",
  },
  values: [
    { icon: "ri-shield-check-line", title: "Jujur soal fitur", body: "Hanya menjanjikan fitur yang benar-benar ada." },
    { icon: "ri-git-merge-line", title: "Satu data", body: "Dicatat sekali, terbaca dari kasir sampai pemilik." },
    { icon: "ri-file-excel-2-line", title: "Data milik Anda", body: "Laporan bisa diekspor ke Excel kapan saja." },
  ],
  office: { city: "Malang, Indonesia", email: "help@nevira.id" },
};

export const KONTAK = {
  title: "Bicara dengan tim Nevira.",
  body: "Tanya fitur, minta demo, atau konsultasi pindah dari sistem lama.",
  interests: ["Kasir", "Produksi", "Antar-jemput", "Aplikasi owner", "Back office", "Self-service", "Absensi"],
  outlets: ["1 outlet", "2–5 outlet", "Lebih dari 5"],
};
