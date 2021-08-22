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
        'name',
        'purpose',
        'description',

    ];

    protected function name($name)
    {
        return $this->builder->where('name', 'LIKE', "%{$name}%");
    }
    
    protected function purpose($purpose)
    {
        return $this->builder->where('purpose', 'LIKE', "%{$purpose}%");
    }
    
    protected function description($description)
    {
        return $this->builder->where('description', 'LIKE', "%{$description}%");
    }
}
