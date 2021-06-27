<?php

namespace App\Models\Assessments;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CoachCourseAssessment extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'coach_understanding' => Json::class,
        'trainees_discipline' => Json::class,
        'trainees_interaction' => Json::class,
        'congruence_with_content' => Json::class,
        'trainees_cooperation' => Json::class,
        'syllabus_understanding' => Json::class,
        'hall_preparation' => Json::class,
        'reception_supervision' => Json::class,
        'hospitality' => Json::class,
        'hospitality_and_course_breaks' => Json::class,
        'training_department_cooperation' => Json::class,

    ];
}
