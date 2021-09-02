<?php

namespace App\Http\Controllers\API;

use App\Models\Document;
use Illuminate\Http\Request;
use App\Models\TrainingProgram;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Filters\TrainingProgramFilters;

class ProgramsController extends Controller
{
    public function show($id)
    {
        return TrainingProgram::where('id', $id)->first();
    }

    public function index(TrainingProgramFilters $filters, Request $request)
    {
        return $request->user()->trainingPrograms()->filter($filters)
            ->paginate($request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    public function create(Request $request)
    {
        // return $request->all();
        $validated = $request->validate([
            'title' => 'required|string|unique:training_programs,title',
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
                        'content' => $image,
                        'type' => 'png',
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

    public function getPrograms(Request $request)
    {
        return TrainingProgram::select(['id', 'title', 'category'])->get();
    }


    public function delete($id)
    {
        TrainingProgram::where('id', $id)->first()->delete();

        return response()->json(['success' => 'training program ' . $id . ' deleted'], 202);
    }


    public function edit(Request $request, $id)
    {
        // return $id;
        // return $request->all();
        $validated = $request->validate([
            // 'id' => 'required|exists:training_programs,id',
            'title' => ['sometimes', 'string', Rule::unique('training_programs')->ignore($id)],
            'goals' => 'sometimes|string',
            'category' => 'sometimes|string',
            'period' => 'sometimes|integer',
            'details' => 'sometimes|string',
        ]);

        $program = TrainingProgram::where('id', $id)->first();
        if ($program) {
            $program->update($validated);

            return response()->json(['success' => 'program ' . $request->id . ' edited']);
        } else
            return response()->json(['failure' => 'program ' . $request->id . ' does not exists']);
    }
}
