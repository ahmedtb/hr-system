<?php

namespace App\FieldsTypes;

use JsonSerializable;


abstract class FieldType implements JsonSerializable {

    public function getName() {
        $path = explode('\\', get_class($this));
        return array_pop($path);
    }

    abstract public static function fromArray(array $array);
    abstract public function setValue($value);
    abstract public function getValue();
    public function render()
    {
        return View('fields.' . $this->getName(),['field'=>$this, 'input' => false, 'index' => null]);
    }
    public function formInput(int $index){
        return View('fields.' . $this->getName() ,['field'=>$this, 'input' => true, 'index' => $index]);
    }
    abstract public function generateMockedValue();
    
}