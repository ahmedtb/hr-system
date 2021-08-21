<?php

namespace App\Models;

use App\Filters\CoachFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Coach extends Authenticatable
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = [
        'profile', 'role'

    ];

    public function getRoleAttribute()
    {
        return ['coach'];
    }

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

    public function scopeFilter($query, CoachFilters $filters)
    {
        return $filters->apply($query);
    }
}
