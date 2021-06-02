<?php

namespace Tests\Feature\API;

use App\Models\Job;
use Tests\TestCase;
use App\Models\Document;
use App\Models\Employee;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

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
        ])->assertOk()->assertJson(['success' => 'job and employee created']);
        $this->assertNotEmpty(Employee::first());
    }

    public function test_employee_data_can_be_edited()
    {
        $job = Job::factory()->create();
        $employee1 = Employee::factory()->create();
        $employee2 = Employee::factory()->make();

        $response = $this->putJson('api/editEmployee', [
            'employee_id' => $employee1->id,
            'name' => $employee2->name,
            'address' => $employee2->address,
            'employment_date' => $employee2->employment_date,
            'basic_salary' => $employee2->basic_salary,
            'phone_number' => $employee2->phone_number,
            'job_id' => $job->id,
            'email' => $employee2->email,
            'medal_rating' => $employee2->medal_rating
        ])->assertOk()->assertJson(['success' => 'employee edited']);
    }

    public function test_employee_documents_can_be_attacked_to_his_profile()
    {
        $document = Document::factory()->make();
        $employee = Employee::factory()->create();
        $response = $this->putJson('api/attackDocumentToEmployee', [
            'employee_id' => $employee->id,
            'name' => $document->name,
            'image' => $document->image
        ])->assertOk()->assertJson(['success'=>'document attached to employee']);
        $this->assertEquals($employee->documents()->count(),1);
    }

    public function test_employee_can_be_rated()
    {
        $medals = array(1,2,3,4,5);
        $randomRate = array_rand($medals);
        $employee = Employee::factory()->create();
        $response = $this->putJson('api/rateEmployee', [
            'id' => $employee->id,
            'rating' => $randomRate
        ])->assertOk();
        $this->assertEquals($employee->refresh()->medal_rating, $randomRate);
    }


}
