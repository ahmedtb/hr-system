<?php

namespace Tests\Feature;

use App\Models\Job;
use Tests\TestCase;
use App\Models\Unit;
use App\Models\Employee;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class UnitesTest extends TestCase
{
    use DatabaseMigrations;
    
    public function test_managment_unites_could_have_parent_unit()
    {
        // random units
        Unit::factory()->create();
        Unit::factory()->create();

        $parent = Unit::factory()->create();

        $child = Unit::factory()->create(['parent_id' => $parent->id]);
        $this->assertEquals($child->parent->id, $parent->id);
    }

    public function test_managment_unit_has_jobs_and_employees_belongs_to_these_jobs()
    {
        $unit = Unit::factory()->create();
        $job = Job::factory()->create(['unit_id'=> $unit->id]);
        $employee = Employee::factory()->create(['job_id' => $job->id]);

        $this->assertEquals($employee->job->id, $job->id);
        $this->assertEquals($job->unit->id, $unit->id);
    }
}
