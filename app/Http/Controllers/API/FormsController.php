<?php

namespace App\Http\Controllers\API;

use App\Models\Form;
use App\Models\Employee;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\FormStructure;
use App\Http\Controllers\Controller;
use App\Models\Utilities\FormAccessToken;
use Dotenv\Exception\ValidationException;
use Symfony\Component\HttpKernel\Event\RequestEvent;

class FormsController extends Controller
{
    public function getEmployementForm(Request $request, $access_token)
    {
        $formAccessToken = FormAccessToken::where('access_token', $access_token)->first();
        if ($formAccessToken) {
            $form_structure = FormStructure::where('id', $formAccessToken->form_structure_id)->first();
            return ($form_structure);
        } else {
            throw new ValidationException('access token is not valid');
        }
    }

    public function generateForm(Request $request)
    {
        $request->validate([
            'form_structure_id' => 'required|exists:form_structures,id'
        ]);
        $formAccessToken = FormAccessToken::create([
            'form_structure_id' => $request->form_structure_id,
            'access_token' => Str::random(10)
        ]);
        // dd($formAccessToken);
        return 'api/employementFormOffer/' . $formAccessToken->access_token;
    }

    public function submitForm(Request $request)
    {
        $request->validate([
            'access_token' => 'required|exists:form_access_tokens,access_token'
        ]);
        $formAccessToken = FormAccessToken::where('access_token', $request->access_token)->first();

        $fieldObjects = [];
        foreach ($request->fields as $field) {
            $fieldObject = $field['class']::fromArray($field);

            // $fieldObject = new $fieldData['class']($fieldData['label'], $fieldData['subLabel'], $fieldData['value']);
            array_push($fieldObjects, $fieldObject);
        }

        $form = Form::create([
            'form_structure_id' => $formAccessToken->form_structure_id,
            'filled_fields' => $fieldObjects
        ]);

        $formAccessToken->delete();

        return response(['success' => 'form successfully disposed']);
    }

}
