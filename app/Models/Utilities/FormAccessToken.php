<?php

namespace App\Models\Utilities;

use App\Models\FormStructure;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FormAccessToken extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function structure(){
        return $this->belongsTo(FormStructure::class,'form_structure_id','id');
    }
}
