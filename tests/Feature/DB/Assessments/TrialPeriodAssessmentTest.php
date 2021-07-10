<?php

namespace Tests\Feature\DB\Assessments;

use DateTime;
use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Assessments\TrialPeriodAssessment;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TrialPeriodAssessmentTest extends TestCase
{
    use RefreshDatabase;

    public function test_system_can_retrive_interviews_by_the_best_in_a_trait_within_a_date_range()
    {
        TrialPeriodAssessment::factory(10)->create([
            'created_at' => new DateTime('now -2 day')
        ]);

        TrialPeriodAssessment::factory(10)->create();
        $queryResult = TrialPeriodAssessment::orderByTrait('excitement', new DateTime('now -1 day'), new DateTime('now 1 day'))->get();
        $this->assertEquals($queryResult->count(), 10);

        for ($i = 0; $i <= 8; $i++) {
            $this->assertTrue($queryResult[$i]->excitement >= $queryResult[$i + 1]->excitement);
        }

    }
}
