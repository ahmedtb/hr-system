<?php

namespace Tests\Feature\API\Assessments;

use App\Models\Assessments\TrainingPeriodAssessment;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TrainingPeriodAssessmentTest extends TestCase
{
    use RefreshDatabase;
    public function test_training_period_assessment_form_could_be_created_and_archive_it()
    {
        $assessment = TrainingPeriodAssessment::factory()->make();
        $response = $this->postJson('/api/trainingPeriod/create', [
            'date' => $assessment->date,
            'employee_id' => $assessment->employee_id,
            'unit_id' => $assessment->unit_id,
            'training_begin_date' => $assessment->training_begin_date,
            'training_end_date' => $assessment->training_end_date,
            'excitement' => $assessment->excitement,
            'ability_to_improve' => $assessment->ability_to_improve,
            'guidance_acceptance' => $assessment->guidance_acceptance,
            'handling_technology' => $assessment->handling_technology,
            'maintaining_working_hours' => $assessment->maintaining_working_hours,
            'relationship_with_colleagues' => $assessment->relationship_with_colleagues,
            'behavior' => $assessment->behavior,
            'look' => $assessment->look,
            'belief_and_loyalty' => $assessment->belief_and_loyalty,
            'final_degree' => $assessment->final_degree,
            'reporter_id' => $assessment->reporter_id,
            'unit_head_recommendation' => $assessment->unit_head_recommendation,
            'delay_in_min' => $assessment->delay_in_min,
            'early_departure_min' => $assessment->early_departure_min,
            'delay_deduction' => $assessment->delay_deduction,
            'footprint_deduction' => $assessment->footprint_deduction,
            'absence_days' => $assessment->absence_days,
            'attendance_rate' => $assessment->attendance_rate,
            'management_decision' => $assessment->management_decision,
        ]);
        $response->assertOk();
        $response->assertJson(['success' => 'training period assessment archived']);
        // dd($response->json());
    }

    public function test_training_period_assessment_could_be_retrived()
    {
        TrainingPeriodAssessment::factory(10)->create();
        $response = $this->getJson('api/trainingPeriodAssessment/index');
        // dd($response->json());
        $response->assertOk()->assertJsonCount(10);
    }

    public function test_system_can_retrive_training_period_assessments_by_filtering()
    {
        TrainingPeriodAssessment::factory(2)->create([
            'excitement' => 5,
        ]);
        TrainingPeriodAssessment::factory(5)->create([
            'excitement' => 1,
        ]);
        $response = $this->getJson('api/trainingPeriodAssessment/index?excitement=5');
        $response->assertOk()->assertJsonCount(2);

        $response = $this->getJson('api/trainingPeriodAssessment/index?excitement=2');
        $response->assertOk()->assertJsonCount(0);
    }
}
