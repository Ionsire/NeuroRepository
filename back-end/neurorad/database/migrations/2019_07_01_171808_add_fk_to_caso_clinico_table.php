<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFkToCasoClinicoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        // Schema::table('TB_CASO_CLINICO', function (Blueprint $table) {
        //     $table->string('CO_IMAGEM_CAPA')->nullable();
        //     //$table->foreign('CO_IMAGEM_CAPA')->references('CO_SEQ_IMAGEM')->on('TB_IMAGEM');
        // });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Schema::table('TB_CASO_CLINICO', function (Blueprint $table) {
        //     $table->dropForeign('tb_caso_clinico_co_imagem_capa_foreign');
        //     $table->dropColumn('CO_IMAGEM_CAPA');
        // });
    }
}
