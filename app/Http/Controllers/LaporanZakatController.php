<?php

namespace App\Http\Controllers;

use App\Models\BayarZakat;
use App\Models\DistribusiZakat;
use App\Models\DistribusiZakatLainnya;
use App\Models\Warga;
use Barryvdh\DomPDF\PDF;
use Illuminate\Http\Request;

class LaporanZakatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function exportPdf()
    {

        $konversiBerasKeUang = 15000;

        $zakatLunas = BayarZakat::where('status', 'lunas')->get();
        $distribusiZakatTerkirim = DistribusiZakat::where('status', 'terkirim')->get();
        $distribusiLainnya = DistribusiZakatLainnya::where('status', 'terkirim')->get();

        $totalUang = 0;
        $totalBeras = 0;
        $totalUangDistribusi = 0;
        $totalBerasDistribusi = 0;
        $totalUangDistribusiLainnya = 0;
        $totalBerasDistribusiLainnya = 0;

        foreach ($zakatLunas as $zakat) {
            if ($zakat->jenis_bayar === 'uang') {
                $totalUang += $zakat->bayar_uang;
                $totalBeras += $zakat->bayar_uang / $konversiBerasKeUang;
            } elseif ($zakat->jenis_bayar === 'beras') {
                $totalBeras += $zakat->bayar_beras;
                $totalUang += $zakat->bayar_beras * $konversiBerasKeUang;
            }
        }

        foreach ($distribusiZakatTerkirim as $d) {
            if ($d->jenis_bantuan === 'uang') {
                $totalUangDistribusi += $d->jumlah_uang;
                $totalBerasDistribusi += $d->jumlah_uang / $konversiBerasKeUang;
            } elseif ($d->jenis_bantuan === 'beras') {
                $totalBerasDistribusi += $d->jumlah_beras;
                $totalUangDistribusi += $d->jumlah_beras * $konversiBerasKeUang;
            }
        }

        foreach ($distribusiLainnya as $d) {
            if ($d->jenis_bantuan === 'uang') {
                $totalUangDistribusiLainnya += $d->jumlah_uang;
                $totalBerasDistribusiLainnya += $d->jumlah_uang / $konversiBerasKeUang;
            } elseif ($d->jenis_bantuan === 'beras') {
                $totalBerasDistribusiLainnya += $d->jumlah_beras;
                $totalUangDistribusiLainnya += $d->jumlah_beras * $konversiBerasKeUang;
            }
        }

        $wargaWajib = Warga::where('kategori_id', 1)->get();

        $sudahBayarKeluarga = BayarZakat::where('status', 'lunas')->pluck("nomor_KK")->toArray();
        $sudahBayar = 0;
        $belumBayar = 0;

        foreach ($wargaWajib as $warga) {
            if (in_array($warga->keluarga_id, $sudahBayarKeluarga)) {
                $sudahBayar++;
            } else {
                $belumBayar++;
            }
        }

        $jumlahWargaTerdistribusi = DistribusiZakat::where('status', 'terkirim')
            ->distinct('warga_id')
            ->count('warga_id');

        $jumlahPenerimaLainnya = DistribusiZakatLainnya::where('status', 'terkirim')->count();
        // Ambil data summary
        $data = [
            "totalZakatBeras" => $totalBeras,
            "totalZakatUang" => $totalUang,
            "totalDistribusiZakatBeras" => $totalBerasDistribusi,
            'totalDistribusiZakatUang' => $totalUangDistribusi,
            "totalUangDistribusiLainnya" => $totalUangDistribusiLainnya,
            'totalBerasDistribusiLainnya' => $totalBerasDistribusiLainnya,
            "wargaWajibBayar" => count($wargaWajib),
            "sudahBayar" => $sudahBayar,
            "belumBayar" => $belumBayar,
            "jumlahWargaTerdistribusi" => $jumlahWargaTerdistribusi,
            "jumlahPenerimaLainnya" => $jumlahPenerimaLainnya
        ];

        // Render PDF
        $pdf = app('dompdf.wrapper');
        $pdf->loadView('pdf.laporan-zakat', ['data' => $data]);

        // Kembalikan file PDF
        return $pdf->download('laporan_zakat.pdf');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
