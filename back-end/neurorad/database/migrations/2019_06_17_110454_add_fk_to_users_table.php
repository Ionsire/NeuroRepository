<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFkToUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('TB_USUARIO', function (Blueprint $table) {
            $table->unsignedBigInteger('CO_PERFIL')->nullable();
            $table->foreign('CO_PERFIL')->references('CO_SEQ_PERFIL_USUARIO')->on('TB_PERFIL_USUARIO');
            $table->unsignedBigInteger('CO_ESPECIALIDADE')->nullable();
            $table->foreign('CO_ESPECIALIDADE')->references('CO_SEQ_ESPECIALIDADE_USUARIO')->on('TB_ESPECIALIDADE_USUARIO');
            $table->unsignedBigInteger('CO_PAPEL');
            $table->foreign('CO_PAPEL')->references('CO_SEQ_PAPEL_USUARIO')->on('TB_PAPEL_USUARIO');
            $table->unsignedBigInteger('CO_STATUS');
            $table->foreign('CO_STATUS')->references('CO_SEQ_STATUS_USUARIO')->on('TB_STATUS_USUARIO');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('TB_USUARIO', function (Blueprint $table) {
            $table->dropForeign('tb_usuario_co_perfil_foreign');
            $table->dropColumn('CO_PERFIL');
            $table->dropForeign('tb_usuario_co_especialidade_foreign');
            $table->dropColumn('CO_ESPECIALIDADE');
            $table->dropForeign('tb_usuario_co_papel_foreign');
            $table->dropColumn('CO_PAPEL');
            $table->dropForeign('tb_usuario_co_status_foreign');
            $table->dropColumn('CO_STATUS');
        });
    }
}
