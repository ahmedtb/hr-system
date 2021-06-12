<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\TrainingProgram;
use Illuminate\Http\Request;

class ProgramsController extends Controller
{
    public function create(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'goals' => 'required|string',
            'category' => 'required|string',
            'period' => 'required|string',
            'details' => 'required|string',
        ]);

        TrainingProgram::create($validated);

        return response(['success'=>'program created']);
    }
}
