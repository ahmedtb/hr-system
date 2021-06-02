<?php

namespace Database\Factories;

use App\FieldsTypes\StringField;
use App\FieldsTypes\TableField;
use App\FieldsTypes\TextAreaField;
use App\Models\FieldType;
use Illuminate\Support\Str;
use App\Models\FormStructure;
use Illuminate\Database\Eloquent\Factories\Factory;

class FormStructureFactory extends Factory
{
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
        $fieldsTypes = array(StringField::class, TableField::class, TextAreaField::class);
        $numberOfFields = random_int(1, 5);
        $fields = [];
        for ($i = 1; $i <= $numberOfFields; $i++) {
            array_push($fields, $fieldsTypes[array_rand($fieldsTypes)] );
        }

        return [
            'type' => $this->faker->name(),
            'fields' => $fields
        ];
    }
}
