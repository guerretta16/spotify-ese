<?php

use App\Http\Controllers\CreateFavoriteAlbumController;
use App\Http\Controllers\DeleteFavoriteAlbumController;
use App\Http\Controllers\GetAlbumController;
use App\Http\Controllers\GetFavoriteAlbumsController;
use App\Http\Controllers\GetFavoriteAlbumsIds;
use App\Http\Controllers\GetTokenController;
use App\Http\Controllers\TestController;
use Illuminate\Support\Facades\Route;

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


Route::get('/register', GetTokenController::class)->middleware('spotify');
Route::get('/test', TestController::class);

Route::middleware('jwt')->group(function (){
    Route::get('/album/{id_album}', GetAlbumController::class);
    Route::post('/favorite-album', CreateFavoriteAlbumController::class);
    Route::get('/favorite-album', GetFavoriteAlbumsController::class);
    Route::delete('/favorite-album/{id_album}', DeleteFavoriteAlbumController::class);
    Route::get('/favorite-album-ids', GetFavoriteAlbumsIds::class);
});

