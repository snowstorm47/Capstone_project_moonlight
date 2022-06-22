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
            $table->string('ourTeam');
            $table->text('ourTeamDetail');
            $table->string('ourVision');
            $table->text('ourVisionDetail');
            $table->string('ourMission');
            $table->text('ourMissionDetail');
            $table->string('TitleOne');
            $table->text('TitleOneDetail');
            $table->string('TitleOneImage');
            $table->string('TitleTwo');
            $table->text('TitleTwoDetail');
            $table->string('TitleTwoImage');
            $table->string('TitleThree');
            $table->text('TitleThreeDetail');
            $table->string('TitleThreeImage');
            $table->string('image');
            $table->string('imageTitle');
            $table->text('imageDetail');
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
