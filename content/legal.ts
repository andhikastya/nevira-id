// Legal texts, copied verbatim (Indonesian version) from nevira.id/terms-conditions and
// nevira.id/privacy-policy on 2026-11-17. Edit only with the team's / legal's approval.
export type LegalSection = { title: string; body: string[] };
export type LegalDoc = { slug: string; title: string; intro: string[]; sections: LegalSection[] };

export const LEGAL: LegalDoc[] = [
  {
    "slug": "syarat-ketentuan",
    "title": "Syarat & Ketentuan",
    "intro": [
      "Selamat datang di Nevira. Aplikasi ini dikembangkan untuk membantu pengelolaan bisnis laundry secara digital."
    ],
    "sections": [
      {
        "title": "1. Pendahuluan",
        "body": [
          "Selamat datang di Nevira. Aplikasi ini dikembangkan untuk membantu pengelolaan bisnis laundry secara digital, mencakup kasir, produksi, kurir, dan laporan. Dengan mengunduh, mengakses, atau menggunakan aplikasi Nevira, Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui, mohon untuk tidak menggunakan layanan kami."
        ]
      },
      {
        "title": "2. Definisi",
        "body": [
          "“Aplikasi” berarti perangkat lunak Nevira yang dapat diakses melalui perangkat seluler atau web.",
          "“Pengguna” berarti individu atau entitas yang menggunakan layanan Nevira.",
          "“Kami” atau “Nevira” berarti tim pengembang dan pengelola aplikasi Nevira.",
          "“Layanan” berarti seluruh fitur dan fungsi yang disediakan oleh Nevira, termasuk POS, laporan, pengelolaan kurir, dan sistem koin."
        ]
      },
      {
        "title": "3. Penggunaan Aplikasi",
        "body": [
          "Pengguna wajib memberikan informasi yang benar, akurat, dan terkini saat membuat akun.",
          "Pengguna bertanggung jawab menjaga kerahasiaan akun dan kata sandi.",
          "Nevira hanya boleh digunakan untuk tujuan yang sah dan sesuai dengan hukum yang berlaku di Indonesia.",
          "Setiap penyalahgunaan aplikasi untuk tujuan ilegal, manipulatif, atau merugikan pihak lain akan menyebabkan penghentian akses tanpa pemberitahuan terlebih dahulu."
        ]
      },
      {
        "title": "4. Sistem Koin dan Transaksi",
        "body": [
          "Nevira menggunakan sistem saldo koin untuk menjalankan fitur berbayar.",
          "Pengguna dapat melakukan top-up saldo sesuai ketentuan yang berlaku.",
          "Saldo koin tidak dapat diuangkan kembali dan hanya dapat digunakan di dalam aplikasi Nevira.",
          "Setiap potongan saldo akan dilakukan otomatis sesuai fitur yang digunakan (contoh: transaksi, cetak struk, kirim WhatsApp)."
        ]
      },
      {
        "title": "5. Hak Kekayaan Intelektual",
        "body": [
          "Seluruh hak cipta, merek dagang, logo, desain, dan kode dalam aplikasi Nevira merupakan milik pengembang Nevira. Dilarang keras menyalin, memodifikasi, mendistribusikan, atau menggunakan bagian apa pun dari aplikasi tanpa izin tertulis dari kami."
        ]
      },
      {
        "title": "6. Pembatasan Tanggung Jawab",
        "body": [
          "Nevira berupaya memberikan layanan terbaik, tetapi kami tidak menjamin aplikasi bebas dari kesalahan, bug, atau gangguan teknis.",
          "Kami tidak bertanggung jawab atas kehilangan data, kerugian finansial, atau kerusakan akibat penggunaan aplikasi di luar kendali kami.",
          "Pengguna setuju bahwa penggunaan aplikasi dilakukan atas risiko sendiri."
        ]
      },
      {
        "title": "7. Privasi Pengguna",
        "body": [
          "Penggunaan aplikasi ini juga tunduk pada Kebijakan Privasi Nevira, yang menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pengguna."
        ]
      },
      {
        "title": "8. Perubahan Ketentuan",
        "body": [
          "Kami dapat memperbarui Syarat dan Ketentuan ini sewaktu-waktu. Versi terbaru akan ditampilkan di aplikasi atau situs web resmi Nevira. Dengan terus menggunakan layanan setelah perubahan diberlakukan, Anda dianggap menyetujui Syarat dan Ketentuan yang telah diperbarui."
        ]
      },
      {
        "title": "9. Hukum yang Berlaku",
        "body": [
          "Syarat dan Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan melalui musyawarah atau, jika diperlukan, melalui pengadilan yang berwenang di Indonesia."
        ]
      },
      {
        "title": "10. Kontak Kami",
        "body": [
          "Jika Anda memiliki pertanyaan atau keluhan terkait Syarat dan Ketentuan ini, silakan hubungi kami di:",
          "help@nevira.id"
        ]
      }
    ]
  },
  {
    "slug": "kebijakan-privasi",
    "title": "Kebijakan Privasi",
    "intro": [],
    "sections": [
      {
        "title": "1. Pendahuluan",
        "body": [
          "Nevira menghargai privasi setiap pengguna. Dokumen ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda saat menggunakan aplikasi Nevira, yang dikembangkan untuk membantu pengelolaan operasional laundry secara digital."
        ]
      },
      {
        "title": "2. Data yang Kami Kumpulkan",
        "body": [
          "Nevira dapat mengumpulkan beberapa jenis data berikut:",
          "Data Akun Pengguna: nama, alamat email, nomor telepon, nama outlet, dan data bisnis yang diperlukan untuk pembuatan akun.",
          "Data Transaksi: informasi pelanggan, jenis layanan laundry, jumlah pembayaran, dan riwayat transaksi.",
          "Data Lokasi: digunakan untuk fitur pengantaran dan penjemputan oleh kurir.",
          "Akses Kamera dan Media: digunakan untuk mengambil foto bukti transaksi, nota, atau kondisi pakaian pelanggan.",
          "Data Perangkat: seperti versi aplikasi, sistem operasi, dan log error untuk tujuan peningkatan performa aplikasi.",
          "Kami tidak mengumpulkan informasi pribadi di luar yang dibutuhkan untuk menjalankan fungsi utama aplikasi."
        ]
      },
      {
        "title": "3. Cara Kami Menggunakan Data",
        "body": [
          "Data yang dikumpulkan digunakan untuk:",
          "Memproses dan mencatat transaksi laundry.",
          "Menyediakan laporan bisnis bagi pemilik outlet.",
          "Memastikan komunikasi antara kasir, kurir, dan pelanggan berjalan lancar.",
          "Meningkatkan performa, keamanan, dan stabilitas aplikasi.",
          "Kami tidak menjual, menukar, atau membagikan data pengguna kepada pihak ketiga, kecuali jika diwajibkan oleh hukum."
        ]
      },
      {
        "title": "4. Keamanan Data",
        "body": [
          "Kami menerapkan langkah-langkah keamanan teknis dan organisasi untuk melindungi data Anda dari akses, perubahan, atau penghapusan tanpa izin. Seluruh data disimpan di server yang dilindungi dengan enkripsi dan sistem autentikasi."
        ]
      },
      {
        "title": "5. Hak Pengguna",
        "body": [
          "Pengguna dapat:",
          "Mengakses dan memperbarui data pribadi melalui aplikasi.",
          "Mengajukan penghapusan data dengan menghubungi tim Nevira.",
          "Menarik izin akses kamera atau lokasi kapan saja melalui pengaturan perangkat."
        ]
      },
      {
        "title": "6. Privasi Anak-Anak",
        "body": [
          "Layanan kami tidak ditujukan untuk siapa pun yang berusia di bawah 13 tahun. Kami tidak secara sadar mengumpulkan informasi pribadi yang dapat diidentifikasi dari siapa pun yang berusia di bawah 13 tahun.",
          "Jika Anda adalah orang tua atau wali dan menyadari bahwa anak Anda telah memberikan data pribadi kepada kami, harap hubungi kami. Jika kami mengetahui bahwa kami telah mengumpulkan data pribadi dari siapa pun yang berusia di bawah 13 tahun tanpa verifikasi izin dari orang tua, kami akan mengambil langkah-langkah untuk menghapus informasi tersebut dari server kami.",
          "Apabila kami perlu bergantung pada persetujuan sebagai dasar hukum untuk memproses informasi Anda, dan negara Anda mewajibkan adanya izin dari orang tua, maka kami dapat meminta persetujuan orang tua sebelum mengumpulkan dan menggunakan informasi tersebut."
        ]
      },
      {
        "title": "7. Perubahan atas Kebijakan Privasi Ini",
        "body": [
          "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberitahukan Anda tentang setiap perubahan dengan memposting versi terbaru Kebijakan Privasi ini di halaman ini.",
          "Kami juga akan memberi tahu Anda melalui email dan/atau pemberitahuan yang jelas di dalam layanan kami sebelum perubahan tersebut berlaku, serta memperbarui tanggal “Terakhir diperbarui” di bagian atas dokumen Kebijakan Privasi ini.",
          "Kami menyarankan Anda untuk meninjau Kebijakan Privasi ini secara berkala untuk mengetahui pembaruan apa pun. Perubahan terhadap Kebijakan Privasi ini berlaku pada saat dipublikasikan di halaman ini."
        ]
      },
      {
        "title": "8. Kontak Kami",
        "body": [
          "Jika Anda memiliki pertanyaan mengenai kebijakan privasi ini, hubungi kami di:",
          "help@nevira.id"
        ]
      }
    ]
  }
];

export const legalBySlug = (slug: string) => LEGAL.find((d) => d.slug === slug)!;
