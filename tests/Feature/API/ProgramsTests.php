<?php

namespace Tests\Feature\API;

use App\Models\TrainingProgram;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProgramsTests extends TestCase
{
    use RefreshDatabase;
    public function test_program_create_endpoint()
    {
        $program = TrainingProgram::factory()->make();
        $response = $this->postJson('api/program',[
            'title' => $program->title,
            'goals' => $program->goals,
            'category' => $program->category,
            'period' => $program->period,
            'details' => $program->details,
        ]);
        // dd($response->json());
        $response->assertOk();
        $this->assertEquals(TrainingProgram::all()->count(),1);

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
        $this->assertEquals($response->json()['total'],10);
        // $response->assertJsonCount(10);
    }
}
