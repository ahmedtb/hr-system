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

    public function isResumed()
    {
        return \Carbon\Carbon::now()->between($this->start_date, $this->end_date);
    }

    public function isPlanned()
    {
        return \Carbon\Carbon::now()->lt($this->start_date);
    }

    public function getDaysInRange($fromDate, $toDate, $dayName)
    {
        $days = [];
        $startDate = Carbon::parse($fromDate)->modify('this ' . strtolower($dayName));
        $endDate = Carbon::parse($toDate);

        for ($date = $startDate; $date->lte($endDate); $date->addWeek()) {
            $days[] = $date->format('Y-m-d');
        }
        return $days;
    }

    public function remainingDays()
    {
        if ($this->isResumed()) {
            $count = 0;
            foreach ($this->week_schedule as $dayName => $schedule) {
                $days = $this->getDaysInRange(Carbon::now(), $this->end_date, $dayName);
                $count += count($days);
            }
            return $count;
        }
    }
}
