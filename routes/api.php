<?php

use Carbon\Carbon;
use App\Models\Job;
use App\Models\Unit;
use App\Models\Admin;

use App\Models\Employee;
use Illuminate\Http\Request;


use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\JobsController;
use App\Http\Controllers\API\CoachController;
use App\Http\Controllers\API\FormsController;
use App\Http\Controllers\API\UnitsController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\API\CoursesController;
use App\Http\Controllers\API\CommentsController;
use App\Http\Controllers\API\ProgramsController;
use App\Http\Controllers\API\DashboardController;
use App\Http\Controllers\API\DocumentsController;
use App\Http\Controllers\API\EmployeesController;
use App\Http\Controllers\API\ManagmentController;
use App\Http\Controllers\API\InterviewsController;
use App\Http\Controllers\API\FormStructuresController;
use App\Http\Controllers\API\CourseAttendancesController;
use App\Http\Controllers\API\CoursesAndProgramsController;
use App\Http\Controllers\API\TargetedIndividualsController;
use App\Http\Controllers\API\Assessments\InterviewsAssessmentsController;
use App\Http\Controllers\API\Assessments\CoachCourseAssessmentsController;
use App\Http\Controllers\API\Assessments\TrialPeriodAssessmentsController;
use App\Http\Controllers\API\Assessments\TraineeCourseAssessmentsController;
use App\Http\Controllers\API\Assessments\TrainingPeriodAssessmentsController;
use App\Models\TargetedIndividual;

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

Route::get('/dashboard', [DashboardController::class, 'show']);

Route::get('/unitsTree', [ManagmentController::class, 'UnitsTree']);

Route::post('/job/create', [JobsController::class, 'create'])->middleware(['auth:admin']);
Route::get('/job/index', [JobsController::class, 'index'])->middleware(['auth:admin']);
Route::get('job/{id}', [JobsController::class, 'show'])->middleware(['auth:admin']);
Route::get('getJobs', [JobsController::class, 'getJobs'])->middleware(['auth:admin']);

Route::post('/unit/create', [UnitsController::class, 'create'])->middleware(['auth:admin']);
Route::get('/unit/index', [UnitsController::class, 'index'])->middleware(['auth:admin']);
Route::get('/unit/{id}', [UnitsController::class, 'show'])->middleware(['auth:admin']);
Route::get('getUnits', [UnitsController::class, 'getUnits'])->middleware(['auth:admin']);


Route::post('createEmployee', [EmployeesController::class, 'create'])->middleware(['auth:admin']);
Route::get('/createEmployeeForm', [EmployeesController::class, 'createForm'])->middleware(['auth:admin']);

Route::post('createEmployeeWithJob', [EmployeesController::class, 'createWithJob'])->middleware(['auth:admin']);
Route::put('editEmployee', [EmployeesController::class, 'editEmployee'])->middleware(['auth:admin']);
Route::put('attackDocumentToEmployee', [EmployeesController::class, 'attackDocument'])->middleware(['auth:admin']);
Route::put('rateEmployee', [EmployeesController::class, 'rateEmployee'])->middleware(['auth:admin']);
Route::post('createCourseForEmployees', [EmployeesController::class, 'createCourseForEmployees'])->middleware(['auth:admin']);
Route::get('getEmployees', [EmployeesController::class, 'getEmployees'])->middleware(['auth:admin,coach']);
Route::get('employee/index', [EmployeesController::class, 'index'])->middleware(['auth:admin']);
Route::get('employee/{id}', [EmployeesController::class, 'show'])->middleware(['auth:admin']);
Route::delete('employee/{id}', [EmployeesController::class, 'delete'])->middleware(['auth:admin']);
Route::put('employee/{id}', [EmployeesController::class, 'edit'])->middleware(['auth:admin']);

Route::post('targeted/create', [TargetedIndividualsController::class, 'create'])->middleware(['auth:admin']);
Route::get('targeted/{id}', [TargetedIndividualsController::class, 'show'])->middleware(['auth:admin']);
Route::delete('individual/{id}', [TargetedIndividualsController::class, 'delete'])->middleware(['auth:admin']);
Route::get('getIndividuals', [TargetedIndividualsController::class, 'getIndividuals'])->middleware(['auth:admin,coach']);
Route::get('individual/index', [TargetedIndividualsController::class, 'index'])->middleware(['auth:admin']);

Route::get('document/index', [DocumentsController::class, 'index'])->middleware(['auth:admin,coach,individual,employee']);
Route::post('document/create', [DocumentsController::class, 'create'])->middleware(['auth:admin']);
// Route::get('document/{id}', [DocumentsController::class, 'download'])->middleware(['auth:admin']);

