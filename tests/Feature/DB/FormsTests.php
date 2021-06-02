<?php

namespace Tests\Feature\DB;

use Tests\TestCase;
use App\Models\Form;
use Illuminate\Support\Str;
use App\Models\FormStructure;
use App\FieldsTypes\FieldType;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FormsTests extends TestCase
{
    use RefreshDatabase;

    public function test_forms_structures_can_have_different_kinds_of_fields()
    {
        $structure = FormStructure::factory()->create();
        $this->assertIsArray($structure->fields);
        foreach ($structure->fields as $field)
            $this->assertEquals(class_implements($field), [FieldType::class => FieldType::class]);
    }

    public function test_we_can_easily_create_forms_from_form_structure()
    {
        $this->withoutExceptionHandling();
        $structure = FormStructure::factory()->create();

        $fields = [];
        foreach ($structure->fields as $field) {
            $fieldInstance = new $field(Str::random(5), Str::random(5));
            $this->assertTrue($fieldInstance instanceof FieldType);
            $randomString = Str::random(20);
            $fieldInstance->setValue($randomString);
            $this->assertTrue($fieldInstance->getValue() == $randomString);
            array_push($fields, $fieldInstance);
        }
        // dd($fields);
        $form = Form::create([
            'form_structure_id' => $structure->id,
            'filled_fields' => $fields
        ]);

        $this->assertEquals(count ($form->filled_fields) ,count($fields));
        foreach($form->filled_fields as $i => $filled_field){
            $this->assertEquals($filled_field['class'], get_class($fields[$i]));
        }
    }
}
