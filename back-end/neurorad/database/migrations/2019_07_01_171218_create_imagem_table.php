<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateImagemTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('imagem', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('imagem');
            $table->unsignedBigInteger('caso_clinico_id');
            $table->foreign('caso_clinico_id')->references('id')->on('caso_clinico');
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
        Schema::table('imagem', function (Blueprint $table) {
            $table->dropForeign('imagem_caso_clinico_id_foreign');
            $table->dropColumn('caso_clinico_id');
        });
        Schema::dropIfExists('imagem');
    }
}
