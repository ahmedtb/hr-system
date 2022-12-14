<?php

namespace App\FieldsTypes;

use Exception;
use Faker\Generator;
use JsonSerializable;
use Illuminate\Container\Container;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;

class DateField extends FieldType
{
    public string $label;
    private ?string $value = null;


    public static function fromArray(array $arrayForm)
    {
        $instance = new self($arrayForm['label'], $arrayForm['value']);
        return $instance;
    }

    public function __construct(string $label, ?string $value = null)
    {
        $this->label = $label;
        if ($value)
            $this->setValue($value);
    }

    public function setValue($value)
    {
        $validator = Validator::make(['value' => $value], [
            'value' => 'required|date_format:Y-m-d'
        ]);
        if ($validator->fails() && $value != null)
            throw new Exception('not valid value type..incorrect date format');
        $this->value = $value;
        return $this;
    }
    public function getValue()
    {
        return $this->value;
    }

    public function jsonSerialize()
    {
        return array(
            'class' => static::class,
            'label' => $this->label,
            'value' => $this->value
        );
    }

    public function generateMockedValue()
    {
        $faker = Container::getInstance()->make(Generator::class);
        $this->setValue($faker->date('Y-m-d'));
    }
}
