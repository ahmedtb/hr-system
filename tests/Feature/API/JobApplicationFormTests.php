<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\FormStructure;
use App\FieldsTypes\DateField;
use App\FieldsTypes\StringField;
use App\FieldsTypes\TableField2;
use App\FieldsTypes\ArrayOfFields;
use App\FieldsTypes\NumberField;
use App\FieldsTypes\OptionsField;
use App\FieldsTypes\TextAreaField;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class JobApplicationFormTests extends TestCase
{
    protected function setUp(): void
    {
        parent::setup();

        $fields = new ArrayOfFields(array(
            new TextAreaField('أتقدم بطلبي هذا طالبا ما يلي:'),
            new StringField('الاسم'),
            new StringField('الاب'),
            new StringField('الجد'),
            new StringField('اللقب'),
            new DateField('تاريخ الميلاد '),
            new OptionsField('الجنس',['ذكر','انثى']),
            new OptionsField('الحالة الاجتماعية',['متزوج','اعزب']),
            new StringField('المؤهل العلمي'),
            new StringField('الوظيفة المتقدم لها'),
            new StringField('هل لديك وسيلة للمواصلات'),
            new TextAreaField('أهم الدورات اتي اخذتها'),
            new NumberField('رقم الهاتف'),
            new NumberField('رقم اخر'),
            new TableField2(
                'الوظائف والخبرات السابقة والحالية:',
                array(
                    'الوصف الوظيفي',
                    'المرتب',
                    'الجهة التي عملت بها',
                    'فترة الخدمة والخبرة',
                    'سبب الانفكاك'
                ),
                4
            ),
            new StringField('اسم مجري المقابلة'),
            new DateField('تاريخ اليوم '),
        ));
        $fields->generateMockedValues();
        $this->formStructure = FormStructure::factory()->create([
            'type' => 'job application',
            'array_of_fields' => $fields
        ]);
    }
}
