<?php

namespace App\FieldsTypes;


interface FieldType {

    public function setValue($value);
    public function getValue();

}