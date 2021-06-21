<?php

namespace App\Models;

use App\Casts\ArrayOfFields as CastsArrayOfFields;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FormStructure extends Model
{
    use HasFactory;

    protected $casts = [
        'array_of_fields' => CastsArrayOfFields::class
    ];

    protected $guarded = [];

    public function formable(){
        return $this->morphTo();
    }

    public function forms(){
        return $this->hasMany(Form::class);
    }

}
