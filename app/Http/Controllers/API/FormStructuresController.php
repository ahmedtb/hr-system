<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Models\FormStructure;
use App\Rules\ArrayOfFieldsRule;
use App\FieldsTypes\ArrayOfFields;
use App\Http\Controllers\Controller;

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
