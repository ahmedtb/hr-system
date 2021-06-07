<?php

namespace App\FieldsTypes;

use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;
use JsonSerializable;

class SocialStatusField extends FieldType
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
        if($value != 'single' && $value != 'married')
            throw new Exception('gender field accept only male or female value');

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

    public function generateMockedValue()
    {
        $status = ['single', 'married'];
        $this->setValue($status[array_rand($status)]);
    }
}
