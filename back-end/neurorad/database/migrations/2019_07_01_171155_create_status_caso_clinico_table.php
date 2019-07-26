<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStatusCasoClinicoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('TB_STATUS_CASO_CLINICO', function (Blueprint $table) {
            $table->bigIncrements('CO_SEQ_STATUS_CASO_CLINICO');
            $table->string('DS_DESCRICAO');
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
        Schema::dropIfExists('TB_STATUS_CASO_CLINICO');
    }
}
