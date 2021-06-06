<?php

namespace App\FieldsTypes;

use Exception;
use JsonSerializable;

class TableField implements FieldType, JsonSerializable
{
    public string $label;
    public array $columnsTitles;
    private ?array $value = null;

    public static function fromArray(array $arrayForm)
    {
        $instance = new self($arrayForm['label'], $arrayForm['columnsTitles'],$arrayForm['value']);
        return $instance;
    }

    public function __construct(string $label, array $columnsTitles, ?array $value = null)
    {
        $this->label = $label;
        $this->columnsTitles = $columnsTitles;
        if ($value)
            $this->setValue($value);
    }

    public function setValue($value)
    {
        if (!(gettype($value) == 'array') || count($value) != count($this->columnsTitles))
            throw new Exception('table value should be 2-d array that match table sizes');
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
            'columnsTitles' => $this->columnsTitles,
            'value' => $this->value
        );
    }
}
