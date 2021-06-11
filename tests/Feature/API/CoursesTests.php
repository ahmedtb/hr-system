<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Employee;
use App\Models\TrainingCourse;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CoursesTests extends TestCase
{use RefreshDatabase;

    public function test_course_create_endpoint()
    {

    }

    public function test_we_can_view_the_course_schedual()
    {

    }

    public function test_system_can_get_attendance_records_of_any_course()
    {

    }

    public function test_system_can_get_review_forms_belongs_to_the_course()
    {
        
    }

    public function test_can_get_list_of_employees_in_a_course()
    {
        $employees = Employee::factory(10)->create();
       
        $course = TrainingCourse::factory()->create();

        $course->employees()->attach($employees);

        $this->getJson('api/getCourseEmployees/'.$course->id)->assertOk()->assertJsonCount(10);
    }

    public function test_can_get_list_of_employees_and_targeted_indivituals_in_a_course()
    {
        $employees = Employee::factory(10)->create();
       
        $course = TrainingCourse::factory()->create();

        $course->employees()->attach($employees);

        $this->getJson('api/getCourseParticipants/'.$course->id)->assertOk()->assertJsonCount(10);
    }

    public function test_system_can_search_through_all_the_people_registered_in_the_courses_and_retrive_stats_about_them()
    {
        
    }
    
    public function test_course_statistics_can_be_retrived()
    {
        $employees = Employee::factory(10)->create();
       
        $course = TrainingCourse::factory()->create();

        $course->employees()->attach($employees);

        $this->getJson('api/getCourseState/'.$course->id);//->assertOk();//->assertJsonCount(10);
    }

    
}
