<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFkToCasoClinicoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('caso_clinico', function (Blueprint $table) {
            $table->unsignedBigInteger('imagem_capa_id');
            $table->foreign('imagem_capa_id')->references('id')->on('imagem');
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
            $table->dropForeign('caso_clinico_imagem_capa_id_foreign');
            $table->dropColumn('imagem_capa_id');
        });
    }
}
