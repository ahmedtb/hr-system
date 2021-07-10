<?php

namespace App\Models\Assessments;

use Illuminate\Database\Eloquent\Model;
use App\Filters\TrialPeriodAssessmentFilters;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrialPeriodAssessment extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function scopeFilter($query, TrialPeriodAssessmentFilters $filters)
    {
        return $filters->apply($query);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function scopeOrderByTrait($query, $trait, $start_date, $end_date)
    {
        if ($start_date && $end_date)
            return $query->orderBy($trait,'DESC')->whereBetween('created_at', [$start_date, $end_date]);
        else
            return $query->orderBy($trait,'DESC');
    }
}
