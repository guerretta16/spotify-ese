<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Album;
use App\Utils\ResponseWrapper;

class GetAlbumController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $id_album): ?array
    {
        $album = Album::where("id", $id_album)->get();
        $boolean = count($album) > 0;
        return ResponseWrapper::GetResponseWrapper($boolean, $album);
    }
}
