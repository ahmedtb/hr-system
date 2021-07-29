<?php

namespace App\Filters;

use App\Models\Employee;

class TraineeCourseAssessmentFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'coach_understanding',
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
    protected function coach_understanding($rating)
    {
        return $this->builder->where('coach_understanding->rating', (int)$rating);
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
        return $this->builder->where('trainee_id', $id)->where('trainee_type', Employee::class);
    }

}
