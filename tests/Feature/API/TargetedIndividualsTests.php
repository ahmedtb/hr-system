<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use Illuminate\Support\Str;
use Illuminate\Http\Testing\File;
use App\Models\TargetedIndividual;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

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
        $targeted = TargetedIndividual::factory()->make();
        $response = $this->postJson('/api/targeted/create', [
            'name' => $targeted->name,
            'address' => $targeted->address,
            'phone_number' => $targeted->phone_number,
            'email' => $targeted->email,
            'description' => $targeted->description,
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);
        // dd($response->json());
        $response->assertOk();
        $response->assertJson(['success' => 'targeted individual created']);
    }


    public function test_employee_could_have_an_optional_profile_picture()
    {
        $targeted = TargetedIndividual::factory()->make();

        Storage::fake('public');

        $profile = File::image('icon.png', 400, 100);

        $response = $this->postJson('/api/targeted/create', [
            'name' => $targeted->name,
            'address' => $targeted->address,
            'phone_number' => $targeted->phone_number,
            'email' => $targeted->email,
            'description' => $targeted->description,
            'profile' => $profile,
            'password' => 'password',
            'password_confirmation' => 'password'
        ]);
        $response->assertOk();
        $response->assertJson(['success' => 'targeted individual created']);

        $targeted = TargetedIndividual::first();
        $this->assertTrue(base64_encode(base64_decode($targeted->profile)) === $targeted->profile);
    }
}
