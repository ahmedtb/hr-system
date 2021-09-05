<?php

namespace App\Rules;

use Exception;
use App\FieldsTypes\ArrayOfFields;
use App\Models\FormStructure;
use Illuminate\Contracts\Validation\Rule;

class ArrayOfFieldsRule implements Rule
{

    protected ?FormStructure $structure;
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct(?FormStructure $structure = null)
    {
        $this->structure = $structure;
    }

    protected $errorMessage;


    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        try {
            if ($value['class'] != ArrayOfFields::class)
                return false;
            $instance = ArrayOfFields::fromArray($value);
            if ($this->structure)
                foreach ($instance->getFields() as $index => $field) {
                    if (
                        !$this->structure->array_of_fields->getFields()[$index]->label == $field->label || !get_class($this->structure->array_of_fields->getFields()[$index]) == get_class($field)
                    ) {
                        $this->errorMessage = 'array_of_field structures is not compatibale';
                        return false;
                    }
                }
        } catch (Exception $e) {
            $this->errorMessage = $e->getMessage();
            return false;
        }
        return true;
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'InValid ArrayOfFields Array: ' . $this->errorMessage;
    }
}
