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

Route::get('/job/create', [App\Http\Controllers\JobsController::class, 'create'])->name('createJobForm');
Route::post('/job/create', [App\Http\Controllers\JobsController::class, 'create'])->name('createJob');
Route::get('/job/{id}', [App\Http\Controllers\JobsController::class, 'show'])->name('showJob');

Route::get('/employee/create', [App\Http\Controllers\EmployeesController::class, 'createForm'])->name('createEmployeeForm');
Route::post('/employee/create', [App\Http\Controllers\EmployeesController::class, 'create'])->name('createEmployee');

Route::get('/targeted/create', [App\Http\Controllers\TargetedIndividualsController::class, 'createForm'])->name('createTargetedForm');
Route::post('/targeted/create', [App\Http\Controllers\TargetedIndividualsController::class, 'create'])->name('createTargeted');

Route::get('/structure/index',  [App\Http\Controllers\FormsController::class, 'index'])->name('showFormsStructure');
Route::get('/structure/show',  [App\Http\Controllers\FormsController::class, 'show'])->name('showStructure');
