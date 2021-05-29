<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Unit;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Testing\Fluent\AssertableJson;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RecruitmentTest extends TestCase
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
        $parent = Unit::factory()->create();
        $children1 = Unit::factory(5)->create(['parent_id'=>$parent->id]);
        $children2 = Unit::factory(5)->create(['parent_id'=>$children1[0]->id]);
        Unit::factory(5)->create(['parent_id'=>$children2[4]->id]);

        $json = $this->getJson('api/unitsTree')->json();
        // assert that the array structure returned matches created database
        $this->assertIsArray($json);
        $this->assertEquals(1,count($json));
        $this->assertEquals(5,sizeof($json[0]['children']));
        $this->assertEquals(5,sizeof($json[0]['children'][0]['children']));
        $this->assertEquals(5,sizeof($json[0]['children'][0]['children'][4]['children']));

    }
}
