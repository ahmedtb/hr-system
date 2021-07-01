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
}
