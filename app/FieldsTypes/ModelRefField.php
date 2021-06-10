<?php

namespace App\FieldsTypes;

use Exception;
use Faker\Generator;
use Illuminate\Container\Container;
use Illuminate\Database\Eloquent\Model;

class ModelRefField extends FieldType
{
    public string $label;
    private string $modelClass;
    private ?string $value = null;

    public static function fromArray(array $arrayForm)
    {
        $instance = new self($arrayForm['label'], $arrayForm['modelClass'], $arrayForm['value']);
        return $instance;
    }

    public function __construct(string $label, string $modelClass, ?int $value = null)
    {
        $this->label = $label;
        $this->setModelClass($modelClass);
        if ($value)
            $this->setValue($value);
    }

    public function setModelClass(string $modelClass)
    {
        if (class_parents($modelClass) == [Model::class => Model::class])
            $this->modelClass = $modelClass;
        else
            throw new Exception('invalid model class: ' . $modelClass);
    }

    public function setValue($value)
    {
        if (!(gettype($value) == 'integer'))
            throw new Exception('not valid value type..expected id');

        $count = $this->modelClass::where('id', $value)->count();

        if ($count == 1)
            $this->value = $value;
        else
            throw new Exception('the table of model : ' . $this->modelClass . ' does not have id = ' . $value);

        return $this;
    }
    public function getValue()
    {
        return $this->value;
    }

    public function setRef(Model $modelInstance)
    {
        $refresh = $modelInstance->refresh();
        if ($refresh)
            $this->value = $refresh->id;
        else
            throw new Exception('the model : ' . $modelInstance . ' is deleted');
    }


    public function getRef()
    {
        if ($this->value)
            return $this->modelClass::where('id', $this->value)->first();
        else
            return null;
    }


    public function jsonSerialize()
    {
        return array(
            'class' => static::class,
            'label' => $this->label,
            'modelClass' => $this->modelClass,
            'value' => $this->value
        );
    }

    public function generateMockedValue()
    {
        $instance = $this->modelClass::factory()->create();
        $this->setValue($instance->id);
    }
}
