<?php

namespace Tests\Unit;

use App\FieldsTypes\TableField;
use PHPUnit\Framework\TestCase;

class FieldsTypesTests extends TestCase
{

    public function test_table_field_could_generate_mocked_data()
    {
        $tableField = new TableField('label', array('col1', 'col2', 'col3'));
        $this->assertNull($tableField->getValue());
        $tableField->generateMockedValue();
        $this->assertNotNull($tableField->getValue());
        $this->assertEquals(count($tableField->getValue()), 3);
    }

    public function test_table_field_number_of_rows_could_be_specified()
    {
        $tableField = new TableField('label', array('col1', 'col2', 'col3'), 5);
        $this->assertNull($tableField->getValue());
        $tableField->generateMockedValue();
        $this->assertNotNull($tableField->getValue());
        $this->assertEquals(count($tableField->getValue()), 3);
        foreach ($tableField->getValue() as $column)
            $this->assertEquals(count($column), 5);
    }

    public function test_table_field_could_converted_back_and_fourth_between_array_and_instance_representation()
    {
        $tableField = new TableField('label', array('col1', 'col2', 'col3'), 5);
        $tableField->generateMockedValue();

        $tableAsArray = $tableField->jsonSerialize();
        $tableField2 = TableField::fromArray($tableAsArray);

        $this->assertEquals($tableField, $tableField2);

    }

    public function test_table_have_set_column_function()
    {
        $tableField = new TableField('label', array('col1', 'col2', 'col3'), 5);
        $tableField->generateMockedValue();
        $tableField->setColumn(1,array('element1', 'element2', 'element3', 'element4', 'element5'));
        $this->assertEquals($tableField->getValue()[1], array('element1', 'element2', 'element3', 'element4', 'element5'));

    }
}
