<?php

namespace App\Http\Controllers\API;

use App\PerfilUsuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PerfilUsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $perfis = PerfilUsuario::all();
        return response()->json($perfis, 200);
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
            'descricao' =>'required|string',
        ]);

        PerfilUsuario::create($request->all());
        return response()->json([
            'message' => 'Perfil de usuário criado com sucesso!'
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
        $perfil = PerfilUsuario::find($id);
        return response()->json($perfil, 200);
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
            'descricao' =>'required|string',
        ]);

        $perfil = PerfilUsuario::find($id);
        $perfil->fill($request->all());
        $perfil->save();
        return response()->json([
            'message' => 'Perfil de usuário atualizado com sucesso!'
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
        $perfil = PerfilUsuario::find($id);
        $perfil->delete();
        return response()->json([
            'message' => 'Perfil de usuário deletado com sucesso!'
        ], 200);
    }
}
