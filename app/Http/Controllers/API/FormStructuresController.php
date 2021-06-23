<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\FormStructure;
use App\Rules\ArrayOfFieldsRule;
use Illuminate\Http\Request;

class FormStructuresController extends Controller
{
    public function create(Request $request)
    {
        $validatedData = $request->validate([
            'type' => 'required|string',
            'array_of_fields' => [new ArrayOfFieldsRule()]
        ]);

        FormStructure::create($validatedData);

        return response(['success' => 'form structure created']);
    }
    public function createForm()
    {
        return FormStructure::all();
    }
    public function index()
    {
        return FormStructure::all();
    }

    public function show($id)
    {
        return FormStructure::where('id',$id)->first();
    }
}
