<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Trainee;
use App\Models\Document;
use App\Models\Employee;
use App\Models\TargetedIndividual;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TraineesTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_Traniees_table_store_name_phone_numbe_and_details_about_traninee()
    {
        $traniee = Trainee::factory()->create();
        $this->assertNotNull($traniee->name);
        $this->assertNotNull($traniee->phone_number);
        $this->assertNotNull($traniee->details);
    }

    public function test_trainee_could_have_multip_documents_attached_to_it()
    {
        $traniee = Trainee::factory()->has(Document::factory()->count(5))->create();
        $this->assertEquals($traniee->documents()->count(), 5);
    }

    public function test_coache_can_have_a_employee_profile_or_a_targeted_individual_profile()
    {
        $employee = Employee::factory()->create();
        $traniee = Trainee::factory()->create();
        $traniee->profile()->save($employee);
        $this->assertEquals($traniee->profile, $employee->traniee);

        $targeted = TargetedIndividual::factory()->create();
        $traniee = Trainee::factory()->create();
        $traniee->profile()->save($targeted);
        $this->assertEquals($traniee->profile, $targeted->traniee);
    }
}
