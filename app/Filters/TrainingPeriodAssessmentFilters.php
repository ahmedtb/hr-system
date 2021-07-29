<?php

namespace App\Filters;

class TrainingPeriodAssessmentFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'excitement',
        'orderByDesc',
        'orderByAsc',
        'employee_id'
    ];

    /**
     * Filter the query by a given moral_courage_self_confidence rating.
     *
     * @param  string $rating
     * @return Builder
     */
    protected function excitement($rating)
    {
        return $this->builder->where('excitement', (int)$rating);
    }

    protected function orderByDesc($trait)
    {
        return $this->builder->orderBy($trait, 'DESC');
    }

    protected function orderByAsc($trait)
    {
        return $this->builder->orderBy($trait, 'ASC');
    }
    
    protected function employee_id($id)
    {
        return $this->builder->where('employee_id', $id);
    }
}
