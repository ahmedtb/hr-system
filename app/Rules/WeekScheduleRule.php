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

    protected $errorType = '';
    /**
     * Determine if the validation rule passes.
     *
     * @param  string  $attribute
     * @param  mixed  $value
     * @return bool
     */
    public function passes($attribute, $value)
    {
        if (!is_array($value)){
            $this->errorType='not array';
            return false;
        }

        foreach ($value as $day => $schedule) {
            if (!in_array($day, array('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'))){
                $this->errorType='wrong week names';
                return false;
            }

            if (gettype($schedule['begin']) != 'string'){
                $this->errorType='wrong begin time';
                return false;
            }
            if (gettype($schedule['end']) != 'string'){
                $this->errorType='wrong end time';
                return false;
            }
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
        if($this->errorType == 'not array'){
            return 'invalid week schedule: week schedule should be an array';

        }else if($this->errorType == 'wrong week names'){
            return 'invalid week schedule: wrong week names';

        }else if($this->errorType == 'wrong begin time'){
            return 'invalid week schedule: wrong begin time';

        }else if($this->errorType == 'wrong end time'){
            return 'invalid week schedule: wrong end time';

        }else {
            return 'invalid week schedule provided';
        }
    }
}
