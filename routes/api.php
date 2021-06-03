<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\ManagmentController;
use App\Http\Controllers\API\EmployeesController;
use App\Http\Controllers\API\FormsController;

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

Route::get('/unitsTree', [ManagmentController::class,'UnitsTree']);
Route::post('/createJob', [ManagmentController::class,'CreateJob']);
Route::post('/createUnit', [ManagmentController::class,'CreateUnit']);

Route::post('createEmployee', [EmployeesController::class,'create']);
Route::post('createEmployeeWithJob', [EmployeesController::class,'createWithJob']);
Route::put('editEmployee', [EmployeesController::class,'editEmployee']);
Route::put('attackDocumentToEmployee', [EmployeesController::class,'attackDocument']);
Route::put('rateEmployee', [EmployeesController::class,'rateEmployee']);

Route::post('generateForm', [FormsController::class,'generateForm']);
Route::get('employementFormOffer/{access_token}', [FormsController::class,'getEmployementForm']);
Route::post('submitForm', [FormsController::class,'submitForm']);
