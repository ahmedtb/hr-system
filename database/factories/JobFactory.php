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
        // $id = 13;
        // $employee = Employee::factory()->create(['job_id' => $id]);
        return [
            'unit_id' => Unit::factory()->create()->id,
            'name' => $this->faker->name(),
            'purpose' => $this->faker->sentence(),
            'description' => $this->faker->randomHtml(),
        ];
    }
}
