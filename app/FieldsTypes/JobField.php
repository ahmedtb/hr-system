<?php

namespace App\FieldsTypes;

use Exception;
use App\Models\Job;
use JsonSerializable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\Validator;

class JobField extends FieldType
{
    public string $label;
    private int $value;

    public function __construct(string $label, ?int $value = null)
    {
        $this->label = $label;
        if ($value)
            $this->setValue($value);
    }

    public function setValue($value)
    {
        $validator = Validator::make(['value'=>$value],[
            'value' => 'required|exists:jobs,id'
        ]);
        if ($validator->fails())
            throw new Exception('this job id does not exits');
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
            'value' => $this->value
        );
    }

    public function generateMockedValue()
    {
        // $faker = new \Faker\Generator();
        $this->setValue(Job::factory()->create()->id);
    }
}
