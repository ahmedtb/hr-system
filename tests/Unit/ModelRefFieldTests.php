<?php

namespace Tests\Unit;

use App\Models\Employee;
use Tests\TestCase;
use App\FieldsTypes\TableField2;
use App\FieldsTypes\ModelRefField;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ModelRefFieldTests extends TestCase
{
    use RefreshDatabase;

    public function test_model_ref_field_store_only_correct_field()
    {
        $ModelRefField = new ModelRefField('dsad',Employee::class);
        $employee = Employee::factory()->create();
        $ModelRefField->setValue($employee->id); 
        $this->assertEquals($employee->name, $ModelRefField->getRef()->name);      
    }

   
}
