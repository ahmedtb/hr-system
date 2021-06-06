<?php

namespace Database\Factories;

use Exception;
use App\Models\FieldType;
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
use App\FieldsTypes\TextAreaField;
use App\FieldsTypes\PhoneNumberField;
use App\FieldsTypes\SocialStatusField;
use Illuminate\Database\Eloquent\Factories\Factory;

class FormStructureFactory extends Factory
{

    public function FieldTypeFaker(string $fieldTypeClass)
    {
        if ($fieldTypeClass == DateField::class) {
            return new $fieldTypeClass($this->faker->name());
        } elseif ($fieldTypeClass == DoubleField::class) {
            return new $fieldTypeClass($this->faker->name());
        } elseif ($fieldTypeClass == EmailField::class) {
            return new $fieldTypeClass($this->faker->name());
        } elseif ($fieldTypeClass == JobField::class) {
            return new $fieldTypeClass($this->faker->name());
        } elseif ($fieldTypeClass == PhoneNumberField::class) {
            return new $fieldTypeClass($this->faker->name());
        } elseif ($fieldTypeClass == RatingField::class) {
            return new $fieldTypeClass($this->faker->name());
        } elseif ($fieldTypeClass == StringField::class) {
            return new $fieldTypeClass($this->faker->name());
        } elseif ($fieldTypeClass == TableField::class) {
            return new TableField(
                $this->faker->name(),
                array('col1', 'col2')
            );
        } elseif ($fieldTypeClass == TextAreaField::class) {
            return new $fieldTypeClass($this->faker->name());
        } elseif ($fieldTypeClass == GenderField::class) {
            $genders = ['male', 'female'];
            return new $fieldTypeClass($this->faker->name());
        } elseif ($fieldTypeClass == SocialStatusField::class) {
            $status = ['single', 'married'];
            return new $fieldTypeClass($this->faker->name());
        } elseif ($fieldTypeClass == OptionsField::class) {
            $options = ['option1', 'option2','option3'];
            return new $fieldTypeClass($this->faker->name(),$options );
        }

        throw new Exception($fieldTypeClass . ' this type of field class does not exists');
    }

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = FormStructure::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $numberOfFields = random_int(1, 5);
        $fields = [];
        for ($i = 1; $i <= $numberOfFields; $i++) {
            $fieldInstance = $this->FieldTypeFaker(StringField::class);
            array_push($fields, $fieldInstance );
        }

        return [
            'type' => $this->faker->name(),
            'fields' => $fields
        ];
    }
}
