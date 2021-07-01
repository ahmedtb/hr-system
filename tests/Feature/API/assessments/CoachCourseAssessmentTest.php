<?php

namespace Tests\Feature\API\Assessments;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use App\Models\Assessments\CoachCourseAssessment;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CoachCourseAssessmentTest extends TestCase
{
    use RefreshDatabase;
    public function test_coach_course_assessment_form_could_be_created_and_archive_it()
    {
        $assessment = CoachCourseAssessment::factory()->make();
        $response = $this->postJson('/api/coachCourseAssessment/create',[
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
        $response->assertOk()->assertJsonCount(10);
    }

    public function test_system_can_retrive_coach_course_assessments_by_filtering()
    {

    }
}
