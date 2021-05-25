<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;
    public function parent() {
        return $this->belongsTo(Unit::class,'parent_id');
    }

    public function head()
    {
        $this->hasOne(Employee::class);
    }
}
