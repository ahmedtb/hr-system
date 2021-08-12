<?php

namespace App\Http\Controllers\API;

use App\Models\Unit;
use App\Filters\UnitFilters;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UnitsController extends Controller
{
    public function index(UnitFilters $filters, Request $request)
    {
        return Unit::filter($filters)
            ->with('parent')
            ->paginate($request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    public function show($id)
    {
        return Unit::where('id', $id)->with('parent')->first();
    }

    public function create(Request $request)
    {
        $data = $request->validate([
            'parent_id' => 'nullable|exists:units,id',
            'name' => 'required|string',
            'head_id' => 'required|exists:employees,id',
            'purpose' => 'required|min:20|max:1000'
        ]);

        Unit::create($data);

        return response(['success' => 'unit created']);
    }

    public function getUnits()
    {
        return Unit::all();
    }
}
