<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Coach;
use App\Models\Employee;
use App\Models\TrainingCourse;
use App\Models\TrainingProgram;
use App\Models\TargetedIndividual;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CoachesTest extends TestCase
{
    use RefreshDatabase;

    public function test_coaches_has_a_speciality_a_CV()
    {
        $coach = Coach::factory()->create();
        $this->assertNotEmpty($coach->speciality);
        $this->assertNotEmpty($coach->CV);       
    }

    public function test_coache_can_have_a_employee_profile_or_a_targeted_individual_profile()
    {
        $employee = Employee::factory()->create();
        $coach = Coach::factory()->create();
        $coach->profile()->save($employee);
        $this->assertEquals($coach->profile,$employee->coach);

        $targeted = TargetedIndividual::factory()->create();
        $coach = Coach::factory()->create();
        $coach->profile()->save($targeted);
        $this->assertEquals($coach->profile,$targeted->coach);
    }

    public function test_a_coach_can_have_many_programs_and_courses()
    {
        $coach = Coach::factory()->create();
        $trainingProgram1 = TrainingProgram::factory()->create();
        $trainingProgram2 = TrainingProgram::factory()->create();
        $coach->trainingPrograms()->save($trainingProgram1);
        $coach->trainingPrograms()->save($trainingProgram2);
        $this->assertEquals($coach->trainingPrograms()->get()->count(),2);

        $trainingCourse1 = TrainingCourse::factory()->create();
        $trainingCourse2 = TrainingCourse::factory()->create();
        $coach->trainingCourses()->save($trainingCourse1);
        $coach->trainingCourses()->save($trainingCourse2);
        $this->assertEquals($coach->trainingCourses()->get()->count(),2);        
    }


}
