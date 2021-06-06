<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Form;
use App\Models\FormStructure;
use App\FieldsTypes\DateField;
use App\FieldsTypes\TableField;
use App\FieldsTypes\GenderField;
use App\FieldsTypes\StringField;
use App\FieldsTypes\OptionsField;
use App\FieldsTypes\TextAreaField;
use App\FieldsTypes\PhoneNumberField;
use App\FieldsTypes\SocialStatusField;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class InterviewAssessmentTests extends TestCase
{
    use RefreshDatabase;

    protected $formStructure;

    protected function setUp(): void
    {
        parent::setup();

        // $this->withoutExceptionHandling();
        $unfilled_fields = array(
            new TableField(
                'نموذج تقييم مقابلة شخصية',
                array(
                    'تقييم',
                    'ممتاز',
                    'جيد',
                    'متوسط',
                    'ضعيف'
                )
            ),
            new StringField('اسم مجري المقابلة'),
            new StringField('التوقيع'),
            new DateField('تاريخ المقابلة ')
        );
        $this->formStructure = FormStructure::factory()->create([
            'type' => 'interview assessment',
            'fields' => $unfilled_fields
        ]);
    }

    public function test_interview_assessment_form_could_be_created_and_marked_as_archive()
    {
        $unfilled_fields = $this->formStructure->fields;
        $form = Form::factory()->forStructure($this->formStructure->id)->create();
        dd($form->filled_fields);
        
    }
}
