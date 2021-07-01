<?php

namespace App\Models\Assessments;

use Illuminate\Database\Eloquent\Model;
use App\Filters\TrialPeriodAssessmentFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrialPeriodAssessment extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function scopeFilter($query, TrialPeriodAssessmentFilters $filters)
    {
        return $filters->apply($query);
    }
}
