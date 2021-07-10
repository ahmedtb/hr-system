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
            // 'head_id' => $employee ? $employee->id : Employee::factory()->create()->id,
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
