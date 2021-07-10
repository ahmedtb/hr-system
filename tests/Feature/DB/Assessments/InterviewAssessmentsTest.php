<?php

namespace Tests\Feature\DB\Assessments;

use App\Models\Assessments\InterviewAssessment;
use App\Models\Employee;
use DateTime;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class InterviewAssessmentsTest extends TestCase
{
    use RefreshDatabase;

    public function test_model_can_return_its_filled_fields_in_decending_order_according_to_rating()
    {
        $assessment = InterviewAssessment::factory()->create();
        $traitsOrder = $assessment->orderTraits();
        $this->assertIsArray($traitsOrder);
        $this->assertEquals(count($traitsOrder), 16);

        for ($i = 0; $i < 15; $i++) {
            $this->assertTrue($assessment[$traitsOrder[$i]] <= $assessment[$traitsOrder[$i + 1]]);
        }
    }

    public function test_system_can_retrive_interviews_by_the_best_in_a_trait_within_a_date_range()
    {
        InterviewAssessment::factory(10)->create([
            'created_at' => new DateTime('now -2 day')
        ]);

        InterviewAssessment::factory(10)->create();
        $queryResult = InterviewAssessment::orderByTrait('look', new DateTime('now -1 day'), new DateTime('now 1 day'))->get();
        $this->assertEquals($queryResult->count(), 10);

        $traits = [1, 2, 3, 4];
        $bestindex = 0;
        foreach ($queryResult as $assessment) {
            if ($assessment->look == $traits[$bestindex]) {
                $this->assertTrue(true);
            } else {
                $bestindex++;
                $this->assertTrue($assessment->look == $traits[$bestindex]);
            }
        }
    }

}
