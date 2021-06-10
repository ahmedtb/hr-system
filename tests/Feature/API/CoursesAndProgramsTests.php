<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Employee;
use App\Models\TrainingCourse;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CoursesAndProgramsTests extends TestCase
{use RefreshDatabase;

    public function test_can_get_list_of_employees_in_a_course()
    {
        $employees = Employee::factory(10)->create();
       
        $course = TrainingCourse::factory()->create();

        $course->employees()->attach($employees);

        $this->getJson('api/getCourseEmployees/'.$course->id)->assertOk()->assertJsonCount(10);
    }
    
    public function test_course_statistics_can_be_retrived()
    {
        $employees = Employee::factory(10)->create();
       
        $course = TrainingCourse::factory()->create();

        $course->employees()->attach($employees);

        $this->getJson('api/getCourseState/'.$course->id)->assertOk();//->assertJsonCount(10);
    }
}
