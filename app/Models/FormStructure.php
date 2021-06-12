<?php

namespace App\Models;

use App\Casts\Json;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class FormStructure extends Model
{
    use HasFactory;

    protected $casts = [
        'array_of_fields' => Json::class
    ];

    public function formable(){
        return $this->morphTo();
    }
}
