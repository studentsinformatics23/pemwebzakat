<?php

namespace App\Http\Controllers;

use App\Models\BayarZakat;
use App\Models\DistribusiZakat;
use App\Models\Kategori;
use App\Models\KategoriBayarZakat;
use App\Models\Warga;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class WargaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $warga = Warga::with("kategoriBayarZakat")->orderBy('created_at', 'desc')->get();

        $kategori = KategoriBayarZakat::get();
        return Inertia::render("warga", ["warga" => $warga, 'kategori' => $kategori]);
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
        $warga = Warga::create([
            "keluarga_id" => $request["keluarga_id"],
            'nama' => $request["nama"],
            'deskripsi' => $request["deskripsi"],
            'kategori_id' => (int) $request["kategori_id"],
            'jumlah_tanggungan' => (int) $request["jumlah_tanggungan"]
        ]);

        if ($request["kategori_id"] == "1") {
            BayarZakat::create([
                "nama_KK" => $request["nama"],
                "nomor_KK" => $request["keluarga_id"],
                "jumlah_tanggungan" => (int) $request["jumlah_tanggungan"],
            ]);
        }

        DistribusiZakat::create([
            'warga_id' => $warga["id"],
        ]);

        return back()->with('success', 'Data berhasil ditambahkan');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = BayarZakat::where('nomor_KK', $id)->first();

        if (!$data) {
            return response()->json(['message' => 'Data tidak ditemukan'], 404);
        }

        return response()->json($data);
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
        $warga = Warga::findOrFail($id);
        $warga->update([
            "keluarga_id" => $request["keluarga_id"],
            'nama' => $request["nama"],
            'deskripsi' => $request["deskripsi"],
            'kategori_id' => (int) $request["kategori_id"],
            'jumlah_tanggungan' => (int) $request["jumlah_tanggungan"]
        ]);

        return back()->with('success', 'Data berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $warga = Warga::findOrFail($id);
        $bayarZakat = BayarZakat::where("nomor_KK", $warga->keluarga_id)->first();
        if ($bayarZakat) {
            $bayarZakat->delete();
        }
        $distribusiZakat = DistribusiZakat::where("warga_id", "=", $id)->get()->first();
        if ($distribusiZakat) {
            $distribusiZakat->delete();
        }
        $warga->delete();

        return back()->with('success', 'Data berhasil dihapus');
    }
}
