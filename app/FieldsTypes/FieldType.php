<?php

namespace App\FieldsTypes;

use JsonSerializable;


abstract class FieldType implements JsonSerializable {

    abstract public function setValue($value);
    abstract public function getValue();
    abstract public function generateMockedValue();
    
}