<?php

namespace App\Http\Controllers;

use App\Models\DistribusiZakatLainnya;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DistribusiZakatLainnyaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $distribusiZakatLainnya = DistribusiZakatLainnya::with("kategori")->get();
        return Inertia::render("distribusi-lainnya", ["distribusiZakatLainnya" => $distribusiZakatLainnya]);
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

        DistribusiZakatLainnya::insert([
            "kategori_id" => (int) $request["kategori_id"],
            "nama" => $request["nama"],
            "jenis_bantuan" => $request["jenis_bantuan"],
            "jumlah_uang" => $request["jumlah_uang"],
            "jumlah_beras" => $request["jumlah_beras"],
            "status" => $request["status"],
        ]);

        return back()->with('success', 'Data berhasil ditambahkan');
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
        $distribusiZakatLainnya = DistribusiZakatLainnya::where("nama", "=", $id)->get()->first();

        $distribusiZakatLainnya->delete();

        return back()->with('success', 'Data berhasil dihapus');
    }
}
