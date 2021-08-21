<?php

namespace Database\Factories\Assessments;

use App\Models\Assessments\TraineeCourseAssessment;
use App\Models\Employee;
use App\Models\TargetedIndividual;
use App\Models\TrainingCourse;
use Illuminate\Database\Eloquent\Factories\Factory;

class TraineeCourseAssessmentFactory extends Factory
{

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TraineeCourseAssessment::class;

    public function ratingWithComment()
    {
        return [
            'rating' => random_int(1, 5),
            'comment' => $this->faker->sentence()
        ];
    }
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $rand = random_int(1, 3);
        $trainee_id = null;
        $trainee_type = null;
        $person_name = null;

        if ($rand == 1) {
            $trainee_id = Employee::inRandomOrder()->first()->id ?? Employee::factory()->create()->id;
            $trainee_type = Employee::class;
        } else if ($rand == 2) {
            $trainee_id = TargetedIndividual::inRandomOrder()->first()->id ?? TargetedIndividual::factory()->create()->id;
            $trainee_type = TargetedIndividual::class;
        } else if ($rand == 3) {
            $person_name = $this->faker->name();
        }
        return [
            'trainee_id' => $trainee_id,
            'trainee_type' => $trainee_type,
            'person_name' => $person_name,

            'training_course_id' => TrainingCourse::inRandomOrder()->first()->id ?? TrainingCourse::factory()->create()->id,
            'coach_understanding' => $this->ratingWithComment(),
            'coach_communication' => $this->ratingWithComment(),
            'presentation' => $this->ratingWithComment(),
            'coach_cooperation' => $this->ratingWithComment(),
            'program_quality' => $this->ratingWithComment(),
            'technical_preparation' => $this->ratingWithComment(),
            'training_hall_preparation' => $this->ratingWithComment(),
            'reception' => $this->ratingWithComment(),
            'hospitality_and_course_breaks' => $this->ratingWithComment(),
            'training_unit_response' => $this->ratingWithComment(),
        ];
    }
}
