<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Laravel\Passport\Http\Controllers\AccessTokenController;

Route::post('login',[AccessTokenController::class , 'issueToken'])
    ->middleware(['api-login','throttle']);
Route::post('/register','UserController@register');
// Display User Image
Route::get('images/{filename}', 'UserController@displayImage');
// Display Ouvrage Image
Route::get('photos_couverture/{filename}', 'OuvrageController@displayImage');
// Display pdf file
Route::get('files/{filename}', 'OuvrageController@displayPDF');
Route::middleware(['auth:api'])->group(function () {
    /*
    * Users
    */
    Route::post('/logout', 'UserController@logout');
    Route::get('/user', function (Request $request) {return $request->user();});
    Route::post('/store_user', 'UserController@store');
    Route::delete('/delete_user/{id}', 'UserController@delete');
    Route::put('/update_user/{id}', 'UserController@update');
    Route::get('/intern_users', 'UserController@get_intern_user');
    Route::get('/extern_users', 'UserController@get_extern_user');
    Route::post('/search_user', 'UserController@search');
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
    Route::post('/upload_pdf', 'OuvrageController@upload_pdf');
    Route::post('/search_ouvrage', 'OuvrageController@search');

    /*
    * Emprunts Admin Side
    */
    Route::post('/store_emprunt', 'EmprunterController@store');
    Route::get('/emprunt_en_cours', 'EmprunterController@getEmpruntsEnCours');
    Route::get('/emprunt_en_retard', 'EmprunterController@getEmpruntsEnRetards');
    Route::get('/emprunt_en_archive', 'EmprunterController@getEmpruntsEnArchives');
    Route::post('/set_rendu', 'EmprunterController@setRendu');
    Route::delete('/delete_emprunt/{id}', 'EmprunterController@delete');
    Route::put('/update_emprunt/{id}', 'EmprunterController@update');
    Route::post('/searchEnCours_emprunt', 'EmprunterController@searchEnCours');
    Route::post('/searchEnRetards_emprunt', 'EmprunterController@searchEnRetards');
    Route::post('/searchEnArchive_emprunt', 'EmprunterController@searchEnArchive');
    Route::get('/emprunt_en_ligne', 'EmprunterController@getEmpruntsEnLigne');
    Route::post('/valider', 'EmprunterController@Valider');
    Route::post('/searchEnLigne_emprunt', 'EmprunterController@searchEnLigne');
    /*
    * Emprunts User Side
    */
    Route::get('/empruntEnCours/{id}', 'EmprunterController@getEmpruntsEnCoursByUser');
    Route::get('/empruntEnRetards/{id}', 'EmprunterController@getEmpruntsEnRetardsByUser');
    Route::get('/empruntEnArchives/{id}', 'EmprunterController@getEmpruntsEnArchivesByUser');
    Route::post('/reservation', 'EmprunterController@reservation');

    /*
    * Rating
    */
    Route::post('/store_rating', 'RatingController@store');
});
