<?php

namespace Database\Factories;

use App\Models\Coach;
use App\Models\Employee;
use App\Models\TargetedIndividual;
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
        $rand = random_int(1, 2);
        $profile_id = null;
        $profile_type = null;

        if ($rand == 1) {
            $profile_id = (Employee::select('id')->orderByRaw("RAND()")->first()->id) ?? Employee::factory()->create()->id;
            $profile_type = Employee::class;
        } else if ($rand == 2) {
            $profile_id = (TargetedIndividual::select('id')->orderByRaw("RAND()")->first()->id) ?? TargetedIndividual::factory()->create()->id;
            $profile_type = TargetedIndividual::class;
        }
        
        return [
            'CV' => $this->faker->randomHtml(),
            'speciality' => $this->faker->sentence(),
            'profile_id' => $profile_id,
            'profile_type' => $profile_type
        ];
    }
}
