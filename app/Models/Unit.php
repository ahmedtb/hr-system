<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function getChildrenAttribute(){
        return $this->children()->get();
    }

    public function head()
    {
        return $this->belongsTo(Head::class);
    }

    public function jobs() {
        return $this->hasMany(Job::class);
    }

    public function employees() {
        return $this->hasManyThrough(Employee::class,Job::class);
    }


}
