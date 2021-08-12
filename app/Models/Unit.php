<?php

namespace App\Models;

use App\Filters\UnitFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Unit extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected $appends = ['children'];

    public function parent()
    {
        return $this->belongsTo(Unit::class, 'parent_id');
    }

    public function children()
    {
        return $this->belongsTo(Unit::class, 'id', 'parent_id');
    }

    public function getChildrenAttribute()
    {
        return $this->children()->get();
    }

    public function head()
    {
        return $this->belongsTo(Head::class);
    }

    public function jobs()
    {
        return $this->hasMany(Job::class);
    }

    public function employees()
    {
        return $this->hasManyThrough(Employee::class, Job::class);
    }
    
    public function scopeFilter($query, UnitFilters $filters)
    {
        return $filters->apply($query);
    }
}
