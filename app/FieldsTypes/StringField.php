<?php

namespace App\FieldsTypes;

use Exception;
use JsonSerializable;

class StringField implements FieldType, JsonSerializable
{
    public string $label;
    public string $subLabel;
    private string $value;

    public function __construct(string $label, string $subLabel, ?string $value = null)
    {
        $this->label = $label;
        $this->subLabel = $subLabel;
        if ($value)
            $this->value = $value;
    }

    public function setValue($value)
    {
        if (!(gettype($value) == 'string'))
            throw new Exception('not valid value type..expected string');
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
            'subLabel' => $this->subLabel,
            'value' => $this->value
        );
    }
}
