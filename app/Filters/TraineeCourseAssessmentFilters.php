<?php

namespace App\Filters;

class TraineeCourseAssessmentFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'coach_understanding',
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

}
