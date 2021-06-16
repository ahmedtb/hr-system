<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Document;
use App\Models\Employee;
use App\Rules\Base64Rule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Validator;

class EmployeesController extends Controller
{
    public function create(Request $request)
    {

        $request->validate([
            'name' => 'required|string',
            'address' => 'required|string',
            'employment_date' => 'required|date',
            'basic_salary' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
            'phone_number' => 'required|string',
            'job_id' => 'required|exists:jobs,id',
            'email' => 'required|email',
            'medal_rating' => 'sometimes|integer',
            'documents.*' => 'sometimes|image|mimes:jpg,jpeg,png,bmp,tiff |max:1024',
        ]);

        DB::transaction(function ()  use ($request) {
            $employee = Employee::create([
                'name' => $request->name,
                'address' => $request->address,
                'employment_date' => $request->employment_date,
                'basic_salary' => $request->basic_salary,
                'phone_number' => $request->phone_number,
                'job_id' => $request->job_id,
                'email' => $request->email,
                'medal_rating' => $request->medal_rating,
            ]);

            if ($request->documents) {
                foreach ($request->file('documents') as $document) {
                    $image = base64_encode(file_get_contents($document->path()));
                    Document::create([
                        'name' => $document->getClientOriginalName(),
                        'image' => $image,
                        'documentable_id' => $employee->id,
                        'documentable_type' => Employee::class
                    ]);
                }
            }
        });

        if ($request->documents) {
            return redirect()->route('home')->with('success', 'employee created with documents');
        } else {
            return redirect()->route('home')->with('success', 'employee created');
        }
    }

    public function createForm()
    {
        $jobs = Job::all();
        $job_selection_array = [];
        foreach ($jobs as $job) {
            $job_selection_array[$job->id] = $job->name . ' - ' . $job->unit->name;
        }
        return View('employee.create', [
            'jobs' => $job_selection_array
        ]);
    }
}
