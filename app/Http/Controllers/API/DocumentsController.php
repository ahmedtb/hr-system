<?php

namespace App\Http\Controllers\API;

use App\Models\Document;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use App\Filters\DocumentFilters;
use App\Http\Controllers\Controller;

class DocumentsController extends Controller
{
    public function index(DocumentFilters $filters, Request $request)
    {
        return Document::filter($filters)
            ->paginate($request->input('page_size') ?? 10)
            ->appends(request()->except('page'));
    }

    private function getDocumentableTable($documentable_type)
    {
        if ($documentable_type == 'App\\Models\\TrainingProgram')
            return 'training_programs';
        elseif ($documentable_type == 'App\\Models\\Employee')
            return 'employees';
        elseif ($documentable_type == 'App\\Models\\TargetedIndividual')
            return 'targeted_individuals';
    }
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'image' => 'required|image|mimes:jpg,jpeg,png,bmp,tiff |max:1024',
            'documentable_type' => 'required|in:App\\Models\\TrainingProgram,App\\Models\\Employee,App\\Models\\TargetedIndividual',
            'documentable_id' => ['required', Rule::exists($this->getDocumentableTable($request->documentable_type), 'id')],
        ]);


        // return $request->all();

        
        $image = base64_encode(file_get_contents($request->file('image')->path()));
        
        Document::create([
            'name' => $request->file('image')->getClientOriginalName(),
            'image' => $image,
            'documentable_id' => $request->documentable_id,
            'documentable_type' => $request->documentable_type
        ]);
        return ['success' => 'document successfully attached'];
    }
}
