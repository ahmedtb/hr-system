<?php

namespace App\FieldsTypes;

use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;
use JsonSerializable;

class RatingField extends FieldType
{
    public string $label;

    private ?int $value = null;

    public static function fromArray(array $array)
    {
        return new self($array['label'],$array['value']);
    }

    public function __construct(string $label, ?int $value = null)
    {
        $this->label = $label;

        if ($value)
            $this->setValue($value);
    }

    public function setValue($value)
    {

        if (gettype($value) != 'integer' && !is_numeric($value) )

            throw new Exception('rating number should be integer');
        if ( $value < 0 || $value > 5 )
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
            'value' => $this->value
        );
    }
    // public function render()
    // {
    //     return View('fields.ratingField',['field'=>$this]);
    // }

    // public function formInput(int $index)
    // {
    //     return View('fields.ratingField',['field'=>$this, 'input' => true, 'index' => $index]);
    // }

    public function generateMockedValue()
    {
        $this->setValue(random_int(0, 5));
    }
}
