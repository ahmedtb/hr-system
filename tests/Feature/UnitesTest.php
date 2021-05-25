<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Unit;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

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
}
