<?php

namespace Database\Factories;

use App\Models\TrainingCourse;
use App\Models\TrainingProgram;
use Illuminate\Database\Eloquent\Factories\Factory;

class TrainingCourseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TrainingCourse::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title'=> $this->faker->title(),
            'training_program_id' => TrainingProgram::factory()->create()->id,
            'status'=>'pending',
            'start_date' => $this->faker->date(),
            'end_date' => $this->faker->date(),
            'week_schedule'=> json_encode([])
        ];
    }
}
