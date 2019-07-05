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
            $table->unsignedBigInteger('caso_clinico_id');
            $table->foreign('caso_clinico_id')->references('id')->on('caso_clinico');
            $table->unsignedBigInteger('caso_da_semana_id');
            $table->foreign('caso_da_semana_id')->references('id')->on('caso_da_semana');
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
            $table->dropForeign('caso_clinico_id');
            $table->dropColumn('caso_clinico_id');
            $table->dropForeign('caso_da_semana_id');
            $table->dropColumn('caso_da_semana_id');
        });
        Schema::dropIfExists('agendamento_caso_da_semana');
    }
}
