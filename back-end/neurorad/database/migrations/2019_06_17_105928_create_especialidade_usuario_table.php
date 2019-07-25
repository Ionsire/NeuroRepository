<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEspecialidadeUsuarioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('TB_ESPECIALIDADE_USUARIO', function (Blueprint $table) {
            $table->bigIncrements('CO_SEQ_ESPECIALIDADE_USUARIO');
            $table->string('DS_DESCRICAO');
            $table->timestamp('DT_CRIACAO');
            $table->timestamp('DT_ATUALIZACAO');
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
        Schema::dropIfExists('TB_ESPECIALIDADE_USUARIO');
    }
}
