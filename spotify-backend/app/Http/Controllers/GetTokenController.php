<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GetTokenController extends Controller
{
    public function __invoke(Request $request): JsonResponse
    {
        $request->validate([
           'spotify_user_id' => 'required|string|exists:users,id'
        ]);

        $user_id = $request->get('spotify_user_id');
        $token = auth()->tokenById($user_id);
        $user = User::find($user_id);

        return response()->json(compact('token', 'user'));
    }
}
