<?php

namespace Tests\Feature\DB;

use Tests\TestCase;
use App\Models\TrainingCourse;
use App\Models\CourseAttendance;
use App\Models\Employee;
use App\Models\TargetedIndividual;
use Carbon\Carbon;
use DateTime;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PhpParser\Node\Expr\Empty_;

class TrainingCoursesTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_course_have_a_title_a_program_status_start_and_end_date_and_a_scheduale()
    {
        $course = TrainingCourse::factory()->create();
        $this->assertNotEmpty($course->title);
        $this->assertNotEmpty($course->trainingProgram);
        $this->assertNotEmpty($course->status);
        $this->assertNotEmpty($course->start_date);
        $this->assertNotEmpty($course->end_date);
        $this->assertNotEmpty($course->week_schedule);
    }

    public function test_course_should_have_a_week_scheduale_in_correct_formate()
    {
        $course = TrainingCourse::factory()->create();
        $length = sizeof($course->week_schedule);

        // length can not be zero...there should be a schedual
        $this->assertNotEquals($length, 0);

        foreach ($course->week_schedule as $day => $value) {
            $this->assertArrayHasKey('begin', $value);
            $this->assertArrayHasKey('end', $value);
            $time = DateTime::createFromFormat('H:i:s', $value['begin']);
            $this->assertTrue($time instanceof DateTime);
            $time = DateTime::createFromFormat('H:i:s', $value['end']);
            $this->assertTrue($time instanceof DateTime);
        }
    }

    public function test_course_could_have_many_attendace_records()
    {
        $employee = Employee::factory()->create();
        $course = TrainingCourse::factory()->create();
        CourseAttendance::factory(10)->create([
            'training_course_id' => $course->id,
            'profile_id' => $employee->id,
            'profile_type' => Employee::class
        ]);

        $this->assertEquals(count($course->attendances), 10);
    }

    public function test_the_model_can_say_if_it_is_period_passed_or_yet_to_start()
    {
        $course = TrainingCourse::factory()->resumed()->create();
        $this->assertFalse($course->isPlanned());
        $this->assertTrue($course->isResumed());
        $course = TrainingCourse::factory()->planned()->create();
        $this->assertFalse($course->isResumed());
        $this->assertTrue($course->isPlanned());
    }
    public function test_the_model_can_calculate_the_days_went_in_the_course()
    {
        $course = TrainingCourse::factory()->resumed()->create([
            'start_date' => new DateTime('today - 10 day'),
            'end_date' => new DateTime('today')
        ]);
        $this->assertEquals(count($course->wentDays()), 11);
    }
    public function test_the_model_can_calculate_the_remaining_days_in_it()
    {
        $course = TrainingCourse::factory()->resumed()->create([
            'start_date' => new DateTime('today'),
            'end_date' => new DateTime('today + 10 day')
        ]);
        $this->assertEquals(count($course->remainingDays()), 11);
    }

    public function test_only_if_course_is_in_a_resumed_state_will_it_return_went_and_remaining_days_Calculations(){
        $course = TrainingCourse::factory()->resumed()->create([
            'start_date' => new DateTime('today - 10 day'),
            'end_date' => new DateTime('today + 10 day'),
            'status' => 'canceled'
        ]);
        $this->assertEmpty($course->wentDays());
        $this->assertEmpty($course->remainingDays());

    }

    public function test_course_can_determine_if_its_resumed()
    {
        $course = TrainingCourse::factory()->resumed()->create();
        $this->assertTrue($course->isResumed());
        $this->assertTrue($course->calculateStatus() == 'resumed');
        $course = TrainingCourse::factory()->canceled()->create();
        $this->assertFalse($course->isResumed());
    }

    public function test_course_can_determine_if_its_canceled()
    {
        $course = TrainingCourse::factory()->resumed()->create();
        $this->assertFalse($course->isCanceled());
        $course = TrainingCourse::factory()->canceled()->create();
        $this->assertTrue($course->isCanceled());
        $this->assertTrue($course->calculateStatus() == 'canceled');
    }

    public function test_course_can_determine_if_its_done()
    {
        $course = TrainingCourse::factory()->resumed()->create();
        $this->assertFalse($course->isDone());
        $course = TrainingCourse::factory()->done()->create();
        $this->assertTrue($course->isDone());
        $this->assertTrue($course->calculateStatus() == 'done');
    }


    public function test_course_can_enroll_students()
    {
        $course = TrainingCourse::factory()->resumed()->create();
        $employees = Employee::factory(10)->create();
        $individuals = TargetedIndividual::factory(5)->create();
        foreach ($employees as $employee) {
            $course->enrollEmployee($employee);
        }
        foreach ($individuals as $individual) {
            $course->enrollIndividual($individual);
        }

        $this->assertEquals($course->employees()->count(), $employees->count());
        $this->assertEquals($course->targetedIndividuals()->count(), $individuals->count());
    }

    public function test_course_model_can_return_its_schedual_in_dates_and_time_frame()
    {
        $course = TrainingCourse::factory()->create();
        $this->assertIsArray($course->schedualTable());
        foreach ($course->schedualTable() as $schedual) {
            $this->assertArrayHasKey(0, $schedual);
            $this->assertArrayHasKey(1, $schedual);
            Carbon::parse($schedual[1])->gt($schedual[0]);
        }
    }

    public function test_course_model_can_check_if_date_and_time_is_included_in_the_schedual()
    {
        $course = TrainingCourse::factory()->create([
            'week_schedule' => [
                'monday' => [
                    'begin' => '12:00:00',
                    'end' => '13:00:00'
                ],
                'wednesday' => [
                    'begin' => '13:00:00',
                    'end' => '14:00:00'
                ],
                'friday' => [
                    'begin' => '10:00:00',
                    'end' => '11:00:00'
                ]
            ],
            'start_date' => '2021-07-05',
            'end_date' => '2021-07-09',
        ]);
        $IsIncluded = $course->IsInSchedual('2021-07-05', '12:30:00');
        $this->assertTrue($IsIncluded);
        $IsIncluded = $course->IsInSchedual('2021-07-05', '12:00:00');
        $this->assertTrue($IsIncluded);
        $IsIncluded = $course->IsInSchedual('2021-07-07', '14:00:00');
        $this->assertTrue($IsIncluded);

        $IsIncluded = $course->IsInSchedual('2021-07-05', '13:01:00');
        $this->assertFalse($IsIncluded);
        $IsIncluded = $course->IsInSchedual('2021-07-06', '12:30:00');
        $this->assertFalse($IsIncluded);
        $IsIncluded = $course->IsInSchedual('2021-07-09', '09:59:00');
        $this->assertFalse($IsIncluded);
    }

    public function test_course_model_can_register_an_attendance_of_employee()
    {
        $course = TrainingCourse::factory()->create();
        $employee = Employee::factory()->create();
        $course->enrollEmployee($employee);
        $schedualTable = $course->schedualTable();

        $this->assertTrue($course->attendEmployee(
            $employee,
            array_key_first($schedualTable),
            $schedualTable[array_key_first($schedualTable)][0],
            null
        ));

        $this->assertFalse($course->attendEmployee(
            $employee,
            array_key_first($schedualTable),
            '00:00:00', // random wrong entrance time
            null
        ));
    }

    public function test_course_model_can_register_an_attendance_of_targeted_individual()
    {
        $course = TrainingCourse::factory()->create();
        $targeted = TargetedIndividual::factory()->create();
        $course->enrollIndividual($targeted);
        $schedualTable = $course->schedualTable();

        $this->assertTrue($course->attendIndividual(
            $targeted,
            array_key_first($schedualTable),
            $schedualTable[array_key_first($schedualTable)][0],
            null
        ));

        $this->assertFalse($course->attendIndividual(
            $targeted,
            array_key_first($schedualTable),
            '00:00:00', // random wrong entrance time
            null
        ));
    }

    public function test_course_model_can_register_an_attendance_of_anonymous_person()
    {
        $course = TrainingCourse::factory()->create();

        $schedualTable = $course->schedualTable();

        $this->assertTrue($course->attendAnonymous(
            'ahmed',
            array_key_first($schedualTable),
            $schedualTable[array_key_first($schedualTable)][0],
            null
        ));

        $this->assertFalse($course->attendAnonymous(
            'ahmed',
            array_key_first($schedualTable),
            '00:00:00', // random wrong entrance time
            null
        ));
    }

    public function test_resumed_course_can_calculate_its_attendance_percentage()
    {
        $course = TrainingCourse::factory()->create([
            'start_date' => new DateTime('today - 9 day'),
            'end_date' => new DateTime('today')
        ]);
        $schedualTable = $course->schedualTable();
        // dd($course->week_schedule);

        $employees = Employee::factory(10)->create();
        foreach ($employees as $employee) {
            $course->enrollEmployee($employee);
            $course->attendEmployee(
                $employee,
                $day = array_rand($schedualTable),
                $schedualTable[$day][0], // entrance at begin time exactly
                null
            );
        }

        $this->assertEquals($course->attendancePercentage(), 10.0);

        $course = TrainingCourse::factory()->create([
            'start_date' => new DateTime('today - 9 day'),
            'end_date' => new DateTime('today')
        ]);
        // three attendanceds for each employee
        foreach ($employees as $employee) {
            $course->enrollEmployee($employee);
            $threeAttendDays = array_rand($schedualTable, 3);
            $course->attendEmployee(
                $employee,
                $threeAttendDays[0],
                $schedualTable[$threeAttendDays[0]][0], // entrance at begin time exactly
                null
            );
            $course->attendEmployee(
                $employee,
                $threeAttendDays[1],
                $schedualTable[$threeAttendDays[1]][0], // entrance at begin time exactly
                null
            );
            $course->attendEmployee(
                $employee,
                $threeAttendDays[2],
                $schedualTable[$threeAttendDays[2]][0], // entrance at begin time exactly
                null
            );
        }

        $this->assertEquals($course->attendancePercentage(), 30.0);

        $course = TrainingCourse::factory()->create([
            'start_date' => new DateTime('today - 9 day'),
            'end_date' => new DateTime('today')
        ]);
        foreach ($employees as $employee) {
            $course->enrollEmployee($employee);
        }
        foreach ($schedualTable as $schedualDay => $schedualDayTime) {
            foreach ($employees as $employee) {
                $course->attendEmployee(
                    $employee,
                    $schedualDay,
                    $schedualDayTime[0], // entrance at begin time exactly
                    null
                );
            }
        }
        $this->assertEquals($course->attendancePercentage(), 100.0);

    }
}
