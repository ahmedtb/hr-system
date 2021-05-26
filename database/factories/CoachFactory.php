<?php

namespace Database\Factories;

use App\Models\Coach;
use Illuminate\Database\Eloquent\Factories\Factory;

class CoachFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Coach::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'CV' => $this->faker->randomHtml(),
            'speciality' => $this->faker->sentence()
        ];
    }
}
