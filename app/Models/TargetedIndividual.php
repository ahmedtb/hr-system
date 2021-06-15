<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TargetedIndividual extends Model
{
    use HasFactory;

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

    public function documents()
    {
        return $this->morphMany(Document::class, 'documentable');
    }
}
