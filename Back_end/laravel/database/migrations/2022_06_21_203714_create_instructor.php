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
        Schema::create('instructor', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users');
            $table->foreignId('institution_id')->constrained('institution');
            $table->foreignId('department_id')->constrained('department');
            $table->foreignId('college_id')->constrained('college');
            $table->string('phoneNumber');
            $table->string("sex");
            $table->string("experience");
            $table->string("GPA");
            $table->string('image')->nullable();
            $table->boolean('verificationStatus');
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
        Schema::dropIfExists('instructor');
    }
};
