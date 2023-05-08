<?php

use App\Http\Controllers\CreateAlbumFavoritoController;
use App\Http\Controllers\DeleteAlbumFavoritoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GetAlbumController;
use App\Http\Controllers\GetAlbumFavoritoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('spotifyCheck')->group(function () {
    Route::get('/album/{id_album}', GetAlbumController::class);
    Route::post('/album-favorito', CreateAlbumFavoritoController::class);
    Route::get('/album-favorito/{user_id}', GetAlbumFavoritoController::class);
    Route::delete('/album-favorito/{id_album}/{user_id}', DeleteAlbumFavoritoController::class);
});
