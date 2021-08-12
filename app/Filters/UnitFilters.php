<?php

namespace App\Filters;

class UnitFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'job_id',
        'name',
        'purpose',
        'parent_name',

    ];

    protected function job_id($id)
    {
        return $this->builder->where('job_id', $id);
    }
    
    protected function name($name)
    {
        return $this->builder->where('name', 'LIKE', "%{$name}%");
    }
    
    protected function purpose($purpose)
    {
        return $this->builder->where('purpose', 'LIKE', "%{$purpose}%");
    }
        
    protected function parent_name($parent_name)
    {
        return $this->builder->whereHas('parent', function ($query) use ($parent_name) {
            return $query->where('name', 'LIKE', "%{$parent_name}%");
        });
    }
}
