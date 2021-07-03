<?php

namespace App\Models\Assessments;

use App\Models\Employee;
use Illuminate\Database\Eloquent\Model;
use App\Filters\TrainingPeriodAssessmentFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrainingPeriodAssessment extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function scopeFilter($query, TrainingPeriodAssessmentFilters $filters)
    {
        return $filters->apply($query);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}
