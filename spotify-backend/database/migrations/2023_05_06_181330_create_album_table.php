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
        Schema::create('albums', function (Blueprint $table) {
            $table->string("id")->primary();
            $table->string("album_type", 50);
            $table->integer("total_tracks");
            $table->text("external_urls");
            $table->text("images");
            $table->string("name", 150);
            $table->date("release_date");
            $table->text("artists");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('albums');
    }
};
