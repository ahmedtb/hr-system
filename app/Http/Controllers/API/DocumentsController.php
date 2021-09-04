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
        elseif ($documentable_type == 'App\\Models\\TrainingCourse')
            return 'training_courses';
        elseif ($documentable_type == 'App\\Models\\Employee')
            return 'employees';
        elseif ($documentable_type == 'App\\Models\\TargetedIndividual')
            return 'targeted_individuals';
    }
    public function create(Request $request)
    {
        // return ($request->all());
        $request->validate([
            'name' => 'required|string',
            'content' => 'required|file|mimes:docx,pdf,jpg,jpeg,png,bmp,tiff |max:10000',
            'documentable_type' => 'required|in:App\\Models\\TrainingProgram,App\\Models\\TrainingCourse,App\\Models\\Employee,App\\Models\\TargetedIndividual',
            'documentable_id' => ['required', Rule::exists($this->getDocumentableTable($request->documentable_type), 'id')],
            'type' => 'required|in:docx,jpg,jpeg,png,bmp,tiff,pdf'
        ]);

        $content = base64_encode(file_get_contents($request->file('content')->path()));

        Document::create([
            'name' => $request->name,
            'content' => $content,
            'type' => $request->type,
            'documentable_id' => $request->documentable_id,
            'documentable_type' => $request->documentable_type
        ]);
        return ['success' => 'document successfully attached'];
    }

    public function download($id)
    {
        $document = Document::where('id', $id)->first();
        if ($document) {
            $filename = $document->name . '.' . $document->type;
            $raw_image_string = base64_decode($document->content);
            if ($document->type == 'png')
                return response($raw_image_string)->header('Content-Type', 'image/png');
            if ($document->type == 'docx')
                return response($raw_image_string)->header('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
            if ($document->type == 'pdf')
                return response($raw_image_string)->header('Content-Type', 'application/pdf');
        }
    }
}
