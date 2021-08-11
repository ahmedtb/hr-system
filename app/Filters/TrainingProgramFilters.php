<?php

namespace App\Filters;

class TrainingProgramFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'title',
        'category',
        'period',

    ];

    protected function title($title)
    {
        return $this->builder->where('title', 'LIKE', "%{$title}%");
    }

    protected function category($category)
    {
        return $this->builder->where('category', 'LIKE', "%{$category}%");
    }

    protected function period($period)
    {
        return $this->builder->where('period', $period);
    }
}
