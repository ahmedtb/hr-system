<?php

namespace Tests\Feature\API;

use App\Models\CourseAttendance;
use App\Models\TrainingCourse;
use DateTime;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class AttendancesTests extends TestCase
{
    use RefreshDatabase;

    public function test_attendances_can_be_fetched_by_date_and_course_id()
    {
        $course = TrainingCourse::factory()->resumed()->create();

        $attendances = CourseAttendance::factory(10)->forCourse($course)->create([
            'date' => (new DateTime('today'))->format('Y-m-d')
        ]);

        $response = $this->getJson('api/course/' . $course->id .'/attendances/' . (new DateTime('today'))->format('Y-m-d') );
        $response->assertJsonCount(10);
    }
}
