<?php

namespace App\Http\Controllers\API\Assessments;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Filters\TraineeCourseAssessmentFilters;
use App\Models\Assessments\TraineeCourseAssessment;

class TraineeCourseAssessmentsController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->validate([
            'training_course_id' => 'required|exists:training_courses,id',

            'coach_understanding' => 'required|array',
            'coach_understanding.rating' => 'required|min:0|max:5',
            'coach_understanding.comment' => 'required|string',

            'coach_communication' => 'required|array',
            'coach_communication.rating' => 'required|min:0|max:5',
            'coach_communication.comment' => 'required|string',

            'presentation' => 'required|array',
            'presentation.rating' => 'required|min:0|max:5',
            'presentation.comment' => 'required|string',

            'coach_cooperation' => 'required|array',
            'coach_cooperation.rating' => 'required|min:0|max:5',
            'coach_cooperation.comment' => 'required|string',

            'program_quality' => 'required|array',
            'program_quality.rating' => 'required|min:0|max:5',
            'program_quality.comment' => 'required|string',

            'technical_preparation' => 'required|array',
            'technical_preparation.rating' => 'required|min:0|max:5',
            'technical_preparation.comment' => 'required|string',

            'training_hall_preparation' => 'required|array',
            'training_hall_preparation.rating' => 'required|min:0|max:5',
            'training_hall_preparation.comment' => 'required|string',

            'reception' => 'required|array',
            'training_hall_preparation.rating' => 'required|min:0|max:5',
            'training_hall_preparation.comment' => 'required|string',

            'hospitality_and_course_breaks' => 'required|array',
            'hospitality_and_course_breaks.rating' => 'required|min:0|max:5',
            'hospitality_and_course_breaks.comment' => 'required|string',

            'training_unit_response' => 'required|array',
            'training_unit_response.rating' => 'required|min:0|max:5',
            'training_unit_response.comment' => 'required|string',
        ]);

        TraineeCourseAssessment::create($data);

        return ['success' => 'trainee course assessment archived'];
    }

    public function index(TraineeCourseAssessmentFilters $filters)
    {
        return $this->getAssessments($filters);
    }

    /**
     * Fetch all relevant threads.
     *
     * @param TraineeCourseAssessmentFilters $filters
     * @return mixed
     */
    protected function getAssessments(TraineeCourseAssessmentFilters $filters)
    {
        $interviews = TraineeCourseAssessment::latest()->filter($filters)->get();

        return $interviews;
    }
}
