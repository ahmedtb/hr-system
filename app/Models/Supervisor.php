<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Supervisor extends Authenticatable
{
    use HasFactory;
    
    public function profile()
    {
        return $this->morphTo();
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
