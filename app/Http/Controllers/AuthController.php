<?php

namespace App\Http\Controllers;

use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                "email" => "required|email|string|max:128",
                "password" => "required|string|max:255"
            ]);

            if ($validate->fails())
                return response()->json(['errors' => $validate->errors()], Response::HTTP_BAD_REQUEST);

            if (!Auth::attempt($request->only('email', 'password'))) {
                return response()->json(['message' => ['type' => 'error', 'text' => 'Credenciales invalidas']], Response::HTTP_UNAUTHORIZED);
            } else {
                $user = Auth::user();
                $token = $user->createToken("auth_token")->plainTextToken;
                $cookie = cookie('cookie_token', $token, 60 * 24);
                return response()->json([
                    'message' => ['type' => 'success', 'text' => 'Session iniciada correctamente'],
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                ], Response::HTTP_OK)->withCookie($cookie);
            }
        } catch (\Exception $ex) {
            return response()->json(['message' => ['type' => 'error', 'text' => $ex->getMessage()]], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function register(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                "name" => "required|string|max:255",
                "email" => "required|email|string|unique:users|max:128",
                "password" => "required|string|max:255"
            ]);

            if ($validate->fails()){
                return response()->json(['errors' => $validate->errors()], Response::HTTP_BAD_REQUEST);
            }

            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->password = Hash::make($request->password);
            $user->save();

            return response()->json(['message' => ['type' => 'success', 'text' => 'Usuario creado correctamente']], Response::HTTP_CREATED);
            
        } catch (\Exception $ex) {
            return response()->json(['message' => ['type' => 'error', 'text' => $ex->getMessage()]], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function user(Request $request)
    {
        try {
            $user = $request->user();
            return response()->json(['message' => ['type' => 'success', 'text' => 'Consultado correctamente'], 'user' => $user], Response::HTTP_OK);
        } catch (\Exception $ex) {
            return response()->json(['message' => ['type' => 'error', 'text' => $ex->getMessage()]], Response::HTTP_BAD_REQUEST);
        }
    }

    public function logout()
    {
        try {
            $cookie = Cookie::forget('cookie_token');
            $user = Auth::user();
            $user->currentAccessToken()->delete();
            return response()->json(['message' => ['type' => 'success', 'text' => 'Session cerrada correctamente']], Response::HTTP_OK)->withCookie($cookie);
        } catch (\Exception $ex) {

            return response()->json(['message' => ['type' => 'error', 'text' => $ex->getMessage()]], Response::HTTP_BAD_REQUEST);
        }
    }
}
