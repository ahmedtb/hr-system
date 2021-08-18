<?php

namespace Tests\Feature\API;

use App\Models\Job;
use Tests\TestCase;
use App\Models\Unit;
use App\Models\Trainee;
use App\Models\Document;
use App\Models\Employee;
use App\Models\TrainingCourse;
use App\Models\TrainingProgram;
use Illuminate\Http\Testing\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EmployeesEndpointsTests extends TestCase
{
    use RefreshDatabase;

    public function test_employees_index_endpoint_providers_pagination_capability()
    {
        Employee::factory(50)->create();
        $response = $this->getJson('/api/employee/index');
        // dd($response->json());

        $response->assertJsonStructure([
            'current_page', 'next_page_url', 'data', 'first_page_url', 'from', 'last_page', 'last_page_url'
        ]);
        $this->assertEquals(count($response['data']), 10);


        for ($i = 0; $i < 4; $i++) {
            $response = $this->getJson($response['next_page_url']);
            $response->assertJsonStructure([
                'current_page', 'next_page_url', 'data', 'first_page_url', 'from', 'last_page', 'last_page_url'
            ]);
            $this->assertEquals(count($response['data']), 10);
        }
    }

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
            'medal_rating' => $employee->medal_rating,
            'password' => 'password',
            'password_confirmation' => 'password'

        ]);//->assertOk()->assertJson(['success' => 'employee created']);
        // dd($response->json());
        $this->assertNotEmpty(Employee::first());
    }

    public function test_employee_can_be_created_with_documents_attacked_to_it()
    {
        // $this->withoutExceptionHandling();
        // $documents = Document::factory(5)->make();

        Storage::fake('public');

        $documents = [File::image('icon.png', 400, 100),File::image('icon.png', 400, 100)];
        
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
            'medal_rating' => $employee->medal_rating,
            'documents' => $documents,
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);
        // dd($response->json());
        $response->assertOk()->assertJson(['success' => 'employee created with documents']);
        $this->assertNotEmpty(Employee::first());
        $this->assertEquals(Document::all()->count(), 2);
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
            'medal_rating' => $employee->medal_rating,
            'password' => 'password',
            'password_confirmation' => 'password'
        ])->assertOk()->assertJson(['success' => 'job and employee created']);
        // dd($response->json());

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

    public function test_employee_documents_can_be_atteched_to_his_profile()
    {
        $document = Document::factory()->make();
        $employee = Employee::factory()->create();
        $response = $this->putJson('api/attackDocumentToEmployee', [
            'employee_id' => $employee->id,
            'name' => $document->name,
            'image' => $document->image
        ])->assertOk()->assertJson(['success' => 'document attached to employee']);
        $this->assertEquals($employee->documents()->count(), 1);
    }

    public function test_employee_can_be_rated()
    {
        $medals = array(1, 2, 3, 4, 5);
        $randomRate = array_rand($medals);
        $employee = Employee::factory()->create();
        $response = $this->putJson('api/rateEmployee', [
            'id' => $employee->id,
            'rating' => $randomRate
        ])->assertOk();
        $this->assertEquals($employee->refresh()->medal_rating, $randomRate);
    }

    public function test_employee_or_a_group_of_employees_can_be_put_under_trail_period()
    {
        $trailProgram = TrainingProgram::factory()->create([
            'title' => 'trail period program 1'
        ]);
        $employees = Employee::factory(10)->create();

        $courseData = TrainingCourse::factory()->make();
        $response = $this->postJson('api/createCourseForEmployees', [
            'employees' => $employees->pluck('id'),

            'title' => $courseData->title,
            'training_program_id' => $trailProgram->id,
            'status' => $courseData->status,
            'start_date' => $courseData->start_date,
            'end_date' => $courseData->end_date,
            'week_schedule' => $courseData->week_schedule
        ])->assertOk();
        $this->assertNotNull(TrainingCourse::first());
        $this->assertEquals(TrainingCourse::first()->employees()->count(), 10);
    }

    public function test_employee_has_an_optional_profile_picture()
    {
    }

    public function test_employees_can_be_filtered_by_job_id()
    {
        Employee::factory(3)->create();

        $job = Job::factory()->create();
        Employee::factory()->create(['job_id' => $job->id]);
        
        $response = $this->getJson('/api/employee/index?job_id=' . $job->id);

        $this->assertEquals($response->json()['total'],1);
    }

    public function test_employees_can_be_filtered_by_unit_id()
    {
        Employee::factory(3)->create();

        $unit = Unit::factory()->create();
        $job = Job::factory()->create(['unit_id' => $unit->id]);
        Employee::factory()->create(['job_id' => $job->id]);
        
        $response = $this->getJson('/api/employee/index?unit_id=' . $job->id);

        $this->assertEquals($response->json()['total'],1);
    }
}
