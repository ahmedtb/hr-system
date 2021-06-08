<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Form;
use App\Models\FormStructure;
use App\FieldsTypes\DateField;
use App\FieldsTypes\StringField;
use App\FieldsTypes\TableField2;
use App\FieldsTypes\ArrayOfFields;
use Illuminate\Foundation\Testing\RefreshDatabase;

class InterviewAssessmentTests extends TestCase
{
    use RefreshDatabase;

    protected $formStructure;

    protected function setUp(): void
    {
        parent::setup();

        // $this->withoutExceptionHandling();
        $unfilled_fields = new ArrayOfFields(array(
            new TableField2(
                'نموذج تقييم مقابلة شخصية',
                array(
                    'تقييم',
                    'ممتاز',
                    'جيد',
                    'متوسط',
                    'ضعيف'
                ),
                16
            ),
            new StringField('اسم مجري المقابلة'),
            new StringField('التوقيع'),
            new DateField('تاريخ المقابلة ')
        ));
        $this->formStructure = FormStructure::factory()->create([
            'type' => 'interview assessment',
            'array_of_fields' => $unfilled_fields
        ]);
    }

    public function test_interview_assessment_form_could_be_created_and_archive_it()
    {
        $response = $this->postJson('api/generateForm', [
            'form_structure_id' => $this->formStructure->id,
        ]);
        $access_token = explode('/', $response->content())[2];

        $form = Form::factory()->forStructure( $this->formStructure->id)->make();
        $form->filled_fields->getFields()[0]->setColumn(
            array(
                'المظهر',
                'تعريفه لنفسه',
                'الشخصية',
                'اللغة الانجليزية',
                'الثقافة',
                'اللغة العربية',
                'المبادرة',
                'مهارات المشاركة',
                'الاستيعاب',
                'اتخاد القرار',
                'ملائمة المؤهل العلمي لمتطلبات الوظيفة',
                'مهارات المشاركة',
                'ملائمة المهارات المكتسبة لمتطلبات الوظيفة',
                'مدى استطاعته لحل المشاكل',
                'مدى تعامله مع الضغط والتوتر الوظيفي',
                'الشجاعة الأدبية والثقة بالنفس',
            ),
            0
        );
        $this->postJson('api/submitForm', [
            'access_token' => $access_token,
            'fields' => $form->filled_fields,
        ])->assertOk()->assertJson(['success' => 'form successfully disposed']);

        $this->assertEquals(count(Form::where('form_structure_id', $this->formStructure->id)->get()), 1);
    }

    public function test_interviewAssessment_could_be_retrived()
    {
        $form = Form::factory(10)->forStructure($this->formStructure->id)->create();
        $this->getJson('api/getInterviewsAssessments')->assertOk()->assertJsonCount(10);
    }

    public function test_can_report_about_a_list_of_assessements_with_high_scores_in_some_traits()
    {
        $this->withoutExceptionHandling();
        // not good assessed forms
        Form::factory(5)->forStructure($this->formStructure->id)->create();

        // two good assessed forms
        $form = Form::factory()->forStructure($this->formStructure->id)->create();
        $form->filled_fields->getFields()[0]->setElement('good',1,15);
        $form->save();

        $form = Form::factory()->forStructure($this->formStructure->id)->create();
        $form->filled_fields->getFields()[0]->setElement('good',1,15);
        $form->save();

        $response = $this->getJson('api/getGoodAssessments')->assertOk()->assertJsonCount(2);
        $fieldsArrayInstance = (ArrayOfFields::fromArray($response->json()[0]['filled_fields']));

        $this->assertEquals($fieldsArrayInstance->getFields()[0]->getRow(15), ['','good','','','']);
        
    }
}
