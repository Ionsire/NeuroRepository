<?php

namespace App\Http\Controllers\API;

use App\CasoDaSemana;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Rules\SegundaFeira;



class CasoDaSemanaController extends Controller
{
    /**
     * Retorna os casos clínicos atuais e de semanas anteriores
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $casos_da_semana = CasoDaSemana::all()->filter(function($caso_da_semana) {
            if (strtotime($caso_da_semana->inicio) <= strtotime('this week monday')) {
                return $caso_da_semana;
            }
        })->orderBy('inicio', 'desc');
        return response()->json($casos_da_semana, 200);
    }

    /**
     * Retorna semana atual e seguintes, onde pode ser feito agendamento.
     *
     * @return \Illuminate\Http\Response
     */
    public function proximas_semanas()
    {
        $semanas = CasoDaSemana::all()->where('inicio', '>=', date('Y-m-d', strtotime('monday this week')));
        return response()->json($semanas, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
//        $request->validate([
//            'inicio' => ['required', 'date', new SegundaFeira],
//        ]);
//        $new_caso_da_semana = CasoDaSemana::create($request->all());
//        return response()->json([
//            'message' => 'Caso da Semana criado com sucesso!',
//            $new_caso_da_semana,
//        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\CasoDaSemana  $casoDaSemana
     * @return \Illuminate\Http\Response
     */
    public function show(CasoDaSemana $casoDaSemana)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\CasoDaSemana  $casoDaSemana
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CasoDaSemana $casoDaSemana)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\CasoDaSemana  $casoDaSemana
     * @return \Illuminate\Http\Response
     */
    public function destroy(CasoDaSemana $casoDaSemana)
    {
        //
    }
}
