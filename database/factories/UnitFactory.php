<?php

namespace Database\Factories;

use App\Models\Unit;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\Factory;

class UnitFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Unit::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        return [
            'name' => $this->faker->company(),
            'parent_id' => (random_int(1,5) == 3) ? (Unit::inRandomOrder()->first()->id ?? Unit::factory()->create()->id) : null,
            'head_id' => (random_int(1,5) == 3) ? (Employee::inRandomOrder()->first()->id ?? Employee::factory()->create()->id) : null,
            'purpose' => $this->faker->sentence(),
        ];
    }

    public function withParent()
    {
        return $this->state(function (array $attributes) {
            return [
                'parent_id' => Unit::factory()->create()->id,
            ];
        });
    }
}
