<?php

namespace App\Http\Controllers\API;

use App\CasoClinico;
use Illuminate\Http\Request;

class CasoClinicoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $casoclinico = CasoClinico::all();
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
            'discussao'=>'required|string',
            'referencias'=>'required|string',
            'rejeicoes'=>'required|int',
            'correcoes'=>'string',
            'publicacao'=>'required|string'
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
            'discussao'=>'required|string',
            'referencias'=>'required|string',
            'rejeicoes'=>'required|int',
            'correcoes'=>'string',
            'publicacao'=>'required|string'
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
