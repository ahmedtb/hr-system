<?php

namespace App\Filters;

class DocumentFilters extends Filters
{
    /**
     * Registered filters to operate upon.
     *
     * @var array
     */
    protected $filters = [
        'documentable_id',
        'documentable_type'
    ];

    protected function documentable_id($id)
    {
        return $this->builder->where('documentable_id', $id);
    }

    protected function documentable_type($type)
    {
        return $this->builder->where('documentable_type', $type);
    }
}
