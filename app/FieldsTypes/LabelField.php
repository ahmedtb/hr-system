<?php

namespace App\FieldsTypes;

use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;
use JsonSerializable;

class LabelField extends FieldType
{

    private string $value;

    public static function fromArray(array $array)
    {
        $instance = new self($array['value']);
        return $instance;
    }

    public function __construct(string $value)
    {
            $this->setValue($value);
    }

    public function setValue($value)
    {

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
            'value' => $this->value
        );
    }
    public function render()
    {
        return View('fields.labelField',['field'=>$this]);
    }
    public function generateMockedValue()
    {
    }
}
