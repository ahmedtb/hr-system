<?php

namespace Database\Factories\Utilities;

use Carbon\Carbon;
use App\Models\Model;
use Illuminate\Support\Str;
use App\Models\FormStructure;
use App\Models\Utilities\FormAccessToken;
use Illuminate\Database\Eloquent\Factories\Factory;

class FormAccessTokenFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = FormAccessToken::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'form_structure_id' => FormStructure::inRandomOrder()->first()->id ?? FormStructure::factory()->create()->id,
            'access_token' => Str::random(15),
            'expiration_date' => Carbon::today()->addDay()->format('Y-m-d'),
            'copies' => random_int(1,5)
        ];
    }
    
    public function expired()
    {
        return $this->state(function (array $attributes) {
            return [
                'expiration_date' => Carbon::today(),
            ];
        });
    }    
    public function copies($count)
    {
        return $this->state(function (array $attributes) use ($count) {
            return [
                'copies' => $count,
            ];
        });
    }
}
