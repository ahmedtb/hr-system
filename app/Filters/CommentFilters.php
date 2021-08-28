<?php

namespace App\Filters;

use App\Models\Admin;
use App\Models\Supervisor;

class CommentFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'created_at',
        'admin_id',
        'supervisor_id',
    ];

    protected function created_at($date)
    {
        return $this->builder->whereDate('created_at', $date);
    }

    protected function admin_id($id)
    {
        return $this->builder->where('commenter_id', $id)->where('commenter_type', Admin::class);
    }
    
    protected function supervisor_id($id)
    {
        return $this->builder->where('commenter_id', $id)->where('commenter_type', Supervisor::class);
    }
}
