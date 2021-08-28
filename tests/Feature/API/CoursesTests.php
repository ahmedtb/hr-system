<?php

namespace Tests\Feature\API;

use DateTime;
use Tests\TestCase;
use App\Models\Form;
use App\Models\Admin;
use App\Models\Coach;
use App\Models\Employee;
use App\Models\FormStructure;
use App\Models\TrainingCourse;
use App\Rules\WeekScheduleRule;
use App\Models\CourseAttendance;
use App\Models\TargetedIndividual;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CoursesTests extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
    }

    public function test_course_create_endpoint()
    {
        $course = TrainingCourse::factory()->make();
        // dd($course->start_date);

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
        $response->assertJson(['success' => 'training coures created']);
        $this->assertEquals(TrainingCourse::all()->count(), 1);
    }

    public function test_when_creating_a_course_the_system_can_warn_if_course_peroid_and_program_period_does_not_match()
    {
    }


    public function test_course_index_endpoint()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $course = TrainingCourse::factory(10)->create();
        $response = $this->getJson('api/course/index');
        // dd($response->json());
        $response->assertOk();
        $this->assertEquals($response->json()['total'], 10);
    }

    public function test_system_can_view_the_course_schedule()
    {
        $course = TrainingCourse::factory()->create();

        $response = $this->getJson('api/course/' . $course->id . '/schedule');

        $response->assertOk();
        $scheduleRule = new WeekScheduleRule();
        $this->assertTrue($scheduleRule->passes('schedule', $response->json()));
    }

    public function test_system_can_get_attendance_records_of_any_course()
    {
        $course = TrainingCourse::factory()->create();
        CourseAttendance::factory(10)->forCourse($course)->create();
        $response = $this->getJson('api/course/' . $course->id . '/attendances');

        // dd($response->json());
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
        $response->assertJsonCount($rand_int);
    }

    public function test_can_get_list_of_employees_in_a_course()
    {
        $employees = Employee::factory(10)->create();

        $course = TrainingCourse::factory()->create();

        $course->employees()->attach($employees);

        $response = $this->getJson('api/course/' . $course->id . '/employees');
        // dd($response->json());
        $response->assertOk()->assertJsonCount(10);
    }

    public function test_system_can_search_through_all_the_people_registered_in_the_courses_and_retrive_stats_about_them()
    {
    }

    public function test_we_can_fetch_courses_that_close_to_now()
    {
    }

    public function test_courses_can_be_filtered()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        $course = TrainingCourse::factory(2)->create([
            'start_date' => '2021-07-01',
            'end_date' => '2021-07-10'
        ]);
        $course = TrainingCourse::factory(3)->create([
            'start_date' => '2021-07-29',
            'end_date' => '2021-08-10'
        ]);

        $response = $this->getJson('/api/course/index?start_date=2021-07-29');
        $this->assertEquals(sizeof($response->json()['data']), 3);

        $response = $this->getJson('/api/course/index?start_before=2021-08-01&end_after=2021-07-09');
        $this->assertEquals(sizeof($response->json()['data']), 5);
    }

    public function test_courses_can_be_filtered_by_enrolled_employees_and_individuals()
    {
        // set up employee as auth user
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');

        TrainingCourse::factory(2)->create();
        $course = TrainingCourse::factory()->create();

        $employee = Employee::factory()->create();
        $course->enrollEmployee($employee);
        $response = $this->getJson('/api/course/index?employee_id=' . $employee->id);
        // dd($response->json());
        $this->assertEquals(sizeof($response->json()['data']), 1);

        $individual = TargetedIndividual::factory()->create();
        $course->enrollIndividual($individual);

        $response = $this->getJson('/api/course/index?individual_id=' . $individual->id);
        $this->assertEquals(sizeof($response->json()['data']), 1);
    }


    public function test_admin_user_will_get_only_courses_that_he_allowed_to_see()
    {
        TrainingCourse::factory(2)->create();
        $admin = Admin::factory()->create();
        $response = $this->actingAs($admin, 'admin')->getJson('/api/course/index');
        $this->assertEquals($response->json()['total'], 2);
    }

    public function test_employee_user_will_get_only_courses_that_he_allowed_to_see()
    {
        TrainingCourse::factory(2)->create();
        $employee = Employee::factory()->create();
        $this->actingAs($employee, 'employee');
        // $this->actingAs($employee, 'employee');

        $response = $this->getJson('/api/course/index');
        // dd($response->json());
        $this->assertEquals($response->json()['total'], 0);

        TrainingCourse::factory()->create()->enrollEmployee($employee);
        $response = $this->getJson('/api/course/index');
        $this->assertEquals($response->json()['total'], 1);
        // dd($response->content());
        // dd($response->json());
    }

    public function test_coach_user_will_get_only_courses_that_he_allowed_to_see()
    {
        TrainingCourse::factory(2)->create();
        $coach = Coach::factory()->create();
        $this->actingAs($coach, 'coach');
        $response = $this->getJson('/api/course/index');
        $this->assertEquals($response->json()['total'], 0);

        TrainingCourse::factory()->create()->attachCoach($coach);
        $response = $this->getJson('/api/course/index');
        $this->assertEquals($response->json()['total'], 1);
        // dd($response->content());
        // dd($response->json());
    }

    public function test_individual_user_will_get_only_courses_that_he_allowed_to_see()
    {
        TrainingCourse::factory(2)->create();
        $individual = TargetedIndividual::factory()->create();
        $this->actingAs($individual, 'individual');
        $response = $this->getJson('/api/course/index');
        $this->assertEquals($response->json()['total'], 0);

        TrainingCourse::factory()->create()->enrollindividual($individual);
        $response = $this->getJson('/api/course/index');
        $this->assertEquals($response->json()['total'], 1);
        // dd($response->content());
        // dd($response->json());
    }
}
