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
        Schema::create('favorite_albums', function (Blueprint $table) {
            $table->id();
            $table->string("id_album")->nullable(false);
            $table->string("id_user")->nullable(false);
            $table->timestamps();
            $table->foreign("id_album")->references("id")->on("albums");
            $table->foreign("id_user")->references("id")->on("users");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('favorite_albums');
    }
};
