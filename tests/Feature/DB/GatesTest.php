<?php

namespace Tests\Feature\DB;

use Tests\TestCase;
use App\Models\Unit;
use App\Models\Admin;
use App\Models\Coach;
use App\Models\Comment;
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
        Unit::factory()->create();
        $this->assertFalse(Gate::allows('access', Unit::class));

        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');
        $this->assertTrue(Gate::allows('access', Unit::class));
    }

    public function test_admin_can_access_all_comments()
    {
        Comment::factory(50)->create();
        $this->actingAs(Admin::factory()->create(), 'admin');
        $this->assertTrue(Gate::allows('AccessCommentableComments', [Comment::class, TrainingCourse::first()]));
        $this->assertTrue(Gate::allows('AccessCommentableComments', [Comment::class, TrainingProgram::first()]));
        $this->assertTrue(Gate::allows('AccessCommentableComments', [Comment::class, Employee::first()]));
        $this->assertTrue(Gate::allows('AccessCommentableComments', [Comment::class, TargetedIndividual::first()]));
    }

    public function test_coach_can_access_only_his_courses_and_programs()
    {
        $coach = Coach::factory()->create();
        $this->actingAs($coach, 'admin');

        Comment::factory(50)->create();
        $course = TrainingCourse::first();
        $course->attachCoach($coach);

        $program = TrainingProgram::first();
        $coach->trainingPrograms()->save($program);

        $this->assertTrue(Gate::allows('AccessCommentableComments', [Comment::class, $course]));
        $this->assertTrue(Gate::allows('AccessCommentableComments', [Comment::class, $program]));
        $this->assertFalse(Gate::allows('AccessCommentableComments', [Comment::class, Employee::first()]));
        $this->assertFalse(Gate::allows('AccessCommentableComments', [Comment::class, TargetedIndividual::first()]));
    }
}
