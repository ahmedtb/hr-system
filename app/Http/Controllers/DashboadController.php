<?php

namespace App\Http\Controllers;

use App\Models\Unit;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\TargetedIndividual;

class DashboadController extends Controller
{
    public function show(){
        $employeesCount = Employee::all()->count();
        $targetedCount = TargetedIndividual::all()->count();
        $units = Unit::whereNull('parent_id')->get();

        return view('welcome',compact('employeesCount','targetedCount', 'units'));
    }
}
