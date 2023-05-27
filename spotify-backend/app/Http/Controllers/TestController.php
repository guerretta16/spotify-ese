<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function __construct()
    {
        //$this->middleware('auth:api');
    }

    public function __invoke(): JsonResponse
    {
        return response()->json(auth()->user());
    }
}
