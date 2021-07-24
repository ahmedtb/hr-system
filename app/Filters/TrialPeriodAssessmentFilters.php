<?php

namespace App\Filters;

class TrialPeriodAssessmentFilters extends Filters
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
        'from',
        'to'
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

    protected function from($from_date)
    {
        return $this->builder->whereDate('created_at', '>=', $from_date);
    }

    protected function to($to_date)
    {
        return $this->builder->whereDate('created_at', '<=', $to_date);
    }
}
