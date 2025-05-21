<?php

use App\Http\Controllers\BayarZakatController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DistribusiZakatController;
use App\Http\Controllers\DistribusiZakatLainnyaController;
use App\Http\Controllers\LaporanZakatController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\WargaController;
use GuzzleHttp\Psr7\Response;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth'])->group(function () {
    Route::get("/dashboard", [DashboardController::class, "index"])->name("dashboard");

    //Muzakki route start
    Route::get("/warga", [WargaController::class, "index"])->name("penduduk");
    Route::get("/warga/{id}", [WargaController::class, "show"])->name("penduduk");
    Route::post("/muzakki", [WargaController::class, "store"])->name('penduduk.create');
    Route::patch("/muzakki/{id}", [WargaController::class, "update"])->name('penduduk.update');
    Route::delete("/muzakki/{id}", [WargaController::class, "destroy"])->name('penduduk.destroy');
    //Muzakki route end

    // Bayar zakat start
    Route::get("/bayar", [BayarZakatController::class, "index"])->name("bayar");
    Route::patch("/bayar-zakat/{id}", [BayarZakatController::class, "update"])->name('bayar.update');
    // Bayar zakat end

    // Distribusi zakat start
    Route::get("/distribusi", [DistribusiZakatController::class, "index"])->name("distribusi");
    Route::get("/distribusi-zakat/{id}", [DistribusiZakatController::class, "distribusi"])->name("distribusi.zakat");
    Route::get("/mustahik", [DistribusiZakatController::class, "mustahik"])->name("mustahik");
    Route::patch("/distribusi/{id}", [DistribusiZakatController::class, "update"])->name('distribusi.update');
    // Distribusi zakat end

    // Distribusi zakat lainnya start
    Route::get("/distribusi-lainnya", [DistribusiZakatLainnyaController::class, "index"])->name("distribusi-lainnya");
    Route::post("/distribusi-lainnya", [DistribusiZakatLainnyaController::class, "store"])->name("distribusi-lainnya.create");
    Route::delete("/distribusi-lainnya/{id}", [DistribusiZakatLainnyaController::class, "destroy"])->name("distribusi-lainnya.create");
    // Distribusi zakat lainnya end

    // laporan zakat
    Route::get('/laporan-zakat/export-pdf', [LaporanZakatController::class, 'exportPdf'])->name('laporan.zakat.pdf');


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
