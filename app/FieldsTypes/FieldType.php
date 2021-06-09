<?php

namespace App\FieldsTypes;

use JsonSerializable;


abstract class FieldType implements JsonSerializable {

    abstract public static function fromArray(array $array);
    abstract public function setValue($value);
    abstract public function getValue();
    abstract public function generateMockedValue();
    
}