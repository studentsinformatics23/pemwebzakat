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
        Schema::create('distribusi_zakat_lainnyas', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('kategori_id')->nullable();
            $table->string("nama");
            $table->enum('jenis_bantuan', ['beras', 'uang'])->nullable();
            $table->integer('jumlah_beras')->nullable();
            $table->integer('jumlah_uang')->nullable();
            $table->text('catatan')->nullable();
            $table->date('tanggal_distribusi')->default(now());
            $table->enum('status', ['terkirim', 'belum_terkirim'])->default('belum_terkirim');
            $table->timestamps();


            $table->foreign('kategori_id')->references('id')->on('kategoris')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('distribusi_zakat_lainnyas');
    }
};
