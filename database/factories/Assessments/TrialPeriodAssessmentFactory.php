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


    // $table->date('date');
    // $table->foreignId('employee_id');
    // $table->foreignId('unit_id');
    // $table->date('trial_begin_date');
    // $table->date('trial_end_date');
    // $table->tinyInteger('excitement');
    // $table->tinyInteger('ability_to_improve');
    // $table->tinyInteger('guidance_acceptance');
    // $table->tinyInteger('handling_technology');
    // $table->tinyInteger('maintaining_working_hours');
    // $table->tinyInteger('relationship_with_colleagues');
    // $table->tinyInteger('behavior');
    // $table->tinyInteger('look');
    // $table->tinyInteger('belief_and_loyalty');
    // $table->tinyInteger('final_degree');
    // $table->foreignId('reporter_id')
    //     ->references('id')
    //     ->on('employees');
    // $table->string('unit_head_recommendation');
    // $table->integer('Delay in minutes');
    // $table->integer('Early departure_min');
    // $table->integer('delay_deduction');
    // $table->integer('footprint_deduction');
    // $table->integer('Absence');
    // $table->integer('attendance_rate');
    // $table->string('management_decision');
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
