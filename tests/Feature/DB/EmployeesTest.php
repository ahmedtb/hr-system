<?php

namespace Tests\Feature\DB;

use Tests\TestCase;
use App\Models\Head;
use App\Models\Document;
use App\Models\Employee;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Assessments\InterviewAssessment;
use App\Models\Assessments\TrainingPeriodAssessment;
use App\Models\Assessments\TrialPeriodAssessment;
use App\Models\Job;
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

    public function test_system_can_get_employee_assessments()
    {
        $employee = Employee::factory()->create();
        $trial_assessments = TrialPeriodAssessment::factory(3)->create(['employee_id' => $employee->id]);
        $training_assessments = TrainingPeriodAssessment::factory(2)->create(['employee_id' => $employee->id]);

        $this->assertEquals($employee->TrialPeriodAssessments()->count(),$trial_assessments->count());
        $this->assertEquals($employee->TrainingPeriodAssessments()->count(),$training_assessments->count());

    }

    public function test_employee_model_allows_come_with_its_job()
    {
        $employee = Employee::factory()->create();
        $this->assertTrue($employee->job instanceof Job);
    }

}
