<?php

namespace App\Http\Controllers;

use App\Models\DistribusiZakat;
use App\Models\Kategori;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DistribusiZakatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $distribusiZakat = DistribusiZakat::with("warga", 'kategori')->get();
        return Inertia::render("distribusi", ["distribusiZakat" => $distribusiZakat]);
    }

    public function mustahik()
    {
        $mustahik = Kategori::get();
        return response()->json($mustahik);
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
        $distribusi = DistribusiZakat::findOrFail($id);

        $distribusi->update([
            "kategori_id" => $request["kategori_id"],
            "jenis_bantuan" => (string) $request["jenis_bantuan"],
            "jumlah_uang" => $request["jumlah_uang"],
            "jumlah_beras" => $request["jumlah_beras"],
            "status" => (string) $request["status"],
        ]);

        return back()->with('success', 'Data berhasil diperbarui');
    }

    public function distribusi(string $id)
    {
        $distribusi = DistribusiZakat::with("kategori")->where("warga_id", "=", (int) $id)->get()->first();

        if (!$distribusi) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json($distribusi);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
