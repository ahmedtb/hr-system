<?php

namespace App\Filters;

class IndividualFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'name',
        'address',
        'phone_number',
        'email',
        'orderByDesc',
        'orderByAsc',
        'created_at',
        'profile_name',
    ];


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

    protected function created_at($date)
    {
        return $this->builder->whereDate('created_at', $date);
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
