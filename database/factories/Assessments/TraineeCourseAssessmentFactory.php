<?php

namespace Database\Factories\Assessments;

use App\Models\Assessments\TraineeCourseAssessment;
use App\Models\TrainingCourse;
use Illuminate\Database\Eloquent\Factories\Factory;

class TraineeCourseAssessmentFactory extends Factory
{

    // $table->foreignId('training_course_id');
    // $table->string('coach_understanding');
    // $table->string('coach_communication');
    // $table->string('presentation');
    // $table->string('coach_cooperation');
    // $table->string('program_quality');
    // $table->string('technical_preparation');
    // $table->string('training_hall_preparation');
    // $table->string('reception');
    // $table->string('hospitality_and_course_breaks');
    // $table->string('training_unit_response');
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TraineeCourseAssessment::class;

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
            'training_course_id' => TrainingCourse::factory()->create()->id,
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
