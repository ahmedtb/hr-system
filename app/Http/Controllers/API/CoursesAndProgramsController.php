<?php

namespace App\Http\Controllers\API;

use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\TrainingCourse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class CoursesAndProgramsController extends Controller
{
    public function isTodayBetween(Carbon $start_date, Carbon $end_date): bool
    {

        $start = Carbon::createFromFormat('Y-m-d', $start_date);
        $end =   Carbon::createFromFormat('Y-m-d', $end_date);
        $date =  Carbon::today();

        $check = $date->between($start, $end);

        return $check;
    }

    public function getCourseEmployees($training_course_id)
    {
        $validation = Validator::make(['training_course_id' => $training_course_id], [
            'training_course_id' => 'required|exists:training_courses,id'
        ])->validate();

        $course = TrainingCourse::where('id', $training_course_id)->first();
        return $course->employees()->get();
    }

    public function getCourseState($training_course_id)
    {
        Validator::make(['training_course_id' => $training_course_id], [
            'training_course_id' => 'required|exists:training_courses,id'
        ])->validate();

        $course = TrainingCourse::where('id', $training_course_id)->first();
        $employees =  $course->employees()->get();
        $coaches =  $course->coaches()->get();
        $targetedIndividuals =  $course->targetedIndividuals()->get();
        $trainingProgram =  $course->trainingProgram()->get();

        $title =  $course->title;
        $status =  $course->status;
        $start_date =  $course->start_date;
        $end_date =  $course->end_date;
        $week_schedule = $course->week_schedule;

        return response([
            'employees' => $employees,
            'coaches' => $coaches,
            'targetedIndividuals' => $targetedIndividuals,
            'trainingProgram' => $trainingProgram,
            'title' => $title,
            'status' => $status,
            'start_date' => $start_date,
            'end_date' => $end_date,
            'week_schedule' => $week_schedule,
        ]);
    }
}
