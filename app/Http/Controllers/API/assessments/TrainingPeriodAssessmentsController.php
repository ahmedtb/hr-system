<?php

namespace App\Http\Controllers\API\Assessments;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Filters\TrainingPeriodAssessmentFilters;
use App\Models\Assessments\TrainingPeriodAssessment;

class TrainingPeriodAssessmentsController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->validate([
            'date' => 'required|date',
            'employee_id' => 'required|exists:employees,id',
            'unit_id' => 'required|exists:units,id',
            'training_begin_date' => 'required|date',
            'training_end_date' => 'required|date',
            'excitement' => 'required|min:0|max:15',
            'ability_to_improve' => 'required|min:0|max:15',
            'guidance_acceptance' => 'required|min:0|max:15',
            'handling_technology' => 'required|min:0|max:15',
            'maintaining_working_hours' => 'required|min:0|max:15',
            'relationship_with_colleagues' => 'required|min:0|max:15',
            'behavior' => 'required|min:0|max:15',
            'look' => 'required|min:0|max:15',
            'belief_and_loyalty' => 'required|min:0|max:15',
            'final_degree' => 'required|min:0|max:130',
            'reporter_id' => 'required|exists:employees,id',
            'unit_head_recommendation' => 'required|string',
            'delay_in_min' => 'required|integer',
            'early_departure_min' => 'required|integer',
            'delay_deduction' => 'required|integer',
            'footprint_deduction' => 'required|integer',
            'absence_days' => 'required|integer',
            'attendance_rate' => 'required|min:0|max:100',
            'management_decision' => 'required|string',

        ]);

        TrainingPeriodAssessment::create($data);

        return ['success' => 'training period assessment archived'];
    }

    public function index(TrainingPeriodAssessmentFilters $filters, Request $request)
    {
        return TrainingPeriodAssessment::latest()
            ->with('employee')
            ->filter($filters)
            ->paginate($request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }
    public function show($id)
    {
        return TrainingPeriodAssessment::where('id', $id)->first();
    }
    public function delete($id)
    {
        TrainingPeriodAssessment::where('id', $id)->delete();
        return ['success'=>'delete Training Period Assessment'];
    }
}
