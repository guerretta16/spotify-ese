<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class FavoriteAlbum extends Model
{
    use HasFactory;

    protected $fillable = [
        "id_album",
        "id_user",
        "created_at"
    ];

    public function album(): BelongsTo {
        return $this->belongsTo(Album::class, 'id_album');
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class, 'id_user');
    }
}