Route::get('form/index', [FormsController::class, 'index'])->middleware(['auth:admin']);
Route::get('form/{id}', [FormsController::class, 'show'])->middleware(['auth:admin']);
Route::post('generateForm', [FormsController::class, 'generateForm'])->middleware(['auth:admin']);
Route::get('getGeneratedForm/{access_token}', [FormsController::class, 'getGeneratedForm']);
Route::get('avaliableTokens/{id}', [FormsController::class, 'avaliableTokens']);
Route::delete('deleteToken/{id}', [FormsController::class,'deleteToken']);
Route::post('submitForm', [FormsController::class, 'submitForm']);
Route::get('getForms/{form_structure_id}', [FormsController::class, 'getForms'])->middleware(['auth:admin']);
Route::post('form/search/{form_structure_id}', [FormsController::class, 'search'])->middleware(['auth:admin']);

Route::get('structure/index', [FormStructuresController::class, 'index'])->middleware(['auth:admin']);
Route::get('structure/{id}', [FormStructuresController::class, 'show'])->middleware(['auth:admin']);

Route::get('structure/get', [FormStructuresController::class, 'createForm'])->middleware(['auth:admin']);
Route::post('structure/create', [FormStructuresController::class, 'create'])->middleware(['auth:admin']);

Route::post('coach', [CoachController::class, 'create'])->middleware(['auth:admin']);
Route::get('coach', [CoachController::class, 'createForm'])->middleware(['auth:admin']);
Route::get('/coach/index', [CoachController::class, 'index'])->middleware(['auth:admin']);
Route::get('/getCoaches', [CoachController::class, 'getCoaches'])->middleware(['auth:admin']);
Route::get('coach/{coach_id}/programs', [CoachController::class, 'getPrograms'])->middleware(['auth:admin,coach']);
Route::get('coach/{id}', [CoachController::class, 'show'])->middleware(['auth:admin,coach']);

Route::post('program', [ProgramsController::class, 'create'])->middleware(['auth:admin,coach']);
Route::delete('program/{id}', [ProgramsController::class, 'delete'])->middleware(['auth:admin,coach']);
Route::put('program/{id}', [ProgramsController::class, 'edit'])->middleware(['auth:admin,coach']);

Route::get('program/index', [ProgramsController::class, 'index'])->middleware(['auth:admin,coach,employee,individual']);
Route::get('program/{id}', [ProgramsController::class, 'show'])->middleware(['auth:admin,coach,employee,individual']);
Route::get('getPrograms', [ProgramsController::class, 'getPrograms'])->middleware(['auth:admin,coach,employee,individual']);

Route::post('course', [CoursesController::class, 'create'])->middleware(['auth:admin,coach']);
Route::delete('course/{id}', [CoursesController::class, 'delete'])->middleware(['auth:admin,coach']);
Route::put('course/{id}', [CoursesController::class, 'edit'])->middleware(['auth:admin,coach']);
Route::get('course/index', [CoursesController::class, 'index'])->middleware('auth:admin,employee,individual,coach');
Route::get('course/{id}', [CoursesController::class, 'show'])->middleware('auth:admin,employee,coach,individual');
Route::get('course/{id}/schedule', [CoursesController::class, 'getSchedule'])->middleware('auth:admin,employee,coach,individual');
Route::get('course/{id}/attendances', [CoursesController::class, 'getAttendances'])->middleware('auth:admin,coach');
Route::get('course/{id}/forms', [CoursesController::class, 'getForms'])->middleware('auth:admin,coach');
Route::get('course/{id}/employees', [CoursesController::class, 'getEmployees'])->middleware('auth:admin,coach');
Route::get('course/{id}/individuals', [CoursesController::class, 'getIndividuals'])->middleware('auth:admin,coach');
Route::get('course/{id}/attendances/{date}', [CoursesController::class, 'getAttendanceByDate'])->middleware('auth:admin,coach');
Route::post('course/{id}/enroll', [CoursesController::class, 'enroll'])->middleware('auth:admin,coach');

Route::get('getTrainingCourses', [CoursesController::class, 'getTrainingCourses'])->middleware('auth:admin');

Route::post('attendance/create', [CourseAttendancesController::class, 'create'])->middleware('auth:admin,coach');
Route::delete('attendance/{id}', [CourseAttendancesController::class, 'delete'])->middleware('auth:admin,coach');

