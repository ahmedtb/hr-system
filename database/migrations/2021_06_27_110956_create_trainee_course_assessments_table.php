<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTraineeCourseAssessmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('trainee_course_assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('training_course_id');

            $table->nullableMorphs('trainee');
            $table->string('person_name')->nullable();

            $table->string('coach_understanding');
            $table->string('coach_communication');
            $table->string('presentation');
            $table->string('coach_cooperation');
            $table->string('program_quality');
            $table->string('technical_preparation');
            $table->string('training_hall_preparation');
            $table->string('reception');
            $table->string('hospitality_and_course_breaks');
            $table->string('training_unit_response');
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
        Schema::dropIfExists('trainee_course_assessments');
    }
}
