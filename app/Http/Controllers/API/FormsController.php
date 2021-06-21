<?php

namespace App\Http\Controllers\API;

use App\Models\Form;
use App\Models\Employee;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\FormStructure;
use App\FieldsTypes\ArrayOfFields;
use App\Http\Controllers\Controller;
use App\Models\Utilities\FormAccessToken;
use App\Rules\ArrayOfFieldsRule;
use Dotenv\Exception\ValidationException;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Event\RequestEvent;

class FormsController extends Controller
{

    public function generateForm(Request $request)
    {
        $request->validate([
            'form_structure_id' => 'required|exists:form_structures,id'
        ]);
        $formAccessToken = FormAccessToken::create([
            'form_structure_id' => $request->form_structure_id,
            'access_token' => Str::random(10)
        ]);
        return 'api/getFormStructure/' . $formAccessToken->access_token;
    }

    public function getFormStructure(Request $request, $access_token)
    {
        $formAccessToken = FormAccessToken::where('access_token', $access_token)->first();
        if ($formAccessToken) {
            $form_structure = FormStructure::where('id', $formAccessToken->form_structure_id)->first();
            return ($form_structure);
        } else {
            throw new ValidationException('access token is not valid');
        }
    }

    public function submitForm(Request $request)
    {
        $request->validate([
            'access_token' => 'required|exists:form_access_tokens,access_token',
            'fields' => [new ArrayOfFieldsRule()]
        ]);
        $formAccessToken = FormAccessToken::where('access_token', $request->access_token)->first();
        $ArrayInstance = ArrayOfFields::fromArray($request->fields);

        // dd($ArrayInstance);

        $form = Form::create([
            'form_structure_id' => $formAccessToken->form_structure_id,
            'filled_fields' => $ArrayInstance
        ]);

        $formAccessToken->delete();

        return response(['success' => 'form successfully disposed']);
    }

    public function getForms(int $form_structure_id){
        return Form::where('form_structure_id',$form_structure_id)->get();
    }

    public function search(Request $request, int $form_structure_id)
    {
        Validator::make([
            'form_structure_id' => $form_structure_id,
            'fields' => $request->fields
        ],[
            'form_structure_id' => 'required|exists:form_structures,id',
            'fields' => [new ArrayOfFieldsRule()]
        ])->validated();
        $arrayOfFields = ArrayOfFields::fromArray($request->fields);
        // dd($arrayOfFields->getFields());

        $result = Form::whereJsonContains('filled_fields->fields',$arrayOfFields->getFields())->get();
        return ($result);

    }


}
