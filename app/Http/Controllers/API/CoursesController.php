<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\TrainingCourse;
use App\Rules\CourseStatusRule;
use App\Rules\WeekScheduleRule;
use App\Http\Controllers\Controller;
use App\Models\CourseAttendance;
use DateTime;
use Illuminate\Support\Facades\Validator;

class CoursesController extends Controller
{

    public function show($id)
    {
        $course = TrainingCourse::where('id', $id)
            ->with(['trainingProgram', 'targetedIndividuals', 'employees'])
            ->first();
        
        $attendances = $course->attendances;
        return [
            'course' => $course,
            'attendances' => $attendances
        ];
    }

    public function index()
    {


        $courses = TrainingCourse::with(['trainingProgram'])->paginate(5);
        $twentyDaysRangeCourses = TrainingCourse::whereDate('start_date', '<=', new DateTime('today +10 day'))
        ->whereDate('end_date', '>=', new DateTime('today -10 day'))->get();
        return [
            'courses' => $courses,
            'twentyDaysRangeCourses' => $twentyDaysRangeCourses
        ];
    }

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

        return response(['success' => 'training coures created']);
    }

    public function getSchedual(int $id)
    {
        Validator::make(['id' => $id], [
            'id' => 'required|exists:training_courses,id'
        ])->validate();

        $course = TrainingCourse::where('id', $id)->first();

        return $course->week_schedule;
    }

    public function getAttendances(int $id)
    {
        Validator::make(['id' => $id], [
            'id' => 'required|exists:training_courses,id'
        ])->validate();

        $course = TrainingCourse::where('id', $id)->first();

        return $course->attendances;
    }

    public function getAttendanceByDate(int $id, string $date)
    {
        Validator::make(['id' => $id, 'date' => $date], [
            'id' => 'required|exists:training_courses,id',
            'date' => 'required|date'

        ])->validate();
        return CourseAttendance::where('training_course_id', $id)->whereDate('date',$date)->get();
    }

    public function getForms(int $id)
    {
        Validator::make(['id' => $id], [
            'id' => 'required|exists:training_courses,id'
        ])->validate();

        $course = TrainingCourse::where('id', $id)->first();

        return $course->forms;
    }

    public function getTrainingCourses()
    {
        return TrainingCourse::all();
    }

    public function getEmployees($id)
    {
        $validation = Validator::make(['id' => $id], [
            'id' => 'required|exists:training_courses,id'
        ])->validate();

        $course = TrainingCourse::where('id', $id)->first();
        return $course->employees()->get();
    }

    public function getIndividuals($id)
    {
        $validation = Validator::make(['id' => $id], [
            'id' => 'required|exists:training_courses,id'
        ])->validate();

        $course = TrainingCourse::where('id', $id)->first();
        return $course->targetedIndividuals()->get();
    }
}
