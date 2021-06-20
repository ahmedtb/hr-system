<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Unit;
use App\Models\Coach;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\TargetedIndividual;

class DashboadController extends Controller
{
    public function show(){
        $employeesCount = Employee::all()->count();
        $targetedCount = TargetedIndividual::all()->count();
        $coachesCount = Coach::all()->count();
        
        $units = Unit::whereNull('parent_id')->get();
        $forms = Form::orderBy('id', 'desc')->take(5)->get();
        return view('dashboard',compact('employeesCount','targetedCount', 'coachesCount', 'units', 'forms'));
    }
}
