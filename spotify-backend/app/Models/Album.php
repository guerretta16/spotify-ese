<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Album extends Model
{
    use HasFactory;

    protected $table = 'album';
    protected $primaryKey = 'id_album';
    public $incrementing = false;
    protected $keyType = 'string';

    protected $fillable = [ 
        "id_album",
        "album_type",
        "total_tracks",
        "url",
        "image_url",
        "name",
        "release_date",
        "artists",
        "created_at"
    ];

    public function album_favorito(): HasMany {
        return $this->hasMany(Album_Favorito::class);
    }
}
