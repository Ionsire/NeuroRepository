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
            $table->unsignedBigInteger('CO_PERFIL');
            $table->foreign('CO_PERFIL')->references('CO_SEQ_PERFIL')->on('TB_PERFIL_USUARIO');
            $table->unsignedBigInteger('CO_ESPECIALIDADE')->nullable();
            $table->foreign('CO_ESPECIALIDADE')->references('CO_SEQ_ESPECIALIDADE')->on('TB_ESPECIALIDADE_USUARIO');
            $table->unsignedBigInteger('CO_PAPEL');
            $table->foreign('CO_PAPEL')->references('CO_SEQ_PAPEL')->on('TB_PAPEL_USUARIO');
            $table->unsignedBigInteger('CO_STATUS');
            $table->foreign('CO_STATUS')->references('CO_SEQ_STATUS')->on('TB_STATUS_USARIO');
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
            $table->dropForeign('TB_USUARIO_CO_PERFIL_foreign');
            $table->dropColumn('CO_PERFIL');
            $table->dropForeign('TB_USUARIO_CO_ESPECIALIDADE_foreign');
            $table->dropColumn('CO_ESPECIALIDADE');
            $table->dropForeign('TB_USUARIO_CO_PAPEL_foreign');
            $table->dropColumn('CO_PAPEL');
            $table->dropForeign('TB_USUARIO_CO_STATUS_foreign');
            $table->dropColumn('CO_STATUS');
        });
    }
}
