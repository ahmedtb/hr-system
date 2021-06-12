<?php

namespace Tests\Feature\DB;

use App\Models\CourseAttendance;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CourseAttendanceTest extends TestCase
{
    use RefreshDatabase;

    public function test_course_attendance_record_should_have_either_the_person_name_or_his_profile()
    {
        $course = CourseAttendance::factory()->create();
        $this->assertNotEmpty($course->person_name);
        $this->assertEmpty($course->profile);

        $course = CourseAttendance::factory()->withProfile()->create();
        $this->assertNotEmpty($course->profile);
        $this->assertEmpty($course->person_name);

    }

    
}
