<?php

namespace App\Http\Controllers\API;

use App\Models\Job;
use App\Models\Unit;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ManagmentController extends Controller
{
    public function UnitsTree()
    {
        $top = Unit::whereNull('parent_id')->get();
        return $top;
    }

    public function CreateJob(Request $request)
    {
        $data = $request->validate([
            'unit_id' => 'required|exists:units,id',
            'name' => 'required|string',
            'purpose' => 'required|string',
            'description' => 'required|min:20|max:1000'
        ]);

        // dd($data);
        Job::create($data);

        return response(['success'=>'job created']);
    }
    public function CreateUnit(Request $request)
    {
        $data = $request->validate([
            'parent_id' => 'required|exists:units,id',
            'name' => 'required|string',
            'head_id' => 'required|exists:heads,id',
            'purpose' => 'required|min:20|max:1000'
        ]);

        // dd($data);
        Unit::create($data);

        return response(['success'=>'unit created']);
    }
}
