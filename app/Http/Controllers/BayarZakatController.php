<?php

namespace App\Http\Controllers;

use App\Models\BayarZakat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BayarZakatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bayar_zakat = BayarZakat::get();
        return Inertia::render("bayar", ["bayarZakat" => $bayar_zakat]);
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
        $bayar_zakat = BayarZakat::findOrFail($id);
        $bayar_zakat->update([
            'jenis_bayar' => $request->jenis_bayar,
            'status' => $request->status,
            'bayar_beras' => $request->bayar_beras,
            'bayar_uang' => $request->bayar_uang,
            'total_zakat' => $request->total_zakat,
        ]);

        return back()->with('success', 'Data zakat berhasil diperbarui');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
