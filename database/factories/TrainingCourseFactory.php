<?php

namespace Database\Factories;

use App\Models\TrainingCourse;
use App\Models\TrainingProgram;
use DateTime;
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
        $weekDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        $randKeys = array_rand($weekDays, 7);
        $randDays = [];
        foreach ($randKeys as $key) {
            $randDays[] = $weekDays[$key];
        }
        $schedule = [];
        foreach ($randDays as $key => $day) {

            $schedule[$randDays[$key]] = [
                'begin' => (new DateTime('now'))->format('H:i:s'),
                'end' => (new DateTime('now + 1 hour'))->format('H:i:s')
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
        $random = rand(0, 1);
        $states = ['normal', 'canceled'];
        return [
            'title' => $this->faker->sentence(),
            'training_program_id' => (TrainingProgram::inRandomOrder()->first()->id) ?? TrainingProgram::factory()->create()->id,
            'status' => $states[$random],
            'start_date' => ($start = $this->faker->dateTimeBetween('-1 month', '1 month')->format('Y-m-d')),
            'end_date' => $this->faker->dateTimeBetween($start, '1 month')->format('Y-m-d'),
            'week_schedule' => $this->createRandomWeekSchedule()
        ];
    }

    public function resumed()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'normal',
                'start_date' => ($start = $this->faker->dateTimeBetween('-1 month', 'now')),
                'end_date' => $this->faker->dateTimeBetween('now', '1 month'),
            ];
        });
    }

    public function planned()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'normal',
                'start_date' => ($start = $this->faker->dateTimeBetween('1 month', '2 month')),
                'end_date' => $this->faker->dateTimeBetween($start, '3 month'),
            ];
        });
    }

    public function done()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'normal',
                'start_date' => ($start = $this->faker->dateTimeBetween('-2 month', '-1 month')),
                'end_date' => $this->faker->dateTimeBetween('-1 month', '-1 day'),
            ];
        });
    }

    public function canceled()
    {
        return $this->state(function (array $attributes) {
            return [
                'status' => 'canceled'
            ];
        });
    }

    public function withNewProgram()
    {
        return $this->state(function (array $attributes) {
            return [
                'training_program_id' =>  TrainingProgram::factory()->create()->id,
            ];
        });
    }
}
