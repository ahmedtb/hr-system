<?php

namespace App\FieldsTypes;

use Exception;
use JsonSerializable;

class TableField implements FieldType, JsonSerializable
{
    public string $label;
    public array $columnsTitles;
    public ?array $static_cols = null;
    private ?array $value = null;

    public static function fromArray(array $arrayForm)
    {
        $instance = new self($arrayForm['label'], $arrayForm['columnsTitles'], $arrayForm['value']);
        return $instance;
    }

    public function __construct(string $label, array $columnsTitles, ?array $static_cols = null,  ?array $value = null)
    {
        $this->label = $label;
        $this->columnsTitles = $columnsTitles;
        foreach ($static_cols as $colTitle => $colValues) {
            if (!in_array($colTitle, $columnsTitles))
                throw new Exception('table static col title does not exists');
        }
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
            'static_cols' => $this->static_cols,
            'value' => $this->getValue()
        );
    }

    public function generateMockedValue()
    {
        $numberOFCol = count($this->columnsTitles);
        $mockedColumn = [];
        for ($i = 0; $i < $numberOFCol; $i++) {
            array_push($mockedColumn, 'test data');
        }

        $tableData = [];
        for ($i = 0; $i < $numberOFCol; $i++) {
            array_push($tableData, $mockedColumn);
        }
        $this->setValue($tableData);
    }
}
