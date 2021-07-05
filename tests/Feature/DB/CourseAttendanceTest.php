<?php

namespace Tests\Feature\DB;

use DateTime;
use Carbon\Carbon;
use Tests\TestCase;
use App\Models\CourseAttendance;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CourseAttendanceTest extends TestCase
{
    use RefreshDatabase;

    public function test_course_attendance_record_should_have_profile_attached_to_it()
    {

        $attendace = CourseAttendance::factory()->withProfile()->create();
        $this->assertNotEmpty($attendace->profile);
        $this->assertEmpty($attendace->person_name);
    }

    public function test_course_attendances_can_be_queried_by_specific_day()
    {
        $attendace = CourseAttendance::factory()->create([
            'date' => (new DateTime('today'))->format('Y-m-d')
        ]);
        $this->assertNotNull(CourseAttendance::whereDate('date',new DateTime('today'))->first());
        
    }

    public function test_course_attendance_can_be_queried_by_specific_days()
    {
        $attendaces = CourseAttendance::factory(10)
            ->between(new DateTime('now'), new DateTime('now + 10 day'))
            ->create();
        $days = [
            (new DateTime('today'))->format('Y-m-d'),
            (new DateTime('today + 9 day'))->format('Y-m-d'),
        ];
        $todayCount =  CourseAttendance::whereDate('date',new DateTime('today'))->count();
        $ninthDayCount =  CourseAttendance::whereDate('date',new DateTime('today + 9 day'))->count();

        $this->assertEquals(CourseAttendance::inDays($days)->count(), $todayCount + $ninthDayCount);
    }

    public function test_course_attendance_can_be_queried_by_date_range()
    {
        $attendaces = CourseAttendance::factory(10)
            ->between(new DateTime('now'), new DateTime('now + 10 day'))
            ->create();

        $this->assertEquals(CourseAttendance::between(new DateTime('now'),new DateTime('now + 10 day'))->count(), 10);
    }
}
