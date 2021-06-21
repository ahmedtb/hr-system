<?php

namespace App\Http\Controllers;

use App\Models\Document;
use Illuminate\Http\Request;
use App\Models\TrainingProgram;
use Illuminate\Support\Facades\DB;

class ProgramsController extends Controller
{
    public function createForm(Request $request)
    {
        return view('program.create');
    }

    public function create(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'goals' => 'required|string',
            'period' => 'required|integer',
            'category' => 'required|string',
            'details' => 'required|string',
            'documents.*' => 'sometimes|image|mimes:jpg,jpeg,png,bmp,tiff |max:1024',
        ]);

        DB::transaction(function ()  use ($request) {
            $TrainingProgram = TrainingProgram::create([
                'title' => $request->title,
                'goals' => $request->goals,
                'period' => $request->period,
                'category' => $request->category,
                'details' => $request->details,
            ]);

            if ($request->documents) {
                foreach ($request->file('documents') as $document) {
                    $image = base64_encode(file_get_contents($document->path()));
                    Document::create([
                        'name' => $document->getClientOriginalName(),
                        'image' => $image, //base64 image
                        'documentable_id' => $TrainingProgram->id,
                        'documentable_type' => TrainingProgram::class
                    ]);
                }
            }
        });

        if ($request->documents) {
            return redirect()->route('dashboard')->with('success', 'Training Program created with documents');
        } else {
            return redirect()->route('dashboard')->with('success', 'Training Program created');
        }
    }
}
