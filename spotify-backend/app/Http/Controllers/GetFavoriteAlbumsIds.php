<?php

namespace App\Http\Controllers;

use App\Models\Album;
use App\Utils\ResponseWrapper;
use Exception;
use Illuminate\Http\Request;

class GetFavoriteAlbumsIds extends Controller
{

    public function __invoke(Request $request)
    {
        try{
            $favorite_albums = Album::select('id')
            ->wherehas('favorite_albums', function($fav) {
                $fav->where('id_user', auth()->user()['id']);
            })->get();

            return ResponseWrapper::GetResponseWrapper(count($favorite_albums) !== 0, $favorite_albums);
        }
        catch(Exception $ex){
            error_log($ex->getMessage());
        }
    }
}
