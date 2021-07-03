<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTrainingCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('training_courses', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->foreignId('training_program_id');
            $table->enum('status',['planned', 'resumed', 'done', 'canceled', 'archived']);
            $table->date('start_date');
            $table->date('end_date');
            $table->json('week_schedule'); 
            // week_schedule format should be
            // $schedule = [
            //     'saturday' => [
            //         'begin' => '00:00:00',
            //         'Lecture period' => '111' //minutes
            //     ],
            //     ........
            // ]
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
        Schema::dropIfExists('training_courses');
    }
}
