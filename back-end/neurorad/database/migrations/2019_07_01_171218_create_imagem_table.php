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
        Schema::create('TB_IMAGEM', function (Blueprint $table) {
            $table->bigIncrements('CO_SEQ_IMAGEM');
            $table->string('IM_IMAGEM');
            $table->unsignedBigInteger('CO_CASO_CLINICO');
            $table->foreign('CO_CASO_CLINICO')->references('CO_SEQ_CASO_CLINICO')->on('TB_CASO_CLINICO')->onDelete('cascade');
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
            $table->dropForeign('tb_imagem_co_caso_clinico_foreign');
        });
        Schema::dropIfExists('TB_IMAGEM');
    }
}
