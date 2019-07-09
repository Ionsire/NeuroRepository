<?php

namespace App\Http\Controllers\API;

use App\AgendamentoCasoDaSemana;
use App\CasoClinico;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class AgendamentoCasoDaSemanaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create($caso_da_semana_id)
    {
        $agendamentos = AgendamentoCasoDaSemana::all()->where('caso_da_semana_id', $caso_da_semana_id);
        if (is_null($agendamentos)) {
            return response()->json([
                'message' => 'Semana inválida!',
            ], 400);
        }
        $casos_clinicos = CasoClinico::all()->whereIn('status_id', [2,3,4]);
        return response()->json([
            'casos_clinicos' => $casos_clinicos,
            'agendamentos' => $agendamentos,
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'caso_clinico_id' => 'required|exists:caso_clinico,id',
            'caso_da_semana_id' => 'required|exists:caso_da_semana,id',
        ]);

        AgendamentoCasoDaSemana::create($request->all());
        return response()->json([
            'message' => 'Agendamento criado com sucesso!'
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\AgendamentoCasoDaSemana  $agendamentoCasoDaSemana
     * @return \Illuminate\Http\Response
     */
    public function show(AgendamentoCasoDaSemana $agendamentoCasoDaSemana)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\AgendamentoCasoDaSemana  $agendamentoCasoDaSemana
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, AgendamentoCasoDaSemana $agendamentoCasoDaSemana)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\AgendamentoCasoDaSemana  $agendamentoCasoDaSemana
     * @return \Illuminate\Http\Response
     */
    public function destroy($caso_clinico_id, $caso_da_semana_id)
    {
        $agendamento = AgendamentoCasoDaSemana::where([
            ['caso_clinico_id', '=', $caso_clinico_id],
            ['caso_da_semana_id', '=', $caso_da_semana_id],
        ]);
        $agendamento->delete();
        return response()->json([
            'message'=>'Caso clinico deletado com sucesso!'
        ],200);
    }
}
