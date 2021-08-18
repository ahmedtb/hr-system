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
        $employee = Employee::factory()->create();
        $response = $this->postJson('api/coach', [
            'CV' => $coach->CV,
            'speciality' => $coach->speciality,
            'name' => $coach->speciality,
            'employee_id' => $employee->id
        ])->assertOk();

        $this->assertEquals(Coach::all()->count(), 1);
        $this->assertEquals(Coach::all()[0]->profile_type, Employee::class);

        $targeted = TargetedIndividual::factory()->create();
        $response = $this->postJson('api/coach', [
            'CV' => $coach->CV,
            'speciality' => $coach->speciality,
            'name' => $coach->speciality,
            'targeted_individual_id' => $targeted->id
        ])->assertOk();

        $this->assertEquals(Coach::all()->count(), 2);
        $this->assertEquals(Coach::all()[1]->profile_type, TargetedIndividual::class);
    }


    public function test_system_can_get_coaches_programs()
    {
        $coach = Coach::factory()->create();
        $coach->trainingPrograms()->saveMany(TrainingProgram::factory(5)->create());
        $response = $this->getJson('api/coach/'.$coach->id . '/programs');
        // dd($response->json());
        $response->assertOk();
        $response->assertJsonCount(5);
    }

    public function test_system_will_set_a_coach_guard_if_the_individual_or_employee_is_a_coach()
    {
        // based on that '/api/coachCourseAssessment/index' route is guarded with admin and coach guards

        // employee that is not a coach
        $employee = Employee::factory()->create();
        $this->actingAs($employee,'employee');
        $response = $this->getJson('/api/coachCourseAssessment/index');
        $response->assertUnauthorized();

        // individual that is not a coach
        $individual = TargetedIndividual::factory()->create();
        $this->actingAs($individual,'individual');
        $response = $this->getJson('/api/coachCourseAssessment/index');
        $response->assertUnauthorized();

        // employee that is a coach
        Coach::factory()->profile($employee)->create();
        $this->actingAs($employee->refresh(),'employee');
        $response = $this->getJson('/api/coachCourseAssessment/index');
        $response->assertOk();

        // individual that is a coach
        Coach::factory()->profile($individual)->create();
        $this->actingAs($individual->refresh(),'individual');
        $response = $this->getJson('/api/coachCourseAssessment/index');
        $response->assertOk();
    }
}
