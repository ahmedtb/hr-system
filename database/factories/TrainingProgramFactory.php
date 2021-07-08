<?php

namespace Database\Factories;

use App\Models\TrainingProgram;
use Illuminate\Database\Eloquent\Factories\Factory;

class TrainingProgramFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TrainingProgram::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->sentence(),
            'goals' => $this->faker->text(),
            'category' => $this->faker->word(),
            'period' => $this->faker->numberBetween(0,1000),
            'details' => $this->faker->text()
        ];
    }
}
