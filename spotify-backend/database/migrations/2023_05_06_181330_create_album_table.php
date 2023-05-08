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
        Schema::create('album', function (Blueprint $table) {
            $table->string("id_album")->nullable(false)->unique();
            $table->string("album_type", 50)->nullable(false);
            $table->integer("total_tracks")->nullable(false);
            $table->string("url", 255)->nullable(false);
            $table->string("image_url", 255)->nullable(false);
            $table->string("name", 150)->nullable(false);
            $table->date("release_date")->nullable(false);
            $table->string("artists")->nullable(false);
            $table->timestamps();
            $table->primary("id_album");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('album');
    }
};
