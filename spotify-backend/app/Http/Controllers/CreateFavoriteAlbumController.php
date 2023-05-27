<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;
use App\Models\FavoriteAlbum;
use Exception;
use Carbon\Carbon;
use App\Utils\ResponseWrapper;

class CreateFavoriteAlbumController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {

        $request->validate([
            "id" => "required|string",
            "album_type" => "required|string",
            "total_tracks" => "required|int",
            "external_urls" => "required|array",
            "images" => "required|array",
            "name" => "required|string",
            "release_date" => "required|string",
            "artists" => "required|array"
        ]);

        $id = $request->input("id");
        $album_type = $request->input("album_type");
        $total_tracks = (int)$request->input("total_tracks");
        $external_urls = $request->input("external_urls");
        $images= $request->input("images");
        $name = $request->input("name");
        $release_date = $request->input("release_date");
        $artists = $request->input("artists");

        $user_id = auth()->user()['id'];

        try {

            $albumExist = Album::where("id", $id)->get();
            if (count($albumExist) === 0) {

                $album = new Album([
                    "id" => $id,
                    "album_type" => $album_type,
                    "total_tracks" => $total_tracks,
                    "external_urls" => json_encode($external_urls, JSON_THROW_ON_ERROR),
                    "images" => json_encode($images, JSON_THROW_ON_ERROR),
                    "name" => $name,
                    "release_date" => $release_date,
                    "artists" => json_encode($artists, JSON_THROW_ON_ERROR),
                    "created_at" => Carbon::now()
                ]);

                $albumBoolean = $album->save();
                if (!$albumBoolean){
                    return ResponseWrapper::SaveResponseMessage($albumBoolean);
                }
            }

            $favorite_album_exist = FavoriteAlbum::where('id_album', $id)
                ->where('id_user', $user_id)->get();


            if (count($favorite_album_exist) !== 0) {
                return ResponseWrapper::ExistResponseMessage(true);
            }

            $favorite_album = new FavoriteAlbum([
                "id_album" => $id,
                "id_user" => $user_id,
                "created_at" => Carbon::now()
            ]);

            $favorite_album_bool = $favorite_album->save();
            return ResponseWrapper::SaveResponseMessage($favorite_album_bool);

        } catch (Exception $ex) {
            error_log($ex->getMessage());
        }
    }
}
