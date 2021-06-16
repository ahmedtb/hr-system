<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Support\Str;
use Facade\FlareClient\View;
use Illuminate\Http\Request;
use App\Models\FormStructure;
use App\Rules\ArrayOfFieldsRule;
use App\FieldsTypes\ArrayOfFields;
use App\Models\Utilities\FormAccessToken;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class FormsController extends Controller
{
    //

    public function index(Request $request)
    {
        $structures = FormStructure::all();
        return View('form.index', ['structures' => $structures]);
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

    public function submitForm(Request $request)
    {
        dd($request->fields);
        $request->validate([
            'access_token' => 'required|exists:form_access_tokens,access_token',
            'fields' => [new ArrayOfFieldsRule()]
        ]);
        $formAccessToken = FormAccessToken::where('access_token', $request->access_token)->first();
        $ArrayInstance = ArrayOfFields::fromArray($request->fields);

        $form = Form::create([
            'form_structure_id' => $formAccessToken->form_structure_id,
            'filled_fields' => $ArrayInstance
        ]);

        $formAccessToken->delete();

        return response(['success' => 'form successfully disposed']);
    }
}
