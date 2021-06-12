<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Form;
use App\Models\Employee;
use App\Models\FormStructure;
use App\Models\TrainingCourse;
use App\Rules\WeekScheduleRule;
use App\Models\CourseAttendance;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CoursesTests extends TestCase
{
    use RefreshDatabase;

    public function test_course_create_endpoint()
    {
        $course = TrainingCourse::factory()->make();
        $response = $this->postJson('api/course', [
            'title' => $course->title,
            'training_program_id' => $course->training_program_id,
            'status' => $course->status,
            'start_date' => $course->start_date,
            'end_date' => $course->end_date,
            'week_schedule' => $course->week_schedule
        ]);
        // dd($response->json());
        $response->assertOk();

        $this->assertEquals(TrainingCourse::all()->count(), 1);
    }

    public function test_system_can_view_the_course_schedual()
    {
        $course = TrainingCourse::factory()->create();

        $response = $this->getJson('api/course/' . $course->id . '/schedual');

        $response->assertOk();
        $scheduleRule = new WeekScheduleRule();
        $this->assertTrue($scheduleRule->passes('schedule', $response->json()));
    }

    public function test_system_can_get_attendance_records_of_any_course()
    {
        $course = TrainingCourse::factory()->create();
        CourseAttendance::factory(10)->create([
            'training_course_id' => $course->id
        ]);
        $response = $this->getJson('api/course/' . $course->id . '/attendance');

        $response->assertOk();
        $response->assertJsonCount(10);
    }

    public function test_system_can_get_review_forms_belongs_to_the_course()
    {
        $formStructure = FormStructure::factory()->create();
        $course = TrainingCourse::factory()->create();
        $course->formStructures()->save($formStructure);

        $rand_int = random_int(0, 10);
        $forms = Form::factory($rand_int)->forStructure($formStructure->id)->create();

        $response = $this->getJson('api/course/' . $course->id . '/forms');
        // dd($response->json());
        $response->assertOk();
        $response->assertJsonCount($rand_int );
    }

    public function test_can_get_list_of_employees_in_a_course()
    {
        $employees = Employee::factory(10)->create();

        $course = TrainingCourse::factory()->create();

        $course->employees()->attach($employees);

        $this->getJson('api/getCourseEmployees/' . $course->id)->assertOk()->assertJsonCount(10);
    }

    public function test_can_get_list_of_employees_and_targeted_indivituals_in_a_course()
    {
        $employees = Employee::factory(10)->create();

        $course = TrainingCourse::factory()->create();

        $course->employees()->attach($employees);

        $this->getJson('api/getCourseParticipants/' . $course->id)->assertOk()->assertJsonCount(10);
    }

    public function test_system_can_search_through_all_the_people_registered_in_the_courses_and_retrive_stats_about_them()
    {
    }

    public function test_course_statistics_can_be_retrived()
    {
        $employees = Employee::factory(10)->create();

        $course = TrainingCourse::factory()->create();

        $course->employees()->attach($employees);

        $this->getJson('api/getCourseState/' . $course->id); //->assertOk();//->assertJsonCount(10);
    }
}
