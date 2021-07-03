<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrainingPeriodAssessmentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('training_period_assessments', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->foreignId('employee_id');
            $table->foreignId('unit_id');
            $table->date('training_begin_date');
            $table->date('training_end_date');
            $table->tinyInteger('excitement');
            $table->tinyInteger('ability_to_improve');
            $table->tinyInteger('guidance_acceptance');
            $table->tinyInteger('handling_technology');
            $table->tinyInteger('maintaining_working_hours');
            $table->tinyInteger('relationship_with_colleagues');
            $table->tinyInteger('behavior');
            $table->tinyInteger('look');
            $table->tinyInteger('belief_and_loyalty');
            $table->unsignedSmallInteger('final_degree');
            $table->foreignId('reporter_id')
                ->references('id')
                ->on('employees');
            $table->string('unit_head_recommendation');
            $table->integer('delay_in_min');
            $table->integer('early_departure_min');
            $table->integer('delay_deduction');
            $table->integer('footprint_deduction');
            $table->integer('absence_days');
            $table->integer('attendance_rate');
            $table->string('management_decision');
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
        Schema::dropIfExists('training_period_assessments');
    }
}
