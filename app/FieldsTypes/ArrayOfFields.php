<?php

namespace App\FieldsTypes;

use Exception;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;
use JsonSerializable;

class ArrayOfFields implements JsonSerializable
{
    private ?array $fields = null;
    public static function fromArray(array $arrayForm)
    {
        $instance = new self( $arrayForm['fields']);
        return $instance;
    }

    public function __construct(?array $fields = null)
    {
        if ($fields)
            $this->setFields($fields);
    }

    public function setFields($fields)
    {

        $this->fields = $fields;
        return $this;
    }
    public function getFields()
    {
        return $this->fields;
    }

    public function setField($index, $field)
    {
        
    }

    public function jsonSerialize()
    {
        return array(
            'class' => static::class,
            'fields' => $this->getFields(),
        );
    }
}
