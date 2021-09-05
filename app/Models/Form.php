<?php

namespace App\Models;

use App\Casts\ArrayOfFields as CastsArrayOfFields;
use App\FieldsTypes\ArrayOfFields;
use App\FieldsTypes\TableField2;
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

    public function scopeSearch($query, ArrayOfFields $arrayOfFields){
        foreach($arrayOfFields->getFields() as $index => $field){
            $query->whereJsonContains('filled_fields->fields',$field->jsonSerialize());
        }

    }
}
