<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\FormStructure;
use Illuminate\Support\Facades\Validator;

class FormStructuresController extends Controller
{
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
