<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Unit;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class UnitsTest extends TestCase
{
    use RefreshDatabase;

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

    public function test_unit_can_be_created()
    {
        $this->withoutExceptionHandling();
        $unit = Unit::factory()->withParent()->make();
        $response = $this->postJson('api/unit',[
            'parent_id' => $unit->parent_id,
            'name' => $unit->name,
            'head_id' => $unit->head_id,
            'purpose' => $unit->purpose
        ])->assertOk();
    }

    public function test_system_has_unit_index_endpoint()
    {
        Unit::factory(10)->withParent()->make();
        $response = $this->getJson('api/unit/index');
        $response->assertOk();
        $response->assertJsonCount(10);

    }

}
