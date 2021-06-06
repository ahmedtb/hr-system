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
    }
    public function test_table_field_could_have_a_static_columns()
    {
        $tableField = new TableField(
            'label',
            array('col1', 'col2', 'col3'),
            ['col2' => [
                '1', '2', '3'
            ]]
        );
        $this->assertNull($tableField->getValue());
        $tableField->generateMockedValue();
        $this->assertNotNull($tableField->getValue());

        dd($tableField->getValue());

    }
}
