<?php

namespace App\Models;

use App\Filters\JobFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    use HasFactory;

    protected $fillable = ['unit_id', 'name', 'purpose', 'description'];
    public function unit()
    {
        return $this->belongsTo(Unit::class);
    }

    public function employees()
    {
        return $this->hasMany(Employee::class);
    }

    public function scopeFilter($query, JobFilters $filters)
    {
        return $filters->apply($query);
    }
}
