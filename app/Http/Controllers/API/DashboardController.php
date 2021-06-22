<?php

namespace App\Http\Controllers\API;

use App\Models\Form;
use App\Models\Unit;
use App\Models\Coach;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\TrainingCourse;
use App\Models\TrainingProgram;
use App\Models\TargetedIndividual;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function show()
    {
        $employeesCount = Employee::all()->count();
        $targetedCount = TargetedIndividual::all()->count();
        $coachesCount = Coach::all()->count();
        $programsCount = TrainingProgram::count();

        $resumedCourses = TrainingCourse::resumed()->get();

        $units = Unit::whereNull('parent_id')->get();
        $forms = Form::orderBy('id', 'desc')->take(5)->get();
        return array(
            'employeesCount' => $employeesCount,
            'targetedCount' => $targetedCount,
            'coachesCount' => $coachesCount,
            'programsCount' => $programsCount,
            'units' => $units,
            'forms' => $forms,
            'resumedCourses' => $resumedCourses
        );
    }
}
