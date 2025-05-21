<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DistribusiZakatLainnya extends Model
{
    use HasFactory;

    protected $fillable = [
        'keluarga_id',
        'nama',
        'status',
        'jumlah_uang',
        'jumlah_beras',
        'jenis_bantuan',
    ];

    public $timestamps = true;
    public function kategori()
    {
        return $this->belongsTo(Kategori::class, 'kategori_id');
    }
}
