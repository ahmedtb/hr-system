<?php

namespace Database\Factories;

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
use App\FieldsTypes\OptionsField;
use App\FieldsTypes\RatingField;
use App\FieldsTypes\StringField;
use App\FieldsTypes\TextAreaField;
use App\FieldsTypes\PhoneNumberField;
use App\FieldsTypes\SocialStatusField;
use Exception;
use Illuminate\Database\Eloquent\Factories\Factory;

class FormFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Form::class;

    public function FieldTypeFaker(array $fieldArray)
    {
        if ($fieldArray['class'] == DateField::class) {
            $instance = $fieldArray['class']::fromArray($fieldArray);
            return $instance->setValue(date('Y-m-d'));
        } elseif ($fieldArray['class'] == DoubleField::class) {
            $instance = $fieldArray['class']::fromArray($fieldArray);
            return $instance->setValue(random_int(100, 10000));
        } elseif ($fieldArray['class'] == EmailField::class) {
            $instance = $fieldArray['class']::fromArray($fieldArray);
            return $instance->setValue($this->faker->email());
        } elseif ($fieldArray['class'] == JobField::class) {
            $instance = $fieldArray['class']::fromArray($fieldArray);
            return $instance->setValue(Job::factory()->create()->id);
        } elseif ($fieldArray['class'] == PhoneNumberField::class) {
            $instance = $fieldArray['class']::fromArray($fieldArray);
            return $instance->setValue($this->faker->phoneNumber());
        } elseif ($fieldArray['class'] == RatingField::class) {
            $instance = $fieldArray['class']::fromArray($fieldArray);
            return $instance->setValue(random_int(0, 5));
        } elseif ($fieldArray['class'] == StringField::class) {
            $instance = $fieldArray['class']::fromArray($fieldArray);
            return $instance->setValue($this->faker->sentence());
        } elseif ($fieldArray['class'] == TableField::class) {
            $instance = $fieldArray['class']::fromArray($fieldArray);
            $numberOFCol = count($fieldArray['columnsTitles']);
            $tableData = [];
            for($i =0; $i<$numberOFCol;$i++){
                array_push($tableData,array('test data', 'test data'));
            }
            // dd($tableData);
            return $instance->setValue($tableData);
        } elseif ($fieldArray['class'] == TextAreaField::class) {
            $instance = $fieldArray['class']::fromArray($fieldArray);
            return $instance->setValue($this->faker->sentence());
        } elseif ($fieldArray['class'] == GenderField::class) {
            $genders = ['male', 'female'];
            $instance = $fieldArray['class']::fromArray($fieldArray);
            return $instance->setValue($genders[array_rand($genders)]);
        } elseif ($fieldArray['class'] == SocialStatusField::class) {
            $status = ['single', 'married'];
            $instance = $fieldArray['class']::fromArray($fieldArray);
            return $instance->setValue($status[array_rand($status)]);
        } elseif ($fieldArray['class'] == OptionsField::class) {
            $options = ['arabic', 'english','french'];
            $instance = $fieldArray['class']::fromArray($fieldArray);
            return $instance->setValue($options[array_rand($options)]);
        }

        throw new Exception($fieldArray['class'] . ' this type of field class does not exists');
    }

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $form_structure = FormStructure::factory()->create();
        $unfilled_fields = $form_structure->fields;
        $filled_fields = [];

        foreach ($unfilled_fields as $field) {
            $fieldInstance = $this->FieldTypeFaker($field);
            array_push($filled_fields, $fieldInstance);
        }

        return [
            'form_structure_id' => $form_structure->id,
            'filled_fields' => $filled_fields
        ];
    }

    public function forStructure($form_structure_id)
    {
        return $this->state(function (array $attributes) use ($form_structure_id) {
            $structure = FormStructure::where('id', $form_structure_id)->first();
            $fields = [];
            foreach ($structure->fields as $field) {
                $fieldInstance = $this->FieldTypeFaker($field);
                array_push($fields, $fieldInstance);
            }
            return [
                'form_structure_id' => $structure->id,
                'filled_fields' => $fields
            ];
        });
    }
}
