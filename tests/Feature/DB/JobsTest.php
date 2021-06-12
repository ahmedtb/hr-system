<?php

namespace Tests\Feature\DB;

use App\Models\Job;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class JobsTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_jobs_has_a_name_a_purpose_and_a_description()
    {
        $job = Job::factory()->create();
        $this->assertNotEmpty($job->name);
        $this->assertNotNull($job->purpose);
        $this->assertNotEmpty($job->description);


    }
}
