<?php

namespace Tests\Feature\API;

use App\Models\Employee;
use App\Models\Job;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class EmployeesEndpointsTests extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_employee_can_be_created_after_creating_job()
    {
        // $this->withoutExceptionHandling();
        $job = Job::factory()->create();
        $employee = Employee::factory()->make();
        $response = $this->postJson('api/createEmployee', [
            'name' => $employee->name,
            'address' => $employee->address,
            'employment_date' => $employee->employment_date,
            'basic_salary' => $employee->basic_salary,
            'phone_number' => $employee->phone_number,
            'job_id' => $job->id,
            'email' => $employee->email,
            'medal_rating' => $employee->medal_rating
        ])->assertOk()->assertJson(['success' => 'employee created']);
        // dd($response->json());
        $this->assertNotEmpty(Employee::first());
    }

    public function test_employee_can_be_created_togather_with_new_job_kind()
    {
        $job = Job::factory()->make();
        $employee = Employee::factory()->make();
        $response = $this->postJson('api/createEmployeeWithJob', [
            // job details
            'unit_id' => $job->unit_id,
            'name' => $job->name,
            'purpose' => $job->purpose,
            'description' => $job->description,

            // employee details
            'name' => $employee->name,
            'address' => $employee->address,
            'employment_date' => $employee->employment_date,
            'basic_salary' => $employee->basic_salary,
            'phone_number' => $employee->phone_number,
            // 'job_id' => $job->id,
            'email' => $employee->email,
            'medal_rating' => $employee->medal_rating
        ])->assertOk()->assertJson(['success' => 'employee created ']);
        // dd($response->json());
        $this->assertNotEmpty(Employee::first());
    }


}
