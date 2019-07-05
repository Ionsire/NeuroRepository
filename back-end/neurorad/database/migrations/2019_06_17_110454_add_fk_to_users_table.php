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
        Schema::table('users', function (Blueprint $table) {
            $table->unsignedBigInteger('perfil_id');
            $table->foreign('perfil_id')->references('id')->on('perfil_usuario');
            $table->unsignedBigInteger('especialidade_id')->nullable();
            $table->foreign('especialidade_id')->references('id')->on('especialidade_usuario');
            $table->unsignedBigInteger('papel_id');
            $table->foreign('papel_id')->references('id')->on('papel_usuario');
            $table->unsignedBigInteger('status_id');
            $table->foreign('status_id')->references('id')->on('status_usuario');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_perfil_id_foreign');
            $table->dropColumn('perfil_id');
            $table->dropForeign('users_especialidade_id_foreign');
            $table->dropColumn('especialidade_id');
            $table->dropForeign('users_papel_id_foreign');
            $table->dropColumn('papel_id');
            $table->dropForeign('users_status_id_foreign');
            $table->dropColumn('status_id');
        });
    }
}
