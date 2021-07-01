<?php

namespace App\Filters;

class CoachCourseAssessmentFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'trainees_discipline', 

    ];

    /**
     * Filter the query by a given moral_courage_self_confidence rating.
     *
     * @param  string $rating
     * @return Builder
     */
    protected function trainees_discipline($rating)
    {
        return $this->builder->where('trainees_discipline->rating', (int)$rating);
    }

}
