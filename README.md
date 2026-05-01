# Saku Toko

**Saku Toko** adalah webapp POS gratis untuk UMKM. Aplikasi ini dibuat agar pemilik usaha bisa mengelola transaksi, produk, stok, dan kebutuhan toko harian dengan cara yang sederhana, cepat, dan mudah dipahami.

Saku Toko cocok digunakan oleh UMKM di berbagai bidang, seperti warung, toko kelontong, kafe kecil, laundry, bengkel, toko pakaian, kios pulsa, usaha rumahan, dan jenis usaha lainnya.

Proyek ini juga **open source**, sehingga bebas dipelajari, dikembangkan, dan disesuaikan dengan kebutuhan masing-masing usaha.

## Teknologi Utama

Saku Toko dibangun dengan fokus pada tiga teknologi inti:

- **TanStack Start** sebagai framework full-stack untuk routing, SSR, dan struktur aplikasi modern.
- **SolidJS** untuk tampilan web yang ringan, reaktif, dan cepat.
- **Hono** untuk membuat API yang kecil, cepat, dan mudah dikembangkan.

## Fitur

Saku Toko dirancang sebagai aplikasi kasir lengkap untuk UMKM, dengan banyak fitur yang dapat terus dikembangkan, seperti:

- Manajemen produk.
- Manajemen stok.
- Transaksi penjualan.
- Keranjang kasir.
- Riwayat transaksi.
- Laporan penjualan.
- Tampilan yang nyaman untuk toko kecil dan usaha harian.

## Menjalankan Project

Install dependency:

```bash
npm install
```

Jalankan mode development:

```bash
npm run dev
```

Buka di browser:

```text
http://localhost:3000
```

## Build

```bash
npm run build
```

## API

API utama dibuat dengan Hono. Contoh endpoint health check:

```http
GET /api/v1/health
```

## Lisensi

Saku Toko adalah proyek open source untuk membantu UMKM memiliki sistem kasir web yang gratis, modern, dan mudah dikembangkan.
