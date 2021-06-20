<?php

namespace App\Models;

use Carbon\Carbon;
use App\Casts\Json;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\Relation;
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

    public function trainingProgram()
    {
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

    public function attendances()
    {
        return $this->hasMany(CourseAttendance::class);
    }

    public function formStructures()
    {
        return $this->morphMany(FormStructure::class, 'formable');
    }

    public function forms()
    {
        return $this->hasManyThrough(Form::class, FormStructure::class, 'formable_id')
            ->where(
                'formable_type',
                array_search(static::class, Relation::morphMap()) ?: static::class
            );
    }

    public function scopeResumed($query)
    {
        return $query->whereDate('start_date', '<', Carbon::now())
            ->whereDate('end_date', '>', Carbon::now());
    }
}
