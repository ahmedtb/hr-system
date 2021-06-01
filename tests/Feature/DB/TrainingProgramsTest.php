<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Document;
use App\Models\TrainingProgram;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TrainingProgramsTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_program_has_a_title_goals_category_period_details()
    {
        $trainingProgram = TrainingProgram::factory()->create();
        $this->assertNotEmpty($trainingProgram->title);
        $this->assertNotEmpty($trainingProgram->goals);
        $this->assertNotEmpty($trainingProgram->category);
        $this->assertNotEmpty($trainingProgram->period);
        $this->assertNotEmpty($trainingProgram->details);
    }

    public function test_program_could_have_multipe_documents()
    {
        $trainingProgram = TrainingProgram::factory()->has(Document::factory()->count(5))->create();

        $this->assertEquals($trainingProgram->documents()->count(),5);
    }

}
