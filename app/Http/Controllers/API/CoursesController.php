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
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Validator;

class CoursesController extends Controller
{

    public function show(Request $request, $id)
    {
        $user = $request->user();

        $course = TrainingCourse::where('id', $id)
            ->first();
        $program = Gate::allows('viewCourseProgram', $course) ? $course->trainingProgram : null;
        $individuals = Gate::allows('viewCourseTrainees', $course) ? $course->targetedIndividuals : null;
        $employees = Gate::allows('viewCourseTrainees', $course) ? $course->employees : null;
        $attendances = Gate::allows('viewCourseAttendances', $course) ? $course->attendances : null;

        return [
            'course' => Gate::allows('viewCourse', $course) ? $course : null,
            'program' => $program,
            'individuals' => $individuals,
            'employees' => $employees,
            'attendances' => $attendances
        ];
    }

    public function index(Request $request, CourseFilters $filters)
    {
        return $request->user()->TrainingCourses()->filter($filters)
            ->paginate($request->get('page_size') ?? 10)
            ->appends(request()->except('page'));
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
            'end_date' => 'required|date|after:start_date',
            'week_schedule' => ['required', new WeekScheduleRule()] // need fourther validation of structure
        ]);

        TrainingCourse::create($validated);

        return response(['success' => 'training coures created']);
    }

    public function delete(Request $request, $id)
    {
        TrainingCourse::where('id', $id)->first()->delete();

        return response()->json(['success' => 'training coures ' . $id . ' deleted'], 202 );
    }

    
    public function edit(Request $request, $id)
    {
        // return $id;
        // return $request->all();
        $validated = $request->validate([
            'title' => 'required|string',
            'training_program_id' => 'required|exists:training_programs,id',
            'status' => ['required', new CourseStatusRule()],
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
            'week_schedule' => ['required', new WeekScheduleRule()] // need fourther validation of structure
        ]);

        $course = TrainingCourse::where('id', $id)->first();
        if ($course) {
            $course->update($validated);

            return response()->json(['success' => 'course ' . $request->id . ' edited']);
        } else
            return response()->json(['failure' => 'course ' . $request->id . ' does not exists']);
    }

    public function getSchedule(int $id)
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
