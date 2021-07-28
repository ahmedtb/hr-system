<?php

namespace Tests\Feature\DB\Assessments;

use Tests\TestCase;
use App\Models\Employee;
use App\Models\TargetedIndividual;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Assessments\TraineeCourseAssessment;

class TraineeCourseAssessmentsTest extends TestCase
{
    use RefreshDatabase;

    public function test_system_can_get_the_employee_or_the_individual_who_made_the_trainee_course_assessment()
    {
        $individual = TargetedIndividual::factory()->create();
        $trainee_course_assesssment = TraineeCourseAssessment::factory()->create([
            'trainee_id' => $individual->id,
            'trainee_type' => TargetedIndividual::class
        ]);
        // dd($individual->TraineeCourseAssessments);
        $this->assertEquals($trainee_course_assesssment->trainee->name,$individual->name);
        $this->assertEquals($individual->TraineeCourseAssessments()->first()->training_course_id,$trainee_course_assesssment->training_course_id);

        $employee = Employee::factory()->create();
        $trainee_course_assesssment = TraineeCourseAssessment::factory()->create([
            'trainee_id' => $employee->id,
            'trainee_type' => Employee::class
        ]);
        $this->assertEquals($trainee_course_assesssment->trainee->name,$employee->name);
        $this->assertEquals($employee->TraineeCourseAssessments()->first()->training_course_id,$trainee_course_assesssment->training_course_id);

        // dd($trainee_course_assesssment->trainee);
    }
}
