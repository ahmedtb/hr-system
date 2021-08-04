<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coach extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = [
        'profile'
    ];

    public function trainingPrograms()
    {
        return $this->belongsToMany(TrainingProgram::class);
    }

    public function trainingCourses()
    {
        return $this->belongsToMany(TrainingCourse::class);
    }

    public function profile()
    {
        return $this->morphTo();
    }

    public function getProfileAttribute()
    {
        return ($this->profile_type != null) ? $this->profile()->first() : null;
    }
}
