<?php

namespace App\Models;

use App\Models\Assessments\TrainingPeriodAssessment;
use App\Models\Assessments\TrialPeriodAssessment;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
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
        return Job::where('id', $this->id)->first();
    }

    public function job()
    {
        return $this->belongsTo(Job::class);
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

}
