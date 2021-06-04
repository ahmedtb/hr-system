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
use App\FieldsTypes\RatingField;
use App\FieldsTypes\StringField;
use App\FieldsTypes\TextAreaField;
use App\FieldsTypes\PhoneNumberField;
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

    public function FieldTypeFaker(string $fieldTypeClass)
    {
        if ($fieldTypeClass == DateField::class) {
            return new $fieldTypeClass($this->faker->name(), date('Y-m-d'));
        } elseif ($fieldTypeClass == DoubleField::class) {
            return new $fieldTypeClass($this->faker->name(), random_int(100, 10000));
        } elseif ($fieldTypeClass == EmailField::class) {
            return new $fieldTypeClass($this->faker->name(), $this->faker->email());
        } elseif ($fieldTypeClass == JobField::class) {
            return new $fieldTypeClass($this->faker->name(), Job::factory()->create()->id);
        } elseif ($fieldTypeClass == PhoneNumberField::class) {
            return new $fieldTypeClass($this->faker->name(), $this->faker->phoneNumber());
        } elseif ($fieldTypeClass == RatingField::class) {
            return new $fieldTypeClass($this->faker->name(), random_int(0, 5));
        } elseif ($fieldTypeClass == StringField::class) {
            return new $fieldTypeClass($this->faker->name(), $this->faker->sentence(), $this->faker->sentence());
        } elseif ($fieldTypeClass == TableField::class) {
            return new $fieldTypeClass($this->faker->name(), $this->faker->sentence(), $this->faker->sentence());
        } elseif ($fieldTypeClass == TextAreaField::class) {
            return new $fieldTypeClass($this->faker->name(), $this->faker->sentence(), $this->faker->sentence());
        }
        throw new Exception('this type of field class does not exists');
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
            $fieldInstance = new $field(Str::random(5), Str::random(5), Str::random(5));
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
