<?php

namespace Database\Factories\Assessments;

use App\Models\Assessments\CoachCourseAssessment;
use App\Models\TrainingCourse;
use Illuminate\Database\Eloquent\Factories\Factory;

class CoachCourseAssessmentFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = CoachCourseAssessment::class;

    public function ratingWithComment()
    {
        return [
            'rating' => random_int(0,5),
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
        return [
            'training_course_id' => (TrainingCourse::inRandomOrder()->first()->id) ?? TrainingCourse::factory()->create()->id,
            'trainees_discipline' => $this->ratingWithComment(),
            'trainees_interaction' => $this->ratingWithComment(),
            'congruence_with_content' => $this->ratingWithComment(),
            'trainees_cooperation' => $this->ratingWithComment(),
            'syllabus_understanding' => $this->ratingWithComment(),
            'hall_preparation' => $this->ratingWithComment(),
            'reception_supervision' => $this->ratingWithComment(),
            'hospitality_and_course_breaks' => $this->ratingWithComment(),
            'training_department_cooperation' => $this->ratingWithComment(),
            'note' => $this->faker->sentence(),
        ];
    }
}
