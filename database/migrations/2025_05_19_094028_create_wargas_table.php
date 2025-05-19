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
        Schema::create('wargas', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('keluarga_id');
            $table->string('name');
            $table->text('desc')->nullable();
            $table->uuid('kategori')->nullable();
            $table->timestamps();

            $table->foreign('kategori')->references('id')->on('kategori')->onDelete('set null');
        });
        
        Schema::create('bayar', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('warga_id');
            $table->enum('jenis', ['zakat', 'infaq', 'sedekah']); // bisa diubah sesuai kebutuhan
            $table->integer('jumlah');
            $table->boolean('status');
            $table->integer('periode');
            $table->timestamps();
        
            $table->foreign('warga_id')->references('id')->on('warga')->onDelete('cascade');
        });

        Schema::create('terima', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->uuid('warga_id');
            $table->enum('jenis', ['zakat', 'infaq', 'sedekah']); // bisa disesuaikan
            $table->integer('jumlah');
            $table->boolean('status');
            $table->integer('periode');
            $table->timestamps();

            $table->foreign('warga_id')->references('id')->on('warga')->onDelete('cascade');
        });

        Schema::create('kategori', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->text('desc')->nullable();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wargas');
    }
};
