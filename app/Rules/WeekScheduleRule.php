<?php

namespace App\Rules;

use Illuminate\Contracts\Validation\Rule;

class WeekScheduleRule implements Rule
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

    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (!is_array($value))
            return false;

        foreach ($value as $day => $schedule) {
            if (!in_array($day, array('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday')))
                return false;

            if (gettype($schedule['begin']) != 'string')
                return false;
            if (gettype($schedule['period']) != 'integer')
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
        return 'invalid week schedual provided';
    }
}
