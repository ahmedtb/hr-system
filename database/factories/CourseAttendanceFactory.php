<?php

namespace Database\Factories;

use DateTime;
use Carbon\Carbon;
use App\Models\Employee;
use App\Models\TrainingCourse;
use App\Models\CourseAttendance;
use App\Models\TargetedIndividual;
use Illuminate\Database\Eloquent\Factories\Factory;

class CourseAttendanceFactory extends Factory
{
    protected $model = CourseAttendance::class;

    public function definition()
    {
        return [
            'person_name' => $this->faker->name(),
            'profile_id' => (Employee::inRandomOrder()->first()->id) ?? Employee::factory()->create()->id,
            'profile_type' => Employee::class,
            'date' => $this->faker->date(),
            'entrance_time' => $this->faker->time(),
            'note' => $this->faker->sentence(),
            'training_course_id' => (TrainingCourse::inRandomOrder()->first()->id) ?? TrainingCourse::factory()->create(),
        ];
    }

    public function withProfile()
    {
        return $this->state(function (array $attributes) {
            $random = rand(1, 2);
            if ($random == 1)
                return [
                    'person_name' => null,
                    'profile_id' => (Employee::inRandomOrder()->first()->id) ?? Employee::factory()->create()->id,
                    'profile_type' => Employee::class,
                ];
            else
                return [
                    'person_name' => null,
                    'profile_id' => (TargetedIndividual::inRandomOrder()->first()->id) ?? TargetedIndividual::factory()->create()->id,
                    'profile_type' => TargetedIndividual::class,
                ];
        });
    }

    public function between(DateTime $first, DateTime $last)
    {
        return $this->state(function (array $attributes) use ($last, $first) {
            return [
                'date' => ($this->faker->dateTimeBetween($first, $last))->format('Y-m-d')
            ];
        });
    }

    public function forCourse(TrainingCourse $course)
    {
        return $this->state(function (array $attributes) use ($course) {
            $scheduleTable = $course->scheduleTable();
            $day = array_rand($scheduleTable);
            $entrance_time = $scheduleTable[$day][0];

            $profile = null;
            $random = rand(1, 2);
            if ($random == 1) {
                $profile = (Employee::inRandomOrder()->first()) ?? Employee::factory()->create();
                if ($course->isEnrolled($profile)) $profile = Employee::factory()->create();
                $course->enrollEmployee($profile);
            } else {
                $profile = (TargetedIndividual::inRandomOrder()->first()) ?? TargetedIndividual::factory()->create();
                if ($course->isEnrolled($profile)) $profile = TargetedIndividual::factory()->create();

                $course->enrollIndividual($profile);
            }


            return [
                'training_course_id' => $course->id,
                'date' => $day,
                'entrance_time' => $entrance_time,

                'person_name' => null,
                'profile_id' => $profile->id,
                'profile_type' => ($random == 1) ? Employee::class : TargetedIndividual::class,
            ];
        });
    }
}
