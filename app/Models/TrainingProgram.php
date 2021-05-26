<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingProgram extends Model
{
    use HasFactory;

    public function coaches()
    {
        return $this->belongsToMany(Coach::class);
    }

    public function trainingCourses(){
        return $this->hasMany(TrainingCourse::class);
    }
}
