<?php

namespace App\FieldsTypes;

use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;
use JsonSerializable;

class NumberField extends FieldType
{
    public string $label;

    private ?int $value = null;

    public static function fromArray(array $array)
    {
        $instance = new self($array['label'],$array['value']);
        return $instance;
    }

    public function __construct(string $label, ?int $value = null)
    {
        $this->label = $label;

        if ($value)
            $this->setValue($value);
    }

    public function setValue($value)
    {

        if (gettype($value) != 'integer' )
            throw new Exception('rating number should be integer');

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
    public function render()
    {
        return View('fields.numberField',['fields'=>$this]);
    }
    public function generateMockedValue()
    {
        $this->setValue(random_int(0, 100));
    }
}
