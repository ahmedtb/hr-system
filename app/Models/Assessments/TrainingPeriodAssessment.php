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

    protected $appends = [
        'employee','reporter'
    ];
    public function getEmployeeAttribute()
    {

        return ($this->employee_id) ? $this->employee()->first() : null;
    }
    public function getReporterAttribute()
    {

        return ($this->reporter_id) ? $this->reporter()->first() : null;
    }

    public function scopeFilter($query, TrainingPeriodAssessmentFilters $filters)
    {
        return $filters->apply($query);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function reporter()
    {
        return $this->belongsTo(Employee::class, 'reporter_id');
    }
}
