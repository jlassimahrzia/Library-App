<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;

Route::post('login',[AccessTokenController::class , 'issueToken'])
    ->middleware(['api-login','throttle']);
Route::post('/register','UserController@register');
Route::middleware(['auth:api'])->group(function () {
    /*
    * Users
    */
    Route::get('/user', function (Request $request) {return $request->user();}); // Authenticated User
    Route::post('/logout', 'UserController@logout');
    Route::post('/store_user', 'UserController@store');
    Route::delete('/delete_user/{id}', 'UserController@delete');
    Route::put('/update_user/{id}', 'UserController@update');
    /*
    * Categories
    */
    Route::get('/categories', 'CategorieController@index');
    Route::post('/store_category', 'CategorieController@store');
    Route::get('/category/{id}', 'CategorieController@get_cat_by_id');
    Route::put('/update_category/{id}', 'CategorieController@update');
    Route::delete('/delete_category/{id}', 'CategorieController@delete');
    Route::post('/search_category', 'CategorieController@search');

    /*
    * Ouvrages
    */
    Route::get('/ourages', 'OuvrageController@index');
    Route::post('/store_ourage', 'OuvrageController@store');
    Route::get('/ouvrage/{id}', 'OuvrageController@get_ouvrage_by_id');
    Route::put('/update_ouvrage/{id}', 'OuvrageController@update');
    Route::delete('/delete_ouvrage/{id}', 'OuvrageController@delete');
});
