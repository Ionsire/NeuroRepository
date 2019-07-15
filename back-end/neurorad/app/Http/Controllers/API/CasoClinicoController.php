<?php

namespace App\Http\Controllers\API;

use App\CasoClinico;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CasoClinicoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $search = $request->get('busca', null);
        $casoclinico = CasoClinico::query();

        if ($search != null) {
            if(array_key_exists('diagnostico', $search)){
                $casoclinico = $casoclinico
                    ->where('diagnostico', 'LIKE', '%'.$search['diagnostico'].'%');
            }
            if(array_key_exists('categoria', $search)){
                $casoclinico = $casoclinico
                    ->where('categoria', 'LIKE', '%'.$search['categoria'].'%');
            }
            if(array_key_exists('data', $search)){
                $casoclinico = $casoclinico
                    ->where('data', 'LIKE', '%'.$search['data'].'%');
            }
        }
        return response()->json($casoclinico, 200);
    }

    /**
     * Retorna a lista de casos clínicos Homologados não inativos ou arquivados
     *
     * @return \Illuminate\Http\JsonResponse
     */

    public function index_common_user(Request $request)
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
            if(array_key_exists('categoria', $search)){
                $casoclinico = $casoclinico
                    ->where('categoria', 'LIKE', '%'.$search['categoria'].'%');
            }
            if(array_key_exists('data', $search)){
                $casoclinico = $casoclinico
                    ->where('data', 'LIKE', '%'.$search['data'].'%');
            }
        }
        return response()->json($casoclinico, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
            'status_id'=>'required|int|exists:status_caso_clinico,id',
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
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
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
