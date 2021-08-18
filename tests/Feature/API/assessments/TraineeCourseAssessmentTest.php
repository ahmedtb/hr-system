<?php

namespace Tests\Feature\API\Assessments;

use Tests\TestCase;
use App\Models\Coach;
use App\Models\Employee;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Assessments\TraineeCourseAssessment;

class TraineeCourseAssessmentTest extends TestCase
{
    use RefreshDatabase;
    
    protected function setUp(): void
    {
        parent::setUp();
        
        // set up employee as auth user
        $employee = Employee::factory()->create();
        $this->actingAs($employee, 'employee');
    }
    
    public function test_trainee_course_assessment_form_could_be_created_and_archive_it()
    {
        $assessment = TraineeCourseAssessment::factory()->make();
        $response = $this->postJson('/api/traineeCourseAssessment/create',[
            'training_course_id' => $assessment->training_course_id,
            'coach_understanding' => $assessment->coach_understanding,
            'coach_communication' => $assessment->coach_communication,
            'presentation' => $assessment->presentation,
            'coach_cooperation' => $assessment->coach_cooperation,
            'program_quality' => $assessment->program_quality,
            'technical_preparation' => $assessment->technical_preparation,
            'training_hall_preparation' => $assessment->training_hall_preparation,
            'reception' => $assessment->reception,
            'hospitality_and_course_breaks' => $assessment->hospitality_and_course_breaks,
            'training_unit_response' => $assessment->training_unit_response,
        ]);
        // dd($response->json());
        $response->assertOk();
        $response->assertJson(['success' => 'trainee course assessment archived']);
    }

    public function test_trainee_course_assessment_could_be_retrived()
    {
        $assessments = TraineeCourseAssessment::factory(10)->create();
        $response = $this->getJson('api/traineeCourseAssessment/index');
        // dd($response->json());
        $response->assertOk();//->assertJsonCount(2);
        $this->assertEquals($response->json()['total'], 10);
    }

    public function test_system_can_retrive_trainee_course_assessments_by_filtering()
    {
        TraineeCourseAssessment::factory(2)->create([
            'coach_understanding' => ['rating'=>5,'comment'=>'aaa'],
        ]);
        TraineeCourseAssessment::factory(5)->create([
            'coach_understanding' => ['rating'=>1,'comment'=>'aaa'],
        ]);
        $response = $this->getJson('api/traineeCourseAssessment/index?coach_understanding=5');
        // dd($response->json());
        $response->assertOk();//->assertJsonCount(2);
        $this->assertEquals($response->json()['total'], 2);
        
        $response = $this->getJson('api/traineeCourseAssessment/index?coach_understanding=2');
        $response->assertOk();//->assertJsonCount(2);
        $this->assertEquals($response->json()['total'], 0);
    }
}
