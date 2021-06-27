<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Form;
use App\Models\FormStructure;
use App\FieldsTypes\DateField;
use App\FieldsTypes\StringField;
use App\FieldsTypes\TableField2;
use App\FieldsTypes\OptionsField;
use App\FieldsTypes\ArrayOfFields;
use App\Models\Assessments\InterviewAssessment;
use App\Models\FormTables\InterviewAssessmentForm;
use Illuminate\Foundation\Testing\RefreshDatabase;

class InterviewAssessmentTests extends TestCase
{
    use RefreshDatabase;


    public function test_interview_assessment_form_could_be_created_and_archive_it()
    {
        $assessment = InterviewAssessment::factory()->make();
        $response = $this->postJson('/api/interview/create',[
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
        $interviews = InterviewAssessment::factory(10)->create();
        $response = $this->getJson('api/interview/index');
        $response->assertOk()->assertJsonCount(10);
    }

    public function test_system_can_retrive_interviews_by_filtering()
    {

    }
}
