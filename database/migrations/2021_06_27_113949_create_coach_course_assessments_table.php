<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoachCourseAssessmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coach_course_assessments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('training_course_id');
            $table->string('trainees_discipline');
            $table->string('trainees_interaction');
            $table->string('congruence_with_content');
            $table->string('trainees_cooperation');
            $table->string('syllabus_understanding');
            $table->string('hall_preparation');
            $table->string('reception_supervision');
            $table->string('hospitality_and_course_breaks');
            $table->string('training_department_cooperation');
            $table->string('note');
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
        Schema::dropIfExists('coach_course_assessments');
    }
}
