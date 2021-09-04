<?php

namespace App\Models;

use App\Filters\DocumentFilters;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Document extends Model
{
    use HasFactory;

    protected $guarded = [];

    // protected $hidden = [
    //     'content'
    // ];
    
    public function documentable()
    {
        return $this->morphTo();
    }
    public function scopeFilter($query, DocumentFilters $filters)
    {
        return $filters->apply($query);
    }
}
