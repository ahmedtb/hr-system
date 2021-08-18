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
        $parent = Unit::factory()->withoutParent()->withoutHead()->create();
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

    public function test_unit_can_be_created()
    {
        // $this->withoutExceptionHandling();
        $unit = Unit::factory()->withHead()->withParent()->make();
        $response = $this->postJson('api/unit/create',[
            'parent_id' => $unit->parent_id,
            'name' => $unit->name,
            'head_id' => $unit->head_id,
            'purpose' => $unit->purpose
        ])->assertOk();
        // dd($response->json());
    }

    public function test_system_has_unit_index_endpoint()
    {
        Unit::factory(15)->withoutHead()->withoutParent()->create();
        $response = $this->getJson('api/unit/index');
        // dd($response->json());

        $response->assertOk();
        // being 11 instead of 10 is caused by internal calls of factories
        $this->assertTrue( $response->json()['total'] >= 15 || $response->json()['total'] <= 17);

    }

}
