<?php

namespace App\Models\Assessments;

use Illuminate\Database\Eloquent\Model;
use App\Filters\InterviewAssessmentFilters;
use App\Models\Employee;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class InterviewAssessment extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['TraitsSum'];

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

    public function interviewer()
    {
        return $this->belongsTo(Employee::class);
    }

    public function getTraitsSumAttribute()
    {
        $traits = [
            'look',
            'self_introduction',
            'personality',
            'english',
            'culture',
            'arabic',
            'initiative',
            'sharing_skills',
            'comprehension',
            'self_introduction',
            'decision_making',
            'compatibility_of_education',
            'compatibility_of_experiance',
            'compatibility_of_skills',
            'problem_solving_skills',
            'stress_handling',
            'stress_handling',
            'moral_courage_self_confidence',
        ];
        $sum = 0;

        for ($i = 0; $i < count($traits); $i++) {
            $sum += $this[$traits[$i]];
        }
        return $sum;
    }

    public function orderTraits()
    {
        $traits = [
            'look',
            'self_introduction',
            'personality',
            'english',
            'culture',
            'arabic',
            'initiative',
            'sharing_skills',
            'comprehension',
            'self_introduction',
            'decision_making',
            'compatibility_of_education',
            'compatibility_of_experiance',
            'compatibility_of_skills',
            'problem_solving_skills',
            'stress_handling',
            'stress_handling',
            'moral_courage_self_confidence',
        ];
        $excellent = [];
        $good = [];
        $medium = [];
        $weak = [];

        for ($i = 0; $i < count($traits); $i++) {
            if ($this[$traits[$i]] == 1) {
                $excellent[] = $traits[$i];
            } else if ($this[$traits[$i]] == 2) {
                $good[] = $traits[$i];
            } else if ($this[$traits[$i]] == 3) {
                $medium[] = $traits[$i];
            } else if ($this[$traits[$i]] == 4) {
                $weak[] = $traits[$i];
            }
        }
        return array_merge($excellent, $good, $medium, $weak);
    }

    public function scopeOrderByTrait($query, $trait, $start_date, $end_date)
    {
        if ($start_date && $end_date)
            return $query->orderBy($trait)->whereBetween('created_at', [$start_date, $end_date]);
        else
            return $query->orderBy($trait);
    }

}
