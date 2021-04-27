<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpruntersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('emprunters', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->date('dateDebut');
            $table->date('dateFin');
            $table->enum('rendu',['oui','non']);
            $table->unsignedBigInteger('ouvrage_id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('ouvrage_id')->references('id')->on('ouvrages')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
        Schema::dropIfExists('emprunters');
    }
}
