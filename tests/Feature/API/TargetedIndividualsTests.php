<?php

namespace Tests\Feature\API;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TargetedIndividualsTests extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_system_can_create_targeted_individuals()
    {
        $response = $this->postJson('/api/targeted/create');
        // dd($response->json());
        $response->assertOk();
        $response->assertJson(['success' => 'targeted individual created']);
    }
}
