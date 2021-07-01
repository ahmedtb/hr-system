<?php

namespace App\Models\Assessments;

use Illuminate\Database\Eloquent\Model;
use App\Filters\InterviewAssessmentFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class InterviewAssessment extends Model
{
    use HasFactory;

    protected $guarded = [];


    /**
     * Apply all relevant thread filters.
     *
     * @param  Builder       $query
     * @param  InterviewAssessmentsFilter $filters
     * @return Builder
     */
    public function scopeFilter($query, InterviewAssessmentFilters $filters)
    {
        return $filters->apply($query);
    }
}
