<?php

namespace Database\Seeders;

use App\Models\KategoriBayarZakat;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class KategoriBayarZakatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        KategoriBayarZakat::insert([
            [
                'nama' => 'Mampu',
                'deskripsi' => 'Mampu membayar zakat fitrah sesuai kewajiban. Memiliki kecukupan kebutuhan pokok dan nafkah selama Hari Raya.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'nama' => 'Tidak Mampu',
                'deskripsi' => 'Tidak mampu membayar zakat fitrah karena kekurangan harta atau penghasilan. Berhak menerima zakat sebagai mustahik.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
