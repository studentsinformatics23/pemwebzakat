<?php

namespace Database\Seeders;

use App\Models\Warga;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class WargaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID'); // gunakan lokal Indonesia
        $data = [];

        for ($i = 1; $i <= 15; $i++) {
            $data[] = [
                'keluarga_id' => Str::random(10),
                'nama' => $faker->name, // nama asli acak
                'jumlah_tanggungan' => rand(0, 5),
                'deskripsi' => $faker->sentence(),
                'kategori_id' => $faker->numberBetween(1, 2), // random dari 1 sampai 8
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }


        Warga::insert($data);
    }
}
