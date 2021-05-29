<?php

namespace Database\Factories;

use App\Models\CourseAttendance;
use App\Models\Employee;
use App\Models\TargetedIndividual;
use App\Models\TrainingCourse;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseAttendanceFactory extends Factory
{
    protected $model = CourseAttendance::class;

    public function definition()
    {
        return [
            'person_name' => $this->faker->name(),
            // 'profile' => null,
            'date' => $this->faker->date(),
            'entrance_time' => $this->faker->time(),
            'note' => $this->faker->sentence(),
            'training_course_id' => TrainingCourse::factory()->create(),
        ];
    }

    public function withProfile()
    {
        return $this->state(function (array $attributes) {
            $random = rand(1, 2);
            if ($random == 1)
                return [
                    'person_name' => null,
                    'profile_id' => Employee::factory()->create()->id,
                    'profile_type' => Employee::class,
                ];
            else
                return [
                    'person_name' => null,
                    'profile_id' => TargetedIndividual::factory()->create()->id,
                    'profile_type' => TargetedIndividual::class,
                ];
        });
    }
}
