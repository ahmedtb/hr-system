<?php

use App\Http\Controllers\API\assessments\TrialPeriodAssessmentsController;
use App\Http\Controllers\API\AssessmentsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\CoachController;
use App\Http\Controllers\API\FormsController;
use App\Http\Controllers\API\CoursesController;
use App\Http\Controllers\API\ProgramsController;
use App\Http\Controllers\API\EmployeesController;
use App\Http\Controllers\API\ManagmentController;
use App\Http\Controllers\API\InterviewsController;
use App\Http\Controllers\API\FormStructuresController;
use App\Http\Controllers\API\CoursesAndProgramsController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\TargetedIndividualsController;
use App\Models\Assessments\TrialPeriodAssessment;

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
Route::get('/dashboard',[DashboardController::class,'show']);

Route::get('/unitsTree', [ManagmentController::class,'UnitsTree']);
Route::post('/createJob', [ManagmentController::class,'CreateJob']);
Route::post('/createUnit', [ManagmentController::class,'CreateUnit']);

Route::post('createEmployee', [EmployeesController::class,'create']);
Route::get('/createEmployeeForm', [EmployeesController::class, 'createForm']);

Route::post('createEmployeeWithJob', [EmployeesController::class,'createWithJob']);
Route::put('editEmployee', [EmployeesController::class,'editEmployee']);
Route::put('attackDocumentToEmployee', [EmployeesController::class,'attackDocument']);
Route::put('rateEmployee', [EmployeesController::class,'rateEmployee']);
Route::post('createCourseForEmployees', [EmployeesController::class,'createCourseForEmployees']);

Route::post('targeted/create', [TargetedIndividualsController::class,'create']);

Route::get('form/index', [FormsController::class,'index']);
Route::get('form/{id}', [FormsController::class,'show']);
Route::post('generateForm', [FormsController::class,'generateForm']);
Route::get('getGeneratedForm/{access_token}', [FormsController::class,'getGeneratedForm']);
Route::post('submitForm', [FormsController::class,'submitForm']);
Route::get('getForms/{form_structure_id}', [FormsController::class,'getForms']);
Route::post('form/search/{form_structure_id}', [FormsController::class,'search']);

Route::get('structure/index',[FormStructuresController::class,'index']);
Route::get('structure/{id}',[FormStructuresController::class,'show']);

Route::get('structure/get',[FormStructuresController::class,'createForm']);
Route::post('structure/create',[FormStructuresController::class,'create']);


Route::post('employementApproval',[FormsController::class,'employementApproval']);

Route::get('getCourseEmployees/{training_course_id}', [CoursesAndProgramsController::class,'getCourseEmployees']);
Route::get('getCourseState/{training_course_id}', [CoursesAndProgramsController::class,'getCourseState']);

Route::post('coach',[CoachController::class,'create']);
Route::get('coach',[CoachController::class,'createForm']);

Route::get('coach/{coach_id}/programs',[CoachController::class,'getPrograms']);

Route::post('program',[ProgramsController::class,'create']);

Route::post('course',[CoursesController::class,'create']);
Route::get('course/{id}/schedual',[CoursesController::class,'getSchedual']);
Route::get('course/{id}/attendance',[CoursesController::class,'getAttendance']);
Route::get('course/{id}/forms',[CoursesController::class,'getForms']);

// Route::get('getInterviewsAssessments', [InterviewsController::class,'getInterviewsAssessments']);
// Route::get('getGoodAssessments', [InterviewsController::class,'getGoodAssessments']);

Route::post('interview/create', [AssessmentsController::class,'createInterview']);
Route::get('interview/index', [AssessmentsController::class,'indexInterviews']);

Route::post('trialPeriod/create', [TrialPeriodAssessmentsController::class,'create']);
Route::get('trialPeriod/index', [TrialPeriodAssessmentsController::class,'index']);
