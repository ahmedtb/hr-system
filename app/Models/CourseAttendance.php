<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CourseAttendance extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = [
        'profile'
    ];

    public function getProfileAttribute()
    {
        return ($this->profile_type != null) ?$this->profile()->first() : null;
    }

    public function profile()
    {
        return $this->morphTo();
    }

    public function trainingCourse()
    {
        return $this->belongsTo(TrainingCourse::class);
    }

    public function scopeInDays($query, $days)
    {
        return $query->whereIn('date', $days);
    }

    public function scopeBetween($query, $first, $last)
    {
        return $query->whereDate('date', '>=', $first)
            ->orWhereDate('date', '<=', $last);
    }
}
