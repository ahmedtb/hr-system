<?php

namespace App\Http\Controllers\API;

use App\Models\Job;
use App\Models\Trainee;
use App\Models\Document;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\TrainingCourse;
use App\Http\Controllers\Controller;
use Symfony\Component\HttpKernel\Event\RequestEvent;

class EmployeesController extends Controller
{
    public function create(Request $request)
    {
        $validateddata = $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'employment_date' => 'required|date',
            'basic_salary' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
            'phone_number' => 'required|string',
            'job_id' => 'required|exists:jobs,id',
            'email' => 'required|email',
            'medal_rating' => 'required|integer'
        ]);

        Employee::create($validateddata);

        return response(['success' => 'employee created']);
    }

    public function CreateWithJob(Request $request)
    {
        $jobFields = $request->validate([
            'unit_id' => 'required|exists:units,id',
            'name' => 'required|string',
            'purpose' => 'required|string',
            'description' => 'required|min:20|max:1000',
        ]);
        $employeeFields = $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'employment_date' => 'required|date',
            'basic_salary' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
            'phone_number' => 'required|string',
            // 'job_id' => 'required|exists:jobs,id',
            'email' => 'required|email',
            'medal_rating' => 'required|integer'
        ]);

        $job = Job::create($jobFields);

        Employee::create(array_merge($employeeFields, [
            'job_id' => $job->id,
        ]));

        return response(['success' => 'job and employee created']);
    }

    public function editEmployee(Request $request)
    {
        $validateddata = $request->validate([
            'employee_id' => 'required|exists:employees,id',
            'name' => 'sometimes|string',
            'address' => 'sometimes|string',
            'employment_date' => 'sometimes|date',
            'basic_salary' => 'sometimes|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
            'phone_number' => 'sometimes|string',
            'job_id' => 'sometimes|exists:jobs,id',
            'email' => 'sometimes|email',
            'medal_rating' => 'sometimes|integer'
        ]);

        $employee = Employee::where('id', $request->employee_id)->first();
        $validateddata['id'] = $validateddata['employee_id'];
        unset($validateddata['employee_id']);
        // dd($validateddata);
        $employee->update($validateddata);

        return response(['success' => 'employee edited']);
    }

    public function attackDocument(Request $request)
    {
        $request->validate([
            'employee_id' => 'required|exists:employees,id',
        ]);
        $validateddata = $request->validate([
            'name' => 'required|string',
            'image' => 'required|string',
        ]);

        $employee = Employee::where('id',$request->employee_id)->first();
        
        Document::create(
            array_merge($validateddata, [
                'documentable_id' => $employee->id,
                'documentable_type' => Employee::class
            ])
        );

        return response(['success'=>'document attached to employee']);

    }

    public function rateEmployee(Request $request)
    {
        $request->validate([
            'id' => 'required|exists:employees,id',
            'rating' => 'required|integer|between:0,5'
        ]);

        $employee = Employee::where('id',$request->id)->first();
        $employee->update(['medal_rating' => $request->rating]);
        return response(['success'=>'employee rated']);
    }

    public function createCourseForEmployees(Request $request)
    {
        $request->validate([
            'employees' => 'required|array',
            'employees.*' => 'required|exists:employees,id'
        ]);

        $validatedCourseData = $request->validate([
            'title' => 'required|string',
            'training_program_id' => 'required|exists:training_programs,id',
            'status' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'week_schedule' => 'required|array'
        ]);

        $course = TrainingCourse::create($validatedCourseData);

        $course->employees()->attach($request->employees);

    }
}
