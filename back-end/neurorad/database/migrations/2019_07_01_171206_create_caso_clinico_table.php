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
        Schema::create('caso_clinico', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('historia_clinica');
            $table->string('descricao_achados_da_imagem');
            $table->string('diagnostico');
            $table->unsignedBigInteger('categoria_id');
            $table->foreign('categoria_id')->references('id')->on('categoria_caso_clinico');
            $table->unsignedBigInteger('subcategoria_id')->nullable();
            $table->foreign('subcategoria_id')->references('id')->on('subcategoria_caso_clinico');
            $table->string('discussao');
            $table->string('referencias');
            $table->integer('rejeicoes')->default(0);
            $table->string('correcoes')->nullable();
            $table->unsignedBigInteger('usuario_id');
            $table->foreign('usuario_id')->references('id')->on('users');
            $table->unsignedBigInteger('status_id')->default(1);
            $table->foreign('status_id')->references('id')->on('status_caso_clinico');
            $table->date('semana')->nullable();
            $table->date('publicacao');
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
        Schema::table('caso_clinico', function (Blueprint $table) {
            $table->dropForeign('caso_clinico_categoria_id_foreign');
            $table->dropColumn('categoria_id');
            $table->dropForeign('caso_clinico_subcategoria_id_foreign');
            $table->dropColumn('subcategoria_id');
            $table->dropForeign('caso_clinico_usuario_id_foreign');
            $table->dropColumn('usuario_id');
            $table->dropForeign('caso_clinico_status_id_foreign');
            $table->dropColumn('status_id');
        });
        Schema::dropIfExists('caso_clinico');
    }
}
