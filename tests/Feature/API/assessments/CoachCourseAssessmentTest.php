<?php

namespace Tests\Feature\API\Assessments;

use Tests\TestCase;
use App\Models\Coach;
use App\Models\Employee;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Assessments\CoachCourseAssessment;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CoachCourseAssessmentTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        
        // set up coach employee as auth user
        $employee = Employee::factory()->create();
        Coach::factory()->profile($employee)->create();
        $this->actingAs($employee->refresh(), 'employee');
    }

    public function test_coach_course_assessment_form_could_be_created_and_archive_it()
    {
        $assessment = CoachCourseAssessment::factory()->make();
        $response = $this->postJson('/api/coachCourseAssessment/create', [
            'training_course_id' => $assessment->training_course_id,
            'trainees_discipline' => $assessment->trainees_discipline,
            'trainees_interaction' => $assessment->trainees_interaction,
            'congruence_with_content' => $assessment->congruence_with_content,
            'trainees_cooperation' => $assessment->trainees_cooperation,
            'syllabus_understanding' => $assessment->syllabus_understanding,
            'hall_preparation' => $assessment->hall_preparation,
            'reception_supervision' => $assessment->reception_supervision,
            'hospitality_and_course_breaks' => $assessment->hospitality_and_course_breaks,
            'training_department_cooperation' => $assessment->training_department_cooperation,
            'note' => $assessment->note,

        ]);
        // dd($response->json());
        $response->assertOk();
        $response->assertJson(['success' => 'coach course assessment archived']);
    }

    public function test_coach_course_assessment_could_be_retrived()
    {
        

        $assessments = CoachCourseAssessment::factory(10)->create();
        $response = $this->getJson('api/coachCourseAssessment/index');
        // dd($response->json());
        $response->assertOk();
        $this->assertEquals($response->json()['total'], $assessments->count());
    }

    public function test_system_can_retrive_coach_course_assessments_by_filtering()
    {
        CoachCourseAssessment::factory(2)->create([
            'trainees_discipline' => ['rating' => 5, 'comment' => 'aaa'],
        ]);
        CoachCourseAssessment::factory(5)->create([
            'trainees_discipline' => ['rating' => 1, 'comment' => 'aaa'],
        ]);
        $response = $this->getJson('api/coachCourseAssessment/index?trainees_discipline=5');
        $response->assertOk();//->assertJsonCount(2);
        $this->assertEquals($response->json()['total'], 2);

    }
}
