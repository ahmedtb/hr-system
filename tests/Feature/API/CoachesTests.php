<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Coach;
use App\Models\Employee;
use App\Models\TargetedIndividual;
use App\Models\TrainingProgram;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CoachesTests extends TestCase
{
    use RefreshDatabase;

    public function test_coaches_can_be_created_and_linked_to_employee_or_targeted()
    {
        $coach = Coach::factory()->make();
        $response = $this->postJson('api/coach', [
            'CV' => $coach->CV,
            'speciality' => $coach->speciality
        ])->assertOk();

        $this->assertEquals(Coach::all()->count(), 1);

        $employee = Employee::factory()->create();
        $response = $this->postJson('api/coach', [
            'CV' => $coach->CV,
            'speciality' => $coach->speciality,
            'employee_id' => $employee->id
        ])->assertOk();

        $this->assertEquals(Coach::all()->count(), 2);
        $this->assertEquals(Coach::all()[1]->profile_type, Employee::class);

        $targeted = TargetedIndividual::factory()->create();
        $response = $this->postJson('api/coach', [
            'CV' => $coach->CV,
            'speciality' => $coach->speciality,
            'targeted_individual_id' => $targeted->id
        ])->assertOk();

        $this->assertEquals(Coach::all()->count(), 3);
        $this->assertEquals(Coach::all()[2]->profile_type, TargetedIndividual::class);
    }


    public function test_system_can_get_coaches_programs()
    {
        ;
        $coach = Coach::factory()->create();
        $coach->trainingPrograms()->saveMany(TrainingProgram::factory(5)->create());
        $response = $this->getJson('api/coach/'.$coach->id . '/programs');
        // dd($response->json());
        $response->assertOk();
        $response->assertJsonCount(5);
    }
}
