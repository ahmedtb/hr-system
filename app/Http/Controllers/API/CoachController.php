<?php

namespace App\Http\Controllers\API;

use App\Models\Coach;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Filters\CoachFilters;
use App\Models\TargetedIndividual;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CoachController extends Controller
{
    public function show($id)
    {
        Validator::make(['id' => $id], [
            'id' => 'required|exists:coaches,id'
        ])->validate();

        $coach = Coach::where('id', $id)->first();
        return $coach;
    }
    public function index(CoachFilters $filters, Request $request)
    {
        return Coach::filter($filters)
            ->with('profile')
            ->paginate($request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }
    public function getCoaches()
    {
        return Coach::all();
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

    public function edit(Request $request, $id)
    {
        Validator::make(['id' => $id], [
            'id' => 'required|exists:coaches,id'
        ])->validate();

        $data = $request->validate([
            'CV' => 'required|string|max:10000',
            'speciality' => 'required|string',
        ]);

        $coach = Coach::where('id', $request->id)->first();
        $coach->update($data);

        return ['success' => 'coach edited'];
    }

    public function delete($id){
        Validator::make(['id' => $id], [
            'id' => 'required|exists:coaches,id'
        ])->validate();
        Coach::where('id', $id)->delete();

        return ['success' => 'coach deleted'];
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
