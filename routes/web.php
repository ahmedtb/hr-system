<?php

use Illuminate\Support\Facades\Auth;
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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/units', [App\Http\Controllers\UnitsController::class, 'index'])->name('home');
Route::get('/unit/{id}', [App\Http\Controllers\UnitsController::class, 'show'])->name('showUnit');
Route::get('/head/{id}', [App\Http\Controllers\HeadsController::class, 'show'])->name('showHead');
Route::get('/job/{id}', [App\Http\Controllers\JobsController::class, 'show'])->name('showJob');
