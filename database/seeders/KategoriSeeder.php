<?php

namespace Database\Seeders;

use App\Models\Kategori;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class KategoriSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $kategori = [
            ['name' => 'Fakir', 'desc' => 'Orang yang hampir tidak memiliki apa-apa dan hidup dalam kemiskinan.'],
            ['name' => 'Miskin', 'desc' => 'Orang yang memiliki harta tetapi tidak cukup untuk memenuhi kebutuhan dasar.'],
            ['name' => 'Amil', 'desc' => 'Petugas yang mengumpulkan dan mendistribusikan zakat.'],
            ['name' => 'Muallaf', 'desc' => 'Orang yang baru masuk Islam dan membutuhkan bantuan untuk menguatkan iman.'],
            ['name' => 'Riqab', 'desc' => 'Budak atau hamba sahaya yang ingin memerdekakan diri.'],
            ['name' => 'Gharim', 'desc' => 'Orang yang memiliki hutang untuk kebutuhan hidup yang halal dan tidak mampu membayarnya.'],
            ['name' => 'Fisabilillah', 'desc' => 'Orang yang berjuang di jalan Allah, termasuk kegiatan dakwah, pendidikan, dan jihad.'],
            ['name' => 'Ibnu Sabil', 'desc' => 'Musafir yang kehabisan biaya dalam perjalanan.'],
            ['name' => 'Mampu', 'desc' => 'Warga yang mampu bayar zakat tapi tetap mendapatkan jatah zakat.'],
        ];


        foreach ($kategori as $item) {
            Kategori::insert([

                'nama' => $item['name'],
                'deskripsi' => $item['desc'],
            ]);
        }
    }
}
