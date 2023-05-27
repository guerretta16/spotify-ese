<?php

namespace App\Http\Controllers;

use App\Models\Album;
use Illuminate\Http\Request;
use App\Models\FavoriteAlbum;
use App\Utils\ResponseWrapper;
use Exception;

class GetFavoriteAlbumsController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        try{
            $favorite_albums = Album::wherehas('favorite_albums', function($fav) {
                $fav->where('id_user', auth()->user()['id']);
            })->get();

            return ResponseWrapper::GetResponseWrapper(count($favorite_albums) !== 0, $favorite_albums);
        }
        catch(Exception $ex){
            error_log($ex->getMessage());
        }
    }
}
