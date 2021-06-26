<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInterviewAssessmentFormsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('interview_assessment_forms', function (Blueprint $table) {
            $table->id();
            $table->string('introduction');
            $table->string('first_name');
            $table->string('father_name');
            $table->string('grandfather_name');
            $table->string('last_name');
            $table->date('birthday');
            $table->enum('gender',['male','female']);
            $table->enum('social_status',['single','married']);
            $table->string('nationality');
            $table->string('education');
            $table->string('job_applying_for');
            $table->boolean('do_you_have_car');
            $table->string('skills_you_have');
            $table->enum('your_langs',['arabic','english','french','italian']);
            $table->string('courses_you_take');
            $table->string('phone_number');
            $table->string('other_number');
            $table->json('jobs_and_experiances');
            $table->json('interviewer_name');
            $table->date('today_date');

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
        Schema::dropIfExists('interview_assessment_forms');
    }
}
