<?php

namespace App\Http\Controllers;

use App\Models\Album_Favorito;
use App\Utils\ResponseWrapper;
use Exception;
use Illuminate\Http\Request;

class DeleteAlbumFavoritoController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $id_album, $user_id)
    {
        try {
            $boolean = Album_Favorito::where("id_album", "=", $id_album)
                ->where("user_id", "=", $user_id)->delete();
            return ResponseWrapper::DeleteResponseMessage($boolean);
        } catch (Exception $ex) {
            error_log($ex->getMessage());
        }
    }
}
