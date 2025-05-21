<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Warga extends Model
{
    use HasFactory;

    protected $fillable = [
        'keluarga_id',
        'nama',
        'deskripsi',
        'kategori_id',
        'jumlah_tanggungan',
    ];

    public $timestamps = true;

    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'kategori_id');
    }
    public function kategoriBayarZakat()
    {
        return $this->belongsTo(KategoriBayarZakat::class, 'kategori_id');
    }

    public function distribusiZakats()
    {
        return $this->hasMany(DistribusiZakat::class);
    }
}
