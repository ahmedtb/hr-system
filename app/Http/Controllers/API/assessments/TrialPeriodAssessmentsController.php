<?php

namespace App\Http\Controllers\API\Assessments;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Filters\TrialPeriodAssessmentFilters;
use App\Models\Assessments\TrialPeriodAssessment;

class TrialPeriodAssessmentsController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->validate([
            'date' => 'required|date',
            'employee_id' => 'required|exists:employees,id',
            'unit_id' => 'required|exists:units,id',
            'trial_begin_date' => 'required|date',
            'trial_end_date' => 'required|date',
            'excitement' => 'required|min:0|max:15',
            'ability_to_improve' => 'required|min:0|max:15',
            'guidance_acceptance' => 'required|min:0|max:15',
            'handling_technology' => 'required|min:0|max:15',
            'maintaining_working_hours' => 'required|min:0|max:15',
            'relationship_with_colleagues' => 'required|min:0|max:15',
            'behavior' => 'required|min:0|max:15',
            'look' => 'required|min:0|max:15',
            'belief_and_loyalty' => 'required|min:0|max:15',
            // 'final_degree' => 'required|min:0|max:130',
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
        $data['final_degree'] = $request->excitement +
            $request->ability_to_improve +
            $request->guidance_acceptance +
            $request->handling_technology +
            $request->maintaining_working_hours +
            $request->relationship_with_colleagues +
            $request->behavior +
            $request->look +
            $request->belief_and_loyalty;
        // dd($data);
        TrialPeriodAssessment::create($data);

        return ['success' => 'trial period assessment archived'];
    }

    public function index(TrialPeriodAssessmentFilters $filters)
    {
        return TrialPeriodAssessment::with(['employee', 'reporter'])->filter($filters)->paginate(10)->appends(request()->except('page'));
    }

    public function show($id)
    {
        return TrialPeriodAssessment::where('id', $id)->first();
    }
    public function delete($id)
    {
        TrialPeriodAssessment::where('id', $id)->delete();
        return ['success'=>'delete Trial Period Assessment'];
    }
}
