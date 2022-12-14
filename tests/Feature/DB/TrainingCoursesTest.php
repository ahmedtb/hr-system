<?php

namespace Tests\Feature\DB;

use DateTime;
use Carbon\Carbon;
use Tests\TestCase;
use App\Models\Coach;
use App\Models\Employee;
use Illuminate\Support\Str;
use App\Models\TrainingCourse;
use PhpParser\Node\Expr\Empty_;
use App\Models\CourseAttendance;
use App\Models\TargetedIndividual;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TrainingCoursesTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_course_have_a_title_a_program_status_start_and_end_date_and_a_schedulee()
    {
        $course = TrainingCourse::factory()->create();
        $this->assertNotEmpty($course->title);
        $this->assertNotEmpty($course->trainingProgram);
        $this->assertNotEmpty($course->status);
        $this->assertNotEmpty($course->start_date);
        $this->assertNotEmpty($course->end_date);
        $this->assertNotEmpty($course->week_schedule);
    }

    public function test_course_should_have_a_week_schedulee_in_correct_formate()
    {
        $course = TrainingCourse::factory()->create();
        $length = sizeof($course->week_schedule);

        // length can not be zero...there should be a schedule
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
        $course = TrainingCourse::factory()->create();
        CourseAttendance::factory(10)->forCourse($course)->create();
        // dd($course->attendances);
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

    public function test_only_if_course_is_in_a_resumed_state_will_it_return_went_and_remaining_days_Calculations()
    {
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

    public function test_course_can_calculate_if_person_is_enrolled()
    {
        $course = TrainingCourse::factory()->create();
        $employee = Employee::factory()->create();
        $individual = TargetedIndividual::factory()->create();

        $course->enrollEmployee($employee);
        $course->enrollIndividual($individual);

        $this->assertTrue($course->isEnrolled($employee));
        $this->assertTrue($course->isEnrolled($individual));

        $employee = Employee::factory()->create();
        $individual = TargetedIndividual::factory()->create();

        $this->assertFalse($course->isEnrolled($employee));
        $this->assertFalse($course->isEnrolled($individual));
    }

    public function test_course_can_attach_coaches_to_the_course()
    {
        $course = TrainingCourse::factory()->create();
        $coach = Coach::factory()->create();
        $this->assertEquals($course->attachCoach($coach), true);
        $this->assertEquals($course->attachCoach($coach), false);
    }

    public function test_course_model_can_return_its_schedule_in_dates_and_time_frame()
    {
        $course = TrainingCourse::factory()->create();
        $this->assertIsArray($course->scheduleTable());
        foreach ($course->scheduleTable() as $schedule) {
            $this->assertArrayHasKey(0, $schedule);
            $this->assertArrayHasKey(1, $schedule);
            Carbon::parse($schedule[1])->gt($schedule[0]);
        }
    }

    public function test_course_model_can_check_if_date_and_time_is_included_in_the_schedule()
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
        $IsIncluded = $course->IsInSchedule('2021-07-05', '12:30:00');
        $this->assertTrue($IsIncluded);
        $IsIncluded = $course->IsInSchedule('2021-07-05', '12:00:00');
        $this->assertTrue($IsIncluded);
        $IsIncluded = $course->IsInSchedule('2021-07-07', '14:00:00');
        $this->assertTrue($IsIncluded);

        $IsIncluded = $course->IsInSchedule('2021-07-05', '13:01:00');
        $this->assertFalse($IsIncluded);
        $IsIncluded = $course->IsInSchedule('2021-07-06', '12:30:00');
        $this->assertFalse($IsIncluded);
        $IsIncluded = $course->IsInSchedule('2021-07-09', '09:59:00');
        $this->assertFalse($IsIncluded);
    }

    public function test_course_model_can_register_an_attendance_of_employee()
    {
        $course = TrainingCourse::factory()->create();
        $employee = Employee::factory()->create();
        $course->enrollEmployee($employee);
        $scheduleTable = $course->scheduleTable();

        $this->assertTrue($course->attendEmployee(
            $employee,
            array_key_first($scheduleTable),
            $scheduleTable[array_key_first($scheduleTable)][0],
            null
        ));

        $this->assertFalse($course->attendEmployee(
            $employee,
            array_key_first($scheduleTable),
            '00:00:00', // random wrong entrance time
            null
        ));
    }


    public function test_course_model_can_register_an_attendance_of_targeted_individual()
    {
        $course = TrainingCourse::factory()->create();
        $targeted = TargetedIndividual::factory()->create();
        $course->enrollIndividual($targeted);
        $scheduleTable = $course->scheduleTable();

        $this->assertTrue($course->attendIndividual(
            $targeted,
            array_key_first($scheduleTable),
            $scheduleTable[array_key_first($scheduleTable)][0],
            null
        ));

        $this->assertFalse($course->attendIndividual(
            $targeted,
            array_key_first($scheduleTable),
            '00:00:00', // random wrong entrance time
            null
        ));
    }

    public function test_course_model_can_register_an_attendance_of_anonymous_person()
    {
        $course = TrainingCourse::factory()->create();

        $scheduleTable = $course->scheduleTable();

        $this->assertTrue($course->attendAnonymous(
            'ahmed',
            array_key_first($scheduleTable),
            $scheduleTable[array_key_first($scheduleTable)][0],
            null
        ));

        $this->assertFalse($course->attendAnonymous(
            'ahmed',
            array_key_first($scheduleTable),
            '00:00:00', // random wrong entrance time
            null
        ));
    }


    public function  test_course_where_recording_attendance_check_it_is_duplicated()
    {
        $course = TrainingCourse::factory()->create();
        $employee = Employee::factory()->create();
        $course->enrollEmployee($employee);
        $scheduleTable = $course->scheduleTable();

        $day = array_key_first($scheduleTable);
        $entrance = $scheduleTable[array_key_first($scheduleTable)][0];
        $this->assertTrue($course->attendEmployee(
            $employee,
            $day,
            $entrance,
            null
        ));

        $this->assertFalse($course->attendEmployee(
            $employee,
            $day,
            $entrance,
            null
        ));
    }

    public function test_resumed_course_can_calculate_its_attendance_percentage()
    {
        $course = TrainingCourse::factory()->create([
            'start_date' => new DateTime('today - 9 day'),
            'end_date' => new DateTime('today'),
            'status' => 'normal'
        ]);
        $scheduleTable = $course->scheduleTable();

        $employees = Employee::factory(10)->create();
        foreach ($employees as $employee) {
            $course->enrollEmployee($employee);
            $course->attendEmployee(
                $employee,
                $day = array_rand($scheduleTable),
                $scheduleTable[$day][0], // entrance at begin time exactly
                null
            );
        }

        $this->assertEquals($course->attendancePercentage(), 10.0);

        $course = TrainingCourse::factory()->create([
            'start_date' => new DateTime('today - 9 day'),
            'end_date' => new DateTime('today'),
            'status' => 'normal'
        ]);
        // three attendanceds for each employee
        foreach ($employees as $employee) {
            $course->enrollEmployee($employee);
            $threeAttendDays = array_rand($scheduleTable, 3);
            $course->attendEmployee(
                $employee,
                $threeAttendDays[0],
                $scheduleTable[$threeAttendDays[0]][0], // entrance at begin time exactly
                null
            );
            $course->attendEmployee(
                $employee,
                $threeAttendDays[1],
                $scheduleTable[$threeAttendDays[1]][0], // entrance at begin time exactly
                null
            );
            $course->attendEmployee(
                $employee,
                $threeAttendDays[2],
                $scheduleTable[$threeAttendDays[2]][0], // entrance at begin time exactly
                null
            );
        }

        $this->assertEquals($course->attendancePercentage(), 30.0);

        $course = TrainingCourse::factory()->create([
            'start_date' => new DateTime('today - 9 day'),
            'end_date' => new DateTime('today'),
            'status' => 'normal'
        ]);
        foreach ($employees as $employee) {
            $course->enrollEmployee($employee);
        }
        foreach ($scheduleTable as $scheduleDay => $scheduleDayTime) {
            foreach ($employees as $employee) {
                $course->attendEmployee(
                    $employee,
                    $scheduleDay,
                    $scheduleDayTime[0], // entrance at begin time exactly
                    null
                );
            }
        }
        $this->assertEquals($course->attendancePercentage(), 100.0);
    }

    public function test_attendancePercentage_does_not_allow_division_by_zero()
    {
        $course = TrainingCourse::factory()->create([
            'start_date' => new DateTime('today + 1 day'),
            'end_date' => new DateTime('today + 9 day'),
            'status' => 'normal'
        ]);
        $this->assertEquals($course->attendancePercentage(), 0);

        $employees = Employee::factory(10)->create();

        foreach ($employees as $employee) {
            $course->enrollEmployee($employee);
        }

        $this->assertEquals($course->attendancePercentage(), 0);
    }

    public function test_resumed_scope_return_only_normal_resumed_courses()
    {
        TrainingCourse::factory(5)->create([
            'start_date' => new DateTime('today - 10 day'),
            'end_date' => new DateTime('today + 10 day'),
            'status' => 'normal'
        ]);

        TrainingCourse::factory(10)->create([
            'start_date' => new DateTime('today - 10 day'),
            'end_date' => new DateTime('today + 10 day'),
            'status' => 'canceled'
        ]);

        $this->assertEquals(TrainingCourse::resumed()->count(), 5);
    }

    public function test_system_can_query_the_courses_by_state()
    {
        TrainingCourse::factory(5)->resumed()->create();
        TrainingCourse::factory(10)->planned()->create();
        TrainingCourse::factory(15)->done()->create();
        TrainingCourse::factory(20)->canceled()->create();

        $this->assertEquals(TrainingCourse::resumed()->count(), 5);
        $this->assertEquals(TrainingCourse::planned()->count(), 10);
        $this->assertEquals(TrainingCourse::done()->count(), 15);
        $this->assertEquals(TrainingCourse::canceled()->count(), 20);
    }

    public function test_system_can_retrive_employee_or_individual_attendances_of_course()
    {
        $course = TrainingCourse::factory()->resumed()->create();
        $employee = Employee::factory()->create();
        $course->enrollEmployee($employee);
        $scheduleTable = $course->scheduleTable();
        // dd( count($scheduleTable) );
        $randomeDaysInSchedule = array_rand($scheduleTable, count($scheduleTable) / 2);
        for ($i = 0; $i < 10; $i++) {
            $course->attendEmployee(
                $employee,
                $day = $randomeDaysInSchedule[$i],
                $scheduleTable[$day][0]
            );
        }
        CourseAttendance::factory(12)->create([
            'training_course_id' => $course->id,
            'profile_id' => 3
        ]);
        $this->assertEquals($course->employeeAttendaces($employee)->count(), 10);
    }

    public function test_system_can_retrive_attendances_for_particiual_day_in_the_course()
    {
        $course = TrainingCourse::factory()->resumed()->create();
        $scheduleTable = $course->scheduleTable();
        $day1 = array_rand($scheduleTable);
        $entrance_time1 = $scheduleTable[$day1][0];
        CourseAttendance::factory(10)->create([
            'training_course_id' => $course->id,
            'date' => $day1,
            'entrance_time' => $entrance_time1,
        ]);

        $day2 = array_rand($scheduleTable);
        $entrance_time2 = $scheduleTable[$day2][0];
        CourseAttendance::factory(20)->create([
            'training_course_id' => $course->id,
            'date' => $day2,
            'entrance_time' => $entrance_time2,
        ]);

        $this->assertEquals($course->dayAttendaces($day2)->count(), 20);
    }

    public function test_system_can_get_the_schedule_of_all_lectures_for_a_specific_day()
    {
        TrainingCourse::factory(10)->create();
        TrainingCourse::factory(5)->resumed()->create();

        $courses = TrainingCourse::withDateSchedule(Carbon::today()->format('Y-m-d'))->get();
        $schedules = $courses->each(function ($item, $key) {
            $item->daySchedule = $item->scheduleTable[Carbon::today()->format('Y-m-d')];
        });
        $schedules->each(function ($course, $key) {
            $this->assertEquals($course->state, '??????????????');
            $this->assertIsArray($course->daySchedule);
        });
        $this->assertTrue($schedules->count() >= 5);
    }
}
