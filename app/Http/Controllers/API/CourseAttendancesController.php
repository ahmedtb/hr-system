<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CourseAttendance;
use App\Models\TrainingCourse;
use Illuminate\Http\Request;

class CourseAttendancesController extends Controller
{
    public function courseStatistics($course_id)
    {
        $course = TrainingCourse::where('id',$course_id)->first();
        $traineesCount = $course->employees()->count() + $course->targetedIndividuals()->count();
        $attendances = CourseAttendance::where('training_course_id', $course_id)->get();
    }
}
