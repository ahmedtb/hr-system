<?php

namespace App\Filters;

class JobFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'unit_id',
    ];

    protected function unit_id($id)
    {
        return $this->builder->where('unit_id', $id);
    }
    
}
