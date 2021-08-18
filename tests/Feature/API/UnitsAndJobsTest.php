<?php

namespace Tests\Feature\API;

use App\Models\Employee;
use App\Models\FormStructure;
use App\Models\Job;
use Tests\TestCase;
use App\Models\Unit;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UnitsAndJobsTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_the_management_units_tree_can_be_retrived()
    {
        // create random children structure
        $parent = Unit::factory()->withoutParent()->create();
        $children1 = Unit::factory(5)->create(['parent_id'=>$parent->id]);
        $children2 = Unit::factory(5)->create(['parent_id'=>$children1[0]->id]);
        Unit::factory(5)->create(['parent_id'=>$children2[4]->id]);

        $json = $this->getJson('api/unitsTree')->json();
        // dd($json);
        // assert that the array structure returned matches created database
        $this->assertIsArray($json);
        $this->assertEquals(1,count($json));
        $this->assertEquals(5,sizeof($json[0]['children']));
        $this->assertEquals(5,sizeof($json[0]['children'][0]['children']));
        $this->assertEquals(5,sizeof($json[0]['children'][0]['children'][4]['children']));
    }

    public function test_jobs_can_be_created()
    {
        $job = Job::factory()->make();
        $response = $this->postJson('api/job/create',[
            'unit_id' => $job->unit_id,
            'name' => $job->name,
            'purpose' => $job->purpose,
            'description' => $job->description
        ])->assertOk();
        // dd($response->json());
    }

    public function test_unit_can_be_created()
    {
        // $this->withoutExceptionHandling();
        $unit = Unit::factory()->withParent()->withHead()->make();
        // dd($unit);
        $response = $this->postJson('api/unit/create',[
            'parent_id' => $unit->parent_id,
            'name' => $unit->name,
            'head_id' => $unit->head_id,
            'purpose' => $unit->purpose
        ])->assertOk();
        // dd($response->json());
    }



}
