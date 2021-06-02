<?php

namespace App\Http\Controllers\API;

use App\Models\Employee;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

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
            'medal_rating' => 'required|string'
        ]);

        Employee::create($validateddata);

        return response(['success' => 'employee created']);
    }
}
