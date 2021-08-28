<?php

namespace Database\Factories;

use App\Models\Employee;
use App\Models\Supervisor;
use Illuminate\Database\Eloquent\Factories\Factory;
use PhpParser\Node\Expr\Empty_;

class SupervisorFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Supervisor::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'profile_id' => (Employee::inRandomOrder()->first()->id) ?? Employee::factory()->create()->id,
            'profile_type' => Employee::class
        ];
    }
}
