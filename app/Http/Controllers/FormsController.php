<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\FormStructure;
use App\Models\Utilities\FormAccessToken;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class FormsController extends Controller
{

    public function index(Request $request)
    {
        $forms = Form::all();
        return View('form.index', ['forms' => $forms]);
    }

    public function show(int $id)
    {
        Validator::make([
            'id' => $id
        ], [
            'id' => 'required|exists:forms,id'
        ])->validate();
        $form = Form::where('id', $id)->first();
        return View('form.show', ['form' => $form]);
    }

    public function generateForm(Request $request, $form_structure_id)
    {
        Validator::make([
            'form_structure_id' => $form_structure_id
        ], [
            'form_structure_id' => 'required|exists:form_structures,id'
        ])->validate();

        // dd($request->form_structure_id);
        $formAccessToken = FormAccessToken::create([
            'form_structure_id' => $form_structure_id,
            'access_token' => Str::random(10)
        ]);


        return redirect()->back()->with('tokenURL', route('getForm', ['access_token' => $formAccessToken->access_token]));
    }

    public function getForm(Request $request, $access_token)
    {
        $formAccessToken = FormAccessToken::where('access_token', $access_token)->first();
        if ($formAccessToken) {
            $form_structure = FormStructure::where('id', $formAccessToken->form_structure_id)->first();
            return View('form.create', ['structure' => $form_structure]);
        } else {
            throw new ValidationException('access token is not valid');
        }
    }

    public function submitForm(Request $request, string $access_token)
    {
        // dd($request->fields);
        Validator::make([
            'access_token' => $access_token
        ], [
            'access_token' => 'required|exists:form_access_tokens,access_token',
        ])->validate();

        $formAccessToken = FormAccessToken::where('access_token', $request->access_token)->first();
        foreach ($formAccessToken->structure->array_of_fields->getFields() as $index => $field) {
            $field->setValue($request->fields[$index]);
        }

        $form = Form::create([
            'form_structure_id' => $formAccessToken->form_structure_id,
            'filled_fields' => $formAccessToken->structure->array_of_fields
        ]);

        $formAccessToken->delete();

        $forms = Form::all();
        return View('form.index', ['forms' => $forms])->with('success', 'form successfully disposed');
    }

    public function searchForm(Request $request, int $structure_id)
    {
        $structure = FormStructure::where('id', $structure_id)->first();
        return view('form.search', compact('structure'));
    }

    public function search(Request $request, int $structure_id)
    {
        return $structure_id;
    }
}
