<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PokemonController extends Controller
{
    public function index()
    {
        try {
            $url = "https://pokeapi.co/api/v2/pokemon/";
            $client = new \GuzzleHttp\Client();
            $response = $client->request('GET', $url);
            $response = $response->getBody()->getContents();
            return response()->json(json_decode($response));
        } catch (\Exception $ex) {
            return response()->json(['message' => ['type' => 'error', 'text' => $ex->getMessage()]], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function show(int $id)
    {
        try {
            $url = "https://pokeapi.co/api/v2/pokemon/".$id;
            $client = new \GuzzleHttp\Client();
            $response = $client->request('GET', $url);
            $response = $response->getBody()->getContents();
            return response()->json(json_decode($response));
        } catch (\Exception $ex) {
            return response()->json(['message' => ['type' => 'error', 'text' => $ex->getMessage()]], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
