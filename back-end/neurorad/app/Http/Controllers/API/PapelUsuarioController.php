<?php

namespace App\Http\Controllers\API;

use App\PapelUsuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PapelUsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $papeis = PapelUsuario::all();
        return response()->json($papeis, 200);
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

        PapelUsuario::create($request->all());
        return response()->json([
            'message' => 'Papel de usuário criado com sucesso!'
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
        $papel = PapelUsuario::find($id);
        return response()->json($papel, 200);
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

        $papel = PapelUsuario::find($id);
        $papel->fill($request->all());
        $papel->save();
        return response()->json([
            'message' => 'Papel de usuário atualizado com sucesso!'
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
        $papel = PapelUsuario::find($id);
        $papel->delete();
        return response()->json([
            'message' => 'Papel de usuário deletado com sucesso!'
        ], 200);
    }
}
