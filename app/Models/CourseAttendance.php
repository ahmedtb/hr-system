<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseAttendance extends Model
{
    use HasFactory;

    public function profile()
    {
        return $this->morphTo();
    }

    public function trainingCourse() {
        return $this->belongsTo(TrainingCourse::class);
    }
}
