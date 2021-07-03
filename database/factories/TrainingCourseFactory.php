<?php

namespace Database\Factories;

use App\Models\TrainingCourse;
use App\Models\TrainingProgram;
use Illuminate\Database\Eloquent\Factories\Factory;

class TrainingCourseFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = TrainingCourse::class;

    public function createRandomWeekSchedule()
    {
        $weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

        $schedule = [];
        foreach ($weekDays as $key => $day) {
            $schedule[$weekDays[$key]] = [
                'begin' => $this->faker->time(),
                'period' => rand(0, 120) //minutes
            ];
        }
        return $schedule;
    }

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $random = rand(0, 4);
        $states = ['planned', 'resumed', 'done', 'canceled', 'archived'];
        return [
            'title' => $this->faker->title(),
            'training_program_id' => TrainingProgram::factory()->create()->id,
            'status' => $states[$random],
            'start_date' => ($start = $this->faker->dateTimeBetween('-1 month', '1 month')),
            'end_date' => $this->faker->dateTimeBetween($start, '1 month'),
            'week_schedule' => $this->createRandomWeekSchedule()
        ];
    }

    public function resumed()
    {
        return $this->state(function (array $attributes) {
            return [
                'start_date' => ($start = $this->faker->dateTimeBetween('-1 month', 'now')),
                'end_date' => $this->faker->dateTimeBetween('now', '1 month'),
            ];
        });
    }

    public function planned()
    {
        return $this->state(function (array $attributes) {
            return [
                'start_date' => ($start = $this->faker->dateTimeBetween('1 month', '2 month')),
                'end_date' => $this->faker->dateTimeBetween($start, '3 month'),
            ];
        });
    }
}
