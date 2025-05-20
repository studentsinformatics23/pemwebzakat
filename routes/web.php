<?php

use App\Http\Controllers\BayarZakatController;
use App\Http\Controllers\DashboardController;
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

    // Bayar zakar start
    Route::get("/bayar", [BayarZakatController::class, "index"])->name("bayar");
    Route::patch("/bayar-zakat/{id}", [BayarZakatController::class, "update"])->name('bayar.update');
    // Bayar zakar end

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
