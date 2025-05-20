<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BayarZakat extends Model
{
    use HasFactory;
    public $timestamps = true;

    protected $fillable = [
        'nama_KK',
        'nomor_KK',
        'jumlah_tanggungan',
        'jenis_bayar',
        'status',
        'bayar_beras',
        'bayar_uang',
        'total_zakat',
    ];
}
