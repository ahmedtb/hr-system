<?php

namespace Database\Factories;

use App\Models\Trainee;
use App\Models\Document;
use App\Models\Employee;
use App\Models\TrainingProgram;
use Illuminate\Database\Eloquent\Factories\Factory;

class DocumentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Document::class;

    public function getDocumentable()
    {
        $documentable = null;
        $rand = random_int(1, 3);

        if ($rand == 1) {
            $documentable = (random_int(1, 5) == 3) ? Employee::factory()->create() : Employee::inRandomOrder()->first() ?? Employee::factory()->create();
        } else if ($rand == 2) {
            $documentable = (random_int(1, 5) == 3) ? Trainee::factory()->create() : Trainee::inRandomOrder()->first() ?? Trainee::factory()->create();
        } else if ($rand == 3) {
            $documentable = (random_int(1, 5) == 3) ? TrainingProgram::factory()->create() : TrainingProgram::inRandomOrder()->first() ?? TrainingProgram::factory()->create();
        }
        return $documentable;
    }

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {

        $documentable = $this->getDocumentable();

        return [
            'name' => $this->faker->name(),
            'content' => getBase64DefaultImage(),
            'documentable_type' => get_class($documentable),
            'documentable_id' => $documentable->id,
            'type' => 'png'
        ];
    }
}
