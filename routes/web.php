<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\DocumentsController;

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
Route::get('document/{id}', [DocumentsController::class, 'download'])->middleware(['auth:admin']);
Route::view('managment/{path}', 'managment')->where('path', '([A-z\d\-\/_.]+)?');
Route::view('managment', 'managment');

Route::view('{path}', 'website')->where('path', '([A-z\d\-\/_.]+)?');

// Auth::routes();

