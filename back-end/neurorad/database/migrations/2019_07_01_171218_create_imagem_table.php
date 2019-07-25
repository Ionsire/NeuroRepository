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
        Schema::create('TM_IMAGEM', function (Blueprint $table) {
            $table->bigIncrements('CO_SEQ_IMAGEM');
            $table->string('IM_IMAGEM');
            $table->unsignedBigInteger('CO_CASO_CLINICO');
            $table->foreign('CO_CASO_CLINICO')->references('CO_SEQ')->on('TB_CASO_CLINICO')->onDelete('cascade');
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
        Schema::table('TB_IMAGEM', function (Blueprint $table) {
            $table->dropForeign('TB_IMAGEM_CO_CASO_CLINICO_foreign');
        });
        Schema::dropIfExists('TM_IMAGEM');
    }
}
