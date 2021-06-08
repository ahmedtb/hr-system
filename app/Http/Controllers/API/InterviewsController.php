<?php

namespace App\Http\Controllers\API;

use App\FieldsTypes\ArrayOfFields;
use App\Models\Form;
use Illuminate\Http\Request;
use App\Models\FormStructure;
use App\Http\Controllers\Controller;

class InterviewsController extends Controller
{
    public function getInterviewsAssessments(Request $request)
    {
        $structure = FormStructure::where('type', 'interview assessment')->first();
        return Form::where('form_structure_id', $structure->id)->get();
    }

    public function getGoodAssessments(Request $request)
    {
        $structure = FormStructure::where('type', 'interview assessment')->first();
        $forms = Form::where('form_structure_id', $structure->id)->get();

        $goodAssessment = [];
        foreach ($forms as $form) {
            $fieldsArrayInstance = ArrayOfFields::fromArray($form->filled_fields);
            if($fieldsArrayInstance->getFields()[0]->getRow(15) == ['','good','','','']){
                array_push($goodAssessment,$form);
            }
        }
        return $goodAssessment;
    }
}
