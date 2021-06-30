<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\TrainingCourse;
use App\Rules\CourseStatusRule;
use App\Rules\WeekScheduleRule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CoursesController extends Controller
{
    public function create(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'training_program_id' => 'required|exists:training_programs,id',
            'status' => ['required', new CourseStatusRule()],
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'week_schedule' => ['required', new WeekScheduleRule()] // need fourther validation of structure
        ]);

        TrainingCourse::create($validated);

        return response(['success'=>'training coures created']);
    }

    public function getSchedual(int $id)
    {
        Validator::make(['id' => $id],[
            'id' => 'required|exists:training_courses,id'
        ])->validate();

        $course = TrainingCourse::where('id',$id)->first();

        return $course->week_schedule;
    }

    public function getAttendance(int $id)
    {
        Validator::make(['id' => $id],[
            'id' => 'required|exists:training_courses,id'
        ])->validate();

        $course = TrainingCourse::where('id',$id)->first();

        return $course->attendances;
    }

    public function getForms(int $id)
    {
        Validator::make(['id' => $id],[
            'id' => 'required|exists:training_courses,id'
        ])->validate();

        $course = TrainingCourse::where('id',$id)->first();

        return $course->forms;
    }

    public function getTrainingCourses()
    {
        return TrainingCourse::all();
    }
}
