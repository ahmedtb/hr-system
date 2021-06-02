<?php

namespace Database\Factories;

use App\Models\Form;
use App\Models\FieldType;
use Illuminate\Support\Str;
use App\Models\FormStructure;
use Illuminate\Database\Eloquent\Factories\Factory;

class FormFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Form::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        // $form_structure = FormStructure::factory()->create();
        // $unfilled_fields = $form_structure->fields;
        // $filled_fields = [];

        // foreach ($unfilled_fields as $unfilled_field) {
        //     $fieldType = FieldType::where('id', $unfilled_field->id);
        //     $structure = $fieldType->structure;

        //     foreach($structure as $key => $value){
        //         $structure[$key] = Str::random(11);
        //     }
        //     array_push($filled_fields, $structure);
        // }
        return [
            // 'form_structure_id' => FormStructure::factory()->create()->id,
            // 'filled_fields' => $filled_fields
        ];
    }
}
