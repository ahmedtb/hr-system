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

    protected $appends = [
        'role'
    ];

    public function getRoleAttribute(){
        return ['admin'];
    }

    public function TrainingCourses(){
        return TrainingCourse::with([]);
    }

    public function trainingPrograms(){
        return TrainingProgram::with([]);
    }
}
