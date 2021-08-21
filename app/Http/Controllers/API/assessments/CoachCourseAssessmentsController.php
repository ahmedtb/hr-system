<?php

namespace App\Http\Controllers\API\Assessments;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Filters\CoachCourseAssessmentFilters;
use App\Models\Assessments\CoachCourseAssessment;

class CoachCourseAssessmentsController extends Controller
{
    public function create(Request $request)
    {
        $data = $request->validate([
            'training_course_id' => 'required|exists:training_courses,id',

            'trainees_discipline' => 'required|array',
            'trainees_discipline.rating' => 'required|min:0|max:5',
            'trainees_discipline.comment' => 'required|string',

            'trainees_interaction' => 'required|array',
            'trainees_interaction.rating' => 'required|min:0|max:5',
            'trainees_interaction.comment' => 'required|string',

            'congruence_with_content' => 'required|array',
            'congruence_with_content.rating' => 'required|min:0|max:5',
            'congruence_with_content.comment' => 'required|string',

            'trainees_cooperation' => 'required|array',
            'trainees_cooperation.rating' => 'required|min:0|max:5',
            'trainees_cooperation.comment' => 'required|string',

            'syllabus_understanding' => 'required|array',
            'syllabus_understanding.rating' => 'required|min:0|max:5',
            'syllabus_understanding.comment' => 'required|string',

            'hall_preparation' => 'required|array',
            'hall_preparation.rating' => 'required|min:0|max:5',
            'hall_preparation.comment' => 'required|string',

            'reception_supervision' => 'required|array',
            'reception_supervision.rating' => 'required|min:0|max:5',
            'reception_supervision.comment' => 'required|string',

            'hospitality_and_course_breaks' => 'required|array',
            'hospitality_and_course_breaks.rating' => 'required|min:0|max:5',
            'hospitality_and_course_breaks.comment' => 'required|string',

            'training_department_cooperation' => 'required|array',
            'training_department_cooperation.rating' => 'required|min:0|max:5',
            'training_department_cooperation.comment' => 'required|string',

            'note' => 'required|string',

        ]);

        CoachCourseAssessment::create($data);

        return ['success' => 'coach course assessment archived'];
    }

    public function index(CoachCourseAssessmentFilters $filters, Request $request)
    {
        return CoachCourseAssessment::latest()->filter($filters)->paginate($request->input('page_size') ?? 10);
    }
    public function show($id)
    {
        return CoachCourseAssessment::where('id', $id)->first();
    }
}
