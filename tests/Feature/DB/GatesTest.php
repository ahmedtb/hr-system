<?php

namespace Tests\Feature\DB;

use Tests\TestCase;
use App\Models\Unit;
use App\Models\Admin;
use App\Models\Coach;
use App\Models\Employee;
use App\Models\TrainingCourse;
use App\Models\TrainingProgram;
use App\Models\TargetedIndividual;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Testing\RefreshDatabase;

class GatesTest extends TestCase
{
    use RefreshDatabase;

    public function test_program_access_is_allowed_only_for_coach_creators()
    {
        $program = TrainingProgram::factory()->create();
        $coach = Coach::factory()->create();

        $program->coaches()->save($coach);

        $this->actingAs($coach, 'coach');
        $this->assertTrue(Gate::allows('accessProgram', $program));
    }

    public function test_program_access_is_allowed_for_coaches_of_program_courses()
    {
        $program = TrainingProgram::factory()->create();
        $course = TrainingCourse::factory()->create(['training_program_id' => $program->id]);

        $coach = Coach::factory()->create();

        $course->coaches()->save($coach);
        
        // coach logged in with coach model
        $this->actingAs($coach, 'coach');
        $this->assertTrue(Gate::allows('accessProgram', $program));

        // coach logged in as employee
        $employee = Employee::factory()->create();
        $coach->profile()->associate($employee)->save();

        $this->actingAs($employee, 'employee');
        $this->assertTrue(Gate::allows('accessProgram', $program));
    }
    public function test_program_access_is_allowed_for_trainees_of_program_courses()
    {
        $program = TrainingProgram::factory()->create();
        $course = TrainingCourse::factory()->create();
        $employee = Employee::factory()->create();
        $course->enrollEmployee($employee);
        $this->actingAs($employee, 'employee');
        $this->assertTrue(Gate::allows('accessProgram', $program));

        $individual = TargetedIndividual::factory()->create();
        $course->enrollindividual($individual);
        $this->actingAs($individual, 'individual');
        $this->assertTrue(Gate::allows('accessProgram', $program));
    }

    public function test_program_only_admins_can_reach_the_units()
    {
        $unit = Unit::factory()->create();
        $admin = Admin::factory()->create();
        $this->assertFalse(Gate::allows('access', Unit::class));

        $this->actingAs($admin, 'admin');
        $this->assertTrue(Gate::allows('access', Unit::class));
    }
}
