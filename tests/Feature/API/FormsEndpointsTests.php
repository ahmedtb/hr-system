<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Form;
use App\Models\Employee;
use Illuminate\Support\Str;
use App\FieldsTypes\JobField;
use App\Models\FormStructure;
use App\FieldsTypes\DateField;
use App\FieldsTypes\EmailField;
use App\FieldsTypes\DoubleField;
use App\FieldsTypes\GenderField;
use App\FieldsTypes\OptionsField;
use App\FieldsTypes\RatingField;
use App\FieldsTypes\StringField;
use Illuminate\Support\Facades\Date;
use App\FieldsTypes\PhoneNumberField;
use App\FieldsTypes\SocialStatusField;
use App\FieldsTypes\TableField;
use App\FieldsTypes\TextAreaField;
use App\Models\Utilities\FormAccessToken;
use Faker\Provider\bg_BG\PhoneNumber;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FormsEndpointsTests extends TestCase
{
    use RefreshDatabase;
    public function test_job_application_forms_could_be_generated_as_a_links_with_tokens()
    {
        $formStructure = FormStructure::factory()->create();
        $response = $this->postJson('api/generateForm', [
            'form_structure_id' => $formStructure->id,
        ]);
        $response->assertOk();
        $formLink = $response->content();

        $response = $this->getJson($formLink);
        $response->assertOk();
        $response->assertJson(
            function (AssertableJson $json) use ($formStructure) {
                $json->where('id', $formStructure->id)
                    ->where('type', $formStructure->type)
                    ->where('fields', $formStructure->fields)
                    ->etc();
            }
        );
    }

    public function test_form_submited_with_token_is_validated()
    {
        $this->withoutExceptionHandling();
        // generate form and return it is url....admin rule
        $response = $this->postJson('api/generateForm', [
            'form_structure_id' => FormStructure::factory()->create()->id,
        ]);

        $access_token = explode('/', $response->content())[2];
        // use the url to get the form....user accessable link
        $formStructure = $this->getJson($response->content())->json();

        // set dumy data in the form fields...specifically in the values
        $fieldsObjects = [];
        foreach ($formStructure['fields'] as $field) {
            $fieldInstance = $field['class']::fromArray($field);
            array_push($fieldsObjects, $fieldInstance);
        }
        $this->assertNull(Form::first());

        // submit the form with the fields being objects
        $response = $this->postJson('api/submitForm', [
            'access_token' => $access_token,
            'fields' => $fieldsObjects,
        ])->assertOk()->assertJson(['success' => 'form successfully disposed']);

        // make sure form is disposed in the managment... and the access toke is deleted so no more submitions allowed
        $this->assertNotNull(Form::first());
        $this->assertEquals(count(Form::first()->filled_fields), count($fieldsObjects));
        $this->assertNull(FormAccessToken::first());
    }

    
}
