<?php

namespace App\Models\Assessments;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Model;
use App\Filters\TraineeCourseAssessmentFilters;
use App\Models\TrainingCourse;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TraineeCourseAssessment extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'coach_understanding' => Json::class,
        'coach_communication' => Json::class,
        'presentation' => Json::class,
        'coach_cooperation' => Json::class,
        'program_quality' => Json::class,
        'technical_preparation' => Json::class,
        'training_hall_preparation' => Json::class,
        'reception' => Json::class,
        'hospitality_and_course_breaks' => Json::class,
        'training_unit_response' => Json::class,
    ];

    public function scopeFilter($query, TraineeCourseAssessmentFilters $filters)
    {
        return $filters->apply($query);
    }

    public function TrainingCourse()
    {
        return $this->belongsTo(TrainingCourse::class);
    }
}
