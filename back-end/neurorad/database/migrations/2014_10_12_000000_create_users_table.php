<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('TB_USUARIO', function (Blueprint $table) {
            $table->bigIncrements('CO_SEQ_USUARIO');
            $table->string('NU_CPF', 11)->unique();
            $table->string('DS_NOME');
            $table->string('DS_EMAIL')->unique();
            $table->string('DS_SENHA');
            $table->date('DT_NASCIMENTO');
            $table->string('IM_FOTO')->nullable();
            $table->rememberToken();
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
        Schema::dropIfExists('TB_USUARIO');
    }
}
