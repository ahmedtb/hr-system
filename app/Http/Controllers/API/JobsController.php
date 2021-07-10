<?php

namespace App\Http\Controllers\API;

use App\Models\Job;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class JobsController extends Controller
{

    public function create(Request $request)
    {
        $data = $request->validate([
            'unit_id' => 'required|exists:units,id',
            'name' => 'required|string',
            'purpose' => 'required|string',
            'description' => 'required|min:20|max:5000'
        ]);

        Job::create($data);

        return response(['success' => 'job created']);
    }

    public function show($id)
    {
        return Job::where('id', $id)->with('unit')->first();
    }

    public function index()
    {
        return Job::all();
    }
}