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
Route::view('/react/{path?}', 'reactFrontEnd');

// Route::get('/', [App\Http\Controllers\DashboadController::class,'show'])->name('dashboard');

Auth::routes();

// Route::get('/units', [App\Http\Controllers\UnitsController::class, 'index'])->name('home');
// Route::get('/unit/{id}', [App\Http\Controllers\UnitsController::class, 'show'])->name('showUnit');
// Route::get('/head/{id}', [App\Http\Controllers\HeadsController::class, 'show'])->name('showHead');

// Route::get('/job/create', [App\Http\Controllers\JobsController::class, 'create'])->name('createJobForm');
// Route::post('/job/create', [App\Http\Controllers\JobsController::class, 'create'])->name('createJob');
// Route::get('/job/{id}', [App\Http\Controllers\JobsController::class, 'show'])->name('showJob');

// Route::get('/employee/create', [App\Http\Controllers\EmployeesController::class, 'createForm'])->name('createEmployeeForm');
// Route::post('/employee/create', [App\Http\Controllers\EmployeesController::class, 'create'])->name('createEmployee');

// Route::get('/targeted/create', [App\Http\Controllers\TargetedIndividualsController::class, 'createForm'])->name('createTargetedForm');
// Route::post('/targeted/create', [App\Http\Controllers\TargetedIndividualsController::class, 'create'])->name('createTargeted');

// Route::get('/structure/create',  [App\Http\Controllers\FormStructuresController::class, 'createForm'])->name('createFormStructureForm');
// Route::post('/structure/create',  [App\Http\Controllers\FormStructuresController::class, 'create'])->name('createFormStructure');

// Route::get('/structure/index',  [App\Http\Controllers\FormStructuresController::class, 'index'])->name('showFormsStructure');
// Route::get('/structure/show/{id}',  [App\Http\Controllers\FormStructuresController::class, 'show'])->name('showStructure');

// Route::get('/form/{form_structure_id}/generate',  [App\Http\Controllers\FormsController::class, 'generateForm'])->name('generateForm');
// Route::get('/form/token/{access_token}',  [App\Http\Controllers\FormsController::class, 'getForm'])->name('getForm');
// Route::post('/form/token/{access_token}',  [App\Http\Controllers\FormsController::class, 'submitForm'])->name('submitForm');
// Route::get('/form/index',  [App\Http\Controllers\FormsController::class, 'index'])->name('showForms');
// Route::get('/form/show/{id}',  [App\Http\Controllers\FormsController::class, 'show'])->name('showForm');
// Route::get('/form/search/{structure_id}', [App\Http\Controllers\FormsController::class, 'searchForm'])->name('formSearchForm');
// Route::post('/form/search/{form_structure_id}', [App\Http\Controllers\FormsController::class, 'search'])->name('formSearch');

// Route::get('/coaches/create',[App\Http\Controllers\CoachesController::class, 'createForm'])->name('createCoachForm');
// Route::post('/coaches/create',[App\Http\Controllers\CoachesController::class, 'create'])->name('createCoach');

// Route::get('/program/create',[App\Http\Controllers\ProgramsController::class,'createForm'])->name('createProgramForm');
// Route::post('/program/create',[App\Http\Controllers\ProgramsController::class,'create'])->name('createProgram');
