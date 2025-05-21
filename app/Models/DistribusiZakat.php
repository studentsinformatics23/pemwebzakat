<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DistribusiZakat extends Model
{
    use HasFactory;

    protected $fillable = [
        'kategori_id',
        'warga_id',
        'status',
        'tanggal_distribusi',
        'catatan',
        'jumlah_uang',
        'jumlah_beras',
        'jenis_bantuan',

    ];

    public $timestamps = true;

    public function warga()
    {
        return $this->belongsTo(Warga::class);
    }

    public function kategori()
    {
        return $this->belongsTo(Kategori::class);
    }
}
