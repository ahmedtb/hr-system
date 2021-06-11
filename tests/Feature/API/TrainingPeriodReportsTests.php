<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Form;
use App\Models\Unit;
use App\Models\Employee;
use App\Models\FormStructure;
use App\FieldsTypes\DateField;
use App\FieldsTypes\LabelField;
use App\FieldsTypes\NumberField;
use App\FieldsTypes\StringField;
use App\FieldsTypes\ArrayOfFields;
use App\FieldsTypes\ModelRefField;
use App\FieldsTypes\CustomRatingField;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TrainingPeriodReportsTests extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setup();

        // $this->withoutExceptionHandling();
        $unfilled_fields = new ArrayOfFields(array(
            new DateField('التاريخ'),
            // new StringField('اسم الموظف'),
            // new StringField('الادارة'),
            // new StringField('القسم او الوحدة'),
            new ModelRefField('اسم الموظف', Employee::class),
            new ModelRefField('القسم او الوحدة', Unit::class),
            new DateField('بداية الفترة التدريبية'),
            new DateField('نهاية الفترة التدريبية'),

            new CustomRatingField('الحماس في العمل', 15),
            new CustomRatingField('القدرة على التعلم والتطور', 15),
            new CustomRatingField('تقبل واستيعاب التوجيه', 10),
            new CustomRatingField('التعامل مع التقنية', 10),
            new CustomRatingField('المحافظة على الوقت أثناء الدوام', 15),
            new CustomRatingField('العلاقة مع الزملاء', 10),
            new CustomRatingField('حسن التصرف', 10),
            new CustomRatingField('حسن المظهر', 5),
            new CustomRatingField('الإيمان بسياسة القناة والولاء لها', 10),
            new NumberField('الدرجة النهائية'),

            new StringField('اسم معد التقرير'),
            new StringField('الصفة'),
            new StringField('توصية مدير الإدارة'),
            new StringField('الاسم'),

            new LabelField('تقرير منظومة البصمة يوضح الحضور والانصراف'),
            new DateField('من'),
            new DateField('إلى'),
            new NumberField('التأخير بالدقائق'),
            new NumberField('الخروج المبكر بالدقائق'),
            new NumberField('خصم يوم عن كل تأخير ثلاثة أيام متتالية'),
            new NumberField('خصم لكل يوم لا توجد به البصمة الكاملة'),
            new NumberField('الغياب'),
            new NumberField('نسبة الحضور'),
            new NumberField('أي بمعدل'),

            new StringField('قرار اجتماع الإدارة العليا'),


        ));
        $this->formStructure = FormStructure::factory()->create([
            'type' => 'استمارة تقييم موظف في الفترة التدريبية',
            'array_of_fields' => $unfilled_fields
        ]);
    }

    public function test_training_period_assessement_report_can_be_submitted()
    {
        $response = $this->postJson('api/generateForm', [
            'form_structure_id' => $this->formStructure->id,
        ]);
        $access_token = explode('/', $response->content())[2];

        $form = Form::factory()->forStructure($this->formStructure->id)->make();
        $this->postJson('api/submitForm', [
            'access_token' => $access_token,
            'fields' => $form->filled_fields,
        ])->assertOk()->assertJson(['success' => 'form successfully disposed']);

        $this->assertEquals(count(Form::where('form_structure_id', $this->formStructure->id)->get()), 1);
    }
}
