<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Album extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_album';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [
        "id",
        "album_type",
        "total_tracks",
        "external_urls",
        "images",
        "name",
        "release_date",
        "artists",
        "created_at"
    ];

    public function favorite_albums(): HasMany {
        return $this->hasMany(FavoriteAlbum::class, 'id_album', 'id');
    }
}
