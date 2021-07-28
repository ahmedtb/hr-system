<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Assessments\TraineeCourseAssessment;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TargetedIndividual extends Model
{
    use HasFactory;

    protected $guarded = [];

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
}
