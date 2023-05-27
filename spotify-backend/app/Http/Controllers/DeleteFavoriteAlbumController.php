<?php

namespace App\Http\Controllers;

use App\Models\FavoriteAlbum;
use App\Utils\ResponseWrapper;
use Exception;
use Illuminate\Http\Request;

class DeleteFavoriteAlbumController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $id_album): ?array
    {
        $id_user = auth()->user()['id'];

        try {
            $boolean = FavoriteAlbum::where("id_album", $id_album)
                ->where("id_user", $id_user)->delete();
            return ResponseWrapper::DeleteResponseMessage($boolean);
        } catch (Exception $ex) {
            return ResponseWrapper::DeleteResponseMessage(false);
        }
    }
}
