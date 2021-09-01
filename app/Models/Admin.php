<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Admin extends Authenticatable
{
    use HasFactory;

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $guarded = [];

    protected $appends = [
        'role'
    ];

    public function getRoleAttribute()
    {
        return ['admin'];
    }

    public function TrainingCourses()
    {
        return TrainingCourse::with([]);
    }

    public function trainingPrograms()
    {
        return TrainingProgram::with([]);
    }

    public function myComments()
    {
        return $this->morphMany(Comment::class, 'commenter');
    }

    public function myCommentsOnCourses()
    {
        return $this->morphMany(Comment::class, 'commenter')->where('commentable_type', TrainingCourse::class);
    }
    
    public function myCommentsOnPrograms()
    {
        return $this->morphMany(Comment::class, 'commenter')->where('commentable_type', TrainingProgram::class);
    }
        
    public function myCommentsOnEmployees()
    {
        return $this->morphMany(Comment::class, 'commenter')->where('commentable_type', Employee::class);
    }
            
    public function myCommentsOnIndividuals()
    {
        return $this->morphMany(Comment::class, 'commenter')->where('commentable_type', TargetedIndividual::class);
    }
}
