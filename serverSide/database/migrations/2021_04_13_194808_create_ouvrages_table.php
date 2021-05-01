<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOuvragesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ouvrages', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('codeIsbn');
            $table->string('titre');
            $table->string('auteur');
            $table->string('edition');
            $table->float('prix', 8, 2);
            $table->string('photoCouverture');
            $table->mediumText('resumer')->nullable();
            $table->string('langue');
            $table->date('dateCreation');
            $table->integer('nbrExemplaire');
            $table->integer('nbrEmprunter');
            $table->enum('type', ['1','2','3']); // 1: papier 2: pdf 3: papier et pdf
            $table->string('pdfVersion')->nullable();
            $table->unsignedBigInteger('categorie_id');
            $table->foreign('categorie_id')->references('id')->on('categories')->onDelete('cascade');
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
        Schema::dropIfExists('ouvrages');
    }
}
