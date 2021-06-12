<?php

namespace Tests\Feature\DB;

use App\Models\Document;
use Tests\TestCase;
use App\Models\Head;
use App\Models\Employee;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class EmployeesTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_employee_has_a_name_address_a_date_of_employment_a_basic_salary_phone_number_a_job_and_email()
    {
        $employee = Employee::factory()->create();
        $this->assertNotEmpty($employee->name);
        $this->assertNotEmpty($employee->address);
        $this->assertNotEmpty($employee->employment_date);
        $this->assertNotEmpty($employee->basic_salary);
        $this->assertNotEmpty($employee->job);
        $this->assertNotEmpty($employee->email);
    }

    public function test_Employee_could_have_multip_documents_attached_to_it()
    {
        $employee = Employee::factory()->has(Document::factory()->count(5))->create();

        $this->assertEquals($employee->documents()->count(),5);
    }

    public function test_employee_could_have_a_medal_as_a_rating_from_management()
    {
        $medals = array(1,2,3,4,5);

        $employee = Employee::factory()->create();

        $this->assertTrue(in_array($employee->medal_rating,$medals));
    }

    public function test_employee_should_have_a_CV()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }
}
