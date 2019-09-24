<?php

namespace App\Http\Controllers\API;

use App\CasoClinico;
use App\Http\Controllers\Controller;

class PublicacaoAutomaticaCasoController extends Controller
{
    //
    public function publicarCaso(){

        //CO_STATUS 4 é referente ao caso Em Uso
        //CO_STATUS 2 é referente ao caso homologado

        //busca e verifica se existe caso clinico com CO_STATUS 4 (Em Uso)
        $casoEmUso = CasoClinico::where('CO_STATUS', '=', 4)->first();
        //se nao tem caso em uso (CO_STATUS = 4)
        if(!$casoEmUso){


            $date=date('d.m.Y'); //pega a data
            $date = str_replace(".","/",$date);



            //busca o primeiro caso homologado(CO_STATUS = 2) e muda seu CO_STATUS para 4 (Em Uso)
            // e altera o campo DT_SEMANA para o valor de $date que seria a semana corrente
            CasoClinico::where('CO_STATUS', '=', '2')->first()->update(['CO_STATUS' => '4', 'DT_SEMANA' => $date]);


        }
        else{
            // Basicamente nao precisa fazer mais nada
        }

        return response()->json($casoEmUso, 200);

    }
}
