<?php

namespace App\Filters;

use App\Models\Assessments\InterviewAssessment;
use App\User;

class InterviewAssessmentFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'confidence', 
        'self_introduction', 
        'personality', 
        'english', 
        'culture'
    ];

    /**
     * Filter the query by a given moral_courage_self_confidence rating.
     *
     * @param  string $rating
     * @return Builder
     */
    protected function confidence($rating)
    {
        return $this->builder->where('moral_courage_self_confidence', $rating);
    }

    /**
     * Filter the query by a given moral_courage_self_confidence rating.
     *
     * @param  string $rating
     * @return Builder
     */
    protected function self_introduction($rating)
    {
        return $this->builder->where('self_introduction', $rating);
    }

    /**
     * Filter the query by a given moral_courage_self_confidence rating.
     *
     * @param  string $rating
     * @return Builder
     */
    protected function personality($rating)
    {
        return $this->builder->where('personality', $rating);
    }

    /**
     * Filter the query by a given moral_courage_self_confidence rating.
     *
     * @param  string $rating
     * @return Builder
     */
    protected function english($rating)
    {
        return $this->builder->where('english', $rating);
    }

    /**
     * Filter the query by a given moral_courage_self_confidence rating.
     *
     * @param  string $rating
     * @return Builder
     */
    protected function culture($rating)
    {
        return $this->builder->where('culture', $rating);
    }
}
