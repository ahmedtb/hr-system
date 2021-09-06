<?php

namespace Tests\Feature\DB;

use Tests\TestCase;
use App\Models\Admin;
use App\Models\Coach;
use App\Models\Comment;
use App\Models\Employee;
use App\Models\Supervisor;
use App\Models\TrainingCourse;
use App\Models\TrainingProgram;
use App\Models\TargetedIndividual;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CommentsTest extends TestCase
{
    use RefreshDatabase;
    // developing comments system that can be attached to with timestamps with: employees, individuals
    // courses, programs....
    // creating, viewing, the comments will depends on the object attached to it.

    public function test_admins_can_comment_on_a_courses_programs_employees_and_indivituals()
    {
        $admin = Admin::factory()->create();
        
        $course = TrainingCourse::factory()->create();

        Comment::factory(2)->commenter($admin)->commentable($course)->create();
        $this->assertCount(2,$admin->myCommentsOnCourses);
        $this->assertCount(2,$course->comments);

        $program = TrainingProgram::factory()->create();
        Comment::factory(5)->commenter($admin)->commentable($program)->create();
        $this->assertCount(5,$admin->myCommentsOnPrograms);
        $this->assertCount(5,$program->comments);

        $employee = Employee::factory()->create();
        Comment::factory(7)->commenter($admin)->commentable($employee)->create();
        $this->assertCount(7,$admin->myCommentsOnEmployees);
        $this->assertCount(7,$employee->comments);

        $individual = TargetedIndividual::factory()->create();
        Comment::factory(9)->commenter($admin)->commentable($individual)->create();
        $this->assertCount(9,$admin->myCommentsOnIndividuals);
        $this->assertCount(9,$individual->comments);

        $this->assertCount(23,$admin->myComments);

    }

    public function test_supervisors_can_comment_on_a_courses_programs_employees_and_indivituals()
    {
        $supervisor = Supervisor::factory()->create();

        $course = TrainingCourse::factory()->create();

        Comment::factory(2)->commenter($supervisor)->commentable($course)->create();
        $this->assertCount(2,$supervisor->myCommentsOnCourses);
        $this->assertCount(2,$course->comments);

        $program = TrainingProgram::factory()->create();
        Comment::factory(5)->commenter($supervisor)->commentable($program)->create();
        $this->assertCount(5,$supervisor->myCommentsOnPrograms);
        $this->assertCount(5,$program->comments);

        $employee = Employee::factory()->create();
        Comment::factory(7)->commenter($supervisor)->commentable($employee)->create();
        $this->assertCount(7,$supervisor->myCommentsOnEmployees);
        $this->assertCount(7,$employee->comments);

        $individual = TargetedIndividual::factory()->create();
        Comment::factory(9)->commenter($supervisor)->commentable($individual)->create();
        $this->assertCount(9,$supervisor->myCommentsOnIndividuals);
        $this->assertCount(9,$individual->comments);

        $this->assertCount(23,$supervisor->myComments);

    }

    public function test_coaches_can_comment_on_a_courses_programs_employees_and_indivituals()
    {
        $coach = Coach::factory()->create();

        $course = TrainingCourse::factory()->create();

        Comment::factory(2)->commenter($coach)->commentable($course)->create();
        $this->assertCount(2,$coach->myCommentsOnCourses);
        $this->assertCount(2,$course->comments);

        $program = TrainingProgram::factory()->create();
        Comment::factory(5)->commenter($coach)->commentable($program)->create();
        $this->assertCount(5,$coach->myCommentsOnPrograms);
        $this->assertCount(5,$program->comments);

        $this->assertCount(7,$coach->myComments);
    }

}
