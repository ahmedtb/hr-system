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
use App\FieldsTypes\ArrayOfFields;
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
        $unfilled_fields = new ArrayOfFields(array(
            new TableField(
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

    public function test_interview_assessment_form_could_be_created_and_marked_as_archive()
    {
        $unfilled_fields = $this->formStructure->fields;
        $form = Form::factory()->forStructure($this->formStructure->id)->create();
        dd($form->filled_fields);

        $tableInstance = TableField::fromArray($form->filled_fields[0]);
        $staticColumn = array(
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
        );
        // $form->update([
        //     'filled_fields' => $tableInstance
        // ]);
        // $tableInstance->setColumn(0, $staticColumn);
        dd($form->filled_fields);

    }
}
