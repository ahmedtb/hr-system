<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trainee extends Model
{
    use HasFactory;

    public function trainingCourses()
    {
        return $this->belongsToMany(TrainingCourse::class);
    }

    public function documents()
    {
        return $this->morphMany(Document::class, 'could_have_documents');
    }

    public function profile()
    {
        return $this->morphTo();
    }
}
