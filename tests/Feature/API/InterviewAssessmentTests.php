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
use App\Models\FormTables\InterviewAssessmentForm;
use Illuminate\Foundation\Testing\RefreshDatabase;

class InterviewAssessmentTests extends TestCase
{
    use RefreshDatabase;

    protected $formStructure;

    protected function setUp(): void
    {
        parent::setup();

        $unfilled_fields = new ArrayOfFields(array(
            new OptionsField('المظهر',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('تعريفه لنفسه',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('الشخصية',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('اللغة الانجليزية',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('الثقافة',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('اللغة العربية',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('المبادرة',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('مهارات المشاركة',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('مهارة المشاركة',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('الاستيعاب',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('اتخاذ القرار',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('ملائمة المؤهل العلمي لمتطلبات الوظيفة',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('ملائمة الخبرات العلمي لمتطلبات الوظيفة',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('ملائمة المهارات المكتسبة لمتطلبات الوظيفة',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('مدى استطاعته لحل المشاكل',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('مدى تعامله مع الضغظ والتوتر الوظيفي',['ممتاز','جيد','متوسط','ضعيف']),
            new OptionsField('الشجاعة الادبية الوثقة بالنفس',['ممتاز','جيد','متوسط','ضعيف']),
            new StringField('اسم مجري المقابلة'),
            new DateField('تاريخ المقابلة ')
        ));
        $this->formStructure = FormStructure::factory()->create([
            'type' => 'نموذج تقييم مقابلة شخصية',
            'array_of_fields' => $unfilled_fields
        ]);
    }

    public function test_interview_assessment_form_could_be_created_and_archive_it()
    {
        $response = $this->postJson('api/generateForm', [
            'form_structure_id' => $this->formStructure->id,
        ]);
        $access_token = $response->content();

        $form = Form::factory()->forStructure( $this->formStructure->id)->make();

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
        $form->filled_fields->getFields()[0]->setValue('ممتاز');
        $form->save();

        $form = Form::factory()->forStructure($this->formStructure->id)->create();
        $form->filled_fields->getFields()[0]->setValue('ممتاز');
        $form->save();

        $response = $this->getJson('api/getGoodAssessments')->assertOk()->assertJsonCount(2);
        $fieldsArrayInstance = (ArrayOfFields::fromArray($response->json()[0]['filled_fields']));

        $this->assertEquals($fieldsArrayInstance->getFields()[0]->getRow(15), ['','good','','','']);
        
    }
}
