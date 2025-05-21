<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kategori extends Model
{
    use HasFactory;

    public function wargas()
    {
        return $this->hasMany(Warga::class, 'kategori_id');
    }    //

    public function distribusiZakats()
    {
        return $this->hasMany(DistribusiZakat::class);
    }

    public function distribusiZakatLainnya()
    {
        return $this->hasMany(DistribusiZakatLainnya::class, 'kategori_id');
    }
}
