<?php

use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateFormAccessTokensTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('form_access_tokens', function (Blueprint $table) {
            $table->id();
            $table->foreignId('form_structure_id');
            $table->string('access_token');
            $table->date('expiration_date')->default(Carbon::today()->addWeek(1));
            $table->unsignedMediumInteger('copies')->default(1);
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
        Schema::dropIfExists('form_access_tokens');
    }
}
