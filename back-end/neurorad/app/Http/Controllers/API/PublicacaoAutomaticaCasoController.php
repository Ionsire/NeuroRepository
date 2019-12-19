<?php

namespace App\Http\Controllers\API;

use App\CasoClinico;
use App\Http\Controllers\Controller;

class PublicacaoAutomaticaCasoController extends Controller
{
    //
    public function publicarCaso(){ // metodo de publicar caso vai valer pra quando nao tiver agendados e quando tiver agendados

        $date=date('Y.m.d'); //pega a data atual ex: 2019-09-22
        $date = str_replace(".","-",$date); // formata a hora para o banco

        //CO_STATUS 3 é referente ao caso agendado
        //CO_STATUS 2 é referente ao caso homologado

        //busca e verifica se existe caso clinico com CO_STATUS 3 (Agendado) com a data de agendamento pra aquele dia
        $casoAgendado = CasoClinico::where('CO_STATUS', '=', 3)->where('DT_SEMANA', '=', $date)->first(); // procura por casos que estejam agendados para essa semana
        $casoAtivo = CasoClinico::where('CO_STATUS', '=', 4);

        //se nao tem caso Agendado (CO_STATUS = 3)
        if(!$casoAgendado && !$casoAtivo){
            //$date=date('d.m.Y'); //pega a data
            //$date = str_replace(".","/",$date);

            //busca o primeiro caso homologado(CO_STATUS = 2) e muda seu CO_STATUS para 4 (Em Uso)
            // e altera o campo DT_SEMANA para o valor de $date que seria a semana corrente
            CasoClinico::where('CO_STATUS', '=', '2')->first()->update(['CO_STATUS' => '4', 'DT_SEMANA' => $date]);

        }
        else{
            // Basicamente nao precisa fazer mais nada
            $CasoClinico = CasoClinico::all()->where('DT_SEMANA','=',$date);
            //dd($CasoClinico);

            if($CasoClinico != null){
                CasoClinico::where('DT_SEMANA','=',$date)->where('CO_STATUS', '=', '3')->update(['CO_STATUS' => '4', 'DT_SEMANA' => $date]);
            }
            //dd('ja existe caso agendado pra essa semana');
        }

        return response()->json($casoAgendado, 200);

    }
    public function desPublicaCaso()
    {
        CasoClinico::where('CO_STATUS', '=', 4)->update(['CO_STATUS' => '5']);
    }
}
