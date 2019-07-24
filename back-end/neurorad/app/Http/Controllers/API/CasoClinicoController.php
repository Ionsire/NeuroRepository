<?php

namespace App\Http\Controllers\API;

use App\CasoClinico;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Rules\SegundaFeira;

class CasoClinicoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index_admin(Request $request)
    {
        $search = $request->get('busca', null);
        $casoclinico = CasoClinico::query();

        if ($search != null) {
            if(array_key_exists('diagnostico', $search)){
                $casoclinico = $casoclinico
                    ->where('diagnostico', 'LIKE', '%'.$search['diagnostico'].'%');
            }
            if(array_key_exists('categoria_id', $search)){
                $casoclinico = $casoclinico
                    ->where('categoria_id', '=',$search['categoria_id']);
            }
            if(array_key_exists('subcategoria_id', $search)){
                $casoclinico = $casoclinico
                    ->where('subcategoria_id', '=',$search['subcategoria_id']);
            }
            if(array_key_exists('user_id', $search)){
                $casoclinico = $casoclinico
                    ->where('user_id', '=',$search['user_id']);
            }
            if(array_key_exists('publicacao', $search)){
                $casoclinico = $casoclinico
                    ->where('publicacao', '=',$search['publicacao']);
            }
        }
        return response()->json($casoclinico, 200);
    }

    /**
     * Retorna a lista de casos clínicos Homologados não inativos ou arquivados
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function index(Request $request)
    {
        $search = $request->get('busca', null);
        $casoclinico = CasoClinico::query();
        $casoclinico = $casoclinico
            ->whereNotIn('status_id', [1,5,6]);

        if ($search != null) {
            if(array_key_exists('diagnostico', $search)){
                $casoclinico = $casoclinico
                    ->where('diagnostico', 'LIKE', '%'.$search['diagnostico'].'%');
            }
            if(array_key_exists('categoria_id', $search)){
                $casoclinico = $casoclinico
                    ->where('categoria_id', '=',$search['categoria_id']);
            }
            if(array_key_exists('subcategoria_id', $search)){
                $casoclinico = $casoclinico
                    ->where('subcategoria_id', '=', $search['subcategoria_id']);
            }
        }
        return response()->json($casoclinico, 200);
    }

    /**
     * Retorna todos os Casos Clínicos pertencentes a semana atual e as semanas já passadas
     *
     * Referente a página inicial da aplicação
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function casos_da_semana_home()
    {
        $casos_da_semana = CasoClinico::all()->filter(function($caso_clinico) {
            if (strtotime($caso_clinico->semana) <= strtotime('this week monday')) {
                return $caso_clinico;
            }
        })->orderBy('semana', 'desc');
        return response()->json($casos_da_semana, 200);
    }

    /**
     * Salva no Caso Clínico a semana referente ao seu agendamento
     *
     * @param $id
     * @param $date
     * @return \Illuminate\Http\JsonResponse
     */
    public function agendar_caso_da_semana($id, $date)
    {
        $data = ['date' => $date];
        $data->validate(['date' => ['date', new SegundaFeira]]);
        $caso_clinico = CasoClinico::where($id);
        $caso_clinico['semana'] = $date;
        $caso_clinico->save();
        return response()->json(['message' => 'Caso Clínico Agendado com Sucesso'], 200);
    }

    /**
     * Remove do Caso Clínico a semana referente ao seu agendamento
     *
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function desagendamento_caso_da_semana($id)
    {
        $caso_clinico = CasoClinico::where($id);
        $caso_clinico['semana'] = null;
        $caso_clinico->save;
        return response()->json(['message' => 'Caso Clínico Desagendado com Sucesso'], 200);
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
            'historia_clinica' =>'required|string',
            'descricao_achados_da_imagem'=>'required|string',
            'diagnostico'=>'required|string',
            'categoria_id'=>'required|int|exists:categoria_caso_clinico,id',
            'subcategoria_id'=>'int|exists:subcategoria_caso_clinico,id',
            'discussao'=>'required|string',
            'referencias'=>'required|string',
            'rejeicoes'=>'int',
            'correcoes'=>'string',
            'usuario_id'=>'required|int|exists:users,id',
            'status_id'=>'int|exists:status_caso_clinico,id',
            'semana'=> ['date', new SegundaFeira],
            'publicacao'=>'required|date'
        ]);

        CasoClinico::create($request->all());

        return response()->json([
            'message' => 'Caso clinico cadastrado com sucesso!'
        ], 201);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $casoclinico = CasoClinico::find($id);
        return response()->json($casoclinico,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'historia_clinica' =>'required|string',
            'descricao_achados_da_imagem'=>'required|string',
            'diagnostico'=>'required|string',
            'categoria_id'=>'required|int|exists:categoria_caso_clinico,id',
            'subcategoria_id'=>'int|exists:subcategoria_caso_clinico,id',
            'discussao'=>'required|string',
            'referencias'=>'required|string',
            'rejeicoes'=>'int',
            'correcoes'=>'string',
            'usuario_id'=>'required|int|exists:users,id',
            'status_id'=>'required|int|exists:status_caso_clinico,id',
            'semana'=> ['date', new SegundaFeira],
            'publicacao'=>'required|date'
        ]);
        $casoclinico = CasoClinico::find($id);
        $casoclinico -> fill($request->all());
        $casoclinico -> save();
        return response()->json([
            'message'=>'Caso clinico cadastrado com sucesso!'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $casoclinico = CasoClinico::find($id);
        $casoclinico->delete();
        return response()->json([
            'message'=>'Caso clinico deletado com sucesso!'
        ],200);
    }
}
