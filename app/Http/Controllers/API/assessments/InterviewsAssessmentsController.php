<?php

namespace App\Http\Controllers\API\Assessments;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Filters\InterviewAssessmentFilters;
use App\Models\Assessments\InterviewAssessment;

class InterviewsAssessmentsController extends Controller
{
    public function createInterview(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'look' => 'required|min:1,max:4',
            'self_introduction' => 'required|min:1,max:4',
            'personality' => 'required|min:1,max:4',
            'english' => 'required|min:1,max:4',
            'culture' => 'required|min:1,max:4',
            'arabic' => 'required|min:1,max:4',
            'initiative' => 'required|min:1,max:4',
            'sharing_skills' => 'required|min:1,max:4',
            'comprehension' => 'required|min:1,max:4',
            'decision_making' => 'required|min:1,max:4',
            'compatibility_of_education' => 'required|min:1,max:4',
            'compatibility_of_experiance' => 'required|min:1,max:4',
            'compatibility_of_skills' => 'required|min:1,max:4',
            'problem_solving_skills' => 'required|min:1,max:4',
            'stress_handling' => 'required|min:1,max:4',
            'moral_courage_self_confidence' => 'required|min:1,max:4',
            'interviewer_id' => 'required|exists:employees,id',
            'interview_date' => 'required|date',
        ]);

        InterviewAssessment::create($data);

        return ['success' => 'interview assessment archived'];
    }

    public function indexInterviews(InterviewAssessmentFilters $filters, Request $request)
    {
        return InterviewAssessment::latest()->with('interviewer')->filter($filters)->paginate($request->input('page_size') ?? 10)->appends(request()->except('page'));
    }

    public function show($id)
    {
        return InterviewAssessment::where('id', $id)->first();
    }

    public function delete($id)
    {
        InterviewAssessment::where('id', $id)->delete();
        return ['success' => 'Interview Assessment deleted'];
    }
}
