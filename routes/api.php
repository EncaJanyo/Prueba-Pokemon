<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [Controllers\AuthController::class, 'login'])->name('api.login');
Route::post('/register', [Controllers\AuthController::class, 'register'])->name('api.register');

Route::middleware(['auth:sanctum',])->group(function () {
    Route::get('/user', [Controllers\AuthController::class, 'user'])->name('api.user');
    Route::post('/logout', [Controllers\AuthController::class, 'logout'])->name('api.logout');
    Route::get('/get-pokemons', [Controllers\PokemonController::class, 'index'])->name('api.pokemons.index');
    Route::get('/get-pokemon/{id}', [Controllers\PokemonController::class, 'show'])->name('api.pokemons.show');
});
