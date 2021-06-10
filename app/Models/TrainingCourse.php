<?php

namespace App\Models;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrainingCourse extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'week_schedule' => Json::class,
    ];


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
    public function targetedIndividuals()
    {
        return $this->belongsToMany(TargetedIndividual::class);
    }

    public function employees()
    {
        return $this->belongsToMany(Employee::class);
    }
}
