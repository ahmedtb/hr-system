<?php

namespace App\Filters;

use App\Models\Admin;
use App\Models\Employee;
use App\Models\Supervisor;
use App\Models\TrainingCourse;
use App\Models\TrainingProgram;

class CommentFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'created_at',
        'admin_commenter_id',
        'supervisor_commenter_id',
        'course_id',
        'program_id',
        'employee_id',
        // 'individual_id',

    ];


    public function apply($builder)
    {
        $this->builder = $builder;
        foreach ($this->getFilters() as $filter => $value) {
            if (method_exists($this, $filter)) {
                $this->$filter($value);
            }
        }
        return $this->builder;
    }

    protected function created_at($date)
    {
        return $this->builder->whereDate('created_at', $date);
    }

    protected function admin_commenter_id($id)
    {
        return $this->builder->where('commenter_id', $id)->where('commenter_type', Admin::class);
    }

    protected function supervisor_commenter_id($id)
    {
        return $this->builder->where('commenter_id', $id)->where('commenter_type', Supervisor::class);
    }

    protected function course_id($id)
    {
        return $this->builder->where('commentable_id', $id)->where('commentable_type', TrainingCourse::class);
    }

    protected function program_id($id)
    {
        return $this->builder->where('commentable_id', $id)->where('commentable_type', TrainingProgram::class);
    }

    protected function employee_id($id)
    {
        return $this->builder->where('commentable_id', $id)->where('commentable_type', Employee::class);
    }
}
