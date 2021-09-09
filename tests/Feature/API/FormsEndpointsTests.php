<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Form;
use App\Models\Admin;
use App\Models\FormStructure;
use App\FieldsTypes\GenderField;
use App\FieldsTypes\StringField;
use App\FieldsTypes\TableField2;
use App\FieldsTypes\ArrayOfFields;
use App\Models\Utilities\FormAccessToken;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FormsEndpointsTests extends TestCase
{
    use RefreshDatabase;


    protected function setUp(): void
    {
        parent::setUp();
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');
    }

    public function test_job_application_forms_could_be_generated_as_a_links_with_tokens()
    {

        $formStructure = FormStructure::factory()->create();
        $response = $this->postJson('api/generateForm', [
            'form_structure_id' => $formStructure->id,
        ]);
        // dd($response->content());
        $response->assertOk();
        $formAccessToken = $response->content();

        $response = $this->getJson('/api/getGeneratedForm/' . $formAccessToken);
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

    public function test_form_can_be_submited_with_valid_token()
    {
        // $this->withoutExceptionHandling();
        // generate form and return it is url....admin rule
        $response = $this->postJson('api/generateForm', [
            'form_structure_id' => FormStructure::factory()->create()->id,
            'copies' => 1
        ]);

        $access_token = $response->content();
        // use the url to get the form....user accessable link
        $formStructure = $this->getJson('/api/getGeneratedForm/' . $access_token)->json();

        $array_of_fieldsInstance = ArrayOfFields::fromArray($formStructure['array_of_fields']);
        $this->assertNull(Form::first());
        $array_of_fieldsInstance->generateMockedValues();
        // submit the form with the fields being objects
        $response = $this->postJson('api/submitForm', [
            'access_token' => $access_token,
            'fields' => $array_of_fieldsInstance,
        ])->assertOk()->assertJson(['success' => 'form successfully disposed']);
        // dd($response->json());
        // make sure form is disposed in the management... and the access toke is deleted so no more submitions allowed
        $this->assertNotNull(Form::first());
        $filled_fieldsIsnstance = (Form::first()->filled_fields);
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

        $response = $this->postJson('api/structure/create', [
            'type' => 'aaaaa',
            'array_of_fields' => []
        ]);
        $response->assertJsonValidationErrors('array_of_fields');

        $formStructure = FormStructure::factory()->make();

        $response = $this->postJson('api/structure/create', [
            'type' => $formStructure->type,
            'array_of_fields' => $formStructure->array_of_fields
        ]);

        $response->assertOk()->assertJson(['success' => 'form structure created']);
    }

    public function test_form_structure_could_be_edited()
    {
        $formStructure = FormStructure::factory()->create();
    }

    // please implement this testing using a testing database and commenting DB_CONNECTION, DB_DATABASE in phpunit.xml
    public function test_form_can_be_searched_through_its_fields()
    {
        $searchFields = new ArrayOfFields(array(
            new StringField('label'),
            new StringField('label'),
            new TableField2(
                'label',
                array(
                    'col1',
                    'col1',
                    'col3',
                    'col5',
                    'col1'
                ),
                5
            )
        ));
        $searchFields->generateMockedValues();
        $structure = FormStructure::factory()->create([
            'array_of_fields' => $searchFields
        ]);
        Form::factory()->create([
            'form_structure_id' => $structure->id,
            'filled_fields' => $searchFields
        ]);
        Form::factory(10)->create([
            'form_structure_id' => $structure->id,
        ]);

        $response = $this->postJson('api/form/search/' . $structure->id, [
            'fields' => $searchFields
        ]);
        // dd($response->json());
        $response->assertJsonCount(1);

        $response = $this->postJson('api/form/search/' . $structure->id, [
            'fields' => (new ArrayOfFields())->setField($searchFields->getField(0))
        ]);
        // dd($response->json());

        $response->assertJsonCount(1);

        $response = $this->postJson('api/form/search/' . $structure->id, [
            'fields' => (new ArrayOfFields())->setField($searchFields->getField(1))
        ]);
        // dd($response->json());
        $response->assertJsonCount(1);

        $response = $this->postJson('api/form/search/' . $structure->id, [
            'fields' => (new ArrayOfFields())->setField($searchFields->getField(2))
        ]);
        $response->assertJsonCount(1);

        $this->postJson('api/form/search/111', [
            'fields' => (new ArrayOfFields())->setField($searchFields->getField(0))
        ])->assertStatus(422);

        $response = $this->postJson('api/form/search/' . $structure->id, [
            'fields' => (new ArrayOfFields())->setField(new GenderField('label'))
        ]);
        $response->assertJsonCount(0);

    }
}
