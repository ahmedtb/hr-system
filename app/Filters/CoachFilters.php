<?php

namespace App\Filters;

class CoachFilters extends Filters
{

    protected $filters = [
        'speciality',
        'CV',
        'name'
    ];

    protected function speciality($speciality)
    {
        return $this->builder->where('speciality', 'LIKE', "%{$speciality}%");
    }

    protected function CV($CV)
    {
        return $this->builder->where('CV', 'LIKE', "%{$CV}%");
    }

    protected function name($name)
    {
        return $this->builder->whereHas('profile', function ($query) use ($name) {
            return $query->where('name', 'LIKE', "%{$name}%");
        });
    }
}
