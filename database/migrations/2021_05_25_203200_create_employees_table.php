<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('address');
            $table->date('employment_date');
            $table->double('basic_salary');
            $table->string('phone_number');
            $table->foreignId('job_id')->onDelete('cascade');
            $table->string('email');
            $table->unsignedSmallInteger('medal_rating')->nullable();
            $table->mediumText('profile')->nullable();
            $table->string('password');
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
        Schema::dropIfExists('employees');
    }
}
