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
            'look' => 'required|in:excellent,good,medium,weak',
            'self_introduction' => 'required|in:excellent,good,medium,weak',
            'personality' => 'required|in:excellent,good,medium,weak',
            'english' => 'required|in:excellent,good,medium,weak',
            'culture' => 'required|in:excellent,good,medium,weak',
            'arabic' => 'required|in:excellent,good,medium,weak',
            'initiative' => 'required|in:excellent,good,medium,weak',
            'sharing_skills' => 'required|in:excellent,good,medium,weak',
            'comprehension' => 'required|in:excellent,good,medium,weak',
            'decision_making' => 'required|in:excellent,good,medium,weak',
            'compatibility_of_education' => 'required|in:excellent,good,medium,weak',
            'compatibility_of_experiance' => 'required|in:excellent,good,medium,weak',
            'compatibility_of_skills' => 'required|in:excellent,good,medium,weak',
            'problem_solving_skills' => 'required|in:excellent,good,medium,weak',
            'stress_handling' => 'required|in:excellent,good,medium,weak',
            'moral_courage_self_confidence' => 'required|in:excellent,good,medium,weak',
            'interviewer_id' => 'required|exists:employees,id',
            'interview_date' => 'required|date',
        ]);

        InterviewAssessment::create($data);

        return ['success' => 'interview assessment archived'];
    }

    public function indexInterviews(InterviewAssessmentFilters $filters){
        $interviews = $this->getAssessments($filters);
        return  $interviews;
    }

        /**
     * Fetch all relevant threads.
     *
     * @param InterviewAssessmentFilters $filters
     * @return mixed
     */
    protected function getAssessments(InterviewAssessmentFilters $filters)
    {
        $interviews = InterviewAssessment::latest()->filter($filters)->get();

        return $interviews;
    }
}
