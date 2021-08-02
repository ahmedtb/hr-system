<?php

namespace Database\Factories;

use Exception;
use App\Models\Job;
use App\Models\Form;
use Illuminate\Support\Str;

use App\FieldsTypes\JobField;
use App\Models\FormStructure;
use App\FieldsTypes\DateField;
use App\FieldsTypes\EmailField;
use App\FieldsTypes\TableField;
use App\FieldsTypes\DoubleField;
use App\FieldsTypes\GenderField;
use App\FieldsTypes\RatingField;
use App\FieldsTypes\StringField;
use App\FieldsTypes\OptionsField;
use App\FieldsTypes\ArrayOfFields;
use App\FieldsTypes\TextAreaField;
use App\FieldsTypes\PhoneNumberField;
use App\FieldsTypes\SocialStatusField;
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
        $form_structure = (FormStructure::inRandomOrder()->first()) ?? FormStructure::factory()->create();
        $form_structure->array_of_fields->generateMockedValues();


        return [
            'form_structure_id' => $form_structure->id,
            'filled_fields' => $form_structure->array_of_fields
        ];
    }

    public function forStructure($form_structure_id)
    {
        return $this->state(function (array $attributes) use ($form_structure_id) {
            $structure = FormStructure::where('id', $form_structure_id)->first();
            $structure->array_of_fields->generateMockedValues();

            return [
                'form_structure_id' => $structure->id,
                'filled_fields' => $structure->array_of_fields
            ];
        });
    }


}
