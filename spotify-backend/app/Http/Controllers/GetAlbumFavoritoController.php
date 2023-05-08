<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album_Favorito;
use App\Utils\ResponseWrapper;
use Exception;

class GetAlbumFavoritoController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $user_id)
    {
        try{
            $albumes_favoritos = Album_Favorito::where('user_id', '=', $user_id)->get();
            $albumes = [];
            foreach ($albumes_favoritos as $albumFav) {
                array_push($albumes, $albumFav->album);
            }
            return ResponseWrapper::GetResponseWrapper(count($albumes) != 0, $albumes);
        }
        catch(Exception $ex){
            error_log($ex->getMessage());
        }
    }
}
