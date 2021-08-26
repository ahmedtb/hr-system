<?php

namespace App\Models;

use App\Filters\IndividualFilters;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use App\Models\Assessments\TraineeCourseAssessment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class TargetedIndividual extends Authenticatable
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = [
        'role'
    ];

    public function getRoleAttribute()
    {
        if ($this->coach()->exists())
            return ['individual', 'coach'];
        else
            return ['individual'];
    }

    public function TrainingCourses($include_coach_courses = true)
    {
        if ($include_coach_courses && $this->coach) {
            return TrainingCourse::whereHas('targetedIndividuals', function ($query) {
                return $query->where('targeted_individuals.id', $this->id);
            })->orWhereHas('coaches', function ($query) {
                return $query->where('coaches.id', $this->coach->id);
            });
        } else {
            return $this->belongsToMany(TrainingCourse::class);
        }
    }

    public function coach()
    {
        return $this->morphOne(Coach::class, 'profile');
    }

    public function trainee()
    {
        return $this->morphOne(Trainee::class, 'profile');
    }

    public function CourseAttendances()
    {
        return $this->morphMany(CourseAttendance::class, 'profile');
    }

    public function TraineeCourseAssessments()
    {
        return $this->morphMany(TraineeCourseAssessment::class, 'trainee');
    }

    public function documents()
    {
        return $this->morphMany(Document::class, 'documentable');
    }

    public function scopeFilter($query, IndividualFilters $filters)
    {
        return $filters->apply($query);
    }
}
