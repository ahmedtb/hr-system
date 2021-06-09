<?php

namespace Tests\Feature\API;

use App\FieldsTypes\ArrayOfFields;
use Tests\TestCase;
use App\Models\Form;
use App\Models\FormStructure;
use App\Models\Utilities\FormAccessToken;
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
                    ->where('array_of_fields', $formStructure->array_of_fields->jsonSerialize())
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

        $array_of_fieldsInstance = ArrayOfFields::fromArray($formStructure['array_of_fields']);
        $this->assertNull(Form::first());

        // submit the form with the fields being objects
        $response = $this->postJson('api/submitForm', [
            'access_token' => $access_token,
            'fields' => $array_of_fieldsInstance,
        ])->assertOk()->assertJson(['success' => 'form successfully disposed']);

        // make sure form is disposed in the managment... and the access toke is deleted so no more submitions allowed
        $this->assertNotNull(Form::first());
        $filled_fieldsIsnstance = ArrayOfFields::fromArray(Form::first()->filled_fields);
        $this->assertEquals(count($filled_fieldsIsnstance), count($array_of_fieldsInstance));
        $this->assertNull(FormAccessToken::first());
    }

    public function test_all_forms_for_specific_strucutre_id_could_be_fetched()
    {
        $formStructure = FormStructure::factory()->create();
        $forms = Form::factory(10)->forStructure($formStructure->id)->create();
        $this->getJson('api/getForms/' . $formStructure->id)->assertOk()->assertJsonCount(10);
    }

    public function test_form_structure_could_be_created()
    {
        
    }

    public function test_form_structure_could_be_edited()
    {
        $formStructure = FormStructure::factory()->create();
        
    }
}
