<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/projects', 'Application\ProjectsController@index')->name('projects.index');
Route::get('/projects/{project}', 'Application\ProjectsController@show')->name('projects.show');
Route::post('/projects', 'Application\ProjectsController@store');

// Voyager admin.
Route::group(['prefix' => 'admin'], function () {
    Voyager::routes();
});

// Reset password.
Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
Route::post('/password/reset', 'Auth\PasswordController@reset')->name('password.update');

// Single vue page.
Route::get('/{args1?}/{args2?}/{args3?}/{args4?}/{args5?}', function () {
    return view('app');
});

