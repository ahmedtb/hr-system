<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Form;
use Illuminate\Support\Str;
use App\FieldsTypes\JobField;
use App\Models\FormStructure;
use App\FieldsTypes\DateField;
use App\FieldsTypes\EmailField;
use App\FieldsTypes\DoubleField;
use App\FieldsTypes\RatingField;
use App\FieldsTypes\StringField;
use Illuminate\Support\Facades\Date;
use App\FieldsTypes\PhoneNumberField;
use App\Models\Employee;
use Faker\Provider\bg_BG\PhoneNumber;
use App\Models\Utilities\FormAccessToken;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Foundation\Testing\RefreshDatabase;

class FormsTests extends TestCase
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
            $fieldInstance = new $field(Str::random(5), Str::random(5), Str::random(5));
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

    public function test_submitted_employement_form_can_be_used_to_create_targeted_trainee_or_employee()
    {
        // 'name' => 'required|string',
        // 'address' => 'required|string',
        // 'employment_date' => 'required|date',
        // 'basic_salary' => 'required|regex:/^[0-9]+(\.[0-9][0-9]?)?$/',
        // 'phone_number' => 'required|string',
        // 'job_id' => 'required|exists:jobs,id',
        // 'email' => 'required|email',
        // 'medal_rating' => 'required|string'
        $fields = array(
            StringField::class, StringField::class, DateField::class, DoubleField::class,
            PhoneNumberField::class, JobField::class, EmailField::class, RatingField::class
        );
        $formStructure = FormStructure::factory()->create([
            'fields' => $fields
        ]);

        $form = Form::factory()->forStructure($formStructure->id)->create();

        $this->assertEmpty(Employee::first());
        $response = $this->postJson('api/employementApproval', ['form_id' => $form->id])->assertOk();
        $this->assertNotNull(Employee::first());

    }
}
