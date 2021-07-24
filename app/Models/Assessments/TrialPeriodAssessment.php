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

    protected $appends = [
        'degrees_sum'
    ];

    public function getDegreesSumAttribute()
    {
        $sum = $this->excitement +
            $this->ability_to_improve +
            $this->guidance_acceptance +
            $this->handling_technology +
            $this->maintaining_working_hours +
            $this->relationship_with_colleagues +
            $this->behavior +
            $this->look +
            $this->belief_and_loyalty;
        return $sum;
    }

    public function scopeFilter($query, TrialPeriodAssessmentFilters $filters)
    {
        return $filters->apply($query);
    }

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function reporter()
    {
        return $this->belongsTo(Employee::class,'reporter_id');
    }

    public function scopeOrderByTrait($query, $trait, $start_date = null, $end_date =null)
    {
        if ($start_date && $end_date)
            return $query->orderBy($trait, 'DESC')->whereBetween('created_at', [$start_date, $end_date]);
        else
            return $query->orderBy($trait, 'DESC');
    }


    public function scopeOrderByBest($query, $start_date = null, $end_date =null)
    {
        if ($start_date && $end_date)
            return $query->orderBy('final_degree', 'DESC')->orderBy('attendance_rate', 'DESC')->whereBetween('created_at', [$start_date, $end_date]);
        else
            return $query->orderBy('final_degree', 'DESC')->orderBy('attendance_rate', 'DESC');
    }
}
