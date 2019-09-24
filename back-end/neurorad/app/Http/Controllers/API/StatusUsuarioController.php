<?php

namespace App\Http\Controllers\API;

use App\StatusUsuario;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class StatusUsuarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $status = StatusUsuario::all();
        return response()->json($status, 200);
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

        StatusUsuario::create($request->all());
        return response()->json([
            'message' => 'Status de usuário criado com sucesso!'
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
        $status = StatusUsuario::find($id);
        return response()->json($status, 200);
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

        $status = StatusUsuario::find($id);
        $status->fill($request->all());
        $status->save();
        return response()->json([
            'message' => 'Status de usuário atualizado com sucesso!'
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
        $status = StatusUsuario::find($id);
        $status->delete();
        return response()->json([
            'message' => 'Status de usuário deletado com sucesso!'
        ], 200);
    }
}
