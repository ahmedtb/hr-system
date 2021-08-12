<?php

namespace App\Filters;

class EmployeeFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'job_id',
        'unit_id',
        'name',
        'phone_number',
        'orderByDesc',
        'orderByAsc',
        'employment_date',
        'email',
        'address',

    ];

    protected function job_id($id)
    {
        return $this->builder->where('job_id', $id);
    }

    protected function unit_id($id)
    {
        return $this->builder->whereHas('job', function ($query) use ($id) {
            $query->where('unit_id', $id);
        });
    }

    protected function name($name)
    {
        return $this->builder->where('name', 'LIKE', "%{$name}%");
    }

    protected function phone_number($phone_number)
    {
        return $this->builder->where('phone_number', 'LIKE', "%{$phone_number}%");
    }

    protected function orderByDesc($trait)
    {
        return $this->builder->orderBy($trait, 'DESC');
    }

    protected function orderByAsc($trait)
    {
        return $this->builder->orderBy($trait, 'ASC');
    }

    protected function employment_date($date)
    {
        return $this->builder->where('employment_date', $date);
    }

    protected function email($email)
    {
        return $this->builder->where('email', 'LIKE', "%{$email}%");
    }

    protected function address($address)
    {
        return $this->builder->where('address', 'LIKE', "%{$address}%");
    }
}
