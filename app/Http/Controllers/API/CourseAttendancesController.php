<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CourseAttendance;
use App\Models\Employee;
use App\Models\TargetedIndividual;
use App\Models\TrainingCourse;
use Illuminate\Http\Request;

class CourseAttendancesController extends Controller
{
    public function courseStatistics($course_id)
    {
        $course = TrainingCourse::where('id', $course_id)->first();
        $traineesCount = $course->employees()->count() + $course->targetedIndividuals()->count();
        $attendances = CourseAttendance::where('training_course_id', $course_id)->get();
    }

    public function create(Request $request)
    {
        $request->validate([
            'person_name' => 'sometimes|nullable|string',
            'profile_type' => 'sometimes|nullable|string',
            'profile_id' => 'sometimes|nullable|integer',
            'date' => 'required|date',
            'entrance_time' => 'required|string',
            'note' => 'sometimes|nullable|string',
            'training_course_id' => 'required|exists:training_courses,id'
        ]);
        $course = TrainingCourse::where('id', $request->training_course_id)->first();
        if (!$request->person_name) {
            if ($request->profile_type == Employee::class) {
                $employee = Employee::where('id', $request->profile_id)->first();
                return $course->attendEmployee($employee, $request->date, $request->entrance_time, $request->note);
            }else if($request->profile_type == TargetedIndividual::class) {
                $individual = TargetedIndividual::where('id', $request->profile_id)->first();
                return $course->attendIndividual($individual, $request->date, $request->entrance_time, $request->note);
            }
        } else {
            return $course->attendAnonymous($request->person_name, $request->date, $request->entrance_time, $request->note);
        }
    }

    public function delete($id){
        $record = CourseAttendance::where('id',$id)->first();
        $record->delete();

        return ['success'=>'attendance record successfully deleted'];
    }
}
