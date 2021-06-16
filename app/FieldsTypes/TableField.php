<?php

namespace App\FieldsTypes;

use Exception;
use JsonSerializable;


class TableField extends FieldType
{
    public string $label;
    public array $columnsTitles;
    private ?int $numberOfRows = null;
    private ?array $value = null;

    public static function fromArray(array $arrayForm)
    {
        $instance = new self($arrayForm['label'], $arrayForm['columnsTitles'],  $arrayForm['numberOfRows'], $arrayForm['value']);
        return $instance;
    }

    public function __construct(string $label, array $columnsTitles, ?int $numberOfRows = null, ?array $value = null)
    {
        $this->label = $label;
        $this->columnsTitles = $columnsTitles;
        if ($numberOfRows != null && $numberOfRows <= 0)
            throw new Exception('number of rows should be greater than zero');

        $this->numberOfRows = $numberOfRows;
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

    public function setColumn($index, $elements)
    {
        $numberOFCol = count($this->columnsTitles);
        if ($index < 0 || $index >= $numberOFCol)
            throw new Exception('invalid index valid. number of columns is: ' . $numberOFCol);

        $numberOfElements = count($elements);

        if ($this->numberOfRows != null && $numberOfElements != $this->numberOfRows)
            throw new Exception('invalid number of column elements submitted. number of elements should be: ' . $this->numberOfRows);
        
        $this->value[$index] = $elements;
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
            'numberOfRows' => $this->numberOfRows,
            'value' => $this->getValue()
        );
    }
    public function render()
    {
        return View('fields.tableField',['field'=>$this]);
    }
    public function generateMockedValue()
    {
        $randomNumberOfRows = random_int(1, 5);
        if ($this->numberOfRows != null)
            $randomNumberOfRows = $this->numberOfRows;
        $mockedColumn = [];
        for ($i = 0; $i < $randomNumberOfRows; $i++) {
            array_push($mockedColumn, 'test data');
        }

        $numberOFCol = count($this->columnsTitles);
        $tableData = [];
        for ($i = 0; $i < $numberOFCol; $i++) {
            array_push($tableData, $mockedColumn);
        }
        $this->setValue($tableData);
    }
}
