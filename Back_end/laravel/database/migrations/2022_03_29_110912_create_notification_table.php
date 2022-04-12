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
        Schema::create('notification', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('notificationTitle');
            $table->string('notificationDetail');
            $table->string('notificationImage');
            $table->foreignId('sender_id')->constrained('users');
            $table->foreignId('reciever_id')->constrained('users');
            $table->string('seen_status');

        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('notification');
    }
};
