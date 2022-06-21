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
        Schema::create('student', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('institution_id')->constrained('institution');
            $table->foreignId('college_id')->constrained('college');
            $table->foreignId('department_id')->constrained('department');
            $table->string('phoneNumber');
            $table->string("sex");
            $table->string("experience");
            $table->date("startDateClass");
            $table->date("endDateClass");
            $table->string("GPA");
            $table->string('image')->nullable();
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
        Schema::dropIfExists('student');
    }
};
