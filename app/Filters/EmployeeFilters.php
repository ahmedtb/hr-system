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
        'job_id',
        'unit_id'
    ];

    protected function job_id($id)
    {
        return $this->builder->where('job_id', $id);
    }

    protected function unit_id($id)
    {
        return $this->builder->whereHas('job', function ($query) use($id) {
            $query->where('unit_id', $id);
        });
    }
}
