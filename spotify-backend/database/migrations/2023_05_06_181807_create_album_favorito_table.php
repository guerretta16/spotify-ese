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
        Schema::create('album_favorito', function (Blueprint $table) {
            $table->id();
            $table->string("id_album")->nullable(false);
            $table->string("user_id")->nullable(false);
            $table->timestamps();
            $table->foreign("id_album")->references("id_album")->on("album");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('album_favorito');
    }
};
