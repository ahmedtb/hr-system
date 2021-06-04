<?php

namespace App\FieldsTypes;

use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;
use JsonSerializable;

class RatingField implements FieldType, JsonSerializable
{
    public string $label;

    private int $value;

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
        if ( $value < 0 || $value > 5 )
            throw new Exception('rating number should not exceed 5 or be less than 0');

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
