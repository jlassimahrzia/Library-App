<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('nom');
            $table->string('prenom');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('photo');
            $table->decimal('cin', $precision = 8, $scale = 0)->nullable();
            $table->decimal('numCarte', $precision = 8, $scale = 0)->nullable();
            $table->string('numInscription')->nullable();
            $table->date('DateNaissance')->nullable();
            $table->decimal('telephone', $precision = 8, $scale = 0)->nullable();
            $table->string('adresse')->nullable();
            $table->string('appartement')->nullable();
            $table->string('ville')->nullable();
            $table->decimal('codePostal', $precision = 4, $scale = 0)->nullable();
            $table->string('niveau')->nullable();
            $table->string('classe')->nullable();
            $table->string('annee_universiatire')->nullable();
            $table->enum('type', ['1', '2']); // 1: interne 2: externe
            $table->rememberToken();
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
        Schema::dropIfExists('users');
    }
}
