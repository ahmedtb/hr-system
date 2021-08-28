<?php

namespace App\Models;

use App\Filters\CommentFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;


    public function scopeFilter($query, CommentFilters $filters)
    {
        return $filters->apply($query);
    }

    public function commentable()
    {
        return $this->morphTo();
    }
    
    public function commenter()
    {
        return $this->morphTo();
    }
}
