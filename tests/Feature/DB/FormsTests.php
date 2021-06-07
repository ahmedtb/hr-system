<?php

namespace Tests\Feature\DB;

use App\FieldsTypes\ArrayOfFields;
use Tests\TestCase;
use App\Models\Form;
use Illuminate\Support\Str;
use App\Models\FormStructure;
use App\FieldsTypes\DateField;
use App\FieldsTypes\FieldType;
use App\FieldsTypes\TableField;
use App\FieldsTypes\GenderField;
use App\FieldsTypes\StringField;
use App\FieldsTypes\OptionsField;
use App\FieldsTypes\TextAreaField;
use App\FieldsTypes\PhoneNumberField;
use App\FieldsTypes\SocialStatusField;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FormsTests extends TestCase
{
    use RefreshDatabase;

    public function test_forms_structures_can_have_different_kinds_of_fields()
    {
        $structure = FormStructure::factory()->create();
        // dd($structure->fields);
        $this->assertTrue($structure->array_of_fields instanceof ArrayOfFields);

        foreach ($structure->array_of_fields->getFields() as $field)
            $this->assertTrue($field instanceof FieldType);
    }

    public function test_we_can_easily_create_forms_from_form_structure()
    {
        $this->withoutExceptionHandling();
        $structure = FormStructure::factory()->create();

        $filled_fields = [];
        foreach ($structure->array_of_fields->getFields() as $fieldInstance) {
            // $fieldInstance = $field::fromArray($field);
            $this->assertTrue($fieldInstance instanceof FieldType);
            $randomString = Str::random(20);
            $fieldInstance->setValue($randomString);
            $this->assertTrue($fieldInstance->getValue() == $randomString);
            array_push($filled_fields, $fieldInstance);
        }
        // dd($filled_fields);
        $form = Form::create([
            'form_structure_id' => $structure->id,
            'filled_fields' => new ArrayOfFields($filled_fields)
        ]);

        foreach ($form->filled_fields->getFields() as $i => $filled_field) {
            $this->assertEquals(get_class($filled_field), get_class($filled_fields[$i]));
        }
    }

    public function test_form_and_form_structure_factories_on_simulating_employement_form_test()
    {
        $this->withoutExceptionHandling();
        $unfilled_fields = array(
            new TextAreaField('أتقدم بطلبي هذا طالبا ما يلي'),
            new StringField('الاسم'),
            new StringField('الاب'),
            new StringField('الجد'),
            new StringField('اللقب'),
            new DateField('تاريخ الميلاد'),
            new GenderField('الجنس'),
            new SocialStatusField('الحالة الاجتماعية'),
            new StringField('الجنسية'),
            new StringField('المؤهل العلمي'),
            new StringField('الوظيفة المتقدم لها'),
            new StringField('هل لديك وسيلة مواصلات'),
            new TextAreaField('ما المهارات التي تتقنها'),
            new OptionsField(
                'ما اللغات التي   تجيدها',
                array('arabic', 'english', 'french')
            ),
            new TextAreaField('أهم الدورات التي اخذتها'),
            new PhoneNumberField('رقم الهاتف'),
            new PhoneNumberField('رقم اخر'),
            new TableField(
                'الوظائف والخبرات السابقة والحالية:',
                array(
                    'الوصف الوظيفي	المرتب	الجهة التي عملت بها	فترة الخدمة والخبرة	سبب الانفكاك',
                    'المرتب',
                    'الجهة التي عملت بها',
                    'فترة الخدمة والخبرة (من - الى)',
                    'سبب الانفكاك'
                )
            ),
            new StringField('اسم مجري المقابلة '),
            new DateField('تاريخ اليوم ')
        );
        $formStructure = FormStructure::factory()->create([
            'array_of_fields' => new ArrayOfFields($unfilled_fields)
        ]);

        $form = Form::factory()->forStructure($formStructure->id)->create();
        // dd($form->filled_fields->getFields());
        $this->assertEquals(count($form->filled_fields), count($unfilled_fields));
        foreach ($unfilled_fields as $index => $unfilled_field) {
            $this->assertEquals($form->filled_fields->getField($index)->label, $unfilled_field->label);
            $this->assertNotNull($form->filled_fields->getField($index)->getValue());
        }
    }
}
