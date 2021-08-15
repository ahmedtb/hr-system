<?php

namespace App\Models;

use App\Filters\IndividualFilters;
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
        return 'individual';
    }

    public function trainingCourses()
    {
        return $this->belongsToMany(TrainingCourse::class);
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
