<?php

namespace App\Http\Controllers\API;

use App\Models\Document;
use App\Models\Employee;
use Illuminate\Http\Request;
use App\Models\TrainingProgram;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;

class ProgramsController extends Controller
{
    public function create(Request $request)
    {
        // return $request->all();
        $validated = $request->validate([
            'title' => 'required|string',
            'goals' => 'required|string',
            'category' => 'required|string',
            'period' => 'required|integer',
            'details' => 'required|string',
            'documents.*' => 'sometimes|image|mimes:jpg,jpeg,png,bmp,tiff |max:1024',
        ]);


        DB::transaction(function ()  use ($request) {
            $employee = TrainingProgram::create([
                'title' => $request->title,
                'goals' => $request->goals,
                'category' => $request->category,
                'period' => $request->period,
                'details' => $request->details,
            ]);

            if ($request->documents) {
                foreach ($request->file('documents') as $document) {
                    $image = base64_encode(file_get_contents($document->path()));
                    Document::create([
                        'name' => $document->getClientOriginalName(),
                        'image' => $image,
                        'documentable_id' => $employee->id,
                        'documentable_type' => TrainingProgram::class
                    ]);
                }
            }
        });
        if ($request->documents) {
            return response(['success' => 'program created with documents']);
        } else {
            return response(['success' => 'program created']);
        }
    }
}
