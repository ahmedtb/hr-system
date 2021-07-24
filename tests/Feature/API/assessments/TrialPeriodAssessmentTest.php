<?php

namespace Tests\Feature\API\Assessments;

use App\Models\Assessments\TrialPeriodAssessment;
use DateTime;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TrialPeriodAssessmentTest extends TestCase
{
    use RefreshDatabase;


    public function test_trial_period_assessment_form_could_be_created_and_archive_it()
    {
        $assessment = TrialPeriodAssessment::factory()->make();
        $response = $this->postJson('/api/trialPeriodAssessment/create', [
            'date' => $assessment->date,
            'employee_id' => $assessment->employee_id,
            'unit_id' => $assessment->unit_id,
            'trial_begin_date' => $assessment->trial_begin_date,
            'trial_end_date' => $assessment->trial_end_date,
            'excitement' => $assessment->excitement,
            'ability_to_improve' => $assessment->ability_to_improve,
            'guidance_acceptance' => $assessment->guidance_acceptance,
            'handling_technology' => $assessment->handling_technology,
            'maintaining_working_hours' => $assessment->maintaining_working_hours,
            'relationship_with_colleagues' => $assessment->relationship_with_colleagues,
            'behavior' => $assessment->behavior,
            'look' => $assessment->look,
            'belief_and_loyalty' => $assessment->belief_and_loyalty,
            // 'final_degree' => $assessment->final_degree,
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
        $response->assertJson(['success' => 'trial period assessment archived']);
        // dd($response->json());
    }

    public function test_trial_period_assessment_could_be_retrived()
    {
        $interviews = TrialPeriodAssessment::factory(10)->create();
        $response = $this->getJson('api/trialPeriodAssessment/index');
        $this->assertEquals(sizeof($response->json()['data']),10 );
        // $response->assertOk()->assertJsonCount(10);
    }



    public function test_system_can_retrive_trial_period_assessments_by_filtering()
    {
        TrialPeriodAssessment::factory(2)->create([
            'excitement' => 5,
        ]);
        TrialPeriodAssessment::factory(5)->create([
            'excitement' => 1,
        ]);
        $response = $this->getJson('api/trialPeriodAssessment/index?excitement=5');
        $this->assertEquals(sizeof($response->json()['data']),2 );
        // dd($response->json());
        // $response->assertOk()->assertJsonCount(2);

        $response = $this->getJson('api/trialPeriodAssessment/index?excitement=2');
        $this->assertEquals(sizeof($response->json()['data']),0 );

        // $response->assertOk()->assertJsonCount(0);

        $response = $this->getJson('api/trialPeriodAssessment/index?orderByDesc=final_degree');
        // $response->assertOk()->assertJsonCount(7);
        $this->assertEquals(sizeof($response->json()['data']),7 );


        $preDegree = $response->json()['data'][0]['final_degree'];
        for ($i = 1; $i < sizeof($response->json()['data']); $i++) {
            $this->assertTrue($response->json()['data'][$i]['final_degree'] <= $preDegree);
            $preDegree = $response->json()['data'][$i]['final_degree'];
        }

        $response = $this->getJson('api/trialPeriodAssessment/index?orderByAsc=excitement');
        $this->assertEquals(sizeof($response->json()['data']),7 );


        $preDegree = $response->json()['data'][0]['excitement'];
        for ($i = 1; $i < sizeof($response->json()['data']); $i++) {
            $this->assertTrue($response->json()['data'][$i]['excitement'] >= $preDegree);
            $preDegree = $response->json()['data'][$i]['excitement'];
        }
    }

    public function test_system_can_retrive_trial_period_assessments_between_from_and_to_dates()
    {
        TrialPeriodAssessment::factory(10)->create([
            'created_at' => '2021-07-24'
        ]);
        TrialPeriodAssessment::factory(6)->create([
            'created_at' => '2021-07-29'
        ]);
        $response = $this->getJson('api/trialPeriodAssessment/index?from=2021-07-25&to=2021-07-29');
        // $response->assertOk()->assertJsonCount(6);
        $this->assertEquals(sizeof($response->json()['data']),6 );

    }

    public function test_model_automatically_calculate_summation_of_ratings()
    {
        $assessment = TrialPeriodAssessment::factory()->create();
        $sum = $assessment->excitement +
            $assessment->ability_to_improve +
            $assessment->guidance_acceptance +
            $assessment->handling_technology +
            $assessment->maintaining_working_hours +
            $assessment->relationship_with_colleagues +
            $assessment->behavior +
            $assessment->look +
            $assessment->belief_and_loyalty;
        $this->assertEquals($assessment->degrees_sum, $sum);
    }

}
