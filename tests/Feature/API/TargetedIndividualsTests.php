<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Admin;
use Illuminate\Support\Str;
use Illuminate\Http\Testing\File;
use App\Models\TargetedIndividual;
use Illuminate\Support\Facades\Storage;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TargetedIndividualsTests extends TestCase
{
    use RefreshDatabase;

    
    protected function setUp(): void
    {
        parent::setUp();
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');
    }
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

        $profile_image = File::image('icon.png', 400, 100);

        $response = $this->postJson('/api/targeted/create', [
            'name' => $targeted->name,
            'address' => $targeted->address,
            'phone_number' => $targeted->phone_number,
            'email' => $targeted->email,
            'description' => $targeted->description,
            'profile_image' => $profile_image,
            // 'password' => 'password',
            // 'password_confirmation' => 'password'
        ]);
        // dd($response->json());

        $response->assertOk();
        $response->assertJson(['success' => 'targeted individual created']);

        $targeted = TargetedIndividual::first();
        $this->assertTrue(base64_encode(base64_decode($targeted->profile_image)) === $targeted->profile_image);
    }

    public function test_individual_name_username_email_should_be_unique()
    {
        $targeted = TargetedIndividual::factory()->make();
        $response = $this->postJson('/api/targeted/create', [
            'name' => 'name',
            'address' => $targeted->address,
            'phone_number' => $targeted->phone_number,
            'email' => 'email@email.com',
            'description' => $targeted->description,
        ]);
        $response->assertOk();
        $response->assertJson(['success' => 'targeted individual created']);

        $response = $this->postJson('/api/targeted/create', [
            'name' => 'name',
            'address' => $targeted->address,
            'phone_number' => $targeted->phone_number,
            'email' => 'email@email.com',
            'description' => $targeted->description,
        ]);
        // dd($response->json());

        // $response->assertOk();
        $response->assertJsonValidationErrors(['name','email','phone_number']);

        $response->assertStatus(422);
        $this->assertEquals(TargetedIndividual::all()->count(), 1);
    }
}
