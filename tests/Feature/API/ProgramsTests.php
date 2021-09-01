<?php

namespace Tests\Feature\API;

use Tests\TestCase;
use App\Models\Admin;
use App\Models\TrainingProgram;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ProgramsTests extends TestCase
{
    use RefreshDatabase;


    protected function setUp(): void
    {
        parent::setUp();
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');
    }

    public function test_program_create_endpoint()
    {
        $program = TrainingProgram::factory()->make();
        $response = $this->postJson('api/program', [
            'title' => $program->title,
            'goals' => $program->goals,
            'category' => $program->category,
            'period' => $program->period,
            'details' => $program->details,
        ]);
        // dd($response->json());
        $response->assertOk();
        $this->assertEquals(TrainingProgram::all()->count(), 1);
    }

    public function test_programs_titles_should_be_unique()
    {
        $program = TrainingProgram::factory()->make();
        $response = $this->postJson('api/program', [
            'title' => 'title',
            'goals' => $program->goals,
            'category' => $program->category,
            'period' => $program->period,
            'details' => $program->details,
        ]);
        // dd($response->json());
        $response->assertOk();
        $this->assertEquals(TrainingProgram::all()->count(), 1);

        $program = TrainingProgram::factory()->make();
        $response = $this->postJson('api/program', [
            'title' => 'title',
            'goals' => $program->goals,
            'category' => $program->category,
            'period' => $program->period,
            'details' => $program->details,
        ]);
        dd($response->json());
        $response->assertStatus(422);
        $this->assertEquals(TrainingProgram::all()->count(), 1);
    }

    public function test_program_delete_endpoint()
    {
        $admin = Admin::factory()->create();
        $this->actingAs($admin, 'admin');
        $program = TrainingProgram::factory()->create();
        $response = $this->deleteJson('api/program/' . $program->id);
        dd($response->json());
        $response->assertOk();
        $this->assertEquals(TrainingProgram::all()->count(), 1);
    }

    public function test_doc_files_can_be_attached_to_the_program()
    {
    }

    public function test_program_index_endpoint()
    {
        TrainingProgram::factory(10)->create();
        $response = $this->getJson('/api/program/index');
        // dd($response->content());
        $response->assertOk();
        $this->assertEquals($response->json()['total'], 10);
        // $response->assertJsonCount(10);
    }
}
