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
            'training_program_id' => TrainingProgram::factory()->create()->id
        ];
    }
}
