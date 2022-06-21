<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('recomendation', function (Blueprint $table) {
            $table->id();
            $table->string("sender_id")->constrained('users');
            $table->string("student_id")->constrained('student');
            $table->longText("recomendationDetail");

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
        Schema::dropIfExists('recomendation');
    }
};
