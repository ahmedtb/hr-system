<?php

namespace App\FieldsTypes;

use Exception;
use JsonSerializable;

class TextAreaField implements FieldType, JsonSerializable
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
        if (!(gettype($value) == 'string'))
            throw new Exception('not valid value type..expected string');
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
