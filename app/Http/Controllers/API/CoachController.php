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
    public function show(Coach $coach)
    {
        return $coach;
    }
    public function index()
    {
        return Coach::with('profile')->paginate(10);
    }
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

        if ($request->employee_id) {
            $coach = Coach::create([
                'CV' => $request->CV,
                'speciality' => $request->speciality,
                'profile_id' =>  $request->employee_id,
                'profile_type' => Employee::class
            ]);
        } elseif ($request->targeted_individual_id) {
            $coach = Coach::create([
                'CV' => $request->CV,
                'speciality' => $request->speciality,
                'profile_id' =>  $request->targeted_individual_id,
                'profile_type' =>  TargetedIndividual::class
            ]);
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
        Validator::make(['coach_id' => $coach_id], [
            'coach_id' => 'required|exists:coaches,id'
        ])->validate();

        $coach = Coach::where('id', $coach_id)->first();

        return $coach->trainingPrograms;
    }
}
