<?php

namespace App\FieldsTypes;

use Exception;
use Faker\Generator;
use JsonSerializable;
use Illuminate\Container\Container;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;

class EmailField extends FieldType
{
    public string $label;
    private ?string $value = null;

    public static function fromArray(array $array)
    {
        return new self($array['label'], $array['value']);
    }

    public function __construct(string $label, ?string $value = null)
    {
        $this->label = $label;
        if ($value)
            $this->setValue($value);
    }

    public function setValue($value)
    {
        $validator = Validator::make(['value'=>$value],[
            'value' => 'required|email'
        ]);
        if ($validator->fails())
            throw new Exception('not valid value type..incorrect email format');
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

        $this->setValue($faker->email());
    }
}
