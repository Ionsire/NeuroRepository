<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAgendamentoCasoDaSemanaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('agendamento_caso_da_semana', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('caso_clinico_id');
            $table->foreign('caso_clinico_id')->references('id')->on('caso_clinico')->onDelete('cascade');
            $table->unsignedBigInteger('caso_da_semana_id');
            $table->foreign('caso_da_semana_id')->references('id')->on('caso_da_semana')->onDelete('cascade');
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
        Schema::table('agendamento_caso_da_semana', function (Blueprint $table) {
            $table->dropForeign('agendamento_caso_da_semana_caso_clinico_id_foreign');
            $table->dropColumn('caso_clinico_id');
            $table->dropForeign('agendamento_caso_da_semana_caso_da_semana_id_foreign');
            $table->dropColumn('caso_da_semana_id');
        });
        Schema::dropIfExists('agendamento_caso_da_semana');
    }
}
