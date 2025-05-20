<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bayar_zakats', function (Blueprint $table) {
            $table->id();
            $table->string('nama_KK');
            $table->string('nomor_KK');
            $table->integer('jumlah_tanggungan');
            $table->enum('jenis_bayar', ['beras', 'uang'])->nullable();
            $table->enum('status', ['pending', 'lunas', 'batal'])->default('pending');
            $table->integer('bayar_beras')->nullable();
            $table->integer('bayar_uang')->nullable();
            $table->integer('total_zakat')->nullable(); // yang dibayarkan baik itu dengan beras atau uang
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bayar_zakats');
    }
};
