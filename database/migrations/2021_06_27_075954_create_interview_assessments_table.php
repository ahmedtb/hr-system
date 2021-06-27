<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInterviewAssessmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */

    // 'look' => $assessments[rand(0,3)],
    // 'self_introduction' => $assessments[rand(0,3)],
    // 'personality' => $assessments[rand(0,3)],
    // 'english' => $assessments[rand(0,3)],
    // 'culture' => $assessments[rand(0,3)],
    // 'arabic' => $assessments[rand(0,3)],
    // 'initiative' => $assessments[rand(0,3)],
    // 'sharing_skills' => $assessments[rand(0,3)],
    // 'comprehension' => $assessments[rand(0,3)],
    // 'decision_making' => $assessments[rand(0,3)],
    // 'compatibility_of_education' => $assessments[rand(0,3)],
    // 'compatibility_of_experiance' => $assessments[rand(0,3)],
    // 'compatibility_of_skills' => $assessments[rand(0,3)],
    // 'problem_solving_skills' => $assessments[rand(0,3)],
    // 'stress_handling' => $assessments[rand(0,3)],
    // 'moral_courage_self_confidence' => $assessments[rand(0,3)],
    // 'interviewer_id' => Employee::factory()->create()->id,
    // 'interview_date' => $this->faker->date(),
    public function up()
    {
        Schema::create('interview_assessments', function (Blueprint $table) {
            $table->id();
            $table->enum('look', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('self_introduction', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('personality', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('english', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('culture', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('arabic', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('initiative', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('sharing_skills', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('comprehension', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('decision_making', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('compatibility_of_education', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('compatibility_of_experiance', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('compatibility_of_skills', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('problem_solving_skills', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('stress_handling', ['excellent', 'good', 'medium', 'weak']);
            $table->enum('moral_courage_self_confidence', ['excellent', 'good', 'medium', 'weak']);
            $table->foreignId('interviewer_id')
                ->references('id')
                ->on('employees');
            $table->date('interview_date');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('interview_assessments');
    }
}
