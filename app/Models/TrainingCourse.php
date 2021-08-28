<?php

namespace App\Models;

use Carbon\Carbon;
use App\Casts\Json;
use App\Filters\CourseFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TrainingCourse extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'week_schedule' => Json::class,
    ];

    protected $appends = [
        'state', 'attendancePercentage', 'scheduleTable', 'wentDays',
        'remainingDays', 'training_program'
    ];

    public function getStateAttribute()
    {
        switch ($this->calculateStatus()) {
            case 'resumed':
                return 'مستأنفة';
            case 'planned':
                return 'مخطط لها';
            case 'canceled':
                return 'ملغية';
            case 'done':
                return 'منتهية';
        }
        return $this->calculateStatus();
    }

    public function getAttendancePercentageAttribute()
    {
        return $this->attendancePercentage();
    }

    public function getScheduleTableAttribute()
    {
        return $this->scheduleTable();
    }

    public function getWentDaysAttribute()
    {
        return $this->wentDays();
    }

    public function getRemainingDaysAttribute()
    {
        return $this->remainingDays();
    }

    public function getTrainingProgramAttribute()
    {
        return ($this->training_program_id) ? $this->trainingProgram()->first() : null;
    }

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
        return $query->where('status', 'normal')->whereDate('start_date', '<=', Carbon::today())
            ->whereDate('end_date', '>=', Carbon::today());
    }

    public function scopePlanned($query)
    {
        return $query->where('status', 'normal')->whereDate('start_date', '>', Carbon::today());
    }

    public function scopeDone($query)
    {
        return $query->where('status', 'normal')->whereDate('end_date', '<', Carbon::today());
    }


    public function scopeCanceled($query)
    {
        return $query->where('status', 'canceled');
    }


    public function scheduleTable()
    {
        $scheduleTable = [];
        foreach ($this->week_schedule as $dayName => $schedule) {
            $days = $this->getDaysInRange($this->start_date, $this->end_date, $dayName);

            foreach ($days as $index => $day) {
                $scheduleTable[$day] = [$schedule['begin'], $schedule['end']];
            }
        }
        ksort($scheduleTable);
        return $scheduleTable;
    }

    public function IsInSchedule($date, $entrance_time)
    {
        $scheduleTable = $this->scheduleTable();
        if (array_key_exists($date, $scheduleTable)) {
            return Carbon::parse($entrance_time)->between($scheduleTable[$date][0], $scheduleTable[$date][1]);
        } else
            return false;
    }

    public function isResumed()
    {
        return $this->status == 'normal' &&
            (Carbon::today()->between($this->start_date, $this->end_date)
                || Carbon::today()->eq($this->start_date)
                || Carbon::today()->eq($this->end_date));
    }

    public function isPlanned()
    {
        return  $this->status == 'normal' && Carbon::today()->lt($this->start_date);
    }

    public function isDone()
    {
        return  $this->status == 'normal' && Carbon::today()->gt($this->end_date);
    }

    public function isCanceled()
    {
        return $this->status == 'canceled';
    }

    public function calculateStatus()
    {
        if ($this->status == 'normal') {
            if ($this->isPlanned())
                return 'planned';
            if ($this->isResumed())
                return 'resumed';
            if ($this->isDone())
                return 'done';
        } else {
            return $this->status;
        }
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

    public function wentDays()
    {
        $wentDays = [];
        if ($this->isResumed() || $this->isDone()) {
            foreach ($this->week_schedule as $dayName => $schedule) {
                $days = $this->getDaysInRange($this->start_date, Carbon::today(), $dayName);
                $wentDays = array_merge($wentDays, $days);
            }
        }
        return $wentDays;
    }

    public function remainingDays()
    {
        $remainingDays = [];
        if ($this->isResumed()) {
            foreach ($this->week_schedule as $dayName => $schedule) {
                $days = $this->getDaysInRange(Carbon::today(), $this->end_date, $dayName);
                $remainingDays = array_merge($remainingDays, $days);
            }
        }
        return $remainingDays;
    }

    public function attendancePercentage()
    {
        $studentsCount = $this->employees()->count() + $this->targetedIndividuals()->count();
        $wentDays = $this->wentDays();
        $wentDaysCount = count($wentDays);
        $attendancesCount = $this->attendances()->count();
        if ($studentsCount != 0 && $wentDaysCount != 0)
            return number_format($attendancesCount / ($studentsCount * $wentDaysCount) * 100, 2);

        else
            return 0;
    }

    public function attendEmployee(Employee $employee, $date, $entrance_time, ?string $note = null)
    {
        $isInSchedule = $this->IsInSchedule($date, $entrance_time);
        $enrolled = $this->employees()->where('employees.id', $employee->id)->first() != null;

        $notAttendedThisDay = $this->attendances()
            ->where('profile_id', $employee->id)
            ->where('profile_type', Employee::class)
            ->where('date', $date)->count() == 0;
        if ($enrolled && $isInSchedule && $notAttendedThisDay) {
            CourseAttendance::create([
                'profile_id' => $employee->id,
                'profile_type' => Employee::class,
                'date' => $date,
                'entrance_time' => $entrance_time,
                'note' => $note,
                'training_course_id' => $this->id
            ]);
            return true;
        } else {
            return false;
        }
    }

    public function attendIndividual(TargetedIndividual $individual, $date, $entrance_time, ?string $note = null)
    {
        $isInSchedule = $this->IsInSchedule($date, $entrance_time);
        $enrolled = $this->targetedIndividuals()->where('targeted_individuals.id', $individual->id)->first() != null;
        $notAttendedThisDay = $this->attendances()
            ->where('profile_id', $individual->id)
            ->where('profile_type', TargetedIndividual::class)
            ->where('date', $date)->count() == 0;
        if ($enrolled && $isInSchedule && $notAttendedThisDay) {
            CourseAttendance::create([
                'profile_id' => $individual->id,
                'profile_type' => TargetedIndividual::class,
                'date' => $date,
                'entrance_time' => $entrance_time,
                'note' => $note,
                'training_course_id' => $this->id
            ]);
            return true;
        } else {
            return false;
        }
    }

    public function attendAnonymous(string $name, $date, $entrance_time, ?string $note = null)
    {
        $isInSchedule = $this->IsInSchedule($date, $entrance_time);
        if ($isInSchedule) {
            CourseAttendance::create([
                'person_name' => $name,
                'date' => $date,
                'entrance_time' => $entrance_time,
                'note' => $note,
                'training_course_id' => $this->id
            ]);
            return true;
        } else {
            return false;
        }
    }

    public function enrollEmployee(Employee $employee)
    {
        $this->employees()->save($employee);
    }

    public function enrollIndividual(TargetedIndividual $individual)
    {
        $this->targetedIndividuals()->save($individual);
    }

    /**
     * attach coach to the course model.
     *
     * @param  \App\Models\Coach  $model
     * @return bool true if success. false if coach is already attached
     */
    public function attachCoach(Coach $coach)
    {

        if ($this->coaches()->find($coach->id))
            return false;

        $this->coaches()->save($coach);
        return true;
    }

    public function isEnrolled($person)
    {
        if (get_class($person) == Employee::class)
            return $this->employees()->find($person->id) != null;
        if (get_class($person) == TargetedIndividual::class)
            return $this->targetedIndividuals()->find($person->id) != null;
    }

    public function employeeAttendaces(Employee $employee)
    {
        return $this->attendances()->where('profile_id', $employee->id)->where('profile_type', Employee::class)->get();
    }

    public function dayAttendaces($date)
    {
        return $this->attendances()->where('date', $date)->get();
    }

    public function scopeFilter($query, CourseFilters $filters)
    {
        return $filters->apply($query);
    }

    public function scopeWithDateSchedule($query, $date)
    {
        $message = [
            'date' => 'invalid date. required format: Y-m-d'
        ];
        Validator::make(['date_value' => $date], [
            'date_value' => 'required|date_format:Y-m-d',
        ], $message)->validate();

        return $query->resumed()->where('week_schedule->' . Carbon::parse($date)->format('l')); //->get();

    }
        
    public function comments()
    {
        return $this->morphMany(Comment::class, 'commentable');
    }
}
