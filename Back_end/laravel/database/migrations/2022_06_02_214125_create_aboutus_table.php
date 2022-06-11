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
        Schema::create('aboutus', function (Blueprint $table) {
            $table->id();
            $table->string("ourTeam");
            $table->text("ourTeamDetail");
            $table->string("ourVision");
            $table->text("ourVisionDetail");
            $table->string("ourMission");
            $table->text("ourMissionDetail");
            $table->string("TitleOne");
            $table->string('TitleOneImage')->nullable();
            $table->text("TitleOneDetail");
            $table->string("TitleTwo");
            $table->string('TitleTwoImage')->nullable();
            $table->text("TitleTwoDetail");
            $table->string("TitleThree");
            $table->string('TitleThreeImage')->nullable();
            $table->text("TitleThreeDetail");
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
        Schema::dropIfExists('aboutus');
    }
};
