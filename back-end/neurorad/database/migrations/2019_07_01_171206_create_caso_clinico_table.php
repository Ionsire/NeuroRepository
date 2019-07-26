<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCasoClinicoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('TB_CASO_CLINICO', function (Blueprint $table) {
            $table->bigIncrements('CO_SEQ_CASO_CLINICO');
            $table->string('DS_HISTORIA_CLINICA');
            $table->string('DS_ACHADOS_DAS_IMAGENS');
            $table->string('DS_DIAGNOSTICO');
            $table->unsignedBigInteger('CO_CATEGORIA');
            $table->foreign('CO_CATEGORIA')->references('CO_SEQ_CATEGORIA_CASO_CLINICO')->on('TB_CATEGORIA_CASO_CLINICO');
            $table->unsignedBigInteger('CO_SUBCATEGORIA')->nullable();
            $table->foreign('CO_SUBCATEGORIA')->references('CO_SEQ_SUBCATEGORIA_CASO_CLINICO')->on('TB_SUBCATEGORIA_CASO_CLINICO');
            $table->string('DS_DISCUSSAO');
            $table->string('DS_REFERENCIAS');
            $table->integer('NU_REJEICOES')->default(0);
            $table->string('DS_CORRECOES')->nullable();
            $table->unsignedBigInteger('CO_USUARIO');
            $table->foreign('CO_USUARIO')->references('CO_SEQ_USUARIO')->on('TB_USUARIO');
            $table->unsignedBigInteger('CO_STATUS');
            $table->foreign('CO_STATUS')->references('CO_SEQ_STATUS_CASO_CLINICO')->on('TB_STATUS_CASO_CLINICO');
            $table->date('DT_SEMANA')->nullable();
            $table->timestamp('DT_CRIACAO')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('DT_ATUALIZACAO')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('DT_EXCLUSAO')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('TB_CASO_CLINICO', function (Blueprint $table) {
            $table->dropForeign('tb_caso_clinico_co_categoria_foreign');
            $table->dropColumn('CO_CATEGORIA');
            $table->dropForeign('tb_caso_clinico_co_subcategoria_foreign');
            $table->dropColumn('CO_SUBCATEGORIA');
            $table->dropForeign('tb_caso_clinico_co_usuario_foreign');
            $table->dropColumn('CO_USUARIO');
            $table->dropForeign('tb_caso_clinico_co_status_foreign');
            $table->dropColumn('CO_STATUS');
        });
        Schema::dropIfExists('TB_CASO_CLINICO');
    }
}
