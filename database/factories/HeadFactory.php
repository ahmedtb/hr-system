<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Head;
use Illuminate\Database\Eloquent\Factories\Factory;

class HeadFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Head::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            // 'employee_id' => Employee::factory()->create()->id, // nullable
        ];
    }
}
