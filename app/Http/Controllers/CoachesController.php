<?php

namespace App\Http\Controllers;

use App\Models\Coach;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\TargetedIndividual;

class CoachesController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'sometimes|string',
            'CV' => 'required|string',
            'speciality' => 'required|string',
            'employee_id' => 'sometimes|exists:employees,id',
            'targeted_id' => 'sometimes|exists:targeted_individuals,id',
        ]);

        if ($request->employee_id) {
            Coach::create([
                'CV' => $request->CV,
                'speciality' => $request->speciality,
                'profile_id' => $request->employee_id,
                'profile_type' => Employee::class,
            ]);
        } else if ($request->targeted_id) {
            Coach::create([
                'CV' => $request->CV,
                'speciality' => $request->speciality,
                'profile_id' => $request->targeted_id,
                'profile_type' => TargetedIndividual::class,
            ]);
        } else {
            Coach::create([
                'CV' => $request->CV,
                'speciality' => $request->speciality,
            ]);
        }
        return redirect()->route('dashboard')->with('success','coach successfully created');
    }

    public function createForm(Request $request)
    {
        $employees = Employee::all();
        $targetedIndividuals = TargetedIndividual::all();
        return view('coach.create', compact('employees', 'targetedIndividuals'));
    }
}
