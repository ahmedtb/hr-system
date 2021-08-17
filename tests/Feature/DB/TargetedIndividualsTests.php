<?php

namespace Tests\Feature\DB;

use Tests\TestCase;
use App\Models\Head;
use App\Models\Coach;
use App\Models\Document;
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
}
