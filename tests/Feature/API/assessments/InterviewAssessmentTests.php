<?php

namespace Tests\Feature\API\Assessments;

use Tests\TestCase;
use App\Models\Assessments\InterviewAssessment;
use Illuminate\Foundation\Testing\RefreshDatabase;

class InterviewAssessmentTests extends TestCase
{
    use RefreshDatabase;


    public function test_interview_assessment_form_could_be_created_and_archive_it()
    {
        $assessment = InterviewAssessment::factory()->make();
        $response = $this->postJson('/api/interview/create',[
            'name' => $assessment->name,
            'look' => $assessment->look,
            'self_introduction' => $assessment->self_introduction,
            'personality' => $assessment->personality,
            'english' => $assessment->english,
            'culture' => $assessment->culture,
            'arabic' => $assessment->arabic,
            'initiative' => $assessment->initiative,
            'sharing_skills' => $assessment->sharing_skills,
            'comprehension' => $assessment->comprehension,
            'decision_making' => $assessment->decision_making,
            'compatibility_of_education' => $assessment->compatibility_of_education,
            'compatibility_of_experiance' => $assessment->compatibility_of_experiance,
            'compatibility_of_skills' => $assessment->compatibility_of_skills,
            'problem_solving_skills' => $assessment->problem_solving_skills,
            'stress_handling' => $assessment->stress_handling,
            'moral_courage_self_confidence' => $assessment->moral_courage_self_confidence,
            'interviewer_id' => $assessment->interviewer_id,
            'interview_date' => $assessment->interview_date,
        ]);
        $response->assertOk();
        $response->assertJson(['success' => 'interview assessment archived']);
        // dd($response->json());
    }

    public function test_interview_Assessments_could_be_retrived()
    {
        InterviewAssessment::factory(10)->create();
        $response = $this->getJson('api/interview/index');
        $response->assertOk()->assertJsonCount(10);
    }

    public function test_system_can_retrive_interviews_by_filtering()
    {
        InterviewAssessment::factory(2)->create([
            'moral_courage_self_confidence' => 'excellent',
            'self_introduction' => 'excellent'
        ]);
        InterviewAssessment::factory(5)->create([
            'moral_courage_self_confidence' => 'good',
            'self_introduction' => 'good'

        ]);
        $response = $this->getJson('api/interview/index?confidence=excellent&self_introduction=excellent');

        $response->assertOk()->assertJsonCount(2);
    }

}
