<?php

namespace App\FieldsTypes;

use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;
use JsonSerializable;

class CustomRatingField extends FieldType
{
    public string $label;
    public int $max;
    private ?int $value = null;

    public static function fromArray(array $array)
    {
        $instance = new self($array['label'],$array['max'],$array['value']);
        return $instance;
    }
    public function __construct(string $label, int $max, ?int $value = null)
    {
        $this->label = $label;
        if ( $max <= 0 )
            throw new Exception('max number should not be less than or equals 0');
        $this->max = $max;

        if ($value)
            $this->setValue($value);
    }

    public function setValue($value)
    {

        if (gettype($value) != 'integer' )
            throw new Exception('rating number should be integer');
        if ( $value < 0 || $value > $this->max )
            throw new Exception('rating number should not exceed 5 or be less than 0');

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
            'max' => $this->max,
            'value' => $this->value
        );
    }

    public function generateMockedValue()
    {
        $this->setValue(random_int(0, $this->max));
    }
}
