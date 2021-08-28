<?php

namespace App\Models;

use App\Filters\TrainingProgramFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrainingProgram extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    public function coaches()
    {
        return $this->belongsToMany(Coach::class);
    }

    public function trainingCourses(){
        return $this->hasMany(TrainingCourse::class);
    }

    public function documents()
    {
        return $this->morphMany(Document::class, 'documentable');
    }

    
    public function scopeFilter($query, TrainingProgramFilters $filters)
    {
        return $filters->apply($query);
    }
            
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
