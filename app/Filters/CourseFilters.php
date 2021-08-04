<?php

namespace App\Filters;

class CourseFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'start_date',
        'end_date',
        'start_after',
        'end_before',
        'start_before',
        'end_after',
        'resumed',
        'planned',
        'done',
        'canceled',
        'employee_id',
        'individual_id',
        'training_program_id',
        'coach_id'
    ];

    protected function start_date($date)
    {
        return $this->builder->whereDate('start_date', $date);
    }

    protected function end_date($date)
    {
        return $this->builder->whereDate('end_date', $date);
    }

    protected function start_after($date)
    {
        return $this->builder->whereDate('start_date', '>=', $date);
    }

    protected function end_before($date)
    {
        return $this->builder->whereDate('end_date', '<=', $date);
    }

    protected function start_before($date)
    {
        return $this->builder->whereDate('start_date', '<=', $date);
    }

    protected function end_after($date)
    {
        return $this->builder->whereDate('end_date', '>=', $date);
    }

    protected function resumed()
    {
        return $this->builder->resumed();
    }

    protected function planned()
    {
        return $this->builder->planned();
    }

    protected function done()
    {
        return $this->builder->done();
    }

    protected function canceled()
    {
        return $this->builder->canceled();
    }

    protected function employee_id($id)
    {
        return $this->builder->whereHas('employees', function ($query) use ($id) {
            return $query->where('employees.id', $id);
        });
    }

    protected function individual_id($id)
    {
        return $this->builder->whereHas('targetedIndividuals', function ($query) use ($id) {
            return $query->where('targeted_individuals.id', $id);
        });
    }

    protected function training_program_id($id)
    {
        return $this->builder->where('training_program_id', $id);
    }

    protected function coach_id($id)
    {
        return $this->builder->whereHas('coaches', function ($query) use ($id) {
            return $query->where('coaches.id', $id);
        });
    }
}
