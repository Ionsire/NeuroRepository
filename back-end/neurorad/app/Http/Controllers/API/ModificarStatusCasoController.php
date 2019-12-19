<?php

namespace App\Http\Controllers\API;

use App\CasoClinico;
use App\Http\Controllers\Controller;

class ModificarStatusCasoController extends Controller
{
    public function mudarStatus(){
       
        //CO_STATUS = 4 se refere ao caso clinico Em Uso
        //CO_STATUS = 5 se refere ao caso clinico Disponivel na base publica

        //busca e atualiza todos os casos clinicos que tenham CO_STATUS = 4 para o CO_STATUS = 5
        CasoClinico::where('CO_STATUS', '=', 4)->update(['CO_STATUS' => '5']);
    }
}
