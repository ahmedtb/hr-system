<?php

namespace App\FieldsTypes;

use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;
use JsonSerializable;

class DateField implements FieldType, JsonSerializable
{
    public string $label;
    private ?string $value = null;


    public static function fromArray(array $arrayForm)
    {
        $instance = new self($arrayForm['label'],$arrayForm['value']);
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
        $validator = Validator::make(['value'=>$value],[
            'value' => 'required|date_format:Y-m-d'
        ]);
        if ($validator->fails())
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
}
