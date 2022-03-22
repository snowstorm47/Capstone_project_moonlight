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
        Schema::create('employmentHistory', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
           // $table->unsignedInteger('user_id');
            $table->foreignId('user_id')->constrained('users');
            $table->date('startDate');
            $table->date('endDate');
            $table->string('companyName');
            $table->string('position');
        });
        // Schema::table('employmentHistory', function (Blueprint $table) {
            
        //     $table->foreign('user_id')->refrences('id')->on('users')->onDelete('cascade');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employmentHistory');
        // Schema::table('employmentHistory', function (Blueprint $table) {
        // });
        
    }
};
