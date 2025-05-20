<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KategoriBayarZakat extends Model
{
    public function wargas()
    {
        return $this->hasMany(Warga::class, 'kategori_id');
    }
}
