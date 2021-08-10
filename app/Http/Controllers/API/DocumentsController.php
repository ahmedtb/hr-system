<?php

namespace App\Http\Controllers\API;

use App\Models\Document;
use Illuminate\Http\Request;
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

    public function create(Request $request)
    {
        return null;
    }
}
