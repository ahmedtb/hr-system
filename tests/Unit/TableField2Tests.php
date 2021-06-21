<?php

namespace Tests\Unit;

use App\FieldsTypes\TableField2;
use PHPUnit\Framework\TestCase;

class TableField2Tests extends TestCase
{
    public function test_table_field_could_be_transformed_back_fourth_from_object_to_array_representation()
    {

        $table = new TableField2('testing label', ['col1', 'col2', 'col3'], 3);
        $table->generateMockedValue();
        // dd($table);
        // dd($table->jsonSerialize());

        $asArray = $table->jsonSerialize();
        $tableFromArray = $asArray['class']::fromArray($asArray);
        // dd($asArray);
        // dd($tableFromArray->jsonSerialize());
        $this->assertEquals($tableFromArray, $table);
        $this->assertEquals($table->jsonSerialize(), $asArray);
    }

    public function test_table_field_could_set_entire_column_at_once()
    {
        $numberOfRows = 5;
        $table = new TableField2('testing label', ['col1', 'col2', 'col3'], $numberOfRows);
        $table->setColumn(['1', '2', '3', '4', '5'], 1);
        $this->assertEquals($table->getColumn(1), ['1', '2', '3', '4', '5']);
    }

    public function test_table_field_could_set_any_element()
    {
        $numberOfRows = 3;
        $colsTitles = ['col1', 'col2', 'col3'];
        $table = new TableField2('testing label', $colsTitles, $numberOfRows);
        // set diagonal elements
        for ($i = 0; $i <  $numberOfRows; $i++) {
            $table->setElement('test', $i, $i);
        }

        $this->assertEquals($table->getElement(0, 0), 'test');
        $this->assertEquals($table->getElement(0, 1), '');
        $this->assertEquals($table->getElement(0, 2), '');
    }

    function test_table_should_validate_cooridinates_in_setting_an_element()
    {
        $numberOfRows = 5;
        $colsTitles = ['col1', 'col2', 'col3'];
        $table = new TableField2('testing label', $colsTitles, $numberOfRows);
        $this->expectException('Exception');
        $table->getElement(0, 5);
    }

    function test_table_should_validate_cooridinates_in_getting_an_element()
    {
        $numberOfRows = 5;
        $colsTitles = ['col1', 'col2', 'col3'];
        $table = new TableField2('testing label', $colsTitles, $numberOfRows);
        $this->expectException('Exception');
        $table->getElement(3, 0);
    }

    function test_table_number_of_rows_initiated_should_be_validated()
    {
        $numberOfRows = 0;
        $colsTitles = ['col1', 'col2', 'col3'];
        $this->expectException('Exception');
        $table = new TableField2('testing label', $colsTitles, $numberOfRows);
    }

    function test_table_column_titles_should_be_strings()
    {
        $numberOfRows = 4;
        $colsTitles = [1, 'col2', 'col3'];
        $this->expectException('Exception');
        $table = new TableField2('testing label', $colsTitles, $numberOfRows);
    }

    function test_table_get_row_return_null_for_incorrect_index()
    {
        $numberOfRows = 6;
        $colsTitles = ['col1', 'col2', 'col3'];
        $table = new TableField2('testing label', $colsTitles, $numberOfRows);
        $this->assertNull($table->getRow(6));
    }

    function test_table_set_row_throw_exception_for_incorrect_index()
    {
        $numberOfRows = 6;
        $colsTitles = ['col1', 'col2', 'col3'];
        $table = new TableField2('testing label', $colsTitles, $numberOfRows);
        $this->expectException('Exception');
        $table->setRow(['row1', 'row1', 'row3'], 6);
    }

    function test_table_set_row_throw_exception_for_incorrect_array_size()
    {
        $numberOfRows = 6;
        $colsTitles = ['col1', 'col2', 'col3'];
        $table = new TableField2('testing label', $colsTitles, $numberOfRows);
        $this->expectException('Exception');
        $table->setRow(['row1', 'row1'], 3);
    }

    function test_table_set_column_throw_exception_for_incorrect_index()
    {
        $numberOfRows = 6;
        $colsTitles = ['col1', 'col2', 'col3'];
        $table = new TableField2('testing label', $colsTitles, $numberOfRows);
        $this->expectException('Exception');
        $table->setColumn(['test','index','index','index','index','index'], 3);
    }

    function test_table_set_column_throw_exception_for_incorrect_array_size()
    {
        $numberOfRows = 6;
        $colsTitles = ['col1', 'col2', 'col3'];
        $table = new TableField2('testing label', $colsTitles, $numberOfRows);
        $this->expectException('Exception');
        $table->setColumn(['test','index','index','index','index'], 2);
    }

    function test_table_could_generate_mocked_data()
    {
        $numberOfRows = 6;
        $colsTitles = ['col1', 'col2', 'col3'];
        $table = new TableField2('testing label', $colsTitles, $numberOfRows);
        // $this->expectException('Exception');
        // $table->setColumn(['test','index','index','index','index'], 2);
        $table->generateMockedValue();
        for ($i = 0; $i <  $numberOfRows; $i++) {
            $this->assertEquals($table->getRow($i), ['test','test','test']);
        }
    }
}
