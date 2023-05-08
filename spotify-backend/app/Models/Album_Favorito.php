<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Album_Favorito extends Model
{
    use HasFactory;

    protected $table = 'album_favorito';

    protected $fillable = [
        "id_album", 
        "user_id",
        "created_at" 
    ];

    public function album(): BelongsTo {
        return $this->belongsTo(Album::class, 'id_album');
    }
}
