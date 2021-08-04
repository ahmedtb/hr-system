<?php

namespace App\Filters;

class EmployeeFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
    ];

    protected function job_id($id)
    {
        return $this->builder->where('job_id', $id);
    }
    
}
