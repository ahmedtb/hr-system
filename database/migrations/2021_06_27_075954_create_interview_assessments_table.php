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
    public function up()
    {
        Schema::create('interview_assessments', function (Blueprint $table) {
            $table->id();
            $table->string('name');

            $table->enum('look', [1, 2, 3, 4]);
            $table->enum('self_introduction', [1, 2, 3, 4]);
            $table->enum('personality', [1, 2, 3, 4]);
            $table->enum('english', [1, 2, 3, 4]);
            $table->enum('culture', [1, 2, 3, 4]);
            $table->enum('arabic', [1, 2, 3, 4]);
            $table->enum('initiative', [1, 2, 3, 4]);
            $table->enum('sharing_skills', [1, 2, 3, 4]);
            $table->enum('comprehension', [1, 2, 3, 4]);
            $table->enum('decision_making', [1, 2, 3, 4]);
            $table->enum('compatibility_of_education', [1, 2, 3, 4]);
            $table->enum('compatibility_of_experiance', [1, 2, 3, 4]);
            $table->enum('compatibility_of_skills', [1, 2, 3, 4]);
            $table->enum('problem_solving_skills', [1, 2, 3, 4]);
            $table->enum('stress_handling', [1, 2, 3, 4]);
            $table->enum('moral_courage_self_confidence', [1, 2, 3, 4]);
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
