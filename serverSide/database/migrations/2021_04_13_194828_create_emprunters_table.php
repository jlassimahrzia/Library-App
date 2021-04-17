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
            $table->unsignedBigInteger('idOuvrage');
            $table->unsignedBigInteger('idUser');
            $table->foreign('idOuvrage')->references('id')->on('ouvrages')->onDelete('cascade');
            $table->foreign('idUser')->references('id')->on('users')->onDelete('cascade');
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
