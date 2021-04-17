<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */

Route::post('login',[AccessTokenController::class , 'issueToken'])
    ->middleware(['api-login','throttle']);
Route::post('/register','UserController@register');
Route::middleware(['auth:api'])->group(function () {
    // Authenticated User
    Route::get('/user', function (Request $request) {return $request->user();});
    //Logout
    Route::post('/logout', 'UserController@logout');

});
