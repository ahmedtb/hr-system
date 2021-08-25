<?php

namespace Database\Factories;

use App\Models\Job;
use App\Models\Unit;
use App\Models\Employee;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

class EmployeeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Employee::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $medals = array(1,2,3,4,5);
        return [
            'name' => $this->faker->name(),
            'username' => $this->faker->userName(),
            'address' => $this->faker->address(),
            'employment_date' => $this->faker->date(),
            'basic_salary' => random_int ( 100 , 10000 ),
            'phone_number' => $this->faker->phoneNumber(),
            'job_id' => (Job::inRandomOrder()->first()->id ?? Job::factory()->create()->id),
            'email' => $this->faker->email(),
            'medal_rating' => $medals[array_rand($medals)],
            'password' => Hash::make('password')

        ];
    }
}
