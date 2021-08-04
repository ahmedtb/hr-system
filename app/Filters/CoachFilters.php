<?php

namespace App\Filters;

class CoachFilters extends Filters
{

    protected $filters = [
        'unit_id',
    ];

    protected function unit_id($date)
    {
        return $this->builder->where('start_date', $date);
    }

    
}
