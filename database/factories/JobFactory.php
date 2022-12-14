<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Job;
use App\Models\Unit;
use Illuminate\Database\Eloquent\Factories\Factory;

class JobFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Job::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'unit_id' => Unit::inRandomOrder()->first()->id ?? Unit::factory()->create()->id,
            'name' => $this->faker->sentence(),
            'purpose' => $this->faker->sentence(),
            'description' => $this->faker->text(),
        ];
    }
}
