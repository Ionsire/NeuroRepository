<?php

namespace App\Http\Controllers\API;

use App\EspecialidadeUsuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EspecialidadeUsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $especialidades = EspecialidadeUsuario::all();
        return response()->json($especialidades, 200);
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
            'DS_DESCRICAO' =>'required|string',
        ]);

        EspecialidadeUsuario::create($request->all());
        return response()->json([
            'message' => 'Especialidade de usuário criado com sucesso!'
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
        $especialidade = EspecialidadeUsuario::find($id);
        return response()->json($especialidade, 200);
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
            'DS_DESCRICAO' =>'required|string',
        ]);

        $especialidade = EspecialidadeUsuario::find($id);
        $especialidade->fill($request->all());
        $especialidade->save();
        return response()->json([
            'message' => 'Especialidade de usuário atualizado com sucesso!'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $especialidade = EspecialidadeUsuario::find($id);
        $especialidade->delete();
        return response()->json([
            'message' => 'Especialidade de usuário deletado com sucesso!'
        ], 200);
    }
}
