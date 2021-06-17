<?php

namespace App\Models;

use App\Casts\ArrayOfFields as CastsArrayOfFields;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Form extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'filled_fields' => CastsArrayOfFields::class
    ];
    
    public function structure(){
        return $this->belongsTo(FormStructure::class,'form_structure_id','id');
    }

    // public function scopeGood($query)
    // {
    //     return $query->whereHas('filled_fields->fields');
    // }
}
