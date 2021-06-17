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
    private ?int $value = null;

    public static function fromArray(array $array)
    {
        return new self($array['label'], $array['value']);
    }
    public function __construct(string $label, ?int $value = null)
    {
        $this->label = $label;
        if ($value)
            $this->setValue($value);
    }

    public function setValue($value)
    {
        if (gettype($value) != 'integer' && !is_numeric($value) )
            throw new Exception('invalid job id value');

        $validator = Validator::make(['value' => $value], [
            'value' => 'required|exists:jobs,id'
        ]);
        if ($validator->fails()){
            throw new Exception('this job id does not exits');
        }
        $this->value = $value;
        return $this;
    }
    public function getValue()
    {
        return $this->value;
    }

    public function setRef(Job $modelInstance)
    {
        $refresh = $modelInstance->refresh();
        if ($refresh)
            $this->value = $refresh->id;
        else
            throw new Exception('the job model : ' . $modelInstance . ' does not exists');
    }


    public function getRef()
    {
        if ($this->value)
            return Job::where('id', $this->value)->first();
        else
            return null;
    }

    public function jsonSerialize()
    {
        return array(
            'class' => static::class,
            'label' => $this->label,
            'value' => $this->value
        );
    }

    public function optionsList(){
        $jobs = Job::all();
        $list = [];
        foreach($jobs as $job){
            $list[$job->id] = $job->name;
        }
        return $list;
    }

    public function generateMockedValue()
    {
        // $faker = new \Faker\Generator();
        $this->setValue(Job::factory()->create()->id);
    }
}
