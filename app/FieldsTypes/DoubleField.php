<?php

namespace App\FieldsTypes;

use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;
use JsonSerializable;

class DoubleField extends FieldType
{
    public string $label;
    private ?string $value = null;

    public static function fromArray(array $array)
    {
        return new self($array['label'],$array['value']);
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
            'value' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/'
        ]);
        if ($validator->fails())
            throw new Exception('not valid value type..expected double');
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
        // $faker = new \Faker\Generator();
        $this->setValue(random_int(100, 10000));
    }
}
