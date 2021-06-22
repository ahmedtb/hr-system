<?php

namespace App\Http\Controllers\API;

use App\Models\Coach;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\TargetedIndividual;
use Illuminate\Support\Facades\Validator;

class CoachController extends Controller
{
    public function create(Request $request)
    {
        $validated = $request->validate([
            'CV' => 'required|string',
            'speciality' => 'required|string',
        ]);
        $request->validate([
            'employee_id' => 'sometimes|exists:employees,id',
            'targeted_individual_id' => 'sometimes|exists:targeted_individuals,id',
        ]);
        $coach = Coach::create($validated);

        if ($request->employee_id) {
            // $employee = Employee::where('id',$request->employee_id)->first();
            $coach->profile_id = $request->employee_id;
            $coach->profile_type = Employee::class;
            $coach->save();
        } elseif ($request->targeted_individual_id) {
            // $targeted_individual = TargetedIndividual::where('id',$request->targeted_individual_id)->first();
            $coach->profile_id = $request->targeted_individual_id;
            $coach->profile_type = TargetedIndividual::class;
            $coach->save();
        }

        return response(['success' => 'coach created']);
    }

    public function createForm()
    {
        $employees = Employee::all();
        $targetedIndividuals = TargetedIndividual::all();
        return [
            'employees' => $employees,
            'targetedIndividuals' => $targetedIndividuals
        ];
    }

    public function getPrograms(int $coach_id)
    {
        Validator::make(['coach_id' => $coach_id],[
            'coach_id' => 'required|exists:coaches,id'
        ])->validate();

        $coach = Coach::where('id',$coach_id)->first();

        return $coach->trainingPrograms;
    }
}
