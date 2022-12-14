<?php

namespace Database\Factories;

use App\Models\TargetedIndividual;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

class TargetedIndividualFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TargetedIndividual::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'username' => $this->faker->userName(),
            'address' => $this->faker->address(),
            'phone_number' => $this->faker->phoneNumber(),
            'email' => $this->faker->email(),
            'description' => $this->faker->sentence(),
            'profile_image' => getBase64DefaultImage(),
            'password' => Hash::make('password')

        ];
    }
}
