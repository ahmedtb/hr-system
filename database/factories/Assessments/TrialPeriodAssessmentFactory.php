<?php

namespace Database\Factories\Assessments;

use App\Models\Assessments\TrialPeriodAssessment;
use App\Models\Employee;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

class TrialPeriodAssessmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TrialPeriodAssessment::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'date' => $this->faker->date(),
            'employee_id' => Employee::factory()->create()->id,
            'unit_id' => Unit::factory()->create()->id,
            'trial_begin_date' => $this->faker->date(),
            'trial_end_date' => $this->faker->date(),
            'excitement' => random_int(0,15),
            'ability_to_improve' => random_int(0,15),
            'guidance_acceptance' => random_int(0,15),
            'handling_technology' => random_int(0,15),
            'maintaining_working_hours' => random_int(0,15),
            'relationship_with_colleagues' => random_int(0,15),
            'behavior' => random_int(0,15),
            'look' => random_int(0,15),
            'belief_and_loyalty' => random_int(0,10),
            'final_degree' => random_int(0,130),
            'reporter_id' => Employee::factory()->create()->id,
            'unit_head_recommendation' => $this->faker->sentence(),
            'delay_in_min' => random_int(0,100),
            'early_departure_min' => random_int(0,100),
            'delay_deduction' => random_int(0,1000),
            'footprint_deduction' => random_int(0,1000),
            'absence_days' => random_int(0,30),
            'attendance_rate' => random_int(0,100),
            'management_decision' => $this->faker->sentence(),
            
        ];
    }
}
