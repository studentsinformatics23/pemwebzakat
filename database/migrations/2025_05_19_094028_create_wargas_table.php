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
            $table->id();
            $table->string('keluarga_id');
            $table->string('nama');
            $table->integer("jumlah_tanggungan")->nullable();
            $table->text('deskripsi')->nullable();
            $table->uuid('kategori_id')->nullable();
            $table->timestamps();

            $table->foreign('kategori_id')->references('id')->on('kategoris')->onDelete('set null');
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
