<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;
use App\Models\Album_Favorito;
use Exception;
use Carbon\Carbon;
use App\Utils\ResponseWrapper;
use GuzzleHttp\Psr7\Response;

class CreateAlbumFavoritoController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        $id_album = $request->post("id_album");
        $album_type = $request->post("album_type");
        $total_tracks = (int)$request->post("total_tracks");
        $url = $request->post("url");
        $image_url = $request->post("image_url");
        $name = $request->post("name");
        $release_date = $request->post("release_date");
        $artists = $request->post("artists");

        $user_id = $request->post("user_id");

        try {

            /** Verificar si existe el Album en la base */
            $albumExist = Album::where("id_album", "=", $id_album)->get();
            if (count($albumExist) == 0) {
                
                $album = new Album([
                    "id_album" => $id_album,
                    "album_type" => $album_type,
                    "total_tracks" => $total_tracks,
                    "url" => $url,
                    "image_url" => $image_url,
                    "name" => $name,
                    "release_date" => $release_date,
                    "artists" => $artists,
                    "created_at" => Carbon::now()
                ]);
                
                $albumBoolean = $album->save();
                if (!$albumBoolean){
                    return ResponseWrapper::SaveResponseMessage($albumBoolean);
                };
            }

            /** Verificar si ya fue almacenado en favoritos */
            $albumFavExists = Album_Favorito::where('id_album', '=', $id_album)
                ->where('user_id', '=', $user_id)->get();

            if (count($albumFavExists) != 0) {
                return ResponseWrapper::ExistResponseMessage(true);
            }
            {
                $album_favorito = new Album_Favorito([
                    "id_album" => $id_album,
                    "user_id" => $user_id,
                    "created_at" => Carbon::now()
                ]);

                $albumFavBoolean = $album_favorito->save();
                return ResponseWrapper::SaveResponseMessage($albumFavBoolean);
            }
           
        } catch (Exception $ex) {
            error_log($ex->getMessage());
        }
    }
}
