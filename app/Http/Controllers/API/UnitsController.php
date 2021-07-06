<?php

namespace App\Http\Controllers\API;

use App\Models\Unit;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UnitsController extends Controller
{
    public function index()
    {
        return Unit::with('parent')->get();
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
}
