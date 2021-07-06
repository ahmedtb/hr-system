<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class CourseStatusRule implements Rule
{
    /**
     * Create a new rule instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    protected $statusEnum = array('normal', 'canceled');
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        return in_array($value,$this->statusEnum);
    }

    /**
     * Get the validation error message.
     *
     * @return string
     */
    public function message()
    {
        return 'The course status provided is not valid';
    }
}
