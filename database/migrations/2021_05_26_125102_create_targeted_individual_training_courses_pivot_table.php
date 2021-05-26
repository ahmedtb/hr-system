<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTargetedIndividualTrainingCoursesPivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('targeted_individual_training_course', function (Blueprint $table) {
            $table->id();
            $table->foreignId('targeted_individual_id');
            $table->foreignId('training_course_id');
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
        Schema::dropIfExists('targeted_individual_training_course');
    }
}
