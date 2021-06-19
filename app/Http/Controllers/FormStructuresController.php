<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormStructure;
use App\Rules\ArrayOfFieldsRule;
use App\FieldsTypes\ArrayOfFields;
use Illuminate\Support\Facades\Validator;

class FormStructuresController extends Controller
{

    public function createForm()
    {
        return view('formstructure.create');
    }
    public function create(Request $request)
    {
        $arrayOfFields = ArrayOfFields::fromArray(['fields'=>$request->fields]);
        Validator::make([
            'type' => $request->type,
            'array_of_fields' => $arrayOfFields->jsonSerialize()
        ],[
            'type' => 'required|string',
            'array_of_fields' => [new ArrayOfFieldsRule()]
        ])->validate();
        FormStructure::create([
            'type' => $request->type,
            'array_of_fields' => $arrayOfFields
        ]);

        return redirect()->route('showFormsStructure')->with('success','new form structure created');
    }

    public function index(Request $request)
    {
        $structures = FormStructure::all();
        return View('formStructure.index', ['structures' => $structures]);
    }

    public function show(int $id)
    {
        Validator::make([
            'id' => $id
        ], [
            'id' => 'required|exists:form_structures,id'
        ])->validate();
        $structure = FormStructure::where('id', $id)->first();
        return View('formStructure.show', ['structure' => $structure]);
    }
}
