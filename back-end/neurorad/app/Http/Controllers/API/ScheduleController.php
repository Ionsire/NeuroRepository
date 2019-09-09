<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\API\CasoClinicoController;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\CasoClinico;
class ScheduleController extends Controller
{
    public function __construct()
    {
        $CasoClinico = new CasoClinico();
    }

    public function busca(){
        dd(date("d.m.y"));
        $CasoClinico = all()->where('DT_SEMANA','=',date("d.m.y"));

        if($CasoClinico == null){

            dd('encontrou',$CasoClinico);
        }
    }
}
