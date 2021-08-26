<?php

namespace Tests\Feature\DB;

use Tests\TestCase;
use App\Models\Head;
use App\Models\Coach;
use App\Models\Document;
use App\Models\TrainingCourse;
use App\Models\TargetedIndividual;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Assessments\InterviewAssessment;
use App\Models\Assessments\TrialPeriodAssessment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Assessments\TrainingPeriodAssessment;

class TargetedIndividualsTests extends TestCase
{
    use RefreshDatabase;

    public function test_targeted_has_a_name_()
    {
        $targeted = TargetedIndividual::factory()->create();
        $this->assertNotEmpty($targeted->name);
    }

    public function test_targeted_could_have_multip_documents_attached_to_it()
    {
        $targeted = TargetedIndividual::factory()->has(Document::factory()->count(5))->create();

        $this->assertEquals($targeted->documents()->count(), 5);
    }

    public function test_system_can_get_targeted_assessments()
    {
    }

    public function test_individual_that_is_a_coach_return_coach_role_also()
    {
        $targeted = TargetedIndividual::factory()->create();
        $coach = Coach::factory()->profile($targeted)->create();
        $this->assertEquals($targeted->refresh()->role, ['individual', 'coach']);
        
        $targeted = TargetedIndividual::factory()->create();
        $this->assertEquals($targeted->refresh()->role, ['individual']);
    }

        
    public function test_individual_training_courses_function_return_his_courses_as_a_employee_and_coach_if_he_is()
    {
        $individual = TargetedIndividual::factory()->create();
        $coach = Coach::factory()->profile($individual)->create();
        
        // create course without coach
        TrainingCourse::factory()->create()->enrollIndividual($individual);

        // create course with the individual as the coach
        TrainingCourse::factory()->create()->attachCoach($coach);
        
        // dd($individual->refresh()->TrainingCourses()->get());
        $this->assertEquals($individual->refresh()->TrainingCourses()->count(),2);
    }
}
