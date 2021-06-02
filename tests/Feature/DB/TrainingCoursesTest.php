<?php

namespace Tests\Feature;

use App\Models\TrainingCourse;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

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
        $this->assertNotEquals($length,0);

        foreach($course->week_schedule as $day => $value ){
            $this->assertArrayHasKey('begin',$value);
            // dd( gettype ($value['period']));
            $this->assertArrayHasKey('period',$value);
            $this->assertTrue(gettype ($value['period']) == 'integer');
        }
    }
}