<?php

namespace App\Http\Middleware;

use Closure;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use Illuminate\Http\Request;

class SpotifyCheckToken
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next)
    {
        $access_token = $request->header('Authorization');
   
        if(!$access_token){
            return response()->json(["error" => "Forbidden"], 403);
        }

        $client = new Client();
        try{
            $response = $client->get('https://api.spotify.com/v1/me', [
                'headers' => [
                    'Authorization' => $access_token,
                ],
            ]);
            $statusCode = $response->getStatusCode();

            if ($statusCode == 200) {
                return $next($request);
            }
        }
        catch(RequestException $e){
            $statusCode = $e->getResponse()->getStatusCode();
        }

        if($statusCode == 401){
            return response()->json(["error" => "Access token invalid"], 401);
        }
    }
}