Route::post('interview/create', [InterviewsAssessmentsController::class, 'createInterview'])->middleware('auth:admin');
Route::get('interview/index', [InterviewsAssessmentsController::class, 'indexInterviews'])->middleware('auth:admin');
Route::get('interview/{id}', [InterviewsAssessmentsController::class, 'show'])->middleware('auth:admin');

Route::post('trialPeriodAssessment/create', [TrialPeriodAssessmentsController::class, 'create'])->middleware('auth:admin');
Route::get('trialPeriodAssessment/index', [TrialPeriodAssessmentsController::class, 'index'])->middleware('auth:admin');
Route::get('trialPeriodAssessment/{id}', [TrialPeriodAssessmentsController::class, 'show'])->middleware('auth:admin');

Route::post('trainingPeriodAssessment/create', [TrainingPeriodAssessmentsController::class, 'create'])->middleware('auth:admin');
Route::get('trainingPeriodAssessment/index', [TrainingPeriodAssessmentsController::class, 'index'])->middleware('auth:admin');
Route::get('trainingPeriodAssessment/{id}', [TrainingPeriodAssessmentsController::class, 'show'])->middleware(['auth:admin']);

Route::post('traineeCourseAssessment/create', [TraineeCourseAssessmentsController::class, 'create'])->middleware('auth:admin,employee,individual');
Route::get('traineeCourseAssessment/index', [TraineeCourseAssessmentsController::class, 'index'])->middleware(['auth:admin,employee,individual']);
Route::get('traineeCourseAssessment/{id}', [TraineeCourseAssessmentsController::class, 'show'])->middleware(['auth:admin,employee,individual']);


Route::post('coachCourseAssessment/create', [CoachCourseAssessmentsController::class, 'create'])->middleware(['auth:admin,coach']);
Route::get('coachCourseAssessment/index', [CoachCourseAssessmentsController::class, 'index'])->middleware(['auth:admin,coach']);
Route::get('coachCourseAssessment/{id}', [CoachCourseAssessmentsController::class, 'show'])->middleware(['auth:admin,coach']);

Route::post('comment/create', [CommentsController::class, 'create'])->middleware(['auth:admin,coach']);
Route::get('comment/index', [CommentsController::class, 'index'])->middleware(['auth:admin,coach']);
Route::get('comment/{id}', [CommentsController::class, 'show'])->middleware(['auth:admin,coach']);


Route::get('/user', [LoginController::class, 'user']);

Route::post('/seedDatabase1', function (Request $request) {
    $users =  json_decode(file_get_contents($request->file('users')->path()));
    $departments =  json_decode(file_get_contents($request->file('departments')->path()));

    Admin::create([
        'name' => 'ahmed',
        'username' => 'ahmed',
        'email' => 'testing@test.com',
        'password' => Hash::make('password')
    ]);

    
    foreach ($users as $user) {

        Employee::create([
            'id' => $user->id,
            'name' => $user->name,
            'username' => $user->username,
            'address' => 'لا توجد بيانات',
            'employment_date' => $user->starting_date ?? Carbon::today()->format('Y-m-d'),
            'basic_salary' => $user->basic_salary,
            'phone_number' => 'لا توجد بيانات',
            'job_id' => 1,
            'email' => $user->email ?? 'testing@test.com',
            'medal_rating' => 1,
            'profile_image' => getBase64DefaultImage(),
            'password' => Hash::make('password'),
        ]);
    }
    foreach ($departments as $department) {

        $unit = Unit::create([
            'id' => $department->id,
            'parent_id' => $department->parent_id,
            'name' => $department->name,
            'head_id' => $department->department_manager,
            'purpose' => 'لا توجد بيانات',
        ]);
        Job::create([
            'unit_id' => $unit->id,
            'name' => 'وظيفة في الوحدة ' . $unit->id,
            'purpose' => 'لا توجد بيانات',
            'description' => 'لا توجد بيانات',
        ]);
    }
    foreach ($users as $user) {

        Employee::where('id', $user->id)->first()->update([
            'job_id' => $user->department_id ? Job::where('unit_id', $user->department_id)->first()->id : 1
        ]);
    }
    
    return 'done';
});

Route::post('/seedDatabase2', function (Request $request) {
    $individuals =  json_decode(file_get_contents($request->file('individuals')->path()));

    foreach ($individuals as $individual) {
        TargetedIndividual::create([
            'id' => $individual->id,
            'name' => $individual->name,
            'username' => $individual->username,
            'phone_number' => $individual->phone_number,
            'email' => $individual->email,
            'address' => $individual->address,
            'description' => $individual->description,
            'profile_image' => null,
            'password' => Hash::make('password'),
        ]);
    }
    
    return 'done';
});
