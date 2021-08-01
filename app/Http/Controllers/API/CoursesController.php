<?php

namespace App\Http\Controllers\API;

use App\Filters\CourseFilters;
use Illuminate\Http\Request;
use App\Models\TrainingCourse;
use App\Rules\CourseStatusRule;
use App\Rules\WeekScheduleRule;
use App\Http\Controllers\Controller;
use App\Models\CourseAttendance;
use App\Models\Employee;
use App\Models\TargetedIndividual;
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

    public function index2(Request $request, CourseFilters $filters)
    {
        return TrainingCourse::filter($filters)->with(['trainingProgram'])->paginate($request->get('page_size') ?? 10)->appends(request()->except('page'));
    }

    public function getTrainingCourses(CourseFilters $filters)
    {
        return TrainingCourse::filter($filters)->get();
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
        return CourseAttendance::where('training_course_id', $id)->whereDate('date', $date)->get();
    }

    public function getForms(int $id)
    {
        Validator::make(['id' => $id], [
            'id' => 'required|exists:training_courses,id'
        ])->validate();

        $course = TrainingCourse::where('id', $id)->first();

        return $course->forms;
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

    public function enroll(Request $request, $id)
    {
        Validator::make(['id' => $id], [
            'id' => 'required|exists:training_courses,id'
        ])->validate();
        $request->validate([
            'profile_id' => 'required|integer',
            'profile_type' => 'required|in:' . Employee::class . ',' . TargetedIndividual::class
        ]);

        $course = TrainingCourse::where('id', $id)->first();
        if ($request->profile_type == Employee::class) {
            $employee = Employee::where('id', $request->profile_id)->first();
            $course->enrollEmployee($employee);
            return ['success' => 'employee successfully enrolled'];
        } else {
            $individual = TargetedIndividual::where('id', $request->profile_id)->first();
            $course->enrollIndividual($individual);
            return ['success' => 'individual successfully enrolled'];
        }

        return response(['failure' => 'nothing is done'], 501);
    }
}
