<?php

namespace App\FieldsTypes;

use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;
use JsonSerializable;

class OptionsField implements FieldType, JsonSerializable
{
    public string $label;
    public array $options;
    private ?string $value = null;

    public static function fromArray(array $arrayForm)
    {
        $instance = new self($arrayForm['label'], $arrayForm['options'], $arrayForm['value']);
        return $instance;
    }

    public function __construct(string $label, array $options, ?string $value = null)
    {
        $this->label = $label;
        $this->options = $options;
        if ($value)
            $this->setValue($value);
    }

    public function setValue($value)
    {
        if (!in_array($value, $this->options))
            throw new Exception('please choose from the options');

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
            'options' => $this->options,
            'value' => $this->value
        );
    }
}
