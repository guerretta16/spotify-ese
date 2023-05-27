<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;


class SpotifyCheckToken
{
    public function handle(Request $request, Closure $next)
    {

        $access_token = $request->header('spotify-token');

        if(!$access_token){
            return response()->json(["error" => "Forbidden"], 403);
        }

        $user_data = $this->getSpotifyUserData($access_token);

        if(is_null($user_data) || Arr::has($user_data, 'error')) {
            return response()->json(["error" => "Access token invalid"], 401);
        }

        $this->ensureAuthUserExistsOnDatabase($user_data);

        $request->merge([
            'spotify_user_id' => $user_data['id']
        ]);

        return $next($request);
    }

    private function getSpotifyUserData(string $token): ?array
    {
        try{
            $client = new Client();
            $response = $client->get('https://api.spotify.com/v1/me', [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                ]
            ]);

            return json_decode($response->getBody(), true, 512, JSON_THROW_ON_ERROR);
        } catch(RequestException $e){
            return null;
        }
    }

    private function ensureAuthUserExistsOnDatabase(array $user_data): void
    {
        $id = $user_data['id'];

        if(is_null(User::query()->find($id))) {
            User::create([
                'id' => $id,
                'email' => $user_data['email'],
                'name' => $user_data['display_name']
            ]);
        }
    }
}
