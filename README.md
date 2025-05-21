# Zakafit

Zakafit adalah sebuah sistem pengelolaan zakat yang dirancang untuk membantu pengurus zakat dalam mencatat pemasukan zakat fitra, serta mendistribusikannya kepada para mustahik (penerima zakat), baik warga tetap maupun non-warga. Sistem ini dilengkapi dengan panel admin modern berbasis Laravel, Inertia.js, dan shadcn/ui yang memudahkan manajemen data dan laporan zakat.

## Teknologi yang Digunakan

- [Laravel](https://laravel.com/docs/) - Framework backend PHP yang kuat dan fleksibel
- [shadcn/ui](https://ui.shadcn.com/docs) - Komponen UI modern berbasis Tailwind CSS
- [InertiaJS](https://inertiajs.com/) - Penghubung antara Laravel dan frontend berbasis JavaScript (tanpa perlu API terpisah)

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal perangkat berikut:

- PHP versi 8.2 atau lebih tinggi
- Composer (untuk mengelola dependensi PHP)
- Node.js & npm (untuk dependensi frontend)
- MySQL atau [database kompatibel lainnya](https://laravel.com/docs/11.x/database#configuration)

## Instalasi

1. Kloning repositori:  
   `git clone https://github.com/studentsinformatics23/pemwebzakat.git`
2. Masuk ke direktori proyek:  
   `cd [nama-direktori-proyek]`
3. Install dependensi PHP:  
   `composer install`
4. Salin file konfigurasi environment:  
   `cp .env.example .env`, lalu sesuaikan variabel seperti koneksi database.
5. Generate application key Laravel:  
   `php artisan key:generate`
6. Jalankan migrasi database:  
   `php artisan migrate`
7. (Opsional) Jalankan seeder database:  
   `php artisan db:seed`
8. Install dependensi frontend:  
   `npm install && npm run dev` (untuk mode pengembangan)  
   atau  
   `npm install && npm run build` (untuk mode produksi)

## Penggunaan

Untuk memulai server pengembangan Laravel, jalankan perintah berikut:

```
php artisan serve
```

Dan jalankan node servernya juga
```
npm run dev
```
Akses aplikasi melalui browser di `http://localhost:8000` (secara default).
