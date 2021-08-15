<?php

namespace App\Models;

use App\Filters\EmployeeFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use App\Models\Assessments\TrialPeriodAssessment;
use App\Models\Assessments\TraineeCourseAssessment;
use App\Models\Assessments\TrainingPeriodAssessment;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Authenticatable
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'medal_rating' => 'integer'
    ];

    protected $appends = [
        'job'
    ];

    public function getJobAttribute()
    {
        return Job::where('id', $this->job_id)->first();
    }

    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function unit()
    {
        return $this->job()->first()->unit()->first();
    }

    public function documents()
    {
        return $this->morphMany(Document::class, 'documentable');
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

    public function TrialPeriodAssessments()
    {
        return $this->hasMany(TrialPeriodAssessment::class);
    }

    public function TrainingPeriodAssessments()
    {
        return $this->hasMany(TrainingPeriodAssessment::class);
    }

    public function courses()
    {
        return $this->belongsToMany(TrainingCourse::class);
    }

    public function enrollInCourse(TrainingCourse $course)
    {
        $this->courses()->save($course);
    }

    public function scopeFilter($query, EmployeeFilters $filters)
    {
        return $filters->apply($query);
    }
}
