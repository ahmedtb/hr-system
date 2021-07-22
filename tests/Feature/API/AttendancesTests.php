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

    public function test_system_can_delete_attend_record_by_id()
    {
        $record = CourseAttendance::factory()->create();

        $response = $this->deleteJson('api/attendance/'.$record->id);
        // dd($response->json());
        $response->assertJson(['success'=>'attendance record successfully deleted']);
        $response->assertOk();
        $this->assertEquals(CourseAttendance::all()->count(),0);
    }
}
