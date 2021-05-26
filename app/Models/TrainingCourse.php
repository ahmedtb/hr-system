<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrainingCourse extends Model
{
    use HasFactory;

    public function coaches()
    {
        return $this->belongsToMany(Coach::class);
    }

    public function trainingProgram(){
        return $this->belongsTo(TrainingProgram::class);
    }

    public function trainees()
    {
        return $this->belongsToMany(Trainee::class);
    }

    // this relation could be omitted
    public function targetedIndividual()
    {
        return $this->belongsToMany(TargetedIndividual::class);
    }
}
