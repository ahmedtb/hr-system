<?php

namespace App\FieldsTypes;

use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;
use JsonSerializable;

class EmailField implements FieldType, JsonSerializable
{
    public string $label;
    private string $value;

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
}
