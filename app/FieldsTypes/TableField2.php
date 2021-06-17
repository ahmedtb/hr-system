<?php

namespace App\FieldsTypes;

use Exception;
use Illuminate\Support\Collection;

class TableField2 extends FieldType
{
    public string $label;
    public array $columnsTitles;
    private Collection $rows; // collection of arrays

    public int $numberOfRows;

    public static function fromArray(array $arrayForm)
    {
        $instance = new self($arrayForm['label'], $arrayForm['columnsTitles'], count($arrayForm['value']));
        $instance->setValue($arrayForm['value']);
        return $instance;
    }

    public function __construct(string $label, array $columnsTitles, int $numberOfRows)
    {
        $this->label = $label;
        $this->setTitles($columnsTitles);

        if ($numberOfRows <= 0)
            throw new Exception('invalid number of rows');
        $this->numberOfRows = $numberOfRows;

        $numberOfCols = count($columnsTitles);

        $this->initiateEmptyRows($numberOfCols, $numberOfRows);
    }

    public function setTitles(array $titles)
    {
        foreach ($titles as $title) {
            if (gettype($title) != 'string') {
                throw new Exception('titles should be string type');
            }
        }
        $this->columnsTitles = $titles;
    }

    public function initiateEmptyRows(int $numberOfCols, int $numberOfRows)
    {
        $emptyRow = [];
        for ($i = 0; $i < $numberOfCols; $i++)
            array_push($emptyRow, '');

        $this->rows = collect([]);


        for ($i = 0; $i < $numberOfRows; $i++)
            $this->rows->push($emptyRow);
    }

    public function setElement(string $value, int $col, int $row)
    {
        if ($col >= count($this->columnsTitles) || $row >= $this->numberOfRows) {
            throw new Exception('incorrect corrdinates...size = ' . count($this->columnsTitles) . 'X' . $this->numberOfRows);
        }
        $rowValue = $this->rows->get($row);
        $rowValue[$col] = $value;
        // dd($this->rows);
        $this->setRow($rowValue, $row);
    }

    public function getElement(int $col, int $row)
    {
        if ($col >= count($this->columnsTitles) || $row >= $this->numberOfRows) {
            throw new Exception('incorrect corrdinates...size = ' . count($this->columnsTitles) . 'X' . $this->numberOfRows);
        }
        $rowValue = $this->rows->get($row);
        return $rowValue[$col];
    }

    public function getRow($index)
    {
        return $this->rows->get($index);
    }

    public function setRow(array $value, $index)
    {
        if ($index >= $this->numberOfRows || $index < 0) {
            throw new Exception('incorrect corrdinates...size = ' . count($this->columnsTitles) . 'X' . $this->numberOfRows);
        }
        if (count($value) != count($this->columnsTitles))
            throw new Exception(count($value) . ' is incorrect row size...size = ' . count($this->columnsTitles) . 'X' . $this->numberOfRows);

        $this->rows = $this->rows->replace([$index => $value]);
    }

    public function setColumn(array $value, $colIndex)
    {
        if ($colIndex >= count($this->columnsTitles) || $colIndex < 0) {
            throw new Exception('incorrect corrdinates...size = ' . count($this->columnsTitles) . 'X' . $this->numberOfRows);
        }
        if (count($value) !=  $this->numberOfRows) {
            throw new Exception('array size does not match titles size...size = ' . count($this->columnsTitles) . 'X' . $this->numberOfRows);
        }
        foreach ($this->rows as $rowIndex => $row) {
            $this->setElement($value[$rowIndex], $colIndex, $rowIndex);
        }
    }

    public function getColumn($colIndex)
    {
        $column = [];
        foreach ($this->rows as $rowIndex => $row) {
            $colElement = $this->getElement($colIndex, $rowIndex);
            array_push($column, $colElement);
        }
        return $column;
    }


    public function setValue($value)
    {
        if (gettype($value) == 'array') {
            foreach ($value as $rowIndex => $row) {
                $this->setRow($row, $rowIndex);
            }
        } else {
            throw new Exception('the value should be a 2 d array...with size = ' . count($this->columnsTitles) . 'X' . $this->numberOfRows);
        }
    }

    public function getValue()
    {
        return $this->rows->all();
    }

    public function jsonSerialize()
    {
        return array(
            'class' => static::class,
            'label' => $this->label,
            'columnsTitles' => $this->columnsTitles,
            'numberOfRows' =>  $this->numberOfRows,
            'value' => $this->rows->all()
        );
    }
    public function render()
    {
        return View('fields.tableField2',['field'=>$this, 'input' => false, 'index' => null]);
    }

    public function formInput($index)
    {
        return View('fields.tableField2',['field'=>$this, 'input' => true, 'index' => $index]);

    }

    public function generateMockedValue()
    {
        $testRowData = [];
        for ($i = 0; $i < count($this->columnsTitles); $i++)
            array_push($testRowData, '');

        for ($i = 0; $i < $this->numberOfRows; $i++)
            $this->setRow($testRowData,$i);
    }
}
